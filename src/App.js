import React, {Component} from 'react';
import './App.css';
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import SessionSingleton from "./utils/Session";
import Logger from "./utils/Logger.js";

class App extends Component {

    constructor(props) {
        super(props);
        // Initial state
        Logger.info("Recuperando session existente...");
        var session = SessionSingleton.getInstance();
        session.loadExisting();
        this.state = {signed: session.isSigned()};
        // Events listeners
        this.onUserSigned = this.onUserSigned.bind(this);
    }

    onUserSigned(loginResult) {
        Logger.info("Login completado! Creando session ...");
        var session = SessionSingleton.getInstance();
        session.create(loginResult.token, loginResult.userName);
        const signed = session.isSigned();
        if (signed) {
            Logger.info("Session creada!");
            this.setState({signed: signed})
        } else {
            Logger.info("Algo fallo! Limpinando la session ...");
            session.reset();
        }
    }

    render() {
        const isSigned = this.state.signed;
        if (isSigned) {
            Logger.info("Usuario autenticado ... redireccionando al Dashboard");
        } else {
            Logger.info("Usuario NO autenticado ... redireccionando al Login");
        }
        return (
            (isSigned) ?
                <Dashboard/> :
                <Login onLoginSuccess={this.onUserSigned}/>
        );
    }
}

export default App;
