import React from 'react';
import Iframe from "react-iframe";
import allFramesLoaded from './fixParent';

class IframeEnvelopPatientFile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    
    render() {
        return <Iframe
            url={this.props.url}
            width="100%"
            height="650px"
        />
    }
}


export default IframeEnvelopPatientFile;