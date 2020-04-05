import React from "react";
import CustomizedPopup from "./index";
import {StylesProvider} from '@material-ui/core/styles'
import GlobalStyle from "../../Themes/GlobalStyle";
import {withKnobs, object, select, text, boolean} from "@storybook/addon-knobs";
import {store} from "../../../index";
import ProviderWrapper from "../../../../.storybook/Provider";
import {Button, Typography} from "@material-ui/core";
import {useState} from "@storybook/addons";

export default {
    title: 'Popup',
    component: CustomizedPopup,
    decorators: [withKnobs, story => <ProviderWrapper store={store}><StylesProvider injectFirst>{story()}
    </StylesProvider></ProviderWrapper>],
    excludeStories: /.*Data$/,
}


export const normalCustomizedPopup = () => {
    const lang_dir = select('state.settings.lang_dir', {"rtl": "rtl", "ltr": "ltr"}, 'rtl');
    const withSubPopup = boolean('withSubPopup', false);
    store.getState().settings.lang_dir = lang_dir;

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupNextOpen, setPopupNextOpen] = useState(false);

    const handlePopupOpen = () => {
        setPopupOpen(true);
    };
    const handlePopupClose = () => {
        setPopupOpen(false);
    };
    //For subpopup component
    const handlePopupNextOpen = () => {
        setPopupNextOpen(true);
    };
    const handlePopupNextClose = () => {
        setPopupNextOpen(false);
    };

    const bottomButtonsData = [{
        'label': 'Undo editing',
        'variant': "text",
        'color': "primary",
        'onClickHandler': handlePopupClose
    }, {
        'label': 'save',
        'variant': "contained",
        'color': "primary",
        'type': "submit"
    }
    ];

    return <>
        <GlobalStyle languageDirection={lang_dir}/>
        <Button variant="outlined" color="primary" onClick={handlePopupOpen}>Open dialog</Button>
        <CustomizedPopup isOpen={popupOpen} onClose={handlePopupClose}
                         title={text('title', 'Patient details')}
                         content_dividers={boolean('content_dividers', false)}
                         bottomButtons={object('bottomButtons', [...bottomButtonsData])}
        ><Typography gutterBottom>
            LibreOffice auto-generate text: dt and F3<br/>
        </Typography>
            {withSubPopup &&
            <>
                <Button variant="outlined" color="primary" onClick={handlePopupNextOpen}>
                    Open next dialog
                </Button>
                <CustomizedPopup isOpen={popupNextOpen} onClose={handlePopupNextClose}
                                 title={text('Sub Popup[title]','Sub Popup title')}
                >
                    customized popup component
                </CustomizedPopup>
            </>
            }
        </CustomizedPopup>
    </>
};
