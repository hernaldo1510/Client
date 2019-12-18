export const environment = {
  production: true,
  basePath: 'Prd',
  baseUrl:
    'https://7yllt4drud.execute-api.us-east-1.amazonaws.com/rme-prd-sec/',
  prmUrl: 'https://proxy.prod.ucchristus.procloudhub.com',
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
  durationUnit: {
    Diario: 'Dias',
    Semanal: 'Semanas',
    Mensual: 'Meses',
    Permanente: 'Permanente',
    SOS: 'SOS'
  },
  messageReasons: ['Pregunta', 'Sugerencia', 'Error', 'Felicitación', 'Otro'],
  posologyType: ['Comprimidos', 'Gotas', 'MG'],
  tableMsg: {
    emptyMessage: 'No hay recetas para mostrar',
    totalMessage: 'total'
  }
};
