import React, {Component} from 'react';

export default class Dashboard extends Component {

    render() {
        return (
            <div>
                <header>Home</header>
                <ul>
                    <li>
                        <label>Envios</label>
                    </li>
                    <li>
                        <label>Pagos</label>
                    </li>
                    <li>
                        <label>App Servers</label>
                    </li>
                    <li>
                        <label>Estadisticas</label>
                    </li>
                </ul>
                <footer><button onClick={this.props.onUserSignedOut}>>Cerrar Session</button></footer>
            </div>
        );
    }
}