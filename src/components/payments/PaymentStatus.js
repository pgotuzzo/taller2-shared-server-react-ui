import React, {Component} from 'react';
import {SharedServerService} from "../../di";

export default class PaymentStatus extends Component {

    OPTIONS = {PAYED: "PAGADO", PENDING: "PENDIENTE", CANCELED: "CANCELADO"};

    constructor(props) {
        super(props);
        // Initial State
        this.state = {current: null};
        // Events Listeners
        this.fetchPayment = this.fetchPayment.bind(this);
        this.onStatusSelected = this.onStatusSelected.bind(this);
    }

    componentDidMount() {
        this.fetchPayment();
    }

    fetchPayment() {
        SharedServerService.getPayment(this.props.paymentId, response => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({current: data.status});
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

    onStatusSelected(event) {
        const status = event.target.value;
        SharedServerService.setPaymentStatus(this.props.paymentId, status, response => {
            if (response.ok) {
                response.json().then(() => {
                    this.setState({current: status});
                    // this.props.showToast("", "");
                });
            } else {
                response.json().then(() => {
                    const title = "Fallo la actualizacion del estado!";
                    // this.props.showToast(title, desc);
                });
            }
        });
    }

    render() {
        return this.state.current !== null ?
            <div>
                <table>
                    <tr>
                        <th>Id</th>
                        <th>Estado Actual</th>
                    </tr>
                    <tr>
                        <td>{this.props.paymentId}</td>
                        <td className={"editItem"}>
                            <select value={this.state.current}
                                    onChange={this.onStatusSelected}>
                                <option value={this.OPTIONS.PAYED}>{this.OPTIONS.PAYED}</option>
                                <option value={this.OPTIONS.PENDING}>{this.OPTIONS.PENDING}</option>
                                <option value={this.OPTIONS.CANCELED}>{this.OPTIONS.CANCELED}</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
            : null;
    }
};