# AWS Lambda Audio Transcription Service

This Lambda function handles audio recording uploads, stores them in S3, and uses AWS Transcribe Medical to generate transcriptions.

## Architecture

```
Browser → API Gateway → Lambda → S3 (audio storage)
                         ↓
                    AWS Transcribe Medical
                         ↓
                    S3 (transcription output)
                         ↓
                    Lambda → Browser (polling)
```

## Prerequisites

1. AWS CLI installed and configured
2. AWS SAM CLI installed
3. Python 3.11 or later
4. Appropriate AWS permissions (S3, Lambda, API Gateway, Transcribe)

## Installation

### Install AWS SAM CLI

```bash
# macOS
brew install aws-sam-cli

# Or using pip
pip install aws-sam-cli
```

### Configure AWS Credentials

```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter your default region (e.g., us-east-1)
# Enter default output format (json)
```

## Deployment

### 1. Build the SAM application

```bash
cd aws-lambda
sam build
```

### 2. Deploy to AWS

```bash
# First deployment (guided)
sam deploy --guided

# Subsequent deployments
sam deploy
```

During guided deployment, you'll be asked:
- Stack Name: `diabetes-app-transcription`
- AWS Region: `us-east-1` (or your preferred region)
- Confirm changes before deploy: `Y`
- Allow SAM CLI IAM role creation: `Y`
- Disable rollback: `N`
- Save arguments to configuration file: `Y`

### 3. Get the API Endpoint

After deployment, note the `ApiEndpoint` output:

```
Outputs:
  ApiEndpoint: https://xxxxx.execute-api.us-east-1.amazonaws.com/prod
```

### 4. Update React Frontend

Copy the API endpoint and update it in your React app:

```typescript
// In src/components/doctor/LiveSessionTab.tsx
const API_ENDPOINT = 'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod';
```

## API Endpoints

### POST /upload
Upload audio file and start transcription

**Request:**
```json
{
  "audio": "base64_encoded_audio_data",
  "patientName": "John Doe",
  "patientId": "123",
  "duration": "60"
}
```

**Response:**
```json
{
  "message": "Audio uploaded and transcription started",
  "jobName": "transcribe_123_20250107_abc123",
  "s3Uri": "s3://bucket/path/to/file.webm",
  "status": "IN_PROGRESS"
}
```

### GET /status/{jobName}
Check transcription job status

**Response:**
```json
{
  "jobName": "transcribe_123_20250107_abc123",
  "status": "IN_PROGRESS" | "COMPLETED" | "FAILED",
  "transcriptFileUri": "https://s3.amazonaws.com/..."  // Only when COMPLETED
}
```

### GET /transcript/{jobName}
Get completed transcription

**Response:**
```json
{
  "jobName": "transcribe_123_20250107_abc123",
  "status": "COMPLETED",
  "transcript": "Full transcription text here...",
  "fullTranscript": { ... },  // Complete AWS Transcribe response
  "items": [...]  // Individual words/phrases with timestamps
}
```

## Testing Locally

```bash
# Start local API
sam local start-api

# The API will be available at http://127.0.0.1:3000
```

Note: Local testing requires Docker to be running.

## Important Notes

### Audio Format Compatibility

AWS Transcribe Medical supports:
- MP3
- MP4
- WAV
- FLAC

WebM is **not directly supported**. You have two options:

1. **Convert in browser before upload** (recommended for production)
2. **Convert in Lambda using FFmpeg layer** (requires adding FFmpeg Lambda layer)

For this demo, you may need to adjust the `MediaFormat` parameter in the Lambda function or add format conversion.

### Cost Estimation

- **AWS Transcribe Medical**: $0.025 per minute (first 25 million minutes)
- **S3 Storage**: $0.023 per GB/month
- **Lambda**: First 1M requests free, then $0.20 per 1M requests
- **API Gateway**: $3.50 per million requests

A 10-minute appointment costs approximately $0.25 to transcribe.

### HIPAA Compliance

To make this HIPAA compliant:

1. Sign AWS BAA (Business Associate Agreement)
2. Enable S3 encryption at rest (add to template)
3. Enable CloudTrail logging
4. Use VPC endpoints for private connectivity
5. Implement proper access controls

## Monitoring

View logs:
```bash
# Lambda logs
sam logs -n AudioTranscriptionFunction --tail

# Or use CloudWatch directly
aws logs tail /aws/lambda/diabetes-app-transcription-AudioTranscriptionFunction
```

## Cleanup

To delete all resources:

```bash
sam delete
```

## Troubleshooting

### Issue: "MediaFormat webm is not supported"

**Solution:** Convert audio to MP3 or WAV before uploading, or add FFmpeg layer to Lambda.

### Issue: "Access Denied" when accessing S3

**Solution:** Check Lambda execution role has proper S3 permissions.

### Issue: Transcription takes too long

**Solution:** AWS Transcribe typically processes audio at 2x speed (10 min audio = 5 min processing). This is normal.

### Issue: CORS errors in browser

**Solution:** Ensure API Gateway CORS is properly configured and Lambda returns CORS headers.
