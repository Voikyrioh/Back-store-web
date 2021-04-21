import * as React from 'react';
import './App.css';
import {SourceInfoList} from "./components/SourceInfoList/SourceInfoList";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <h1> Coucou </h1>
                <SourceInfoList />
            </div>
        );
    }
}

export default App;
