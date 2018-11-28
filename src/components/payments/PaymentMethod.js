import React, {Component} from 'react';
import {SharedServerService} from "../../di";

export default class PaymentMethod extends Component {

    safeProperty = function (obj, name) {
        return obj.hasOwnProperty(name) ? obj[name] : null;
    };

    componentDidMount() {
        this.fetchPayment();
    }

    constructor(props) {
        super(props);
        // Initial State
        this.state = {
            type: null,
            expiration_month: null,
            expiration_year: null,
            card_number: null
        };
        // Events Listeners
        this.fetchPayment = this.fetchPayment.bind(this);
    }

    fetchPayment() {
        SharedServerService.getPayment(this.props.paymentId, response => {
            if (response.ok) {
                response.json().then((data) => {
                    const payment = data[0];
                    this.setState(
                        {
                            type: payment.paymentMethod.method,
                            expiration_month: this.safeProperty(payment.paymentMethod, "expiration_month"),
                            expiration_year: this.safeProperty(payment.paymentMethod, "expiration_year"),
                            card_number: this.safeProperty(payment.paymentMethod, "number")
                        });
                });
            } else {
                response.json().then((data) => {
					const title = "Fallo la carga del estado actual!";
                    const desc = data.message;
                    this.props.showToast(title, desc);
                });
            }
        });
    }

    render() {
        let expirationHeader = null;
        let expirationContent = null;
        if (this.state.expiration_month !== null && this.state.expiration_year !== null) {
            expirationHeader = <th>Fecha de vencimiento</th>;
            expirationContent =
                <td>{this.state.expiration_month + "/" + this.state.expiration_year}</td>;
        }
        let cardNumberHeader = null;
        let cardNumberContent = null;
        if (this.state.card_number !== null) {
            cardNumberHeader = <th>Numero de tarjeta</th>;
            cardNumberContent = <td>{this.state.card_number}</td>;
        }
        return <div>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Tipo</th>
                    {expirationHeader}
                    {cardNumberHeader}
                </tr>
                <tr>
                    <td>{this.props.paymentId}</td>
                    <td>{this.state.type}</td>
                    {expirationContent}
                    {cardNumberContent}
                </tr>
            </table>

        </div>;
    }
};
