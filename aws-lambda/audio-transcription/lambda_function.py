import json
import boto3
import base64
import os
import uuid
from datetime import datetime

s3_client = boto3.client('s3')
transcribe_client = boto3.client('transcribe')

BUCKET_NAME = os.environ.get('S3_BUCKET_NAME', 'diabetes-app-audio-recordings')
TRANSCRIBE_OUTPUT_BUCKET = os.environ.get('TRANSCRIBE_OUTPUT_BUCKET', 'diabetes-app-transcriptions')

def lambda_handler(event, context):
    """
    Lambda function to handle audio upload, store in S3, and trigger AWS Transcribe Medical
    """

    # Handle CORS preflight
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': ''
        }

    try:
        # Parse the request
        path = event.get('path', '')

        # Route: POST /upload - Upload audio and start transcription
        if path.endswith('/upload') and event.get('httpMethod') == 'POST':
            return handle_upload(event)

        # Route: GET /status/{job_name} - Check transcription status
        elif '/status/' in path and event.get('httpMethod') == 'GET':
            job_name = path.split('/status/')[-1]
            return get_transcription_status(job_name)

        # Route: GET /transcript/{job_name} - Get completed transcription
        elif '/transcript/' in path and event.get('httpMethod') == 'GET':
            job_name = path.split('/transcript/')[-1]
            return get_transcription(job_name)

        else:
            return {
                'statusCode': 404,
                'headers': cors_headers(),
                'body': json.dumps({'error': 'Not found'})
            }

    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': cors_headers(),
            'body': json.dumps({'error': str(e)})
        }


def handle_upload(event):
    """Handle audio file upload and start transcription"""

    # Parse multipart form data or JSON
    content_type = event.get('headers', {}).get('content-type', '')

    if event.get('isBase64Encoded'):
        # Decode base64 body
        body = base64.b64decode(event['body'])
    else:
        body = event['body']

    # Parse form data to extract audio file
    # For simplicity, assuming JSON with base64 encoded audio
    try:
        data = json.loads(event['body']) if isinstance(event['body'], str) else event['body']
        audio_base64 = data.get('audio')
        patient_name = data.get('patientName', 'Unknown')
        patient_id = data.get('patientId', 'unknown')
        duration = data.get('duration', '0')

        audio_data = base64.b64decode(audio_base64)
    except:
        # If JSON parsing fails, assume raw binary data
        audio_data = body
        patient_name = event.get('queryStringParameters', {}).get('patientName', 'Unknown')
        patient_id = event.get('queryStringParameters', {}).get('patientId', 'unknown')
        duration = event.get('queryStringParameters', {}).get('duration', '0')

    # Generate unique filename
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    file_id = str(uuid.uuid4())[:8]
    filename = f"appointments/{patient_id}/{timestamp}_{file_id}.webm"

    # Upload to S3
    s3_client.put_object(
        Bucket=BUCKET_NAME,
        Key=filename,
        Body=audio_data,
        ContentType='audio/webm',
        Metadata={
            'patientName': patient_name,
            'patientId': patient_id,
            'duration': str(duration),
            'timestamp': datetime.now().isoformat()
        }
    )

    print(f"Audio uploaded to s3://{BUCKET_NAME}/{filename}")

    # Convert WebM to format supported by Transcribe (need to convert to WAV/MP3/FLAC)
    # For this demo, we'll assume the audio is in a compatible format
    # In production, you'd use FFmpeg layer to convert

    # Start AWS Transcribe Medical job
    job_name = f"transcribe_{patient_id}_{timestamp}_{file_id}"
    media_file_uri = f"s3://{BUCKET_NAME}/{filename}"

    try:
        transcribe_client.start_medical_transcription_job(
            MedicalTranscriptionJobName=job_name,
            LanguageCode='en-US',
            MediaFormat='webm',  # Change to 'wav' or 'mp3' if converted
            Media={'MediaFileUri': media_file_uri},
            OutputBucketName=TRANSCRIBE_OUTPUT_BUCKET,
            Specialty='PRIMARYCARE',  # PRIMARYCARE, CARDIOLOGY, NEUROLOGY, etc.
            Type='CONVERSATION'  # CONVERSATION or DICTATION
        )

        print(f"Started transcription job: {job_name}")

        return {
            'statusCode': 200,
            'headers': cors_headers(),
            'body': json.dumps({
                'message': 'Audio uploaded and transcription started',
                'jobName': job_name,
                's3Uri': media_file_uri,
                'status': 'IN_PROGRESS'
            })
        }

    except Exception as e:
        print(f"Transcribe error: {str(e)}")
        # If transcription fails, still return success for upload
        return {
            'statusCode': 200,
            'headers': cors_headers(),
            'body': json.dumps({
                'message': 'Audio uploaded but transcription failed to start',
                'error': str(e),
                's3Uri': media_file_uri,
                'status': 'FAILED'
            })
        }


def get_transcription_status(job_name):
    """Check the status of a transcription job"""
    try:
        response = transcribe_client.get_medical_transcription_job(
            MedicalTranscriptionJobName=job_name
        )

        job = response['MedicalTranscriptionJob']
        status = job['TranscriptionJobStatus']

        result = {
            'jobName': job_name,
            'status': status,
        }

        if status == 'COMPLETED':
            result['transcriptFileUri'] = job['Transcript']['TranscriptFileUri']
        elif status == 'FAILED':
            result['failureReason'] = job.get('FailureReason', 'Unknown error')

        return {
            'statusCode': 200,
            'headers': cors_headers(),
            'body': json.dumps(result)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers(),
            'body': json.dumps({'error': str(e)})
        }


def get_transcription(job_name):
    """Get the completed transcription text"""
    try:
        # Get job details
        response = transcribe_client.get_medical_transcription_job(
            MedicalTranscriptionJobName=job_name
        )

        job = response['MedicalTranscriptionJob']
        status = job['TranscriptionJobStatus']

        if status != 'COMPLETED':
            return {
                'statusCode': 400,
                'headers': cors_headers(),
                'body': json.dumps({
                    'error': 'Transcription not yet completed',
                    'status': status
                })
            }

        # Get transcription from S3
        transcript_uri = job['Transcript']['TranscriptFileUri']
        # Parse S3 URI: https://s3.region.amazonaws.com/bucket/key
        bucket = TRANSCRIBE_OUTPUT_BUCKET
        key = transcript_uri.split(f"{bucket}/")[-1]

        # Download transcription JSON
        s3_response = s3_client.get_object(Bucket=bucket, Key=key)
        transcript_json = json.loads(s3_response['Body'].read())

        # Extract text from transcript
        transcript_text = transcript_json['results']['transcripts'][0]['transcript']

        # Also extract items for speaker labels if available
        items = transcript_json['results'].get('items', [])

        return {
            'statusCode': 200,
            'headers': cors_headers(),
            'body': json.dumps({
                'jobName': job_name,
                'status': status,
                'transcript': transcript_text,
                'fullTranscript': transcript_json,
                'items': items
            })
        }

    except Exception as e:
        print(f"Error getting transcription: {str(e)}")
        return {
            'statusCode': 500,
            'headers': cors_headers(),
            'body': json.dumps({'error': str(e)})
        }


def cors_headers():
    """Return CORS headers"""
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    }
