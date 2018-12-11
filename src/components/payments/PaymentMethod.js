import React, {Component} from 'react';
import {SharedServerService} from "../../di";
import "./PaymentMethod.css"

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
                            type: payment.paymentMethod.payment_method,
                            expiration_date: this.safeProperty(payment.paymentMethod, "expiration_date"),
                            card_number: this.safeProperty(payment.paymentMethod, "card_number"),
							security_code: this.safeProperty(payment.paymentMethod, "security_code"),
							cardholder_name: this.safeProperty(payment.paymentMethod, "cardholder_name")
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
		let cardNumberHeader = null;
        let cardNumberContent = null;
        if (this.state.card_number) {
            cardNumberHeader = <th>Numero de tarjeta</th>;
            cardNumberContent = <td>{this.state.card_number}</td>;
        }
        if (this.state.expiration_date) {
            expirationHeader = <th>Fecha de vencimiento</th>;
            expirationContent =
                <td>{this.state.expiration_date}</td>;
        }
		let securityCodeHeader = null;
        let securityCodeContent = null;
        if (this.state.security_code) {
            securityCodeHeader = <th>Código de Seguridad</th>;
            securityCodeContent = <td>{this.state.security_code}</td>;
        }
		let cardholderNameHeader = null;
        let cardholderNameContent = null;
        if (this.state.security_code) {
            cardholderNameHeader = <th>Titular de la tarjeta</th>;
            cardholderNameContent = <td>{this.state.cardholder_name}</td>;
        }
        return <div>
            <table className="metodo-pago">
                <tr>
                    <th>Id</th>
                    <th>Tipo</th>
					{cardNumberHeader}
                    {expirationHeader}
					{securityCodeHeader}
					{cardholderNameHeader}
                </tr>
                <tr>
                    <td>{this.props.paymentId}</td>
                    <td>{this.state.type}</td>
					{cardNumberContent}
                    {expirationContent}
					{securityCodeContent}
					{cardholderNameContent}
                </tr>
            </table>

        </div>;
    }
};
