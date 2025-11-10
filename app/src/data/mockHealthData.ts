import type { HealthData, GlucoseReading, A1CReading, WeightReading } from '../types';

// Generate realistic glucose readings for the past 90 days
const generateGlucoseReadings = (
  fastingAvg: number,
  postprandialAvg: number,
  variance: number = 20,
  days: number = 90
): GlucoseReading[] => {
  const readings: GlucoseReading[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Generate 3 readings per day (fasting morning, afternoon, evening)
    const times = [
      { time: '08:00', baseLine: fastingAvg },
      { time: '13:00', baseLine: postprandialAvg },
      { time: '20:00', baseLine: (fastingAvg + postprandialAvg) / 2 },
    ];

    times.forEach(({ time, baseLine }) => {
      const randomVariance = (Math.random() - 0.5) * variance;
      const value = Math.round(baseLine + randomVariance);
      readings.push({
        date: date.toISOString().split('T')[0],
        time,
        value: Math.max(70, Math.min(300, value)), // Keep within realistic bounds
      });
    });
  }

  return readings;
};

// Generate A1C readings based on actual data
const generateA1CReadings = (currentA1C: number, trend: 'improving' | 'stable' | 'worsening'): A1CReading[] => {
  const readings: A1CReading[] = [];
  const today = new Date();

  for (let i = 7; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - (i * 3));

    let value = currentA1C;
    if (trend === 'improving') {
      value = currentA1C + (i * 0.15);
    } else if (trend === 'worsening') {
      value = currentA1C - (i * 0.15);
    } else {
      value = currentA1C + (Math.random() - 0.5) * 0.2;
    }

    readings.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value * 10) / 10,
    });
  }

  return readings.reverse();
};

// Generate weight readings (converted from kg to lbs)
const generateWeightReadings = (currentWeightKg: number, trend: 'losing' | 'stable' | 'gaining'): WeightReading[] => {
  const readings: WeightReading[] = [];
  const today = new Date();
  const weeks = 26; // 6 months
  const currentWeightLbs = currentWeightKg * 2.20462;

  for (let i = weeks - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - (i * 7));

    let value = currentWeightLbs;
    if (trend === 'losing') {
      value = currentWeightLbs + (i * 0.5);
    } else if (trend === 'gaining') {
      value = currentWeightLbs - (i * 0.3);
    } else {
      value = currentWeightLbs + (Math.random() - 0.5) * 2;
    }

    readings.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value * 10) / 10,
    });
  }

  return readings.reverse();
};

