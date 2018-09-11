import React, {Component} from 'react';
import './App.css';
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard"

var logger= require('./utils/logger.js');
var log=logger.LOG;

class App extends Component {

    constructor(props) {
        super(props);
        // Initial state
        this.state = {token: null};
        // Events listeners
        this.onUserSigned = this.onUserSigned.bind(this);
    }

    onUserSigned(token) {
        log.info("Autenticacion completada correctamente!");
        this.setState({token: token})
    }

    render() {
        return (
            (this.state.token === null) ?
                <Login onLoginSuccess={this.onUserSigned}/> :
                <Dashboard/>
        );
    }
}

export default App;
