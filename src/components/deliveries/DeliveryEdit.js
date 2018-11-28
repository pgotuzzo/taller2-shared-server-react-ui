import React, {Component} from 'react';
import {SharedServerService} from "../../di";

export default class DeliveryEdit extends Component {

    OPTIONS = {PENDING: "PENDIENTE", IN_TRANSIT: "EN_TRANSITO", DELIVERED: "ENTREGADO", CANCELED: "CANCELADO"};

    constructor(props) {
        super(props);
        // Initial State
        this.state = {current: null};
        // Event Listeners
        this.fetchHistory = this.fetchHistory.bind(this);
        this.onStatusSelected = this.onStatusSelected.bind(this);
    }

    componentDidMount() {
        this.fetchHistory();
    }

    fetchHistory() {
        SharedServerService.getDelivery(this.props.deliveryId, response => {
            if (response.ok) {
                response.json().then((data) => {
                    const status = data[0].status;
                    this.setState({current: status});
                });
            } else {
                response.json().then((data) => {
                    const title = "Fallo la carga de estados!";
                    const desc = data.message;
                    this.props.showToast(title, desc);
                });
            }
        });
    }

    onStatusSelected(event) {
        const status = event.target.value;
        SharedServerService.setDeliveryStatus(this.props.deliveryId, status, response => {
            if (response.ok) {
                response.json().then(() => {
                    this.setState({current: status});
                });
            } else {
                response.json().then((data) => {
                    const title = "Fallo la actualizacion del estado!";
					const desc = data.message;
                    this.props.showToast(title, desc);
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
                        <td>{this.props.deliveryId}</td>
                        <td className={"editItem"}>
                            <select value={this.state.current}
                                    onChange={this.onStatusSelected}>
                                <option value={this.OPTIONS.PENDING}>{this.OPTIONS.PENDING}</option>
                                <option value={this.OPTIONS.IN_TRANSIT}>{this.OPTIONS.IN_TRANSIT}</option>
                                <option value={this.OPTIONS.DELIVERED}>{this.OPTIONS.DELIVERED}</option>
                                <option value={this.OPTIONS.CANCELED}>{this.OPTIONS.CANCELED}</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
            : null;
    }
}
