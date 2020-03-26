import normalizeFhirPatient from "../Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirPatient";

export function _buildList(patient) {

    let arr = [];
    let resource = patient.resource;
    /*
       id: patient.id,
       identifier,
       firstName,
       lastName,
       middleName,
       mobileCellPhone,
       homePhone,
       email,
       gender: patient.gender,
       birthDate: patient.birthDate,
*/

    if (resource) {
        let normalizedPerson = normalizeFhirPatient(resource);
        return normalizedPerson;
    } else {
        return null;
    }
};

export function FHIRPersontoDataArray(pushthisData,data) {

    if(!data) {
        data = [];
    }

    let currentDataToFill = data;
    if (pushthisData && pushthisData.data && pushthisData.data.total > 0) {
        let entry = pushthisData.data.entry;

        entry.map((patient, patientIndex) => {
            let pushThisPerson = _buildList(patient);
            if (pushThisPerson) {
                let PushThisPersonIdentifier = pushThisPerson.id;
                let canPushThisPatient = true;
                for (let i = 0; i < currentDataToFill.length; i++) {
                    let dataIdentifier = currentDataToFill[i].id;

                    if (PushThisPersonIdentifier === dataIdentifier) {
                        canPushThisPatient = false;
                    }

                }

                if (canPushThisPatient) {
                    currentDataToFill.push(pushThisPerson);
                }
            }
        });

    }
    return currentDataToFill;
};

// sort by value
export function sortByValue(items,field) {
    items.sort(function (a, b) {
        return a[field] - b[field];
    });
    return items;
}

// sort by name
export function sortByName(items,field,searchParams,field2) {
    sortInputFirst(searchParams,items,field,field2);
}

// sort by name

export function sortLexicographicAlphanumeric(first,field,field2){
    let nameA = '';
    let nameB = '';
    first.sort(function (a, b) {
        if(field2){
            var nameA =  a[field][field2].toUpperCase(); // ignore upper and lowercase
            var nameB =  b[field][field2].toUpperCase(); // ignore upper and lowercase
        }else{
            var nameA =  a[field].toUpperCase(); // ignore upper and lowercase
            var nameB =  b[field].toUpperCase(); // ignore upper and lowercase
        }

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
    return first;
}
export function sortByContains(items,field,value,field2) {

    var first = [];
    var others = [];
    for (var i = 0; i < items.length; i++) {
        if(field2)
        {
            if (items[i][field][field2].includes(value)) {
                first.push(items[i]);
            } else {
                others.push(items[i]);
            }
        }
        else{
            if (items[i][field].includes(value)) {
                first.push(items[i]);
            } else {
                others.push(items[i]);
            }
        }

    }


    first = sortLexicographicAlphanumeric(first,field)
    window.dataFound = window.dataFound.concat(first);
    window.leftover = others;
}

export function sortInputFirst(input, data,field,field2) {

    var first = [];
    var others = [];
    for (var i = 0; i < data.length; i++) {
        if(field2)
        {
            if (data[i][field] && data[i][field][field2] && data[i][field][field2].indexOf(input) == 0) {
                first.push(data[i]);
            } else {
                others.push(data[i]);
            }
        }
        else{
            if (data[i][field] && data[i][field].indexOf(input) == 0) {
                first.push(data[i]);
            } else {
                others.push(data[i]);
            }
        }

    }

    first = sortLexicographicAlphanumeric(first,field,field2)
    window.dataFound = window.dataFound.concat(first);
    window.leftover = others;
}



export function sortPatientRulesByLexicogrphicsSort(items , value) {

    /*
       id: patient.id,
       identifier,
       firstName,
       lastName,
       middleName,
       mobileCellPhone,
       homePhone,
       email,
       gender: patient.gender,
       birthDate: patient.birthDate,
*/
    /* items = sortByContains(items, 'lastName',value);
     items = sortByContains(items, 'firstName',value);
     items = sortByName(items, 'lastName');*/
    window.leftover = null;
    window.dataFound = [];

    sortByName(items, 'firstName',value,null);
    sortByName(window.leftover, 'lastName',value,null);
    sortByContains(window.leftover, 'firstName',value,null);
    sortByContains(window.leftover, 'lastName',value,null);
    let obj = [...window.dataFound,...window.leftover];
    return  obj;
}

export function sortPatientRulesByNumberSort(items , value) {

    /*
       id: patient.id,
       identifier,
       firstName,
       lastName,
       middleName,
       mobileCellPhone,
       homePhone,
       email,
       gender: patient.gender,
       birthDate: patient.birthDate,
*/

    window.leftover = null;
    window.dataFound = [];

    sortByName(items, 'identifier',value,null);
    sortByName(window.leftover, 'mobileCellPhone',value,null);
    sortByContains(window.leftover, 'identifier',value,null);
    sortByContains(window.leftover, 'mobileCellPhone',value,null);

    let obj = [...window.dataFound,...window.leftover];
    return  obj;

    return items;
}
