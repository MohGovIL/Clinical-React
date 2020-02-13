import {tokenInstanceGenerator} from "./AxiosWithTokenInstance";
import {ApiTokens} from "./ApiTokens";
/**
 * @author Idan Gigi gigiidan@gmail.com
 * @fileOverview Where all the apis that uses the normal FhirApi Token
 */

const fhirTokenInstance = () => tokenInstanceGenerator(ApiTokens.FHIR.tokenName);

export const getAppointments = async () => {
    try {
        return await fhirTokenInstance().get('apis/fhir/v4/Appointment?_include=Appointment:patient');
    } catch (err) {
        console.log(err)
    }
};

export const getStatuses = async () => {
  try {
      return await fhirTokenInstance().get('apis/fhir/v4/ValueSet/apptstat');
  }catch (err) {
      console.log(err);
  }
};

export const updateAppointmentStatus = async (appointmentId, value) => {
    try{
        return await fhirTokenInstance().patch(`apis/fhir/v4/Appointment/${appointmentId}`, {
            op: "replace",
            path:"/status",
            value
        })
    }catch(err){
        console.log(err)
    }
};

export const getOrganization = async () => {
    try {
        return await fhirTokenInstance().get('apis/fhir/v4/Organization?active=1');
    } catch (err) {
        console.log(err)
    }
};
