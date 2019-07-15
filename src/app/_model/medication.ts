export interface Medication {
    medication: any;
    frecuency: {
        unit: string,
        value: string
    };
    posology: {
        unit: any,
        value: string
    };
    duration: {
        unit: string,
        value: string
    };
    observations: string;
    startTreatment: string;
}
