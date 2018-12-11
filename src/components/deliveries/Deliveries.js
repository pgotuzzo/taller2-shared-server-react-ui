import React, {Component} from 'react';
import {SharedServerService} from "../../di";
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
			filteredDeliveries: [],
            popUp: {
                show: false,
            },
			filter: {
				id: '',
				estado: ''
			}
        }
        ;
        // Events Listeners
        this.fetchDeliveries = this.fetchDeliveries.bind(this);
        this.showHistory = this.showHistory.bind(this);
        this.onPopUpDismiss = this.onPopUpDismiss.bind(this);
		this.filterDeliveries = this.filterDeliveries.bind(this);
    }

    componentDidMount() {
        this.fetchDeliveries();
    }

    fetchDeliveries() {
        SharedServerService.getDeliveries(response => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({deliveries: data});
					this.filterDeliveries();
                });
            } else {
                response.json().then((data) => {
                    const title = "Fallo la carga de envios!";
                    const desc = data.message;
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

	filterDeliveries() {
		const filteredDeliveries = this.state.deliveries.filter((item) => {
			var isValid = true;
			if (this.state.filter.id)
				isValid &= item.id.toString().indexOf(this.state.filter.id) != -1;
			if (this.state.filter.estado)
				isValid &= item.status.toLowerCase().indexOf(this.state.filter.estado.toLowerCase()) != -1;
			return isValid;
		});
		this.setState({filteredDeliveries: filteredDeliveries});
	}

	onFilterChange(property, value) {
		var newFilter = this.state.filter;
		newFilter[property] = value;
		this.setState({
				filter: newFilter
		});
		setTimeout(
		    function() {
		        this.filterDeliveries();
		    }
		    .bind(this),
		    100
		);
	}

    render() {
        const deliveries = this.state.filteredDeliveries.map((item) => {
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
                    popUp = <DeliveryEdit deliveryId={this.state.popUp.deliveryId} showToast={this.props.showToast}/>;
                    break;
                case this.POP_UP_TYPE.HISTORY:
                    popUp = <DeliveryHistory deliveryId={this.state.popUp.deliveryId} showToast={this.props.showToast}/>;
                    break;
                default:
                    popUp = null;
            }
        }
        return (
            <div>
				<div className="filter">
					<input placeholder={"ID"} onChange={e => this.onFilterChange('id', e.target.value)}/>
					<input placeholder={"Estado"} onChange={e => this.onFilterChange('estado', e.target.value)}/>
				</div>
                <table>
					<thead>
	                    <tr>
	                        <th>ID</th>
	                        <th>Estado Actual</th>
	                        <th>Actualizar</th>
	                        <th>Historial</th>
	                    </tr>
					</thead>
					<tbody>
                    	{deliveries}
					</tbody>
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
