import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import IframeEnvelopPatientFile from "./IframeEnvelopPatientFile";
// import i18n (needs to be bundled ;))
import './i18n';
import { Trans } from 'react-i18next';

class App extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            iframeUrl:''
        };

    }


    changeUrl(page) {
        this.setState({
            iframeUrl: this.props.appUrl + '/' + page
        })
    }

    render() {
        return <div className="App">
                <Header height="200px">
                    <button onClick={e => this.changeUrl('/main/finder/dynamic_finder.php')}>Patient list</button>
                    <button onClick={e => this.changeUrl('patient_file/summary/demographics.php?set_pid=2')}><Trans>Demographics</Trans></button>
                    <button onClick={e => this.changeUrl('patient_file/encounter/forms.php?review_id=9')}>Encounter</button>
                </Header>
                <body>
                    <IframeEnvelopPatientFile url={this.state.iframeUrl} />

                </body>
            </div>
    }

}

export default App;
