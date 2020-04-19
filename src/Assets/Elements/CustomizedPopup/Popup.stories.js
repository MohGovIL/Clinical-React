import React from "react";
import CustomizedPopup from "./index";
import {StylesProvider} from '@material-ui/core/styles'
import GlobalStyle from "../../Themes/GlobalStyle";
import {withKnobs, object, select, text, boolean} from "@storybook/addon-knobs";
import {store} from "../../../index";
import ProviderWrapper from "../../../../.storybook/Provider";
import {Button, Typography} from "@material-ui/core";

export default {
    title: 'Popup',
    component: CustomizedPopup,
    decorators: [withKnobs, story => <ProviderWrapper store={store}><StylesProvider injectFirst>{story()}
    </StylesProvider></ProviderWrapper>],
    excludeStories: /.*Data$/,
}


export const NormalCustomizedPopup = () => {
    const lang_dir = select('state.settings.lang_dir', {"rtl": "rtl", "ltr": "ltr"}, 'rtl');
    const withSubPopup = boolean('withSubPopup', false);
    const contentPopup = text("content for popup component", ""); //inner text of component

    store.getState().settings.lang_dir = lang_dir;

    const [popupOpen, setPopupOpen] = React.useState(false);
    const [popupNextOpen, setPopupNextOpen] = React.useState(false);

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
        'onClickHandler': handlePopupClose //user function
    }, {
        'label': 'save',
        'variant': "contained",
        'color': "primary",
        'type': "submit"
    }
    ];

    return <>
        <GlobalStyle language_direction={lang_dir}/>
        <Button variant="outlined" color="primary" onClick={handlePopupOpen}>Open dialog</Button>
        <CustomizedPopup isOpen={popupOpen} onClose={handlePopupClose}
                         title={text('title', 'Patient details')}
                         content_dividers={boolean('content_dividers', false)}
                         bottomButtons={object('bottomButtons', [...bottomButtonsData])}
        >{contentPopup ? contentPopup : <Typography gutterBottom>
            Customized popup component content<br/>
        </Typography>}

            {withSubPopup &&
            <><br/>
                <Button variant="outlined" color="primary" onClick={handlePopupNextOpen}>
                    Open next dialog
                </Button>
                <CustomizedPopup isOpen={popupNextOpen} onClose={handlePopupNextClose}
                                 title={text('Sub Popup[title]','Sub Popup title')}
                >
                    Customized popup sub-component content
                </CustomizedPopup>
            </>
            }
        </CustomizedPopup>
    </>
};
