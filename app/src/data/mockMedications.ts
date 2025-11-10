import type { Medication } from '../types';

export const mockMedications: Medication[] = [
  // P2001 - Ava Müller (T2, poor control)
  {
    id: 'M001',
    name: 'Metformin',
    dosage: '1000mg',
    frequency: 'Twice daily',
    startDate: '2020-06-08',
    prescribedBy: 'Dr. Afsoon',
    instructions: 'Take with meals',
    status: 'active',
  },
  {
    id: 'M002',
    name: 'Glipizide',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2022-03-15',
    prescribedBy: 'Dr. Afsoon',
    instructions: 'Take 30 minutes before breakfast',
    status: 'active',
  },

  // P2002 - Rami Al-Masri (T2, long-term)
  {
    id: 'M003',
    name: 'Metformin',
    dosage: '850mg',
    frequency: 'Twice daily',
    startDate: '2005-06-05',
    prescribedBy: 'Dr. Johnson',
    instructions: 'Take with meals',
    status: 'active',
  },
  {
    id: 'M004',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily',
    startDate: '2010-01-10',
    prescribedBy: 'Dr. Johnson',
    instructions: 'Take at bedtime',
    status: 'active',
  },

  // P2004 - Riya Sharma (T2, needs improvement)
  {
    id: 'M005',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: '2019-08-13',
    prescribedBy: 'Dr. Williams',
    instructions: 'Take with meals',
    status: 'active',
  },
  {
    id: 'M006',
    name: 'Sitagliptin',
    dosage: '100mg',
    frequency: 'Once daily',
    startDate: '2023-02-01',
    prescribedBy: 'Dr. Williams',
    instructions: 'Can be taken with or without food',
    status: 'active',
  },
  {
    id: 'M007',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2020-05-20',
    prescribedBy: 'Dr. Williams',
    instructions: 'For blood pressure control',
    status: 'active',
  },

  // P2005 - Isabella Gonzalez (T2, moderate control)
  {
    id: 'M008',
    name: 'Metformin',
    dosage: '750mg',
    frequency: 'Twice daily',
    startDate: '2022-10-19',
    prescribedBy: 'Dr. Martinez',
    instructions: 'Take with meals',
    status: 'active',
  },

  // P2007 - Emma Müller (T2, recently diagnosed)
  {
    id: 'M009',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: '2025-06-01',
    prescribedBy: 'Dr. Brown',
    instructions: 'Take with meals, may increase dosage after 2 weeks',
    status: 'active',
  },

  // P2008 - Amelia Taylor (T2, good control)
  {
    id: 'M010',
    name: 'Metformin',
    dosage: '1000mg',
    frequency: 'Twice daily',
    startDate: '2014-06-22',
    prescribedBy: 'Dr. Davis',
    instructions: 'Take with meals',
    status: 'active',
  },
  {
    id: 'M011',
    name: 'Empagliflozin',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2020-09-10',
    prescribedBy: 'Dr. Davis',
    instructions: 'Take in the morning',
    status: 'active',
  },

  // P2009 - Vivaan Khan (T1, critical - should have insulin)
  {
    id: 'M012',
    name: 'Insulin Glargine (Lantus)',
    dosage: '20 units',
    frequency: 'Once daily',
    startDate: '2024-10-01',
    prescribedBy: 'Dr. Wilson',
    instructions: 'Inject at bedtime',
    status: 'active',
  },
  {
    id: 'M013',
    name: 'Insulin Lispro (Humalog)',
    dosage: 'Variable',
    frequency: 'Before meals',
    startDate: '2024-10-01',
    prescribedBy: 'Dr. Wilson',
    instructions: 'Adjust dose based on carb intake and blood glucose',
    status: 'active',
  },

  // P2010 - Ava Schneider (T2, good control)
  {
    id: 'M014',
    name: 'Metformin',
    dosage: '850mg',
    frequency: 'Twice daily',
    startDate: '2019-05-11',
    prescribedBy: 'Dr. Anderson',
    instructions: 'Take with meals',
    status: 'active',
  },

  // P2011 - Thabo Okeke (T2, complications)
  {
    id: 'M015',
    name: 'Insulin Glargine',
    dosage: '30 units',
    frequency: 'Once daily',
    startDate: '2015-03-20',
    prescribedBy: 'Dr. Thompson',
    instructions: 'Inject at bedtime',
    status: 'active',
  },
  {
    id: 'M016',
    name: 'Metformin',
    dosage: '1000mg',
    frequency: 'Twice daily',
    startDate: '2000-07-30',
    prescribedBy: 'Dr. Thompson',
    instructions: 'Take with meals',
    status: 'active',
  },
  {
    id: 'M017',
    name: 'Lisinopril',
    dosage: '20mg',
    frequency: 'Once daily',
    startDate: '2010-04-15',
    prescribedBy: 'Dr. Thompson',
    instructions: 'For kidney protection',
    status: 'active',
  },

  // P2012 - Isabella Lopez (T2, good control)
  {
    id: 'M018',
    name: 'Metformin',
    dosage: '850mg',
    frequency: 'Twice daily',
    startDate: '2016-09-02',
    prescribedBy: 'Dr. Garcia',
    instructions: 'Take with meals',
    status: 'active',
  },
  {
    id: 'M019',
    name: 'Ramipril',
    dosage: '5mg',
    frequency: 'Once daily',
    startDate: '2018-02-10',
    prescribedBy: 'Dr. Garcia',
    instructions: 'For blood pressure',
    status: 'active',
  },

  // P2013 - Thabo Diallo (T2, needs improvement)
  {
    id: 'M020',
    name: 'Metformin',
    dosage: '1000mg',
    frequency: 'Twice daily',
    startDate: '2024-08-23',
    prescribedBy: 'Dr. Lee',
    instructions: 'Take with meals',
    status: 'active',
  },

  // P2014 - Mateo Gonzalez Jr (T2, complications)
  {
    id: 'M021',
    name: 'Metformin',
    dosage: '850mg',
    frequency: 'Twice daily',
    startDate: '2025-05-14',
    prescribedBy: 'Dr. Rodriguez',
    instructions: 'Take with meals',
    status: 'active',
  },
  {
    id: 'M022',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2025-05-14',
    prescribedBy: 'Dr. Rodriguez',
    instructions: 'For heart failure and blood pressure',
    status: 'active',
  },

  // P2015 - Rami Farah (T2, recently diagnosed)
  {
    id: 'M023',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: '2025-09-23',
    prescribedBy: 'Dr. Ahmed',
    instructions: 'Take with meals',
    status: 'active',
  },

  // P2016 - Hassan Saleh (T1, poor control)
  {
    id: 'M024',
    name: 'Insulin Glargine',
    dosage: '25 units',
    frequency: 'Once daily',
    startDate: '2020-09-14',
    prescribedBy: 'Dr. Hassan',
    instructions: 'Inject at bedtime',
    status: 'active',
  },
  {
    id: 'M025',
    name: 'Insulin Aspart (NovoLog)',
    dosage: 'Variable',
    frequency: 'Before meals',
    startDate: '2020-09-14',
    prescribedBy: 'Dr. Hassan',
    instructions: 'Adjust based on carb counting',
    status: 'active',
  },
  {
    id: 'M026',
    name: 'Lisinopril',
    dosage: '5mg',
    frequency: 'Once daily',
    startDate: '2023-06-01',
    prescribedBy: 'Dr. Hassan',
    instructions: 'For blood pressure',
    status: 'active',
  },

  // P2017 - Li Wang (T2, recently diagnosed)
  {
    id: 'M027',
    name: 'Metformin',
    dosage: '750mg',
    frequency: 'Twice daily',
    startDate: '2025-09-19',
    prescribedBy: 'Dr. Chen',
    instructions: 'Take with meals',
    status: 'active',
  },
  {
    id: 'M028',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2025-09-19',
    prescribedBy: 'Dr. Chen',
    instructions: 'For kidney protection and blood pressure',
    status: 'active',
  },

  // P2018 - Lerato Mensah (T2, needs improvement)
  {
    id: 'M029',
    name: 'Metformin',
    dosage: '1000mg',
    frequency: 'Twice daily',
    startDate: '2021-10-06',
    prescribedBy: 'Dr. Okafor',
    instructions: 'Take with meals',
    status: 'active',
  },
  {
    id: 'M030',
    name: 'Aspirin',
    dosage: '81mg',
    frequency: 'Once daily',
    startDate: '2022-01-15',
    prescribedBy: 'Dr. Okafor',
    instructions: 'For stroke prevention',
    status: 'active',
  },

  // P2019 - Riya Iyer (T2, good control)
  {
    id: 'M031',
    name: 'Metformin',
    dosage: '850mg',
    frequency: 'Twice daily',
    startDate: '2012-09-02',
    prescribedBy: 'Dr. Patel',
    instructions: 'Take with meals',
    status: 'active',
  },
  {
    id: 'M032',
    name: 'Sitagliptin',
    dosage: '100mg',
    frequency: 'Once daily',
    startDate: '2018-04-10',
    prescribedBy: 'Dr. Patel',
    instructions: 'Can be taken with or without food',
    status: 'active',
  },

  // P2020 - Tobias Lettenmeier (Demo patient)
  {
    id: 'M033',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: '2025-11-08',
    prescribedBy: 'Dr. Afsoon',
    instructions: 'Take with meals',
    status: 'active',
  },
  {
    id: 'M034',
    name: 'Atorvastatin',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2020-01-20',
    prescribedBy: 'Dr. Afsoon',
    instructions: 'Take at bedtime for cholesterol management',
    status: 'active',
  },
  {
    id: 'M035',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2021-06-10',
    prescribedBy: 'Dr. Afsoon',
    instructions: 'For cardiovascular protection, take in the morning',
    status: 'active',
  },
];

// Helper function to get medications by patient ID
export const getMedicationsByPatientId = (patientId: string): Medication[] => {
  const medicationMap: Record<string, string[]> = {
    P2001: ['M001', 'M002'],
    P2002: ['M003', 'M004'],
    P2004: ['M005', 'M006', 'M007'],
    P2005: ['M008'],
    P2007: ['M009'],
    P2008: ['M010', 'M011'],
    P2009: ['M012', 'M013'],
    P2010: ['M014'],
    P2011: ['M015', 'M016', 'M017'],
    P2012: ['M018', 'M019'],
    P2013: ['M020'],
    P2014: ['M021', 'M022'],
    P2015: ['M023'],
    P2016: ['M024', 'M025', 'M026'],
    P2017: ['M027', 'M028'],
    P2018: ['M029', 'M030'],
    P2019: ['M031', 'M032'],
    P2020: ['M033', 'M034', 'M035'],
  };

  const medicationIds = medicationMap[patientId] || [];
  return mockMedications.filter(med => medicationIds.includes(med.id));
};
