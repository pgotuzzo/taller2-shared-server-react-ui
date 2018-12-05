import React, {Component} from 'react';
import Moment from 'react-moment';
import {SharedServerService} from "../../di";
import InfoImg from "../../images/ic_info.png";
import EditImg from "../../images/ic_settings.png";
import PaymentMethod from "./PaymentMethod";
import PaymentStatus from "./PaymentStatus";

export default class Payments extends Component {

    POP_UP_TYPE = {PAYMENT_METHOD: 0, EDIT_STATUS: 1};

    constructor(props) {
        super(props);
        // Initial State
        this.state = {
            payments: [],
            popUp: {
                show: false,
                type: null,
                paymentId: null,
            }
        };
        // Events Listeners
        this.fetchPayments = this.fetchPayments.bind(this);
        this.showPaymentMethod = this.showPaymentMethod.bind(this);
        this.onPopUpDismiss = this.onPopUpDismiss.bind(this);
    }

    componentDidMount() {
        this.fetchPayments();
    }

    fetchPayments() {
        SharedServerService.getPayments(response => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({payments: data});
                });
            } else {
                response.json().then((data) => {
                    const title = "Fallo la carga de pagos!";
                    const desc = data.message;
                    this.props.showToast(title, desc);
                });
            }
        });
    }

    showPaymentMethod(paymentId) {
        this.setState({
            popUp: {
                show: true,
                type: this.POP_UP_TYPE.PAYMENT_METHOD,
                paymentId: paymentId
            }
        });
    }

    showStatus(paymentId) {
        this.setState({
            popUp: {
                show: true,
                type: this.POP_UP_TYPE.EDIT_STATUS,
                paymentId: paymentId
            }
        });
    }

    onPopUpDismiss() {
        if (this.state.popUp.type === this.POP_UP_TYPE.EDIT_STATUS) {
            // Update content
            this.fetchPayments();
        }
        // Remove pop up
        this.setState({popUp: {show: false}});
    }

    render() {
        const payments = this.state.payments.map((item) => {
            return <tr>
                <td>{item.transaction_id}</td>
                <td>{item.currency}</td>
                <td>{item.value}</td>
                <td><img className={"img-btn"} alt="" src={InfoImg}
                         onClick={() => this.showPaymentMethod(item.transaction_id)}/></td>
                <td>{item.status}</td>
				<td><Moment date={item.updateat} format="DD/MM/YYYY HH:mm:SS" /></td>
                <td><img className={"img-btn"} alt="" src={EditImg}
                         onClick={() => this.showStatus(item.transaction_id)}/></td>
            </tr>
        });
        let popUp = null;
        if (this.state.popUp.show) {
            switch (this.state.popUp.type) {
                case this.POP_UP_TYPE.PAYMENT_METHOD:
                    popUp = <PaymentMethod paymentId={this.state.popUp.paymentId} showToast={this.props.showToast}/>;
                    break;
                case this.POP_UP_TYPE.EDIT_STATUS:
                    popUp = <PaymentStatus paymentId={this.state.popUp.paymentId} showToast={this.props.showToast}/>;
                    break;
                default:
                    popUp = null;
            }
        }
        return (
            <div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Moneda</th>
                        <th>Monto</th>
                        <th>Metodo de pago</th>
                        <th>Estado Actual</th>
                        <th>Última actualización</th>
                        <th>Modificar</th>
                    </tr>
                    {payments}
                </table>
                <div className={this.state.popUp.show ? "pop-up" : null} onClick={this.onPopUpDismiss}>
                    <div onClick={e => e.stopPropagation()}>
                        {popUp}
                    </div>
                </div>
            </div>
        );
    }
};
