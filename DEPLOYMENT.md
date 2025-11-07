# Deployment Guide - Diabetes Management Platform

This guide will help you deploy the complete AWS-powered diabetes management platform.

## Overview

The platform consists of:
- **Frontend**: React + TypeScript app (runs locally or on any static hosting)
- **Backend**: AWS Lambda + API Gateway for audio processing
- **Storage**: AWS S3 for audio files and transcriptions
- **Transcription**: AWS Transcribe Medical for medical-grade speech-to-text

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **AWS SAM CLI** installed
4. **Node.js 18+** and npm
5. **Python 3.11+** (for Lambda function)

## Step 1: Deploy AWS Infrastructure

### 1.1 Install AWS SAM CLI

```bash
# macOS
brew install aws-sam-cli

# Or using pip
pip install aws-sam-cli
```

### 1.2 Configure AWS Credentials

```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter your default region (e.g., us-east-1)
# Enter default output format (json)
```

### 1.3 Deploy Lambda Function

```bash
cd aws-lambda

# Build the SAM application
sam build

# Deploy (first time - guided setup)
sam deploy --guided
```

**During guided deployment:**
- Stack Name: `diabetes-app-transcription`
- AWS Region: `us-east-1` (or your preferred region)
- Confirm changes before deploy: `Y`
- Allow SAM CLI IAM role creation: `Y`
- Disable rollback: `N`
- AudioTranscriptionFunction has no authorization defined, Is this okay?: `Y`
- Save arguments to configuration file: `Y`
- SAM configuration file: `samconfig.toml`
- SAM configuration environment: `default`

**Important**: Note the `ApiEndpoint` URL from the deployment output. You'll need this for the frontend.

Example output:
```
CloudFormation outputs from deployed stack
------------------------------------------------------------------------
Outputs
------------------------------------------------------------------------
Key                 ApiEndpoint
Description         API Gateway endpoint URL
Value               https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod
------------------------------------------------------------------------
```

## Step 2: Configure Frontend

### 2.1 Set Environment Variables

```bash
cd ../app  # Navigate to the React app directory

# Copy the example env file
cp .env.example .env

# Edit .env and replace with your actual API endpoint
# VITE_LAMBDA_API_URL=https://your-actual-api-id.execute-api.us-east-1.amazonaws.com/prod
```

### 2.2 Install Dependencies

```bash
npm install
```

### 2.3 Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Step 3: Test the Integration

### 3.1 Login to the App

Use the mock credentials:
- **Doctor Portal**: username: `doctor`, password: `password`
- **Patient Portal**: username: `patient1`, password: `password`

### 3.2 Test Audio Recording and Transcription

1. Navigate to **Patients** tab (in doctor portal)
2. Select any patient
3. Go to **Live Session** tab
4. Click **Start Recording** (In-Person Recording option)
5. Allow microphone access when prompted
6. Speak for a few seconds (medical conversation)
7. Click **End Recording**
8. Watch the progress indicators:
   - ✅ Uploading to AWS...
   - ✅ AWS Transcribe Medical Processing...
   - ✅ Transcription Complete

## Step 4: Verify AWS Resources

### 4.1 Check S3 Buckets

```bash
# List audio recordings bucket
aws s3 ls diabetes-app-audio-$(aws sts get-caller-identity --query Account --output text)/

# List transcription outputs bucket
aws s3 ls diabetes-app-transcriptions-$(aws sts get-caller-identity --query Account --output text)/
```

### 4.2 Check Transcribe Jobs

```bash
# List medical transcription jobs
aws transcribe list-medical-transcription-jobs
```

### 4.3 View Lambda Logs

```bash
# Using SAM
cd aws-lambda
sam logs -n AudioTranscriptionFunction --tail

# Or using AWS CLI
aws logs tail /aws/lambda/diabetes-app-transcription-AudioTranscriptionFunction --follow
```

## Important Notes

### Audio Format Compatibility

⚠️ **WebM Format Issue**: AWS Transcribe Medical does NOT support WebM format natively. You have two options:

