export const environment = {
  production: true,
  basePath: 'Dev',
  // baseUrl: 'https://r4zfbcsvw7.execute-api.us-east-1.amazonaws.com',
  baseUrl: 'https://3mcqzhr3x4.execute-api.us-east-1.amazonaws.com/rme-dev/',
  professional: 'professional',
  patient: 'patient',
  rme: 'rme',
  medication: 'medication',
  medicationHighFrequency: 'findHighFrequencyByProfessional',
  medicationComercialName: 'findByComercialName',
  medicationActiveIngredient: 'findByActiveIngredient',
  frecuencyUnit: ['Horas'],
  durationType: [{code: 'Diario', label: 'Dias'}, {code: 'Permanent', label: 'Permanente'}, {code: 'SOS', label: 'SOS'}],
  posologyType: ['Comprimidos', 'Gotas', 'MG']
};
