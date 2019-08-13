export class Indication {
    medication: any;
    duration: any;
    frecuency: any;
    posology: any;
    observations: string;
    commercialRecommendation: boolean;
    indicationStartDate: any;

    constructor(obj: any) {
        this.medication = obj.medication;
        this.duration = obj.duration;
        this.frecuency = obj.frecuency;
        this.posology = obj.posology;
        this.observations = obj.observations;
        this.commercialRecommendation = obj.commercialRecommendation;
        this.indicationStartDate = obj.indicationStartDate;
    }
}
