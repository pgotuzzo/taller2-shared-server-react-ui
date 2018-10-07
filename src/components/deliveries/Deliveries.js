import React, {Component} from 'react';
import {SharedServerService} from "../../di";
import "./Deliveries.css"
import EditImg from "../../images/ic_settings.png";
import InfoImg from "../../images/ic_info.png";
import DeliveryHistory from "./DeliveryHistory";
import DeliveryEdit from "./DeliveryEdit";

export default class Deliveries extends Component {

    POP_UP_TYPE = {HISTORY: 0, EDIT: 1};

    constructor(props) {
        super(props);
        this.state = {
            deliveries: [],
            popUp: {
                show: false,
            }
        }
        ;
        // Events Listeners
        this.fetchDeliveries = this.fetchDeliveries.bind(this);
        this.showHistory = this.showHistory.bind(this);
        this.onPopUpDismiss = this.onPopUpDismiss.bind(this);
    }

    componentDidMount() {
        this.fetchDeliveries();
    }

    fetchDeliveries() {
        SharedServerService.getDeliveries(response => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({deliveries: data});
                });
            } else {
                response.json().then(() => {
                    const title = "Fallo la carga de envios!";
                    const desc = "Por favor vuelva a intentarlo nuevamente!";
                    this.props.showToast(title, desc);
                });
            }
        });
    }

    showHistory(deliveryId, type) {
        this.setState({
            popUp: {
                show: true,
                type: type,
                deliveryId: deliveryId
            }
        });
    }

    onPopUpDismiss() {
        if (this.state.popUp.type === this.POP_UP_TYPE.EDIT) {
            // Update content
            this.fetchDeliveries();
        }
        // Remove pop up
        this.setState({
            popUp: {
                show: false
            }
        });
    }

    render() {
        const deliveries = this.state.deliveries.map((item) => {
            return <tr>
                <td>{item.id}</td>
                <td>{item.status}</td>
                <td><img className={"img-btn"} alt="" src={EditImg}
                         onClick={() => this.showHistory(item.id, this.POP_UP_TYPE.EDIT)}/></td>
                <td><img className={"img-btn"} alt="" src={InfoImg}
                         onClick={() => this.showHistory(item.id, this.POP_UP_TYPE.HISTORY)}/></td>
            </tr>
        });
        let popUp = null;
        if (this.state.popUp.show) {
            switch (this.state.popUp.type) {
                case this.POP_UP_TYPE.EDIT:
                    popUp = <DeliveryEdit deliveryId={this.state.popUp.deliveryId}/>;
                    break;
                case this.POP_UP_TYPE.HISTORY:
                    popUp = <DeliveryHistory deliveryId={this.state.popUp.deliveryId}/>;
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
                        <th>Estado Actual</th>
                        <th>Modificar</th>
                        <th>Historial</th>
                    </tr>
                    {deliveries}
                </table>
                <div className={this.state.popUp.show ? "pop-up" : null} onClick={this.onPopUpDismiss}>
                    <div onClick={e => e.stopPropagation()}>
                        {popUp}
                    </div>
                </div>
            </div>
        );
    }
}