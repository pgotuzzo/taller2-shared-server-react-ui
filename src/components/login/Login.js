import React, {Component} from 'react';
import {SharedServerService} from "../../di";
import "./Login.css";
import BtnBackground from '../../images/ic_power.png';

export default class Login extends Component {

    constructor(props) {
        super(props);
        // Initial State
        this.state = {
            user: "",
            validUser: false,
            pass: "",
            validPass: false
        };
        // Events Listeners
        this.onUserChange = this.onUserChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onLogFailed = this.onLogFailed.bind(this);
    }

    onUserChange(event) {
        const userName = event.target.value;
        const check = (userName != null && userName.length > 4);
        this.setState({
            user: userName,
            validUser: check
        });
    }

    onPassChange(event) {
        const pass = event.target.value;
        const check = (pass != null && pass.length > 4);
        this.setState({
            pass: pass,
            validPass: check
        });
    }

    onLoginClick() {
        SharedServerService.getToken(
            this.state.user,
            this.state.pass,
            response => {
                if (response.ok) {
                    response.json().then(data => this.props.onUserSignedIn(this.state.user, data.token.token));
                } else {
                    this.onLogFailed();
                }
            });
    }

    onLogFailed() {
        const title = "Fallo el registro!";
        const desc = "El usuario y la contraseña no coinciden.\nVuelva a intentarlo nuevamente";
        this.props.showToast(title, desc);
    }

    render() {
        return (
            <div className={"main-outer"}>
                <div className={"main-inner"}>
                    <span className={"main-inner-title"}>Iniciar Session</span>
                    <span>Ingrese sus credenciales para continuar</span>
                    <div className={"main-inner-input-div"}>
                        <input placeholder="Usuario" type="text" onChange={this.onUserChange}/>
                        <input placeholder="Contraseña" type="password" onChange={this.onPassChange}/>
                    </div>
                    {
                        !(this.state.validPass && this.state.validUser) ?
                            null :
                            <img className={"main-inner-input-btn"} alt="" src={BtnBackground}
                                 onClick={this.onLoginClick}/>
                    }
                </div>
            </div>
        );
    }
}

