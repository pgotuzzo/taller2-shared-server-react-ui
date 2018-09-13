import React, {Component} from 'react';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {envios: []};
    }

    componentDidMount() {
        this.fetchEnvios();
    }

    // FIXME - Implementar una abstraccion como la gente
    fetchEnvios() {
        fetch('https://shared-server-tallerii.herokuapp.com/envios')
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                this.setState({envios: json.data});
            });
    }

    render() {

        const envios = this.state.envios.map((item, i) => (
            <div>
                <span>Id: </span>{item.id}    <span>Estado: </span><span>{item.estado}</span>
            </div>
        ));

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
                Esto volvio del servidor:
                <h3>ENVIOS</h3>
                {envios}
            </div>
        );
    }
}

export default Dashboard;