import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import IframeEnvelopPatientFile from "./IframeEnvelopPatientFile";
// import i18n (needs to be bundled ;))
import { xl } from './i18n';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            iframeUrl:''
        };

    }


    render() {
        return <div className="App test">
                <Header height="200px">

                </Header>
                <body>

                </body>
            </div>
    }

}

export default App;
