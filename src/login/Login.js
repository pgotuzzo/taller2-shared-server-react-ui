import React, {Component} from 'react';

class Login extends Component {

    constructor(props) {
        super(props);
        // Initial State
        this.state = {validUser: false, validPass: false};
        // Events Listeners
        this.onUserChange = this.onUserChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onUserChange(event) {
        const userName = event.target.value;
        const check = (userName != null && userName.length > 4);
        this.setState({validUser: check});
    }

    onPassChange(event) {
        const pass = event.target.value;
        const check = (pass != null && pass.length > 4);
        this.setState({validPass: check});
    }

    onLoginClick() {
        // TODO - Fetch result from server
        const success = true;
        const result = {
            token: "I'm a token. Yes! I am",
            userName: "pgotuzzo"
        };
        // TODO - Fetch result from server

        if (success) {
            this.props.onLoginSuccess(result);
        }
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Login</h1>
                    Ingrese sus credenciales para continuar
                </header>
                <ul>
                    <li>
                        <label>Usuario</label><input type="text" onChange={this.onUserChange}/>
                    </li>
                    <li>
                        <label>Contraseña</label><input type="password" onChange={this.onPassChange}/>
                    </li>
                </ul>
                <button type="button"
                        disabled={!(this.state.validPass && this.state.validUser)}
                        onClick={this.onLoginClick}>
                    Acceder
                </button>
            </div>
        );
    }
}

export default Login;