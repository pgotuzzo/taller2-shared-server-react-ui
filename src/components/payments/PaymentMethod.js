import React, {Component} from 'react';
import {SharedServerService} from "../../di";

export default class PaymentMethod extends Component {

    constructor(props) {
        super(props);
        // Initial State
        this.state = {method: null};
        // Events Listeners
        this.fetchPayment = this.fetchPayment.bind(this);
    }

    componentDidMount() {
        this.fetchPayment();
    }

    fetchPayment() {
        SharedServerService.getPayment(this.props.paymentId, response => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({method: data.paymentMethod});
                });
            } else {
                response.json().then(() => {
                    // const title = "Fallo la carga del estado actual!";
                    // const desc = "Por favor vuelva a intentarlo nuevamente!";
                    // this.props.showToast(title, desc);
                });
            }
        });
    }

    render() {
        return (this.state.method !== null) ?
            <div>
                <table>
                    <tr>
                        <th>Id</th>
                        <th>Fecha de vencimiento</th>
                        <th>Medio</th>
                        <th>Tipo</th>
                        <th>Numero</th>
                    </tr>
                    <tr>
                        <td>{this.props.paymentId}</td>
                        <td>{this.state.method.epiration_month + "/" + this.state.method.expiration_year}</td>
                        <td>{this.state.method.method}</td>
                        <td>{this.state.method.type}</td>
                        <td>{this.state.method.number}</td>
                    </tr>
                </table>

            </div>
            : null;
    }
};