**Option 1: Convert in Browser (Recommended for Production)**
- Update the React app to convert WebM to MP3/WAV before uploading
- Use a library like `lamejs` or `ffmpeg.wasm`

**Option 2: Add FFmpeg to Lambda**
- Add an FFmpeg Lambda layer
- Convert the audio in Lambda before sending to Transcribe
- See: https://github.com/awslabs/aws-lambda-ffmpeg

For this hackathon demo, you may need to:
1. Record in a supported format (use `audio/wav` instead of `audio/webm` in MediaRecorder)
2. Or add format conversion

### Cost Estimates

For a hackathon demo with ~20 test recordings:
- AWS Transcribe Medical: ~$0.25 per 10-minute recording
- S3 Storage: < $0.01
- Lambda: Free tier
- API Gateway: Free tier
- **Total estimated cost**: < $5.00

### HIPAA Compliance

For production use, ensure:
1. ✅ Sign AWS BAA (Business Associate Agreement)
2. ✅ Enable S3 encryption at rest (already configured in template)
3. ✅ Enable CloudTrail logging
4. ✅ Use VPC endpoints for private connectivity
5. ✅ Implement proper access controls and audit logs

## Troubleshooting

### Issue: "MediaFormat webm is not supported"

**Solution**: Update the MediaRecorder to use WAV format:

```typescript
const mediaRecorder = new MediaRecorder(stream, {
  mimeType: 'audio/wav',
});
```

Or add format conversion in Lambda using FFmpeg.

### Issue: CORS errors when calling Lambda

**Solution**: The SAM template already includes CORS configuration. If you still see errors:
1. Check that Lambda is returning proper CORS headers
2. Verify API Gateway CORS settings in AWS Console
3. Clear browser cache and try again

### Issue: "Access Denied" when accessing S3

**Solution**:
1. Check Lambda execution role has S3 permissions
2. Verify bucket names in CloudFormation outputs
3. Check bucket policies

### Issue: Transcription takes too long

**Normal behavior**: AWS Transcribe processes audio at roughly 2x speed:
- 10-minute recording = ~5 minutes processing time
- The frontend polls every 3 seconds to check status

## Cleanup

To delete all AWS resources and avoid charges:

```bash
cd aws-lambda
sam delete
```

This will remove:
- Lambda function
- API Gateway
- S3 buckets (note: buckets with objects need to be emptied first)
- IAM roles
- CloudFormation stack

## Next Steps

### For Hackathon Demo

1. ✅ Deploy infrastructure
2. ✅ Test with 2-3 recordings
3. ✅ Prepare demo script showing:
   - Doctor portal features
   - Patient data visualization
   - Live recording and transcription
   - AI-generated summaries

### For Production

1. Add authentication (AWS Cognito)
2. Implement proper user management
3. Add audio format conversion
4. Enable speaker diarization in Transcribe
5. Integrate with AWS Bedrock for AI summaries
6. Set up CloudWatch dashboards
7. Implement backup and disaster recovery
8. Add end-to-end encryption

## Support

For issues or questions:
1. Check AWS CloudWatch logs
2. Review Lambda function logs with `sam logs`
3. Verify environment variables in `.env` file
4. Ensure all AWS permissions are correctly configured

## Architecture Diagram

```
┌─────────────┐
│   Browser   │
│  (React App)│
└──────┬──────┘
       │ Audio Blob (base64)
       ▼
┌─────────────────┐
│  API Gateway    │
│   /upload       │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐     ┌──────────────┐
│  Lambda         │────>│  S3 Bucket   │
│  Function       │     │  (Audio)     │
└──────┬──────────┘     └──────────────┘
       │
       ▼
┌─────────────────┐     ┌──────────────┐
│  AWS Transcribe │────>│  S3 Bucket   │
│  Medical        │     │ (Transcript) │
└─────────────────┘     └──────────────┘
       │
       │ Poll /status/{jobName}
       ▼
┌─────────────────┐
│   Browser       │
│  (Shows Result) │
└─────────────────┘
```

Good luck with your hackathon! 🚀
