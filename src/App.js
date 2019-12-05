import React from 'react';
import styles from './App.css';
import Header from "./Header";
import IframeEnvelopPatientFile from "./IframeEnvelopPatientFile";
import Login from './Containers/Login/Login';
// import i18n (needs to be bundled ;))
import { xl } from './i18n';

class App extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         iframeUrl:''
    //     };
    //
    // }


    // changeUrl(page) {
    //     this.setState({
    //         iframeUrl: this.props.appUrl + '/' + page
    //     })
    // }

    render() {
        return(
            <Login/>
        )
        // return <div className="App test">
        //         <Header height="200px">
        //             <button onClick={e => this.changeUrl('/main/finder/dynamic_finder.php')}>Patient list</button>
        //             <button onClick={e => this.changeUrl('patient_file/summary/demographics.php?set_pid=2')}>Demographics</button>
        //             <button onClick={e => this.changeUrl('patient_file/encounter/forms.php?review_id=9')}>Encounter</button>
        //         </Header>
        //         <body>
        //             <IframeEnvelopPatientFile url={this.state.iframeUrl} />
        //
        //         </body>
        //     </div>
    }

}

export default App;
