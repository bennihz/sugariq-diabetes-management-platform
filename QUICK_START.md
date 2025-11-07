# Quick Start Guide

## TL;DR - Get Running in 5 Minutes

### 1. Deploy AWS Backend

```bash
cd aws-lambda
sam build && sam deploy --guided
```

Note the API endpoint URL from the output (e.g., `https://abc123.execute-api.us-east-1.amazonaws.com/prod`)

### 2. Configure Frontend

```bash
cd ../app
cp .env.example .env
# Edit .env and paste your API endpoint
nano .env  # or use your preferred editor
```

### 3. Run the App

```bash
npm install
npm run dev
```

### 4. Login and Test

1. Open http://localhost:5173
2. Login as doctor: `username: doctor`, `password: password`
3. Go to Patients → Select any patient → Live Session
4. Click "In-Person Recording"
5. Allow microphone access
6. Speak for a few seconds
7. Click "End Recording"
8. Watch AWS Transcribe process your audio!

## Login Credentials

### Doctor Portal
- Username: `doctor`
- Password: `password`

### Patient Portal
- Username: `patient1` (or `patient2`, `patient3`, `patient4`, `patient5`)
- Password: `password`

## What You'll See

### Doctor Dashboard Features:
- 📊 Patient list with health metrics
- 📈 Interactive charts (glucose, A1C, weight trends)
- 📝 Appointment transcripts
- 💬 AI chat assistant
- 🎙️ Live session recording with AWS Transcribe Medical

### Patient Portal Features:
- 📊 Personal health dashboard
- 📈 Health data visualization
- 📅 Appointment history

## Architecture

```
React Frontend
    ↓
API Gateway
    ↓
Lambda Function
    ↓
S3 (Audio Storage)
    ↓
AWS Transcribe Medical
    ↓
S3 (Transcription Output)
    ↓
Frontend (Polling)
```

## Important Notes

⚠️ **WebM Format**: AWS Transcribe doesn't support WebM natively. For production, convert to WAV/MP3 in browser or Lambda.

💰 **Costs**: ~$0.25 per 10-minute recording. Hackathon demo should cost < $5 total.

🔒 **Security**: For production, sign AWS BAA and enable proper encryption/access controls.

## Need Help?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions and troubleshooting.