export const mockHealthData: HealthData[] = [
  {
    patientId: 'P2000', // Mateo Gonzalez - Pre-diabetic
    glucoseReadings: generateGlucoseReadings(92.6, 144.6, 15),
    a1cReadings: generateA1CReadings(5.79, 'stable'),
    weightReadings: generateWeightReadings(81.0, 'stable'),
  },
  {
    patientId: 'P2001', // Ava Müller - T2, poor control
    glucoseReadings: generateGlucoseReadings(138.7, 220.0, 30),
    a1cReadings: generateA1CReadings(8.21, 'worsening'),
    weightReadings: generateWeightReadings(138.3, 'gaining'),
  },
  {
    patientId: 'P2002', // Rami Al-Masri - T2, long-term
    glucoseReadings: generateGlucoseReadings(171.9, 201.5, 25),
    a1cReadings: generateA1CReadings(7.64, 'stable'),
    weightReadings: generateWeightReadings(66.9, 'stable'),
  },
  {
    patientId: 'P2003', // Sofia Rodriguez - Pre-diabetic, healthy
    glucoseReadings: generateGlucoseReadings(92.8, 126.5, 12),
    a1cReadings: generateA1CReadings(5.25, 'stable'),
    weightReadings: generateWeightReadings(79.4, 'losing'),
  },
  {
    patientId: 'P2004', // Riya Sharma - T2, needs improvement
    glucoseReadings: generateGlucoseReadings(145.3, 160.2, 25),
    a1cReadings: generateA1CReadings(8.19, 'worsening'),
    weightReadings: generateWeightReadings(84.3, 'stable'),
  },
  {
    patientId: 'P2005', // Isabella Gonzalez - T2, moderate control
    glucoseReadings: generateGlucoseReadings(125.3, 177.3, 28),
    a1cReadings: generateA1CReadings(6.89, 'improving'),
    weightReadings: generateWeightReadings(82.5, 'stable'),
  },
  {
    patientId: 'P2006', // Lucia Garcia - Pre-diabetic
    glucoseReadings: generateGlucoseReadings(81.3, 101.3, 10),
    a1cReadings: generateA1CReadings(5.3, 'stable'),
    weightReadings: generateWeightReadings(61.0, 'stable'),
  },
  {
    patientId: 'P2007', // Emma Müller - T2, recently diagnosed
    glucoseReadings: generateGlucoseReadings(141.5, 212.0, 30),
    a1cReadings: generateA1CReadings(7.54, 'worsening'),
    weightReadings: generateWeightReadings(87.1, 'gaining'),
  },
  {
    patientId: 'P2008', // Amelia Taylor - T2, good control
    glucoseReadings: generateGlucoseReadings(122.1, 233.8, 35),
    a1cReadings: generateA1CReadings(6.7, 'improving'),
    weightReadings: generateWeightReadings(65.6, 'stable'),
  },
  {
    patientId: 'P2009', // Vivaan Khan - T1, critical
    glucoseReadings: generateGlucoseReadings(152.3, 215.3, 40),
    a1cReadings: generateA1CReadings(9.57, 'worsening'),
    weightReadings: generateWeightReadings(91.2, 'stable'),
  },
  {
    patientId: 'P2010', // Ava Schneider - T2, good control
    glucoseReadings: generateGlucoseReadings(141.7, 182.6, 25),
    a1cReadings: generateA1CReadings(6.86, 'improving'),
    weightReadings: generateWeightReadings(89.6, 'losing'),
  },
  {
    patientId: 'P2011', // Thabo Okeke - T2, complications
    glucoseReadings: generateGlucoseReadings(106.5, 173.4, 30),
    a1cReadings: generateA1CReadings(7.42, 'stable'),
    weightReadings: generateWeightReadings(78.4, 'stable'),
  },
  {
    patientId: 'P2012', // Isabella Lopez - T2, good control
    glucoseReadings: generateGlucoseReadings(121.7, 173.5, 25),
    a1cReadings: generateA1CReadings(7.41, 'improving'),
    weightReadings: generateWeightReadings(48.2, 'gaining'),
  },
  {
    patientId: 'P2013', // Thabo Diallo - T2, needs improvement
    glucoseReadings: generateGlucoseReadings(139.1, 250.1, 40),
    a1cReadings: generateA1CReadings(7.68, 'worsening'),
    weightReadings: generateWeightReadings(94.1, 'gaining'),
  },
  {
    patientId: 'P2014', // Mateo Gonzalez Jr - T2, complications
    glucoseReadings: generateGlucoseReadings(167.2, 197.5, 30),
    a1cReadings: generateA1CReadings(7.71, 'worsening'),
    weightReadings: generateWeightReadings(106.7, 'gaining'),
  },
  {
    patientId: 'P2015', // Rami Farah - T2, recently diagnosed
    glucoseReadings: generateGlucoseReadings(106.6, 212.8, 35),
    a1cReadings: generateA1CReadings(7.36, 'stable'),
    weightReadings: generateWeightReadings(52.3, 'stable'),
  },
  {
    patientId: 'P2016', // Hassan Saleh - T1, poor control
    glucoseReadings: generateGlucoseReadings(149.7, 228.8, 40),
    a1cReadings: generateA1CReadings(8.5, 'worsening'),
    weightReadings: generateWeightReadings(60.7, 'stable'),
  },
  {
    patientId: 'P2017', // Li Wang - T2, recently diagnosed
    glucoseReadings: generateGlucoseReadings(111.2, 170.8, 25),
    a1cReadings: generateA1CReadings(7.71, 'stable'),
    weightReadings: generateWeightReadings(55.0, 'losing'),
  },
  {
    patientId: 'P2018', // Lerato Mensah - T2, needs improvement
    glucoseReadings: generateGlucoseReadings(116.0, 186.1, 30),
    a1cReadings: generateA1CReadings(7.86, 'worsening'),
    weightReadings: generateWeightReadings(95.4, 'stable'),
  },
  {
    patientId: 'P2019', // Riya Iyer - T2, good control
    glucoseReadings: generateGlucoseReadings(85.5, 170.1, 30),
    a1cReadings: generateA1CReadings(6.54, 'improving'),
    weightReadings: generateWeightReadings(87.8, 'stable'),
  },
  {
    patientId: 'P2020', // Tobias Lettenmeier - T2, demo patient
    glucoseReadings: generateGlucoseReadings(105, 145, 22), // Needs better control
    a1cReadings: generateA1CReadings(7.2, 'stable'), // Current A1C 7.2%
    weightReadings: generateWeightReadings(82, 'stable'), // Maintaining healthy weight
  },
];

// Helper function to get health data by patient ID
export const getHealthDataByPatientId = (patientId: string): HealthData | undefined => {
  return mockHealthData.find(data => data.patientId === patientId);
};

// Helper function to get recent glucose readings (last N days)
export const getRecentGlucoseReadings = (patientId: string, days: number = 30): GlucoseReading[] => {
  const healthData = getHealthDataByPatientId(patientId);
  if (!healthData) return [];

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return healthData.glucoseReadings.filter(reading =>
    new Date(reading.date) >= cutoffDate
  );
};
