# SugarIQ

**Winner of Healthcare Hackathon Bayern 2025 - AWS Challenge**
1st Place out of 32 teams | Prize: €1,500

A diabetes management platform connecting patients and healthcare providers for better disease monitoring and care coordination.

Built in 48 hours during Healthcare Hackathon Bayern (November 6-8, 2025)

## About

SugarIQ helps patients and doctors stay connected through real-time health monitoring, AI insights, and live consultation capabilities. Patients can track their health metrics while doctors efficiently monitor multiple patients and make informed decisions.

### What it does

**For Patients:**
- Track health data in real-time (blood glucose, A1C levels, weight, blood pressure)
- Monitor medication compliance
- Manage appointments and view history
- Get AI-powered health insights and recommendations
- Visualize health trends over time
- Export health reports as PDF

**For Healthcare Providers:**
- View all patients with critical metrics at a glance
- Get alerts for patients requiring attention
- Analyze patient health trends
- Conduct live consultation sessions with real-time audio transcription
- Generate automated appointment notes using AWS Transcribe Medical
- Export patient data in bulk for reporting

### AWS & AI Integration

- AI chat assistant powered by Amazon Bedrock for patient support
- AWS Transcribe Medical for automated appointment documentation
- Real-time audio capture and S3 storage
- Serverless backend with AWS Lambda + API Gateway

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for fast builds
- Tailwind CSS 4 for styling
- React Router v7
- Recharts for data visualizations
- Lucide React icons
- jsPDF for PDF exports
- date-fns for date handling

### Backend & Infrastructure
- AWS Lambda (Python 3.11)
- AWS API Gateway
- AWS S3 for audio and file storage
- AWS Transcribe Medical for speech-to-text
- AWS SAM for infrastructure as code
- AWS Bedrock for AI integration (planned)

### Data Engineering
- Python for data processing and synthetic dataset generation
- Pandas for data manipulation
- BRFSS 2015 Dataset for realistic diabetes indicators

## Project Structure

```
.
├── app/                          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── doctor/          # Doctor portal components
│   │   │   ├── patient/         # Patient portal components
│   │   │   └── shared/          # Shared UI components
│   │   ├── data/                # Mock data and type definitions
│   │   ├── contexts/            # React contexts (Auth, etc.)
│   │   └── types/               # TypeScript type definitions
│   └── public/                  # Static assets
│
├── aws-lambda/                   # AWS Lambda functions
│   ├── audio-transcription/     # Audio upload & transcription handler
│   ├── template.yaml            # AWS SAM template
│   └── README.md                # Lambda deployment guide
│
├── data/                         # Synthetic datasets & scripts
│   ├── dataset_20.py            # Patient data generation script
│   ├── diabetes_012_health_indicators_BRFSS2015.csv
│   └── patient_dataset_20.json  # Generated patient data
│
├── DEPLOYMENT.md                 # Deployment instructions
├── MANUAL_DEPLOYMENT.md          # Manual deployment guide
└── QUICK_START.md                # Quick start guide
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- AWS Account (optional, for Lambda features)
- AWS CLI and SAM CLI (if deploying to AWS)

### Running Locally

1. Clone the repository
   ```bash
   git clone https://github.com/bennihz/hackathon-aws-challenge.git
   cd hackathon-aws-challenge
   ```

2. Install dependencies
   ```bash
   cd app
   npm install
   ```

3. Start the dev server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) and log in:
   - Doctor Portal: username `doctor`, password `password`
   - Patient Portal: username `patient1`, password `password`

### Deploying Lambda (Optional)

If you want the live transcription features:

```bash
cd aws-lambda
sam build
sam deploy --guided
```

See [aws-lambda/README.md](./aws-lambda/README.md) for more details.

### Environment Setup

For AWS integration, create `app/.env`:

```bash
cp app/.env.example app/.env
# Add your API Gateway endpoint
VITE_LAMBDA_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod
```

## Key Features

### Patient Dashboard
- Track A1C levels with trend visualization
- Monitor 7-day average blood glucose
- View upcoming appointments
- Get personalized health status updates

### Doctor Dashboard
- See all patients with critical metrics
- Check A1C status (Good/Fair/High)
- Track patient compliance
- Identify high-risk patients

### Live Consultations
- Record audio in real-time
- Automatic transcription via AWS Transcribe Medical
- Generate appointment notes automatically
- Store audio securely in S3

### AI Assistant
- Chat with patients about their health
- Provide personalized recommendations
- Answer medical questions
- Suggest treatment adjustments

## Data & Privacy

This prototype uses synthetic patient data generated from the BRFSS 2015 diabetes health indicators dataset. No real patient information is used.

For production use, you'd need:
- HIPAA compliance
- AWS Business Associate Agreement (BAA)
- S3 encryption at rest
- CloudTrail audit logging
- VPC endpoints for private connectivity

## Contributors

Built by a team of engineers, doctors, and data scientists during the 48-hour hackathon:

- **Benjamin Hadizamani** ([@bennihz](https://github.com/bennihz)) - Software Engineering

  Full-stack development, frontend architecture, Lambda functions, AWS Infrastructure, UI/UX

- **Raneem Kolakkaden** ([@RaneemK-commits](https://github.com/RaneemK-commits)) - Software Engineering / Data Engineering

  <!-- Raneem: Please add your contributions here -->

- **Urmi Bhattacharyya** ([@uromi06](https://github.com/uromi06)) - Data Engineering

  Synthetic dataset generation, data processing, BRFSS dataset integration, patient data modeling

- **Thomas Koller, PhD** ([@thomiko](https://github.com/thomiko)) - Data Analytics / Software Engineering

  Medical text preprocessing (Amazon Comprehend Medical, medspaCy), multilingual support, language level adaptation

- **Dr. Afsoon** ([@Afsooneshraq](https://github.com/Afsooneshraq)) - Medical Doctor (GP) / Data Science

  <!-- Dr. Afsoon: Please add your contributions here -->

- **Tobias Lettenmeier** ([@FlintBeastwood](https://github.com/FlintBeastwood)) - AI Automation / Prototyping

  <!-- Tobias: Please add your contributions here -->

## License

MIT License - See [LICENSE](./LICENSE) for details.

IP rights are owned by the contributors as confirmed by AWS and Medical Valley Erlangen.

## Acknowledgments

- Healthcare Hackathon Bayern 2025 for organizing the event
- AWS for providing infrastructure and sponsoring the challenge
- Medical Valley Erlangen for supporting healthcare innovation
- BRFSS 2015 for the diabetes health indicators dataset

---

**Note:** This is a hackathon prototype. For production use in healthcare, you'd need additional security, compliance measures, and testing.
