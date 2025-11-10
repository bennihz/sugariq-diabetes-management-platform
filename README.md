# SugarIQ 🏥

🏆 **Winner of Healthcare Hackathon Bayern 2025 - AWS Challenge**
**1st Place** out of 32 teams | Prize: €1,500

> A comprehensive diabetes management platform connecting patients and healthcare providers for better disease monitoring and care coordination.

**Built in 48 hours** during Healthcare Hackathon Bayern (November 6-8, 2025)

## About

SugarIQ is an intelligent diabetes management system that bridges the gap between patients and doctors through real-time health monitoring, AI-powered insights, and live consultation capabilities. The platform empowers patients to track their health metrics while enabling doctors to efficiently monitor multiple patients and make data-driven decisions.

### Key Features

**For Patients:**
- 📊 Real-time health data tracking (blood glucose, A1C levels, weight, blood pressure)
- 💊 Medication compliance monitoring
- 📅 Appointment management and history
- 🤖 AI-powered health insights and recommendations
- 📈 Interactive health data visualizations
- 📄 Export health reports as PDF

**For Healthcare Providers:**
- 👥 Comprehensive patient dashboard with critical metrics
- 🚨 Alert system for patients requiring attention
- 📊 Patient health trend analysis
- 🎙️ Live consultation sessions with real-time audio transcription
- 📝 Automated appointment notes using AWS Transcribe Medical
- 📄 Bulk patient data export and reporting

### Built With AI & AWS

- **AI Chat Assistant**: Bedrock-powered conversational AI for patient support
- **Medical Transcription**: AWS Transcribe Medical for automated appointment documentation
- **Audio Processing**: Real-time audio capture and S3 storage
- **Serverless Backend**: AWS Lambda + API Gateway for scalable audio processing

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **React Router v7** - Client-side routing
- **Recharts** - Interactive data visualizations
- **Lucide React** - Modern icon library
- **jsPDF** - PDF export functionality
- **date-fns** - Date manipulation

### Backend & Infrastructure
- **AWS Lambda** (Python 3.11) - Serverless compute
- **AWS API Gateway** - RESTful API management
- **AWS S3** - Audio and file storage
- **AWS Transcribe Medical** - Medical speech-to-text
- **AWS SAM** - Infrastructure as Code
- **AWS Bedrock** - AI/LLM integration (planned)

### Data Engineering
- **Python** - Data processing and synthetic dataset generation
- **Pandas** - Data manipulation
- **BRFSS 2015 Dataset** - Real-world diabetes indicators for synthetic data generation

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
- AWS Account (for Lambda features)
- AWS CLI and SAM CLI (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/bennihz/hackathon-aws-challenge.git
   cd hackathon-aws-challenge
   ```

2. **Install dependencies**
   ```bash
   cd app
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open [http://localhost:5173](http://localhost:5173)
   - **Doctor Portal**: username `doctor`, password `password`
   - **Patient Portal**: username `patient1`, password `password`

### AWS Lambda Deployment (Optional)

For live transcription features, deploy the Lambda function:

```bash
cd aws-lambda
sam build
sam deploy --guided
```

See [aws-lambda/README.md](./aws-lambda/README.md) for detailed deployment instructions.

### Environment Configuration

For AWS integration, create `app/.env`:

```bash
# Copy example configuration
cp app/.env.example app/.env

# Add your API Gateway endpoint
VITE_LAMBDA_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod
```

## Features in Detail

### Patient Dashboard
- A1C level tracking with trend visualization
- 7-day average blood glucose monitoring
- Upcoming appointment reminders
- Personalized health status messages

### Doctor Dashboard
- Multi-patient overview with critical metrics
- A1C status indicators (Good/Fair/High)
- Patient compliance tracking
- Alert system for high-risk patients

### Live Consultation Sessions
- Real-time audio recording
- AWS Transcribe Medical integration
- Automatic appointment documentation
- Secure audio storage in S3

### AI-Powered Insights
- Conversational health assistant
- Personalized recommendations based on health data
- Medical question answering
- Treatment plan suggestions

## Data & Privacy

This prototype uses **synthetic patient data** generated from the BRFSS 2015 diabetes health indicators dataset. No real patient information is used.

For production deployment, consider:
- HIPAA compliance measures
- AWS Business Associate Agreement (BAA)
- S3 encryption at rest
- CloudTrail audit logging
- VPC endpoints for private connectivity

## Contributors

This project was built by a diverse team of engineers, doctors, and data scientists during the 48-hour hackathon:

- **Benjamin Hadizamani** ([@bennihz](https://github.com/bennihz))
  *Software Engineering*
  Full-stack development, frontend architecture, Lambda functions, AWS Infrastructure, UI/UX implementation

- **Raneem Kolakkaden** ([@RaneemK-commits](https://github.com/RaneemK-commits))
  *Software Engineering / Data Engineering*
  <!-- Raneem: Please add your contributions here -->

- **Urmi Bhattacharyya** ([@uromi06](https://github.com/uromi06))
  *Data Engineering*
  Synthetic dataset generation, data processing, BRFSS dataset integration, patient data modeling

- **Thomas Koller, PhD** ([@thomiko](https://github.com/thomiko))
  *Data Analytics / Software Engineering* 
  Medical text preprocessing (Amazon Comprehend Medical, medspaCy), multilingual support, language level adaptation (formal/informal)

- **Dr. Afsoon**
  *Medical Doctor (GP) / Data Science*
  <!-- Dr. Afsoon: Please add your contributions here -->

- **Tobias Lettenmeier**
  *AI Automation / Prototyping*
  <!-- Tobias: Please add your contributions here -->

## License

MIT License - See [LICENSE](./LICENSE) for details.

IP rights are owned by the contributors as confirmed by AWS and Medical Valley Erlangen.

## Acknowledgments

- **Healthcare Hackathon Bayern 2025** for organizing the event
- **AWS** for providing infrastructure and sponsoring the challenge
- **Medical Valley Erlangen** for supporting innovation in healthcare technology
- **BRFSS 2015** for the diabetes health indicators dataset

---

**Note:** This is a hackathon prototype built for demonstration purposes. For production use in healthcare settings, additional security hardening, compliance measures, and testing would be required.
