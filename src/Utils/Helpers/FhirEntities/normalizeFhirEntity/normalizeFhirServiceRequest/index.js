/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param {object} ServiceRequest
 * @returns {object}
 */

const normalizeFhirServiceRequest = (ServiceRequest) => {
  /*
  *
    id:id=>  mandatory : yes
    categoryCode:category[0].coding.code
    categorySystem: category[0].coding.system	=> http://clinikal/valuest/service_types
    encounter:encounter=>  mandatory : yes
    reason_code:reasonCode[0].coding.code
    patient:subject=>  mandatory : yes
    instruction_code: code.coding.code=>  mandatory : yes	value exists in the list
    instruction_code_system: code.coding.system	=> 	http://clinikal/valuest/tests_and_treatments
    order_detail_code:orderDetail[0].coding.code
    order_detail_system:orderDetail[0].coding.system		=> http://clinikal/valuest/details_x_ray or http://clinikal/valuest/details_providing_medicine
    patient_instruction:patientInstruction
    requester:requester=>  mandatory : yes
    authoredOn:authored_on=>  mandatory : yes
    status:status	=> 	draft | active | on-hold | revoked | completed | entered-in-error | unknown	yes	if completed then locked for changes value exists in the list
    intent:intent		=> proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option	value exists in the list
    note[0].text:note
    performer:performer
    occurrence[0].occurrenceDateTime:occurrence
    reasonReference:reason_reference_doc_id	DocumentReference
  *
  * */
  if (!ServiceRequest) return [];
  const id = ServiceRequest.id;
  const categoryCode = ServiceRequest.category[0].coding['code'];
  const categorySystem = ServiceRequest.category[0].coding['system'];
  const encounter =
    ServiceRequest.encounter &&
    ServiceRequest.encounter.reference.split('/')[1];
  const reasonCode =
    ServiceRequest.reasonCode && ServiceRequest.reasonCode[0].coding['code'];
  const patient =
    ServiceRequest.subject && ServiceRequest.subject.reference.split('/')[1];
  const instructionCode =
    ServiceRequest.code && ServiceRequest.code.coding[0].code;
  const instructionCodeSystem =
    ServiceRequest.code && ServiceRequest.code.coding[0].system;
  const orderDetailCode =
    ServiceRequest.orderDetail && ServiceRequest.orderDetail[0].coding[0].code;
  const orderDetailSystem =
    ServiceRequest.orderDetail &&
    ServiceRequest.orderDetail[0].coding[0].system;
  const patientInstruction = ServiceRequest.patientInstruction;
  const requester =
    ServiceRequest.requester &&
    ServiceRequest.requester.reference.split('/')[1];
  const authoredOn = ServiceRequest.authoredOn;
  const status = ServiceRequest.status;
  const intent = ServiceRequest.intent;
  const note = ServiceRequest.note && ServiceRequest.note[0].text;
  const performer =
    ServiceRequest.performer &&
    ServiceRequest.performer[0].reference.split('/')[1];
  const occurrence = ServiceRequest.occurrenceDateTime;
  const reasonReferenceDocId =
    ServiceRequest.reasonReference &&
    ServiceRequest.reasonReference[0].reference.split('/')[1];

  return {
    id: id,
    categoryCode: categoryCode,
    categorySystem: categorySystem,
    reasonCode: reasonCode,
    instructionCode: instructionCode,
    instructionCodeSystem: instructionCodeSystem,
    orderDetailCode: orderDetailCode,
    orderDetailSystem: orderDetailSystem,
    patientInstruction: patientInstruction,
    requester: requester,
    authoredOn: authoredOn,
    status: status,
    intent: intent,
    note: note,
    performer: performer,
    occurrence: occurrence,
    reasonReferenceDocId: reasonReferenceDocId,
  };
};

export default normalizeFhirServiceRequest;
