import React, { useEffect, useState } from 'react';
import Title from 'Assets/Elements/Title';
import { StyledFormGroup } from 'Assets/Elements/StyledFormGroup';
import { StyledSelectTemplateButton } from 'Assets/Elements/StyledSelectTempleteButton';
import { useTranslation } from 'react-i18next';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { Grid } from '@material-ui/core';
import { StyledDivider } from '../Style';
import { useFormContext } from 'react-hook-form';
import { isRTLLanguage } from 'Utils/Helpers/language';
import { longCodeListOptions } from 'Assets/Elements/CustomizedSelectCheckList/RenderTemplates/longCodeListOptions';
import CustomizedSelectCheckList from 'Assets/Elements/CustomizedSelectCheckList';
import { ConditionRenderOption } from 'Assets/Elements/CustomizedSelectCheckList/RenderTemplates/conditionsRenderOptions';
import { store } from 'index';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { setValueset } from 'Store/Actions/ListsBoxActions/ListsBoxActions';
import { connect } from 'react-redux';

const DiagnosisAndTreatment = ({ initValueFunction, listsBox, setValueset }) => {
  const { t } = useTranslation();
  const {
    permission,
    setPopUpProps,
    setValue,
    register,
    watch,
    getValues,
    questionnaireResponse,
  } = useFormContext();

  const diagnosisAndTreatmentFields = watch(['medicalAnamnesis', 'treatmentDetails', 'physicalExamination']);

  const callBack = (data, name) => {
    setValue(name, data);
  };

  const [diagnosisList, setDiagnosisList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);
  const [DiagnosisLang, setDiagnosisLang] = useState('he');
  const [diagnosisListsLoaded, setDiagnosisListsLoaded] = useState(false);


  const handlePopUpProps = (title, fields, id, callBack, name) => {
    setPopUpProps((prevState) => {
      return {
        ...prevState,
        popupOpen: true,
        formFieldsTitle: title,
        formFields: fields,
        formID: id,
        setTemplatesTextReturned: callBack,
        name,
        defaultContext: getValues({ nest: true })[name],
      };
    });
  };
  const treatmentDetails = t('Treatment details');
  const physicalExamination = t('Physical examination');
  const medicalAnamnesis = t('Medical anamnesis');
  React.useEffect(() => {
    const { items } = questionnaireResponse;
    if (items) {
      items.forEach((item) => {
        if (item.answer) {
          switch (item.linkId) {
            case '1':
              initValueFunction([
                { medicalAnamnesis: item.answer[0].valueString },
              ]);
              break;
            case '2':
              initValueFunction([
                { physicalExamination: item.answer[0].valueString },
              ]);
              break;
            case '3':
              initValueFunction([
                { treatmentDetails: item.answer[0].valueString },
              ]);
              break;
            default:
              break;
          }
        }
      });
    }
  }, [
    questionnaireResponse,
    setValue,
    physicalExamination,
    treatmentDetails,
    medicalAnamnesis,
  ]);

  const medicalAdmissionChipLabel = (selected) => {
    return `${t(selected.reasonCode.name)}`;
  };

  useEffect(() => {
    (async () => {
      const APILists = [];
      const systemLists = ['bk_diseases']
      systemLists.forEach((value => {
          if ( !listsBox.hasOwnProperty(value)) {
            APILists.push(
              store.dispatch(setValueset(value))
            )
          }
        }
      ));
      await Promise.all(APILists);
      setDiagnosisListsLoaded(true);
    })();
  }, []);

  useEffect(() => {

    if (diagnosisListsLoaded) {
      (async () => {
        try {
          const diagnosisResponse = listsBox.bk_diseases;
          setDiagnosisLang(diagnosisResponse.language)
          const options = [];
          const servicesTypeObj = {};
          await Promise.all(
            diagnosisResponse.expansion.contains.map((sensitive) => {
              const normalizedSensitiveSet = normalizeFhirValueSet(sensitive);
              const optionObj = {};
              optionObj['serviceType'] = {
                ...servicesTypeObj[normalizedSensitiveSet.code],
              };
              optionObj['reasonCode'] = normalizedSensitiveSet;
              options.push(optionObj);
            }),
          );
          setDiagnosisList(options);
        } catch (err) {
          console.log(err);
        }
      })();
    }


  },[diagnosisListsLoaded]);

  return (
    <StyledFormGroup>
      <Title
        label={t('Diagnosis and treatment')}
        fontSize='22px'
        bold
        color='#000b40'
      />
      <StyledDivider />
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <CustomizedTextField
          name='medicalAnamnesis'
          inputRef={register}
          label={medicalAnamnesis}
          width='45%'
          multiline
          InputLabelProps={{
            shrink: diagnosisAndTreatmentFields['medicalAnamnesis']
              ? true
              : false,
          }}
          disabled={permission === 'view' ? true : false}
        />
        <StyledSelectTemplateButton
          disabled={permission === 'view' ? true : false}
          onClick={() =>
            handlePopUpProps(
              medicalAnamnesis,
              'medical_anamnesis',
              'diagnosis_and_recommendations',
              callBack,
              'medicalAnamnesis',
            )
          }>
          {t('Select template')}
        </StyledSelectTemplateButton>
      </Grid>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <CustomizedTextField
          inputRef={register}
          name='physicalExamination'
          label={physicalExamination}
          InputLabelProps={{
            shrink: diagnosisAndTreatmentFields['physicalExamination']
              ? true
              : false,
          }}
          width='45%'
          multiline
          disabled={permission === 'view' ? true : false}
        />
        <StyledSelectTemplateButton
          disabled={permission === 'view' ? true : false}
          onClick={() =>
            handlePopUpProps(
              physicalExamination,
              'physical_examination',
              'diagnosis_and_recommendations',
              callBack,
              'physicalExamination',
            )
          }>
          {t('Select template')}
        </StyledSelectTemplateButton>
      </Grid>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <Grid sm={10} >
          <CustomizedSelectCheckList
            selectedList={selectedList}
            selectCheckList={diagnosisList}
            // loadingCheckList={loadingDiagnosisList}
            servicesTypeOpen={servicesTypeOpen}
            setServicesTypeOpen={setServicesTypeOpen}
            valueSetCode={'DiagnosisCodes'}
            labelInputText={'Diagnosis'}
            popperWidth={700}
            popperLanguageDirection={isRTLLanguage(DiagnosisLang) ? 'rtl' : 'ltr'}
            //if the language is english the list will be list of professional codes
            defaultRenderOptionFunction={DiagnosisLang === 'en' ? longCodeListOptions : ConditionRenderOption}
            defaultChipLabelFunction={medicalAdmissionChipLabel}
            sortByTranslation={!DiagnosisLang === 'en'}
            virtual
            notRequired={true}
          />
        </Grid>
      </Grid>
    </StyledFormGroup>
  );
};


const mapStateToProps = (state) => {
  return {
    listsBox: state.listsBox,
  };
};
export default connect(mapStateToProps, { setValueset })(DiagnosisAndTreatment);
