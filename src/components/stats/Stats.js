import React, {Component} from 'react';
import {SharedServerService} from "../../di";
import InfoImg from "../../images/ic_info.png";
import EditImg from "../../images/ic_settings.png";

export default class Stats extends Component {

    constructor(props) {
        super(props);
        // Initial State
        this.state = {
            requests: []
        };
        // Events Listeners
        this.fetchRequests = this.fetchRequests.bind(this);
    }

    componentDidMount() {
        this.fetchRequests();
    }

    fetchRequests() {
        SharedServerService.getRequests(response => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({requests: data});
                });
            } else {
                response.json().then((data) => {
                    const title = "Fallo la carga de Estadisticas!";
					const desc = data.message;
                    this.props.showToast(title, desc);
                });
            }
        });
    }

    render() {
        const requests = this.state.requests.map((item) => {
            return <tr>
                <td>{item.method} {item.url}</td>
                <td>{item.statusCode}</td>
                <td>{item.total}</td>
                <td>{parseInt(item.avg * 100) / 100}</td>
                <td>{item.min}</td>
                <td>{item.max}</td>
            </tr>
        });
        return (
            <div>
                <table>
                    <tr>
                        <th>Endpoint</th>
                        <th>Status Code</th>
                        <th>Total requests</th>
                        <th>Avg Time</th>
                        <th>Min Time</th>
                        <th>Max Time</th>
                    </tr>
                    {requests}
                </table>
            </div>
        );
    }
};
