import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import {Logger, Session} from "../di";
import Envios from "./deliveries/Deliveries";
import Toast from "./alert/Toast";
import "./App.css";

export default class App extends Component {

    constructor(props) {
        super(props);
        // Initial state
        Logger.info("Recuperando session existente...");
        Session.loadExisting();
        this.state = {
            signed: Session.isSigned(),
            toast: {
                show: false,
                message: {
                    title: "",
                    description: ""
                }
            }
        };
        // Events listeners
        this.onUserSignedIn = this.onUserSignedIn.bind(this);
        this.onUserSignedOut = this.onUserSignedOut.bind(this);
        this.showToast = this.showToast.bind(this);
        this.hideToast = this.hideToast.bind(this);
    }

    onUserSignedIn(userName, token) {
        Logger.info("Login completado! Creando session ...");
        Session.create(token, userName);
        const signed = Session.isSigned();
        if (signed) {
            Logger.info("Session creada!");
            this.setState({signed: signed})
        } else {
            Logger.info("Algo fallo! Limpinando la session ...");
            Session.reset();
        }
    }

    onUserSignedOut() {
        Logger.info("Finalizando la sesion!");
        Session.reset();
        const signed = Session.isSigned();
        this.setState({signed: signed})
    }

    showToast(title, description) {
        this.setState({
            toast: {
                show: true,
                message: {
                    title: title,
                    description: description
                }
            }
        })
    }

    hideToast() {
        this.setState({
            toast: {
                show: false
            }
        })
    }

    render() {
        const isSigned = this.state.signed;

        // Main Content
        let content;
        if (!isSigned) {
            /*
             * Usuario Desconocido - No Autenticado
             * Siempre lo redireccionamos al Log In
             */
            Logger.info("Usuario NO autenticado ... redireccionando al Login");
            content = <Login onUserSignedIn={this.onUserSignedIn}
                             showToast={this.showToast}/>
        } else {
            /*
             * Usuario Registrado
             * Creamos un Router para manejar los redireccionamientos
             */
            Logger.info("Usuario autenticado ... redireccionando al Dashboard");
            content = <Router>
                <div>
                    <Route exact path="/" render={() => <Dashboard onUserSignedOut={this.onUserSignedOut}
                                                                   showToast={this.showToast}/>}/>
                    <Route path="/envios" component={Envios}/>
                </div>
            </Router>
        }

        // Toast - Error Messages
        let toast = this.state.toast.show ?
            <div className={"alert-box"}>
                <Toast message={this.state.toast.message} onCloseBtnClick={this.hideToast}/>
            </div>
            : null;

        return <div>
            {content}
            {toast}
        </div>
    }
}