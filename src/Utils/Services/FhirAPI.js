import {tokenInstanceGenerator} from "./AxiosWithTokenInstance";
import {ApiTokens} from "./ApiTokens";

const fhirTokenInstance = () => tokenInstanceGenerator(ApiTokens.FHIR.tokenName);

export const getAppointment = async () => {
    try {
        return await fhirTokenInstance().get('apis/fhir/v4/Appointment/1?_include=Appointment:patient')
    } catch (err) {
        console.log(err)
    }
};
