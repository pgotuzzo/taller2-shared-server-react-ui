import React, {Component} from 'react';
import {SharedServerService} from "../../di";
import "./Deliveries.css"

export default class DeliveryEdit extends Component {

    OPTIONS = {PENDING: "PENDIENTE", IN_TRANSIT: "EN_TRANSITO"};

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
                response.json().then(() => {
                    const title = "Fallo la carga de estados!";
                    const desc = "Por favor vuelva a intentarlo nuevamente!";
                    // this.props.showToast(title, desc);
                });
            }
        });
    }

    onStatusSelected(event) {
        const state = event.target.value;
        this.setState({current: state});
        /*
        SharedServerService.setDeliveryState(status, response => {
            if (response.ok) {
                response.json().then(() => {
                    this.setState({current: status});
                    this.props.showToast("", "");
                });
            } else {
                response.json().then(() => {
                    const title = "Fallo la actualizacion del estado!";
                    // this.props.showToast(title, desc);
                });
            }
        });
        */
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
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
            : null;
    }
}