/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param getUIACOMapping - array
 * @returns getUIACOMapping - aco mapping
 * @constructor
 */

const getUIACOMapping = {
        invited: "PatientTrackingInvited",
        waiting_for_examination: 'PatientTrackingWaitingForExamination',
        waiting_for_decoding : 'PatientTrackingWaitingForDecoding',
        finished : 'PatientTrackingFinished'
}

export default getUIACOMapping;
