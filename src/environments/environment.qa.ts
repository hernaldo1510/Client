export const environment = {
  production: false,
  basePath: 'qa',
  baseUrl: 'https://r4zfbcsvw7.execute-api.us-east-1.amazonaws.com/rme-qa-sec/',
  prmUrl: 'https://proxy.qa.ucchristus.procloudhub.com',
  professional: 'professional',
  patient: 'patient',
  rme: 'rme',
  rmeFindByPatient: 'findByPatientId',
  rmeFindByProfessional: 'findByProfessionalId',
  rmeFindByAppointment: 'findByAppointmentId',
  rmeGetPdf: 'pdf',
  medication: 'medication',
  medicationHighFrequency: 'findHighFrequencyByProfessional',
  medicationComercialName: 'findByComercialName',
  medicationActiveIngredient: 'findByActiveIngredient',
  frecuencyUnit: ['Horas'],
  durationType: [
    { code: 'Diario', label: 'Dias' },
    { code: 'Semanal', label: 'Semanas' },
    { code: 'Mensual', label: 'Meses' },
    { code: 'Permanente', label: 'Permanente' },
    { code: 'SOS', label: 'SOS' }
  ],
  posologyType: ['Comprimidos', 'Gotas', 'MG'],
  tableMsg: {
    emptyMessage: 'No hay recetas para mostrar',
    totalMessage: 'total'
  }
};
