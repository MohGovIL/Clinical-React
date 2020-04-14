import React, {useState, useEffect} from "react";
import CustomizedPopup from "../../CustomizedPopup";

const PopupNewPatient = ({content, popupOpen, handlePopupClose}) => {

    const bottomButtonsData = [
        {
            'label': 'Save patient',
            'variant': "text",
            'color': "primary",
            'type': "submit"
        },
        {
            'label': 'Patient adminission',
            'variant': "contained",
            'color': "primary",
            'onClickHandler': handlePopupClose //user function
        },
        {
            'label': 'Create appointment',
            'variant': "contained",
            'color': "primary",
            'onClickHandler': handlePopupClose //user function
        }
    ];

    return (
        <CustomizedPopup isOpen={popupOpen} onClose={handlePopupClose}
                         title={'Create new patient'}
                         content_dividers={false}
                         bottomButtons={bottomButtonsData}
        >qwqweqweqweqweqweqweqwe
            {/*{withSubPopup &&*/}
            {/*<><br/>*/}
            {/*    <Button variant="outlined" color="primary" onClick={handlePopupNextOpen}>*/}
            {/*        Open next dialog*/}
            {/*    </Button>*/}
            {/*    <CustomizedPopup isOpen={popupNextOpen} onClose={handlePopupNextClose}*/}
            {/*                     title={text('Sub Popup[title]', 'Sub Popup title')}*/}
            {/*    >*/}
            {/*        Customized popup sub-component content*/}
            {/*    </CustomizedPopup>*/}
            {/*</>*/}
            {/*}*/}
        </CustomizedPopup>
    )
};

export default PopupNewPatient;
