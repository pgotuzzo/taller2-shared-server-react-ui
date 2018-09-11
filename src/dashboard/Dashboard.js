import React, {Component} from 'react';

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

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
                        <label>Analytics</label>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Dashboard;