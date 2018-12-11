import React, {Component} from 'react';
import Moment from 'react-moment';
import {SharedServerService} from "../../di";
import "./AppServers.css"
import RemoveImg from "../../images/ic_trash.png";
import EditImg from "../../images/ic_settings.png";
import AddImg from "../../images/ic_add.png";
import AddServer from "./AddServer";
import DeleteServer from "./DeleteServer";
import UpdateServer from "./UpdateServer";

export default class AppServers extends Component {

    POP_UP_TYPE = {ADD: 0, EDIT: 1, REMOVE: 2};

    constructor(props) {
        super(props);
        this.state = {
            servers: [],
			filteredServers: [],
            popUp: {
                show: false,
            },
			filter: {
				id: '',
				nombre: '',
				creador: ''
			}
        }
        ;
        // Events Listeners
        this.fetchServers = this.fetchServers.bind(this);
        this.addServer = this.addServer.bind(this);
        this.editServer = this.editServer.bind(this);
        this.removeServer = this.removeServer.bind(this);
        this.onPopUpDismiss = this.onPopUpDismiss.bind(this);
		this.filterServers = this.filterServers.bind(this);
    }

    componentDidMount() {
        this.fetchServers();
    }

    fetchServers() {
        SharedServerService.getAppServers(response => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({servers: data.servers});
					this.filterServers();
                });
            } else {
                response.json().then((data) => {
                    const title = "Fallo la carga de app servers!";
                    const desc = data.message;
                    this.props.showToast(title, desc);
                });
            }
        });
    }

    addServer() {
        this.setState({
            popUp: {
                show: true,
                type: this.POP_UP_TYPE.ADD
            }
        });
    }

    editServer(serverId, name, rev) {
        this.setState({
            popUp: {
                show: true,
                type: this.POP_UP_TYPE.EDIT,
                serverId: serverId,
				serverName: name,
				serverRev: rev
            }
        });
    }

    removeServer(serverId) {
        this.setState({
            popUp: {
                show: true,
                type: this.POP_UP_TYPE.REMOVE,
                serverId: serverId
            }
        });
    }

    onPopUpDismiss() {
        // Update content
        this.fetchServers();
        // Remove pop up
        this.setState({
            popUp: {
                show: false
            }
        });
    }

	filterServers() {
		const filteredServers = this.state.servers.filter((item) => {
			var isValid = true;
			if (this.state.filter.id)
				isValid &= item.id.toString().indexOf(this.state.filter.id) != -1;
			if (this.state.filter.nombre)
				isValid &= item.name.toLowerCase().indexOf(this.state.filter.nombre.toLowerCase()) != -1;
			if (this.state.filter.creador)
				isValid &= item.createdBy.toLowerCase().indexOf(this.state.filter.creador.toLowerCase()) != -1;
			return isValid;
		});
		this.setState({filteredServers: filteredServers});
	}

	onFilterChange(property, value) {
		var newFilter = this.state.filter;
		newFilter[property] = value;
		this.setState({
				filter: newFilter
		});
		setTimeout(
		    function() {
		        this.filterServers();
		    }
		    .bind(this),
		    100
		);
	}

    render() {
        const servers = this.state.filteredServers.map((item) => {
            return <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item._rev}</td>
                <td>{item.createdBy}</td>
                <td><Moment date={item.createdTime} format="DD/MM/YYYY HH:mm:SS" /></td>
                <td><img className={"img-btn"} alt="" src={EditImg}
                         onClick={() => this.editServer(item.id, item.name, item._rev)}/></td>
                <td><img className={"img-btn"} alt="" src={RemoveImg}
                         onClick={() => this.removeServer(item.id)}/></td>
            </tr>
        });
        let popUp = null;
        if (this.state.popUp.show) {
            switch (this.state.popUp.type) {
                case this.POP_UP_TYPE.ADD:
                    popUp = <AddServer dismiss={this.onPopUpDismiss} showToast={this.props.showToast}/>;
                    break;
                case this.POP_UP_TYPE.EDIT:
                    popUp = <UpdateServer serverId={this.state.popUp.serverId} serverName={this.state.popUp.serverName} rev={this.state.popUp.serverRev} dismiss={this.onPopUpDismiss} showToast={this.props.showToast}/>;
                    break;
                case this.POP_UP_TYPE.REMOVE:
                    popUp = <DeleteServer serverId={this.state.popUp.serverId} dismiss={this.onPopUpDismiss} showToast={this.props.showToast}/>;
                    break;
                default:
                    popUp = null;
            }
        }
        return (
            <div>
				<div className="filter">
					<input placeholder={"ID"} onChange={e => this.onFilterChange('id', e.target.value)}/>
					<input placeholder={"Nombre"} onChange={e => this.onFilterChange('nombre', e.target.value)}/>
					<input placeholder={"Creador"} onChange={e => this.onFilterChange('creador', e.target.value)}/>
				</div>
                <table>
					<thead>
	                    <tr>
	                        <th>ID</th>
	                        <th>Nombre</th>
	                        <th>Revision</th>
	                        <th>Creador</th>
	                        <th>Fecha de Creacion</th>
	                        <th>Editar</th>
	                        <th>Eliminar</th>
	                    </tr>
					</thead>
					<tbody>
                    	{servers}
					</tbody>
                </table>
                <div className={"add-btn-box"}>
                    <img className={"img-btn"} alt="" src={AddImg}
                         onClick={this.addServer}/>
                    <span onClick={this.addServer}>Crear App Server</span>
                </div>
                <div className={this.state.popUp.show ? "pop-up" : null} onClick={this.onPopUpDismiss}>
                    <div onClick={e => e.stopPropagation()}>
                        {popUp}
                    </div>
                </div>
            </div>
        );
    }
}
