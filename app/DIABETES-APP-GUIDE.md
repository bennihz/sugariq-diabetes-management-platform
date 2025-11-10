# SugarIQ - Diabetes Management Platform

## Quick Start

1. Navigate to the app directory:
```bash
cd app
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## Login Instructions

### Doctor View
1. Click "Doctor" on login page
2. Click "Continue"
3. You'll see a list of 5 patients

### Patient View
1. Click "Patient" on login page
2. Select a patient from dropdown (e.g., "Sarah Johnson")
3. Click "Continue"
4. You'll see your personal dashboard

## Features Overview

### Doctor Dashboard
- **Patient List**: View all patients with health metrics
- **Patient Detail** (5 tabs):
  - Overview: Demographics and key metrics
  - Health Data: Interactive charts (glucose, A1C, weight)
  - Transcriptions: Past appointment transcripts
  - AI Chat: Ask questions about patient data
  - Live Session: Simulated live appointment

### Patient Portal
- **Dashboard**: Personal health overview
- **My Health**: Detailed charts and explanations
- **Appointments**: Past visit summaries

## Mock Patients

1. **Sarah Johnson** (45) - A1C: 7.2% - Good control
2. **Michael Chen** (58) - A1C: 6.8% - Excellent
3. **Emily Rodriguez** (32) - A1C: 8.1% - Needs attention
4. **Robert Thompson** (67) - A1C: 7.5% - Fair
5. **Jennifer Park** (41) - A1C: 6.5% - Excellent

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- React Router
- Recharts
- Vite

All data is mocked - no backend required!
