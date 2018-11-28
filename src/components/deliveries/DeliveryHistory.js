import React, {Component} from 'react';
import {SharedServerService} from "../../di";

export default class DeliveryHistory extends Component {

    constructor(props) {
        super(props);
        // Initial State
        this.state = {history: []};
        // Event Listeners
        this.fetchHistory = this.fetchHistory.bind(this);
    }

    componentDidMount() {
        this.fetchHistory();
    }

    fetchHistory() {
        SharedServerService.getDelivery(this.props.deliveryId, response => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({history: data});
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

    render() {
        const history = this.state.history.map((item) => {
            return <tr>
                <td>{item.status}</td>
                <td>{item.updateat}</td>
            </tr>
        });
        return (
            <div>
                <table>
                    <tr>
                        <th>Estados</th>
                        <th>Fecha</th>
                    </tr>
                    {history}
                </table>
            </div>
        );
    }
}
