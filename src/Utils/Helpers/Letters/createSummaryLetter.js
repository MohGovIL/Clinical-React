import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirDocumentReference from '../FhirEntities/normalizeFhirEntity/normalizeFhirDocumentReference';
import openDocumentInANewWindow from 'Utils/Helpers/openDocumentInANewWindow';
import { createLetter } from 'Utils/Services/API';
import { store } from 'index';
export const createSummaryLetter = async ({
  encounter,
  patientId,
  currentUser,
  docID,
}) => {
  if (encounter.status === 'finished') {
    const documentReferenceData = await FHIR('DocumentReference', 'doWork', {
      functionName: 'getDocumentReference',
      searchParams: { category: 5, encounter: encounter.id },
    });
    let documentReferenceDataEntry =
      documentReferenceData.data.entry[
        documentReferenceData.data.entry.length - 1
      ].resource;

    let documentReferenceDataArr = normalizeFhirDocumentReference(
      documentReferenceDataEntry,
    );

    openDocumentInANewWindow({
      data: documentReferenceDataArr.data,
      contentType: documentReferenceDataArr.contentType,
      name: documentReferenceDataArr.url,
    });
    return documentReferenceDataArr.id;
  }

  let docAxios = await createLetter({
    letter_type: 'summary_letter',
    encounter: encounter && encounter.id,
    patient: patientId,
    owner: currentUser && currentUser.id,
    facility: store.getState().settings.facility,
    id: docID,
    name_of_letter: 'Summary letter',
    category: 5,
    status: encounter && encounter.status,
  });

  if (docAxios.status === 200) {
    let docData = docAxios.data;

    openDocumentInANewWindow({
      data: docData.base64_data,
      contentType: docData.mimetype,
      name: docData.file_name,
    });
    return docData.id;
  }
};
