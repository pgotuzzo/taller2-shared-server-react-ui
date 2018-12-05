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
            popUp: {
                show: false,
            }
        }
        ;
        // Events Listeners
        this.fetchServers = this.fetchServers.bind(this);
        this.addServer = this.addServer.bind(this);
        this.editServer = this.editServer.bind(this);
        this.removeServer = this.removeServer.bind(this);
        this.onPopUpDismiss = this.onPopUpDismiss.bind(this);
    }

    componentDidMount() {
        this.fetchServers();
    }

    fetchServers() {
        SharedServerService.getAppServers(response => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({servers: data.servers});
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

    render() {
        const servers = this.state.servers.map((item) => {
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
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Revision</th>
                        <th>Creador</th>
                        <th>Fecha de Creacion</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                    {servers}
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
