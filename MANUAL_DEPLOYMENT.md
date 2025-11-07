# Manual Deployment Guide - AWS Console

Since your AWS account has IAM restrictions, we'll create everything manually through the AWS Console.

## Prerequisites

- AWS Console access
- The Lambda function code in `aws-lambda/audio-transcription/`

## Step 1: Create S3 Buckets

### 1.1 Create Audio Storage Bucket

1. Go to **S3 Console**: https://s3.console.aws.amazon.com/s3/
2. Click **Create bucket**
3. Configure:
   - **Bucket name**: `diabetes-app-audio-recordings` (must be globally unique, add a suffix if taken)
   - **Region**: `us-east-1`
   - **Block all public access**: ✅ Keep checked (we'll use CORS for browser access)
4. Scroll down to **CORS Configuration** (under Permissions tab after creation)
5. Click **Edit CORS** and paste:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
```

6. Click **Save changes**

### 1.2 Create Transcription Output Bucket

Repeat the same steps with:
- **Bucket name**: `diabetes-app-transcriptions` (add suffix if needed)
- **Region**: `us-east-1`
- **No CORS needed** for this bucket

**Write down your bucket names** - you'll need them later!

---

## Step 2: Prepare Lambda Deployment Package

We need to zip the Lambda code with dependencies.

```bash
cd /Users/benjaminhadizamani/dev/side/hackathon/hackathon-aws-challenge/aws-lambda/audio-transcription

# Install dependencies to a package directory
pip install -t ./package boto3

# Create deployment package
cd package
zip -r ../lambda_deployment.zip .

# Add your Lambda function code
cd ..
zip -g lambda_deployment.zip lambda_function.py

# Verify the zip
unzip -l lambda_deployment.zip
```

You should now have `lambda_deployment.zip` ready to upload.

---

## Step 3: Create Lambda Function (Try This First)

### 3.1 Go to Lambda Console

https://console.aws.amazon.com/lambda/

### 3.2 Create Function

1. Click **Create function**
2. Choose **Author from scratch**
3. Configure:
   - **Function name**: `AudioTranscriptionFunction`
   - **Runtime**: `Python 3.13` (or highest available)
   - **Architecture**: `x86_64`
   - **Permissions**:
     - If you CAN create roles: Choose **Create a new role with basic Lambda permissions**
     - If you CANNOT: Choose **Use an existing role** → Select any existing Lambda execution role (like `LabRole` or `WSParticipantRole`)

4. Click **Create function**

### 3.3 Upload Code

1. In the **Code** tab, click **Upload from** → **.zip file**
2. Select your `lambda_deployment.zip`
3. Click **Save**

### 3.4 Configure Function

1. **Configuration** tab → **General configuration** → **Edit**
   - **Timeout**: `15 minutes` (900 seconds)
   - **Memory**: `512 MB`
   - Click **Save**

2. **Configuration** tab → **Environment variables** → **Edit**
   - Add `S3_BUCKET_NAME` = `diabetes-app-audio-recordings` (your bucket name)
   - Add `TRANSCRIBE_OUTPUT_BUCKET` = `diabetes-app-transcriptions` (your bucket name)
   - Click **Save**

### 3.5 Add Permissions (Critical!)

**Configuration** tab → **Permissions** → Click on the **Role name**

This opens IAM console. Add these permissions:

1. Click **Add permissions** → **Attach policies**
2. Search and attach:
   - `AmazonS3FullAccess` (or create custom policy if restricted)
   - `AmazonTranscribeFullAccess`
3. Click **Attach policies**

If you can't modify IAM, ask your admin to grant:
- S3: `s3:PutObject`, `s3:GetObject` on both buckets
- Transcribe: `transcribe:StartMedicalTranscriptionJob`, `transcribe:GetMedicalTranscriptionJob`

---

## Step 4: Create API Gateway

### 4.1 Create REST API

1. Go to **API Gateway Console**: https://console.aws.amazon.com/apigateway/
2. Click **Create API**
3. Choose **REST API** (not private) → Click **Build**
4. Configure:
   - **Choose the protocol**: REST
   - **Create new API**: New API
   - **API name**: `TranscriptionAPI`
   - **Endpoint Type**: Regional
5. Click **Create API**

### 4.2 Enable CORS (Important!)

1. Click **Actions** → **Enable CORS**
2. Use defaults and click **Enable CORS and replace existing CORS headers**
3. Confirm by clicking **Yes, replace existing values**

### 4.3 Create /upload Endpoint

1. Click **Actions** → **Create Resource**
   - **Resource Name**: `upload`
   - **Resource Path**: `/upload`
   - ✅ Enable CORS
   - Click **Create Resource**

2. With `/upload` selected, click **Actions** → **Create Method** → Choose **POST**
3. Configure POST method:
   - **Integration type**: Lambda Function
   - **Use Lambda Proxy integration**: ✅ Check this!
   - **Lambda Region**: `us-east-1`
   - **Lambda Function**: `AudioTranscriptionFunction`
   - Click **Save** → **OK** (grant permission)

### 4.4 Create /status/{jobName} Endpoint

1. Click **Actions** → **Create Resource**
   - **Resource Name**: `status`
   - **Resource Path**: `/status`
   - ✅ Enable CORS
   - Click **Create Resource**

2. With `/status` selected, click **Actions** → **Create Resource**
   - **Resource Name**: `jobName`
   - **Resource Path**: `{jobName}` (with curly braces!)
   - ✅ Enable CORS
   - Click **Create Resource**

3. With `/{jobName}` selected, click **Actions** → **Create Method** → Choose **GET**
4. Configure GET method:
   - **Integration type**: Lambda Function
   - **Use Lambda Proxy integration**: ✅ Check this!
   - **Lambda Function**: `AudioTranscriptionFunction`
   - Click **Save** → **OK**

### 4.5 Create /transcript/{jobName} Endpoint

1. Click **Actions** → **Create Resource**
   - **Resource Name**: `transcript`
   - **Resource Path**: `/transcript`
   - ✅ Enable CORS
   - Click **Create Resource**

2. With `/transcript` selected, click **Actions** → **Create Resource**
   - **Resource Name**: `jobName`
   - **Resource Path**: `{jobName}` (with curly braces!)
   - ✅ Enable CORS
   - Click **Create Resource**

3. With `/{jobName}` selected, click **Actions** → **Create Method** → Choose **GET**
4. Configure:
   - **Integration type**: Lambda Function
   - **Use Lambda Proxy integration**: ✅ Check this!
   - **Lambda Function**: `AudioTranscriptionFunction`
   - Click **Save** → **OK**

### 4.6 Deploy API

1. Click **Actions** → **Deploy API**
2. Configure:
   - **Deployment stage**: [New Stage]
   - **Stage name**: `prod`
3. Click **Deploy**

### 4.7 Get Your API Endpoint

After deployment, you'll see:
- **Invoke URL**: `https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod`

**Copy this URL!** This is your API endpoint.

---

## Step 5: Configure Frontend

```bash
cd /Users/benjaminhadizamani/dev/side/hackathon/hackathon-aws-challenge/app

# Create .env file
cp .env.example .env

# Edit .env
nano .env
```

Paste your API endpoint:
```
VITE_LAMBDA_API_URL=https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod
```

Save and exit (`Ctrl+X`, `Y`, `Enter`)

---

## Step 6: Test the Integration

### 6.1 Test Lambda Function Directly

1. In Lambda Console → **Test** tab
2. Create new test event:

```json
{
  "httpMethod": "POST",
  "path": "/upload",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": "{\"audio\":\"SGVsbG8gV29ybGQ=\",\"patientName\":\"Test Patient\",\"patientId\":\"123\",\"duration\":\"10\"}"
}
```

3. Click **Test**
4. Check response - should see job name if successful

### 6.2 Test from Frontend

```bash
npm run dev
```

1. Open http://localhost:5173
2. Login as doctor (`username: doctor`, `password: password`)
3. Go to **Patients** → Select any patient → **Live Session** tab
4. Click **Start Recording** (In-Person)
5. Allow microphone access
6. Speak for a few seconds
7. Click **End Recording**
8. Watch for AWS transcription status!

---

## Troubleshooting

### Lambda Function Errors

Check CloudWatch Logs:
1. Lambda Console → **Monitor** tab → **View CloudWatch logs**
2. Click latest log stream
3. Look for errors

Common issues:
- **Missing permissions**: Add S3/Transcribe permissions to Lambda role
- **Wrong bucket names**: Check environment variables match actual bucket names
- **Timeout**: Increase Lambda timeout to 15 minutes

### API Gateway Errors

1. API Gateway Console → **Stages** → `prod` → **Logs/Tracing**
2. Enable **CloudWatch Logs** and **Detailed metrics**
3. Check logs in CloudWatch

### CORS Errors

If browser shows CORS errors:
1. API Gateway → **Actions** → **Enable CORS**
2. Make sure Lambda returns proper headers (already in code)
3. Redeploy API

### 403 Forbidden on S3

1. Check Lambda role has S3 permissions
2. Verify bucket names in environment variables
3. Check bucket region matches Lambda region

---

## Verify Everything Works

### Quick Checklist

✅ **S3 Buckets Created**
- [ ] `diabetes-app-audio-recordings`
- [ ] `diabetes-app-transcriptions`
- [ ] CORS configured on audio bucket

✅ **Lambda Function**
- [ ] Code uploaded
- [ ] Environment variables set
- [ ] Timeout = 15 minutes
- [ ] Memory = 512 MB
- [ ] Permissions for S3 and Transcribe

✅ **API Gateway**
- [ ] Three endpoints: `/upload`, `/status/{jobName}`, `/transcript/{jobName}`
- [ ] All methods use Lambda Proxy integration
- [ ] CORS enabled
- [ ] API deployed to `prod` stage

✅ **Frontend**
- [ ] `.env` file created with API URL
- [ ] App running on http://localhost:5173

---

## Expected Flow

1. **Browser** records audio → converts to base64
2. **POST** to API Gateway `/upload`
3. **Lambda** receives request → saves to S3 → starts Transcribe job
4. **Browser** polls `/status/{jobName}` every 3 seconds
5. **Transcribe** processes audio (takes ~2x real time, so 10 sec audio = 20 sec processing)
6. **When complete**, browser calls `/transcript/{jobName}`
7. **Lambda** retrieves result from S3 → returns to browser
8. **Browser** displays transcription!

---

## Cost Estimate

For hackathon demo with ~20 test recordings:
- S3 Storage: < $0.01
- Lambda: Free tier (1M requests/month free)
- API Gateway: Free tier (1M requests/month free)
- **Transcribe Medical: ~$0.25 per 10-minute recording**

**Total: ~$5.00 for entire hackathon**

---

## If You Get Stuck

1. Check CloudWatch Logs (Lambda and API Gateway)
2. Test Lambda function directly with test events
3. Verify all permissions are set
4. Make sure bucket names match everywhere
5. Check browser console for errors

Good luck! 🚀
