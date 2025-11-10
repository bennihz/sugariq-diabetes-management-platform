import type { Appointment } from '../types';

export const mockAppointments: Appointment[] = [
  // P2000 - Mateo Gonzalez
  { id: 'A001', patientId: 'P2000', date: '2025-08-19', time: '09:00', duration: 30, status: 'completed', notes: 'Routine checkup' },
  { id: 'A002', patientId: 'P2000', date: '2025-12-15', time: '10:30', duration: 30, status: 'scheduled', notes: 'Follow-up on blood pressure' },

  // P2001 - Ava Müller
  { id: 'A003', patientId: 'P2001', date: '2025-03-08', time: '14:00', duration: 45, status: 'completed', notes: 'Diabetes management review' },
  { id: 'A004', patientId: 'P2001', date: '2025-06-08', time: '11:00', duration: 45, status: 'completed', notes: 'A1C results discussion' },
  { id: 'A005', patientId: 'P2001', date: '2025-09-08', time: '14:30', duration: 45, status: 'completed', notes: 'Medication adjustment' },
  { id: 'A006', patientId: 'P2001', date: '2025-12-08', time: '10:00', duration: 45, status: 'scheduled', notes: 'Quarterly review' },

  // P2002 - Rami Al-Masri
  { id: 'A007', patientId: 'P2002', date: '2025-03-05', time: '09:30', duration: 30, status: 'completed' },
  { id: 'A008', patientId: 'P2002', date: '2025-06-05', time: '09:30', duration: 30, status: 'completed' },
  { id: 'A009', patientId: 'P2002', date: '2025-09-05', time: '09:30', duration: 30, status: 'scheduled', notes: 'Routine quarterly checkup' },

  // P2003 - Sofia Rodriguez
  { id: 'A010', patientId: 'P2003', date: '2025-05-16', time: '15:00', duration: 30, status: 'completed' },
  { id: 'A011', patientId: 'P2003', date: '2025-11-16', time: '15:00', duration: 30, status: 'scheduled', notes: 'Semi-annual checkup' },

  // P2004 - Riya Sharma
  { id: 'A012', patientId: 'P2004', date: '2025-05-13', time: '10:00', duration: 45, status: 'completed' },
  { id: 'A013', patientId: 'P2004', date: '2025-08-13', time: '10:00', duration: 45, status: 'completed', notes: 'Retinopathy screening' },
  { id: 'A014', patientId: 'P2004', date: '2025-11-13', time: '10:00', duration: 45, status: 'scheduled', notes: 'A1C review and medication adjustment' },

  // P2005 - Isabella Gonzalez
  { id: 'A015', patientId: 'P2005', date: '2025-07-19', time: '13:00', duration: 30, status: 'completed' },
  { id: 'A016', patientId: 'P2005', date: '2025-10-19', time: '13:00', duration: 30, status: 'completed' },
  { id: 'A017', patientId: 'P2005', date: '2026-01-19', time: '13:00', duration: 30, status: 'scheduled' },

  // P2006 - Lucia Garcia
  { id: 'A018', patientId: 'P2006', date: '2025-05-16', time: '11:30', duration: 30, status: 'completed' },
  { id: 'A019', patientId: 'P2006', date: '2025-11-16', time: '11:30', duration: 30, status: 'scheduled' },

  // P2007 - Emma Müller
  { id: 'A020', patientId: 'P2007', date: '2025-06-01', time: '09:00', duration: 60, status: 'completed', notes: 'New diagnosis consultation' },
  { id: 'A021', patientId: 'P2007', date: '2025-07-01', time: '09:00', duration: 45, status: 'completed', notes: 'Follow-up after starting Metformin' },
  { id: 'A022', patientId: 'P2007', date: '2025-09-01', time: '09:00', duration: 45, status: 'scheduled', notes: 'Three-month review' },

  // P2008 - Amelia Taylor
  { id: 'A023', patientId: 'P2008', date: '2025-03-22', time: '14:00', duration: 30, status: 'completed' },
  { id: 'A024', patientId: 'P2008', date: '2025-06-22', time: '14:00', duration: 30, status: 'completed' },
  { id: 'A025', patientId: 'P2008', date: '2025-09-22', time: '14:00', duration: 30, status: 'scheduled' },

  // P2009 - Vivaan Khan (Critical patient - more frequent appointments)
  { id: 'A026', patientId: 'P2009', date: '2025-07-29', time: '10:00', duration: 60, status: 'completed', notes: 'Critical A1C review' },
  { id: 'A027', patientId: 'P2009', date: '2025-08-29', time: '10:00', duration: 45, status: 'completed', notes: 'Insulin initiation' },
  { id: 'A028', patientId: 'P2009', date: '2025-09-29', time: '10:00', duration: 45, status: 'completed', notes: 'Heart failure assessment' },
  { id: 'A029', patientId: 'P2009', date: '2025-11-15', time: '10:00', duration: 60, status: 'scheduled', notes: 'Urgent follow-up' },
  { id: 'A030', patientId: 'P2009', date: '2025-12-29', time: '10:00', duration: 45, status: 'scheduled', notes: 'Monthly review' },

  // P2010 - Ava Schneider
  { id: 'A031', patientId: 'P2010', date: '2025-05-11', time: '11:00', duration: 30, status: 'completed' },
  { id: 'A032', patientId: 'P2010', date: '2025-08-11', time: '11:00', duration: 30, status: 'scheduled' },

  // P2011 - Thabo Okeke
  { id: 'A033', patientId: 'P2011', date: '2025-04-30', time: '13:30', duration: 45, status: 'completed', notes: 'Nephropathy monitoring' },
  { id: 'A034', patientId: 'P2011', date: '2025-07-30', time: '13:30', duration: 45, status: 'completed', notes: 'Kidney function review' },
  { id: 'A035', patientId: 'P2011', date: '2025-10-30', time: '13:30', duration: 45, status: 'scheduled', notes: 'Quarterly complication screening' },

  // P2012 - Isabella Lopez
  { id: 'A036', patientId: 'P2012', date: '2025-06-02', time: '10:30', duration: 45, status: 'completed' },
  { id: 'A037', patientId: 'P2012', date: '2025-09-02', time: '10:30', duration: 45, status: 'completed', notes: 'Retinopathy check' },
  { id: 'A038', patientId: 'P2012', date: '2025-12-02', time: '10:30', duration: 45, status: 'scheduled' },

  // P2013 - Thabo Diallo
  { id: 'A039', patientId: 'P2013', date: '2025-08-23', time: '15:30', duration: 45, status: 'completed', notes: 'One-year checkup' },
  { id: 'A040', patientId: 'P2013', date: '2025-11-23', time: '15:30', duration: 45, status: 'scheduled', notes: 'Postprandial glucose management' },

  // P2014 - Mateo Gonzalez Jr
  { id: 'A041', patientId: 'P2014', date: '2025-05-14', time: '09:00', duration: 60, status: 'completed', notes: 'Initial diagnosis' },
  { id: 'A042', patientId: 'P2014', date: '2025-06-14', time: '09:00', duration: 45, status: 'completed', notes: 'Heart failure follow-up' },
  { id: 'A043', patientId: 'P2014', date: '2025-08-14', time: '09:00', duration: 45, status: 'scheduled', notes: 'Cardiology coordination' },

  // P2015 - Rami Farah
  { id: 'A044', patientId: 'P2015', date: '2025-09-23', time: '11:00', duration: 60, status: 'completed', notes: 'New patient consultation' },
  { id: 'A045', patientId: 'P2015', date: '2025-12-23', time: '11:00', duration: 45, status: 'scheduled', notes: 'Three-month review' },

  // P2016 - Hassan Saleh
  { id: 'A046', patientId: 'P2016', date: '2025-06-14', time: '13:00', duration: 45, status: 'completed', notes: 'Type 1 management review' },
  { id: 'A047', patientId: 'P2016', date: '2025-09-14', time: '13:00', duration: 45, status: 'completed', notes: 'Insulin adjustment' },
  { id: 'A048', patientId: 'P2016', date: '2025-12-14', time: '13:00', duration: 45, status: 'scheduled', notes: 'A1C review' },

  // P2017 - Li Wang
  { id: 'A049', patientId: 'P2017', date: '2025-09-19', time: '14:00', duration: 60, status: 'completed', notes: 'Initial diagnosis' },
  { id: 'A050', patientId: 'P2017', date: '2025-12-19', time: '14:00', duration: 45, status: 'scheduled', notes: 'Nephropathy screening' },

  // P2018 - Lerato Mensah
  { id: 'A051', patientId: 'P2018', date: '2025-07-06', time: '10:00', duration: 45, status: 'completed', notes: 'Stroke history review' },
  { id: 'A052', patientId: 'P2018', date: '2025-10-06', time: '10:00', duration: 45, status: 'completed' },
  { id: 'A053', patientId: 'P2018', date: '2026-01-06', time: '10:00', duration: 45, status: 'scheduled', notes: 'Blood pressure management' },

  // P2019 - Riya Iyer
  { id: 'A054', patientId: 'P2019', date: '2025-06-02', time: '15:00', duration: 45, status: 'completed', notes: 'Compliance discussion' },
  { id: 'A055', patientId: 'P2019', date: '2025-09-02', time: '15:00', duration: 45, status: 'completed', notes: 'Alcohol use counseling' },
  { id: 'A056', patientId: 'P2019', date: '2025-12-02', time: '15:00', duration: 45, status: 'scheduled', notes: 'Quarterly review' },

  // P2020 - Tobias Lettenmeier (Demo patient)
  { id: 'A057', patientId: 'P2020', date: '2025-03-15', time: '09:00', duration: 45, status: 'completed', notes: 'Annual diabetes review' },
  { id: 'A058', patientId: 'P2020', date: '2025-06-15', time: '09:00', duration: 30, status: 'completed', notes: 'A1C check and medication review' },
  { id: 'A059', patientId: 'P2020', date: '2025-09-15', time: '09:00', duration: 30, status: 'completed', notes: 'Quarterly checkup' },
  { id: 'A060', patientId: 'P2020', date: '2025-11-08', time: '14:00', duration: 15, status: 'completed', notes: 'Lab review - A1C 7.2%, new Metformin prescription' },
  { id: 'A061', patientId: 'P2020', date: '2025-12-15', time: '09:00', duration: 30, status: 'scheduled', notes: 'Follow-up on medication and glucose control' },
  { id: 'A062', patientId: 'P2020', date: '2026-03-15', time: '09:00', duration: 45, status: 'scheduled', notes: 'Annual comprehensive exam' },
];

// Helper function to get appointments by patient ID
export const getAppointmentsByPatientId = (patientId: string): Appointment[] => {
  return mockAppointments
    .filter(apt => apt.patientId === patientId)
    .sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime());
};

// Helper to get upcoming appointments
export const getUpcomingAppointments = (patientId: string): Appointment[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return mockAppointments
    .filter(apt => apt.patientId === patientId && new Date(apt.date) >= today)
    .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime());
};

// Helper to get past appointments
export const getPastAppointments = (patientId: string): Appointment[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return mockAppointments
    .filter(apt => apt.patientId === patientId && new Date(apt.date) < today)
    .sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime());
};
