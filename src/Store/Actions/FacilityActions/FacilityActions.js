import {GET_FACILITY} from './FacilityActionTypes';
import {tokenInstance} from 'Utils/Services/AxiosWithTokenInstance';

export const getFacility = () => {
    return async dispatch => {
        try{
            const {data} = await tokenInstance().get('apis/api/facility');
            console.log(data);
            dispatch({type: GET_FACILITY, payload: data})
        }catch(err){
            console.log(err);

        }
    }
};