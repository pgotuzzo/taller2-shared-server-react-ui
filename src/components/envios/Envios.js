import React, {Component} from 'react';
import {SharedServerService} from "../../di";

export default class Envios extends Component {

    constructor(props) {
        super(props);
        this.state = {envios: []};
        // Events Listeners
        this.fetchEnvios = this.fetchEnvios.bind(this);
        this.onEnviosFetchSuccess = this.onEnviosFetchSuccess.bind(this);
        this.onEnviosFetchError = this.onEnviosFetchError.bind(this);
    }

    componentDidMount() {
        this.fetchEnvios();
    }

    fetchEnvios() {
        SharedServerService.getEnvios(response => {
            if (response.ok) {
                response.json().then(this.onEnviosFetchSuccess);
            } else {
                response.json().then(this.onEnviosFetchError);
            }
        });
    }

    onEnviosFetchSuccess(data) {
        this.setState({envios: data.data});
    };

    onEnviosFetchError(data) {
        // Mostrar el error

    };

    render() {
        const envios = this.state.envios.map((item, i) => (
            <div>
                <span>Id: </span>{item.id} <span>Estado: </span><span>{item.estado}</span>
            </div>
        ));

        return (
            <div>
                <header>Envios:</header>
                {envios}
            </div>
        );
    }
}