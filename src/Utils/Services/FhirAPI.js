import {tokenInstance} from "./AxiosWithTokenInstance";

export const getAppointment = async () => {
    try{
        return await tokenInstance().get('apis/fhir/v4/Appointment?_include=Appointment:patient')
    }catch (err) {
        console.log(err)
    }
};
