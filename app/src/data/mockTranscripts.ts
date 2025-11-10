import type { AppointmentTranscript, TranscriptMessage } from '../types';

const createTranscript = (
  id: string,
  patientId: string,
  date: string,
  duration: number,
  summary: string,
  messages: Array<{ speaker: 'doctor' | 'patient'; message: string; minutesOffset: number }>
): AppointmentTranscript => {
  const baseTime = new Date(date + 'T09:00:00');

  const fullTranscript: TranscriptMessage[] = messages.map(msg => {
    const timestamp = new Date(baseTime.getTime() + msg.minutesOffset * 60000);
    return {
      timestamp: timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      speaker: msg.speaker,
      message: msg.message,
    };
  });

  return {
    id,
    patientId,
    date,
    duration,
    summary,
    fullTranscript,
  };
};

export const mockTranscripts: AppointmentTranscript[] = [
  // P2001 - Ava Müller (T2, poor control, A1C 8.21%)
  createTranscript(
    't-P2001-1',
    'P2001',
    '2025-06-08',
    28,
    'Follow-up for Type 2 Diabetes. A1C elevated at 8.21%, indicating suboptimal control. Patient reports challenges with medication adherence. Discussed smoking cessation and dietary modifications. Complications include diabetic retinopathy and neuropathy requiring close monitoring.',
    [
      { speaker: 'doctor', message: 'Good morning, Ava. How have you been managing since our last visit?', minutesOffset: 0 },
      { speaker: 'patient', message: 'Honestly, not great. I\'ve been having trouble remembering to take my Metformin regularly.', minutesOffset: 0.5 },
      { speaker: 'doctor', message: 'I see. That could explain why your A1C has increased to 8.21%. Let\'s talk about strategies to help you remember your medication.', minutesOffset: 1.5 },
      { speaker: 'patient', message: 'I know I need to do better. Work has been really stressful.', minutesOffset: 2.5 },
      { speaker: 'doctor', message: 'I understand. Have you considered setting phone reminders or using a pill organizer?', minutesOffset: 3 },
      { speaker: 'patient', message: 'I haven\'t tried that. I could give it a shot.', minutesOffset: 4 },
      { speaker: 'doctor', message: 'Good. Now, I also want to discuss your smoking. We\'ve talked about this before, but quitting would significantly improve your diabetes control and help with your retinopathy.', minutesOffset: 5 },
      { speaker: 'patient', message: 'I know. It\'s been hard to quit. I\'ve cut down a bit though.', minutesOffset: 6 },
      { speaker: 'doctor', message: 'That\'s a start. I\'d like to refer you to our smoking cessation program. They have excellent success rates. Your eyesight depends on this too - the retinopathy can progress if we don\'t get your blood sugar and smoking under control.', minutesOffset: 7 },
      { speaker: 'patient', message: 'You\'re right. I don\'t want to lose my vision. What about my neuropathy? My feet have been tingling more.', minutesOffset: 8.5 },
      { speaker: 'doctor', message: 'The neuropathy is related to the elevated blood sugar. Better control will help reduce those symptoms. Make sure you\'re checking your feet daily for any cuts or sores.', minutesOffset: 9.5 },
      { speaker: 'patient', message: 'Okay, I will. What about my diet? I know I need to eat better.', minutesOffset: 11 },
      { speaker: 'doctor', message: 'Yes, reducing refined carbs and increasing vegetables would help. I\'ll have our nutritionist reach out to you. Let\'s see you back in 6 weeks to check your progress.', minutesOffset: 12 },
    ]
  ),

  // P2009 - Vivaan Khan (T1, critical A1C 9.57%, heart failure, stroke history)
  createTranscript(
    't-P2009-1',
    'P2009',
    '2025-09-29',
    35,
    'URGENT: Critical diabetes management review. A1C at 9.57% - significantly elevated. Patient with Type 1 Diabetes not currently on any medications, which is extremely concerning. History of heart failure and stroke. Immediate intervention required. Started insulin therapy and referred to endocrinologist and cardiologist.',
    [
      { speaker: 'doctor', message: 'Mr. Khan, I\'m very concerned about your test results. Your A1C is 9.57%, which is dangerously high.', minutesOffset: 0 },
      { speaker: 'patient', message: 'I\'ve been feeling very tired lately, and thirsty all the time.', minutesOffset: 1 },
      { speaker: 'doctor', message: 'Those are signs your diabetes is not controlled. I see you\'re not currently taking any diabetes medications. Can you tell me what happened?', minutesOffset: 2 },
      { speaker: 'patient', message: 'I ran out of my insulin a few months ago and never refilled it. I thought I was feeling okay without it.', minutesOffset: 3 },
      { speaker: 'patient', message: 'Also, the medications are expensive, and I wasn\'t sure I really needed them.', minutesOffset: 4 },
      { speaker: 'doctor', message: 'Mr. Khan, with Type 1 Diabetes, insulin is absolutely essential. Your body cannot produce insulin on its own. Going without it is life-threatening, especially given your history of heart failure and stroke.', minutesOffset: 5 },
      { speaker: 'patient', message: 'I didn\'t realize it was that serious. I\'m sorry.', minutesOffset: 6.5 },
      { speaker: 'doctor', message: 'Let\'s focus on getting you healthy. First, we need to restart your insulin immediately. I\'m also connecting you with our patient assistance program to help with medication costs.', minutesOffset: 7.5 },
      { speaker: 'patient', message: 'That would be really helpful. I was worried about the cost.', minutesOffset: 9 },
      { speaker: 'doctor', message: 'Your health is the priority. Given your age and cardiac history, uncontrolled diabetes puts you at high risk for another stroke or heart complications. We need to be very careful.', minutesOffset: 10 },
      { speaker: 'patient', message: 'What do I need to do?', minutesOffset: 11.5 },
      { speaker: 'doctor', message: 'I\'m starting you on a long-acting insulin called glargine once daily, and a rapid-acting insulin with meals. You\'ll need to check your blood sugar at least 4 times per day.', minutesOffset: 12 },
      { speaker: 'patient', message: 'That sounds like a lot. Can my wife help me?', minutesOffset: 14 },
      { speaker: 'doctor', message: 'Absolutely. I\'d like her to come to your next appointment so we can teach you both. I\'m also referring you to an endocrinologist for specialized diabetes care, and we need to follow up with cardiology given your heart condition.', minutesOffset: 15 },
      { speaker: 'patient', message: 'Okay. I understand this is serious now.', minutesOffset: 17 },
      { speaker: 'doctor', message: 'Good. I want to see you back in 2 weeks to check your blood sugar levels and adjust your insulin doses. Please call immediately if you experience chest pain, severe confusion, or if your blood sugar goes below 70 or above 300.', minutesOffset: 18 },
    ]
  ),

  // P2004 - Riya Sharma (T2, A1C 8.19%, retinopathy, hypertension, smoker)
  createTranscript(
    't-P2004-1',
    'P2004',
    '2025-08-13',
    25,
    'Type 2 Diabetes follow-up. A1C at 8.19%, above target. Patient has diabetic retinopathy and hypertension requiring close monitoring. Currently smoking which exacerbates complications. Discussed medication adjustment and referral to ophthalmology for retinopathy screening.',
    [
      { speaker: 'doctor', message: 'Hello Mrs. Sharma, thank you for coming in today. Let\'s discuss your recent lab results.', minutesOffset: 0 },
      { speaker: 'patient', message: 'Hello Doctor. I know my blood sugar hasn\'t been great.', minutesOffset: 0.5 },
      { speaker: 'doctor', message: 'Your A1C is 8.19%. Our target is below 7%, so we need to make some adjustments. How has your sitagliptin been working for you?', minutesOffset: 1.5 },
      { speaker: 'patient', message: 'I take it every day, but I still see high numbers on my glucose meter.', minutesOffset: 2.5 },
      { speaker: 'doctor', message: 'I think we need to add another medication. I\'d like to start you on Metformin as well. It works differently than sitagliptin and should help bring your numbers down.', minutesOffset: 3.5 },
      { speaker: 'patient', message: 'More medication? I\'m already taking so many pills for my blood pressure.', minutesOffset: 5 },
      { speaker: 'doctor', message: 'I understand it feels like a lot. But controlling your diabetes is crucial, especially because you already have some retinopathy. How was your eye exam with the ophthalmologist?', minutesOffset: 6 },
      { speaker: 'patient', message: 'They said my eyes show some damage but it\'s not too bad yet. They want to monitor it closely.', minutesOffset: 7.5 },
      { speaker: 'doctor', message: 'Exactly. And the best way to prevent it from getting worse is to control your blood sugar and stop smoking. The smoking makes everything worse - your diabetes, your blood pressure, and especially your eyes.', minutesOffset: 8.5 },
      { speaker: 'patient', message: 'I know, I know. Everyone keeps telling me to quit. It\'s just so hard.', minutesOffset: 10 },
      { speaker: 'doctor', message: 'Would you be willing to try nicotine patches or gum? We can prescribe those to help with the cravings.', minutesOffset: 11 },
      { speaker: 'patient', message: 'Maybe. I\'ll think about it.', minutesOffset: 12 },
      { speaker: 'doctor', message: 'Please do. Your vision is at stake here. Let\'s also check your blood pressure today - how has that been?', minutesOffset: 13 },
      { speaker: 'patient', message: 'It\'s been okay, I think. Sometimes I feel a bit dizzy.', minutesOffset: 14 },
      { speaker: 'doctor', message: 'Let me check it now. [pause] It\'s 157/96, which is too high. We may need to adjust your blood pressure medication too. I want you back in 4 weeks to see how the Metformin is working.', minutesOffset: 15 },
    ]
  ),

  // P2016 - Hassan Saleh (T1, poor control, A1C 8.5%, hypertension)
  createTranscript(
    't-P2016-1',
    'P2016',
    '2025-09-14',
    30,
    'Type 1 Diabetes management review. A1C at 8.5%, above target. Patient struggling with insulin management and carbohydrate counting. Also managing hypertension. Discussed continuous glucose monitoring and insulin pump evaluation. Medication compliance needs improvement.',
    [
      { speaker: 'doctor', message: 'Good afternoon, Hassan. How have you been managing your insulin doses?', minutesOffset: 0 },
      { speaker: 'patient', message: 'It\'s been tough. I keep having high readings in the afternoon, but then sometimes I go low at night.', minutesOffset: 0.5 },
      { speaker: 'doctor', message: 'That sounds frustrating. Your A1C is 8.5%, which tells me we need to fine-tune your regimen. Walk me through your typical day - when do you take your insulin?', minutesOffset: 2 },
      { speaker: 'patient', message: 'I take my long-acting insulin in the morning, and then I\'m supposed to take the fast-acting before meals, but I sometimes forget, especially at lunch when I\'m at work.', minutesOffset: 3 },
      { speaker: 'doctor', message: 'Okay, that\'s likely contributing to the high afternoon readings. Have you thought about using a continuous glucose monitor? It would alert you when your sugar is going high or low.', minutesOffset: 5 },
      { speaker: 'patient', message: 'I\'ve heard about those. Would my insurance cover it?', minutesOffset: 6.5 },
      { speaker: 'doctor', message: 'Let me check with our office staff, but most insurances do cover CGMs for Type 1 patients. It could really help you see patterns and prevent those nighttime lows that worry you.', minutesOffset: 7.5 },
      { speaker: 'patient', message: 'That would give me peace of mind. What about my blood pressure? I know it was high last time.', minutesOffset: 9 },
      { speaker: 'doctor', message: 'Yes, hypertension in someone with diabetes needs close attention. Are you taking your blood pressure medication consistently?', minutesOffset: 10 },
      { speaker: 'patient', message: 'Honestly, no. I sometimes forget that one too. I have a lot going on.', minutesOffset: 11 },
      { speaker: 'doctor', message: 'I understand you\'re busy, but Hassan, you\'re only 34. We need to prevent complications now while you\'re young. Missing medications puts you at risk for kidney damage, heart disease, and vision problems.', minutesOffset: 12 },
      { speaker: 'patient', message: 'You\'re right. I need to be better about this.', minutesOffset: 14 },
      { speaker: 'doctor', message: 'Let\'s set up a medication schedule together and explore that CGM. I also want you to see our diabetes educator to review carbohydrate counting. Sound good?', minutesOffset: 15 },
      { speaker: 'patient', message: 'Yes, I need the help. When should I come back?', minutesOffset: 16.5 },
      { speaker: 'doctor', message: 'Let\'s do 4 weeks. By then you should have the CGM and we can see how your patterns look. We might even consider an insulin pump if the CGM shows it would help.', minutesOffset: 17 },
    ]
  ),

  // P2002 - Rami Al-Masri (T2, 20 years since diagnosis, A1C 7.64%, neuropathy)
  createTranscript(
    't-P2002-1',
    'P2002',
    '2025-06-05',
    22,
    'Long-term Type 2 Diabetes follow-up. Patient with 20 years since diagnosis showing good overall control with A1C at 7.64%. Managing neuropathy symptoms. Medication adherence is excellent. Discussed foot care and neuropathy management.',
    [
      { speaker: 'doctor', message: 'Mr. Al-Masri, it\'s good to see you. How have you been feeling?', minutesOffset: 0 },
      { speaker: 'patient', message: 'Generally well, doctor. My feet still have that tingling sensation we discussed, but it\'s manageable.', minutesOffset: 0.5 },
      { speaker: 'doctor', message: 'The neuropathy is something we need to keep monitoring. Are you checking your feet every day like I asked?', minutesOffset: 1.5 },
      { speaker: 'patient', message: 'Yes, every morning and evening. My wife helps me check the bottoms of my feet that I can\'t see well.', minutesOffset: 2.5 },
      { speaker: 'doctor', message: 'Excellent. That\'s very important. Your A1C is 7.64% which is quite good considering you\'ve had diabetes for 20 years. You\'re doing a wonderful job with your Metformin.', minutesOffset: 3.5 },
      { speaker: 'patient', message: 'Thank you. I never miss a dose. I take it with breakfast and dinner, just like you said.', minutesOffset: 5 },
      { speaker: 'doctor', message: 'Your dedication shows in your results. How is your Mediterranean diet working for you?', minutesOffset: 6 },
      { speaker: 'patient', message: 'Very well. Lots of vegetables, fish, olive oil. My wife cooks traditional foods but we\'ve adapted them to be healthier.', minutesOffset: 7 },
      { speaker: 'doctor', message: 'That\'s perfect. And you\'re staying active with your walking?', minutesOffset: 8.5 },
      { speaker: 'patient', message: 'Yes, I walk for 30 minutes every morning. It helps with my glucose and I feel better overall.', minutesOffset: 9 },
      { speaker: 'doctor', message: 'You\'re doing everything right. The only concern is your triglycerides are a bit high at 256. Let\'s add fish oil to your regimen and watch your carbohydrate portions a bit more.', minutesOffset: 10 },
      { speaker: 'patient', message: 'I can do that. Anything else I should know?', minutesOffset: 11.5 },
      { speaker: 'doctor', message: 'Just keep doing what you\'re doing. With your age and how long you\'ve had diabetes, you\'re a model patient. Let\'s see you again in 3 months.', minutesOffset: 12 },
    ]
  ),

  // P2019 - Riya Iyer (T2, A1C 6.54%, but low medication compliance and lifestyle issues)
  createTranscript(
    't-P2019-1',
    'P2019',
    '2025-09-02',
    27,
    'Type 2 Diabetes review. A1C at 6.54% showing good control, however medication compliance is concerning at 68%. Patient reports neuropathy symptoms and admits to heavy alcohol use. Discussed alcohol reduction and its impact on diabetes and neuropathy. Emphasized medication adherence.',
    [
      { speaker: 'doctor', message: 'Hello Riya, let\'s talk about your diabetes management. Your A1C is actually quite good at 6.54%.', minutesOffset: 0 },
      { speaker: 'patient', message: 'That\'s good news! So I\'m doing okay?', minutesOffset: 0.5 },
      { speaker: 'doctor', message: 'The A1C looks good, but I\'m concerned about your medication compliance. You\'re only taking your medications about 68% of the time. Why is that?', minutesOffset: 1.5 },
      { speaker: 'patient', message: 'I don\'t know, I just forget sometimes. Especially on weekends when my schedule is different.', minutesOffset: 3 },
      { speaker: 'doctor', message: 'I see. And I noticed in your chart you reported heavy alcohol use. How much are you drinking?', minutesOffset: 4 },
      { speaker: 'patient', message: 'Um, maybe 3-4 drinks most nights after work. Sometimes more on weekends.', minutesOffset: 5 },
      { speaker: 'doctor', message: 'Riya, that\'s quite a lot. Alcohol can interfere with your diabetes medications and affect your blood sugar. It can also make your neuropathy worse.', minutesOffset: 6 },
      { speaker: 'patient', message: 'I didn\'t know it could make the tingling worse. It\'s been really bothering me lately.', minutesOffset: 7.5 },
      { speaker: 'doctor', message: 'Yes, alcohol is toxic to nerves. Combined with diabetes, it accelerates nerve damage. You\'re only 35 - we need to prevent serious complications now while we can.', minutesOffset: 8.5 },
      { speaker: 'patient', message: 'I drink because I\'m stressed from work. It helps me relax.', minutesOffset: 10 },
      { speaker: 'doctor', message: 'I understand stress is real, but there are healthier ways to manage it. Have you considered counseling or other stress management techniques? We have resources that can help.', minutesOffset: 11 },
      { speaker: 'patient', message: 'Maybe. I\'ll think about it.', minutesOffset: 12.5 },
      { speaker: 'doctor', message: 'Please do. Your family history of diabetes means you need to be extra careful. Also, you mentioned low medication compliance - could the alcohol be affecting your memory about taking medications?', minutesOffset: 13 },
      { speaker: 'patient', message: 'Probably. I don\'t remember much when I\'ve been drinking.', minutesOffset: 15 },
      { speaker: 'doctor', message: 'Let\'s work on this together. I\'d like you to keep a log of your drinking and medications for the next month. And I want to connect you with our substance use counselor. Can you commit to trying?', minutesOffset: 16 },
      { speaker: 'patient', message: 'Yes, I want to feel better. The neuropathy is really bothering me.', minutesOffset: 17.5 },
      { speaker: 'doctor', message: 'Good. Reducing alcohol and taking your medications consistently will help with that. Let\'s meet again in 4 weeks to see your progress.', minutesOffset: 18 },
    ]
  ),

  // P2012 - Isabella Lopez (T2, A1C 7.41%, retinopathy, hypertension, low BMI needs assessment)
  createTranscript(
    't-P2012-1',
    'P2012',
    '2025-09-02',
    24,
    'Type 2 Diabetes follow-up. A1C at 7.41%, approaching target. Patient managing diabetic retinopathy and hypertension well. Notable concern: BMI of 18.4 indicates underweight status requiring nutritional assessment. Medication compliance is excellent at 92%. Discussed importance of adequate nutrition in diabetes management.',
    [
      { speaker: 'doctor', message: 'Good morning, Isabella. Your A1C has improved to 7.41%. That\'s great progress!', minutesOffset: 0 },
      { speaker: 'patient', message: 'Thank you! I\'ve been really careful with my diet and exercise.', minutesOffset: 0.5 },
      { speaker: 'doctor', message: 'I can see that. Your Metformin compliance is excellent. However, I am concerned about your weight. You\'ve lost more weight - you\'re now at 106 pounds for your height.', minutesOffset: 1.5 },
      { speaker: 'patient', message: 'I thought losing weight was good for diabetes?', minutesOffset: 3 },
      { speaker: 'doctor', message: 'It is when someone is overweight, but your BMI is 18.4, which is underweight. Are you eating enough? Tell me about your typical meals.', minutesOffset: 4 },
      { speaker: 'patient', message: 'I have small meals. I\'m very careful about carbs because I don\'t want my blood sugar to go up.', minutesOffset: 5.5 },
      { speaker: 'doctor', message: 'I think you might be restricting too much. With diabetes, we need balance - not eliminating carbs entirely. You need energy and nutrients.', minutesOffset: 6.5 },
      { speaker: 'patient', message: 'But every time I eat carbs, my blood sugar goes up and I panic.', minutesOffset: 8 },
      { speaker: 'doctor', message: 'I understand that fear, but being underweight can actually make diabetes harder to control long-term. It can also affect your immune system and bone health. I\'d like to refer you to a dietitian.', minutesOffset: 9 },
      { speaker: 'patient', message: 'Okay, if you think it\'s important.', minutesOffset: 11 },
      { speaker: 'doctor', message: 'It is. They can teach you how to eat appropriately portioned carbs that won\'t spike your sugar but will maintain your weight. How is your retinopathy doing?', minutesOffset: 11.5 },
      { speaker: 'patient', message: 'The eye doctor said it\'s stable for now. I go back in 6 months.', minutesOffset: 13 },
      { speaker: 'doctor', message: 'Good. And your blood pressure?', minutesOffset: 13.5 },
      { speaker: 'patient', message: 'It\'s been okay. I take my medication every day.', minutesOffset: 14 },
      { speaker: 'doctor', message: 'Excellent. You\'re doing well overall, but please work with the dietitian on healthy weight gain. I want to see you back in 2 months to check your weight progress.', minutesOffset: 15 },
    ]
  ),

  // P2020 - Tobias (Demo patient - T2, excellent control, A1C 6.8%)
  createTranscript(
    't-P2020-1',
    'P2020',
    '2025-03-15',
    45,
    'Annual comprehensive diabetes review. Patient demonstrates excellent disease management with A1C at 6.8%, well below target. Tobias continues on Metformin 1000mg twice daily with excellent adherence (95% compliance). Reports regular exercise routine and mindful eating habits. Family history of diabetes discussed - father diagnosed at age 55. Blood pressure well-controlled on Lisinopril. Cholesterol managed with Atorvastatin. No diabetic complications detected. Patient is a model for successful Type 2 diabetes management.',
    [
      { speaker: 'doctor', message: 'Good morning, Tobias! Great to see you for your annual review. How have you been feeling?', minutesOffset: 0 },
      { speaker: 'patient', message: 'Morning, Doctor! I\'ve been feeling really good actually. Energy levels are up, and I\'ve been sticking to my routine.', minutesOffset: 1 },
      { speaker: 'doctor', message: 'That\'s wonderful to hear. Let\'s look at your numbers - your A1C is 6.8%, which is excellent control. That\'s right where we want you to be.', minutesOffset: 2 },
      { speaker: 'patient', message: 'That\'s great news! I\'ve been pretty disciplined with my diet and exercise.', minutesOffset: 3 },
      { speaker: 'doctor', message: 'It shows! Tell me about your exercise routine. What are you doing?', minutesOffset: 3.5 },
      { speaker: 'patient', message: 'I\'m doing a mix - running three times a week, about 5K each time, and strength training twice a week. Plus, I walk during my lunch breaks at work.', minutesOffset: 4 },
      { speaker: 'doctor', message: 'That\'s fantastic. You\'re exceeding the recommended 150 minutes of moderate activity per week. And your diet?', minutesOffset: 5.5 },
      { speaker: 'patient', message: 'I\'ve really embraced the low-carb Mediterranean approach. Lots of vegetables, lean proteins, healthy fats. I meal prep on Sundays so I\'m not tempted by fast food during the week.', minutesOffset: 6 },
      { speaker: 'doctor', message: 'Excellent strategy. Your medication compliance is also impressive at 95%. Are you having any side effects from the Metformin?', minutesOffset: 8 },
      { speaker: 'patient', message: 'Not really. I had some stomach upset in the beginning, but taking it with meals like you suggested solved that completely.', minutesOffset: 9 },
      { speaker: 'doctor', message: 'Good. How about your blood sugar monitoring? Are you checking regularly?', minutesOffset: 10 },
      { speaker: 'patient', message: 'Yes, I check fasting glucose every morning and occasionally after meals. I use an app to track everything - it helps me see patterns.', minutesOffset: 10.5 },
      { speaker: 'doctor', message: 'That\'s excellent self-management. Your fasting levels are averaging around 105, and post-meal around 145, which are both very good. Let\'s talk about your family history - your father has diabetes, correct?', minutesOffset: 12 },
      { speaker: 'patient', message: 'Yes, he was diagnosed at 55. That actually scared me into taking this seriously when I was diagnosed at 33. I didn\'t want to end up with complications like he has.', minutesOffset: 13 },
      { speaker: 'doctor', message: 'Your proactive approach is paying off. With your current control, you\'re significantly reducing your risk of complications. Speaking of which, I want to check your feet and eyes today to screen for any early changes.', minutesOffset: 15 },
      { speaker: 'patient', message: 'Sure, no problem. I haven\'t noticed anything unusual.', minutesOffset: 16.5 },
      { speaker: 'doctor', message: 'Everything looks great - no signs of neuropathy in your feet, good sensation and circulation. Your eye exam from last month also came back normal. Your cholesterol and blood pressure are well-managed with the Atorvastatin and Lisinopril.', minutesOffset: 18 },
      { speaker: 'patient', message: 'That\'s a relief. So should I keep doing what I\'m doing?', minutesOffset: 20 },
      { speaker: 'doctor', message: 'Absolutely! You\'re a model patient, Tobias. The only thing I\'d suggest is to keep up with your annual eye exams and continue monitoring your blood sugar. Let\'s see you back in 3 months for a routine check-in.', minutesOffset: 21 },
      { speaker: 'patient', message: 'Sounds good. I appreciate all your support, Doctor.', minutesOffset: 23 },
      { speaker: 'doctor', message: 'You\'re doing the hard work. Keep it up!', minutesOffset: 23.5 },
    ]
  ),

  createTranscript(
    't-P2020-2',
    'P2020',
    '2025-06-15',
    30,
    'Quarterly follow-up appointment. A1C remains excellent at 6.75%, showing continued improvement. Tobias reports maintaining exercise routine despite busy work schedule. Discussed stress management techniques as work pressure has increased. All medications well-tolerated. Patient asked insightful questions about latest diabetes research and continuous glucose monitors. Encouraged to continue current management plan. No changes to medication regimen needed.',
    [
      { speaker: 'doctor', message: 'Hi Tobias, good to see you again. How have these past three months been?', minutesOffset: 0 },
      { speaker: 'patient', message: 'Pretty good overall, though work has been crazy busy. I\'ve managed to keep up with my exercise, but it\'s been tougher.', minutesOffset: 0.5 },
      { speaker: 'doctor', message: 'I appreciate your honesty. Despite the busy schedule, your A1C actually improved slightly to 6.75%. That\'s remarkable.', minutesOffset: 2 },
      { speaker: 'patient', message: 'Really? That\'s surprising! I was worried the stress might be affecting my numbers.', minutesOffset: 3 },
      { speaker: 'doctor', message: 'Your consistent habits are paying off. How are you managing the stress? That\'s important too.', minutesOffset: 4 },
      { speaker: 'patient', message: 'I\'ve started meditating for 10 minutes each morning. And I make sure to get enough sleep - at least 7 hours. It helps.', minutesOffset: 5 },
      { speaker: 'doctor', message: 'Excellent. Sleep and stress management are crucial for blood sugar control. Many people overlook that. Are you still checking your glucose regularly?', minutesOffset: 6.5 },
      { speaker: 'patient', message: 'Yes, every morning. Actually, I\'ve been reading about continuous glucose monitors. Do you think I should consider one?', minutesOffset: 7.5 },
      { speaker: 'doctor', message: 'That\'s a great question. Given your excellent control with current monitoring, a CGM isn\'t medically necessary, but some patients find them helpful for understanding how different foods affect their glucose in real-time. It\'s really a personal choice.', minutesOffset: 8.5 },
      { speaker: 'patient', message: 'I might try one just out of curiosity. I like having data to work with.', minutesOffset: 10.5 },
      { speaker: 'doctor', message: 'That fits your personality! I can write a prescription if you decide to try it. Your insurance might cover it. How are your medications going?', minutesOffset: 11 },
      { speaker: 'patient', message: 'No issues at all. I set phone reminders, so I never miss doses. The Metformin is fine, no stomach problems. The statin and blood pressure med - I don\'t even notice them.', minutesOffset: 12.5 },
      { speaker: 'doctor', message: 'Perfect. Your latest cholesterol panel looks great, and blood pressure is 118/75 - excellent. Any questions for me today?', minutesOffset: 14 },
      { speaker: 'patient', message: 'I was reading about new diabetes medications like GLP-1s. Should I be on one of those instead?', minutesOffset: 15 },
      { speaker: 'doctor', message: 'Another great question. GLP-1 medications can be very effective, especially for weight loss and cardiovascular protection. However, since you\'re already at your goal A1C on Metformin alone, and your weight is healthy, there\'s no medical reason to add or switch medications right now. If your A1C started rising or you had trouble maintaining it, we\'d definitely discuss those options.', minutesOffset: 16 },
      { speaker: 'patient', message: 'That makes sense. If it\'s not broken, don\'t fix it, right?', minutesOffset: 19 },
      { speaker: 'doctor', message: 'Exactly. You\'re doing everything right, Tobias. Keep up the great work, and I\'ll see you in another three months.', minutesOffset: 19.5 },
    ]
  ),

  createTranscript(
    't-P2020-3',
    'P2020',
    '2025-09-15',
    30,
    'Quarterly checkup showing continued diabetes management. A1C trending upward. Tobias successfully implemented continuous glucose monitor trial and found it educational. Discussed long-term diabetes management goals and importance of annual screenings.',
    [
      { speaker: 'doctor', message: 'Tobias! I heard you ran a 10K recently. Congratulations!', minutesOffset: 0 },
      { speaker: 'patient', message: 'Thanks! It was tough but amazing. Finished in under an hour - I was really proud.', minutesOffset: 0.5 },
      { speaker: 'doctor', message: 'You should be! That\'s a significant accomplishment. How did your blood sugar handle the longer run?', minutesOffset: 1.5 },
      { speaker: 'patient', message: 'That\'s actually what I wanted to talk about. I tried that continuous glucose monitor you mentioned, and it was eye-opening.', minutesOffset: 2 },
      { speaker: 'doctor', message: 'Oh? What did you learn?', minutesOffset: 3 },
      { speaker: 'patient', message: 'I noticed my glucose would drop pretty significantly after long runs - sometimes down to the 70s. I started having a small snack before running and that helped keep it more stable.', minutesOffset: 3.5 },
      { speaker: 'doctor', message: 'Perfect adjustment! That\'s exactly the kind of insight CGMs provide. You\'re using the data intelligently.', minutesOffset: 5 },
      { speaker: 'patient', message: 'I also noticed that my blood sugar spikes less with whole grain pasta compared to regular pasta. The CGM made it so visible.', minutesOffset: 7 },
      { speaker: 'doctor', message: 'Those are the kinds of personalized insights that help with long-term management. Let\'s see you back in a couple months to check your A1C.', minutesOffset: 8 },
    ]
  ),

  // P2020 - Tobias Lettenmeier - DEMO TRANSCRIPT (Most Recent)
  createTranscript(
    't-P2020-4',
    'P2020',
    '2025-11-08',
    15,
    'Lab results review appointment. HbA1c elevated to 7.2%, indicating need for better blood sugar control. Started Metformin 500mg twice daily. Discussed diet plan and daily walking regimen of at least 30 minutes. Follow-up scheduled in a few months to reassess control.',
    [
      { speaker: 'doctor', message: 'Hello Tobias, good to see you today. How have you been feeling?', minutesOffset: 0 },
      { speaker: 'patient', message: 'Pretty good, Doctor. Just here to get my lab results.', minutesOffset: 0.5 },
      { speaker: 'doctor', message: 'Yes, I reviewed your lab results — your HbA1c is 7.2%, your blood sugar needs better control.', minutesOffset: 1 },
      { speaker: 'patient', message: 'Oh, that\'s higher than I expected. What should I do?', minutesOffset: 2 },
      { speaker: 'doctor', message: 'Please take Metformin 500 mg twice daily. Follow the diet plan and try to walk at least 30 minutes every day. We\'ll recheck it in a few months.', minutesOffset: 3 },
      { speaker: 'patient', message: 'Okay doctor', minutesOffset: 5 },
    ]
  ),
];

// Helper function to get transcripts by patient ID
export const getTranscriptsByPatientId = (patientId: string): AppointmentTranscript[] => {
  return mockTranscripts.filter(transcript => transcript.patientId === patientId);
};

// Helper function to get a specific transcript
export const getTranscriptById = (id: string): AppointmentTranscript | undefined => {
  return mockTranscripts.find(transcript => transcript.id === id);
};
