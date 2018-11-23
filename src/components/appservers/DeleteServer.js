import React, {Component} from 'react';
import {Session, SharedServerService} from "../../di";
import ConfirmImg from "../../images/ic_check.png";
import "./AppServers.css"

export default class DeleteServer extends Component {

    constructor(props) {
        super(props);
        // Events Listeners
        this.deleteServer = this.deleteServer.bind(this);
    }

    deleteServer() {
		SharedServerService.deleteAppServer(this.props.serverId, response => {
			if (response.ok) {
                this.props.dismiss();
            } else {
                response.json().then(() => {
                    const title = "Fallo la eliminacion del app servers!";
                    const desc = "Por favor vuelva a intentarlo nuevamente!";
                    this.props.showToast(title, desc);
                });
            }
		});
	}

    render() {
		const serverId = this.props.serverId;
        return (
            <div className={"add-server-modal-box"}>
                <span>¿Está seguro que desea eliminar el App Server {serverId}?</span>
                <img alt="" src={ConfirmImg} onClick={this.deleteServer}/>
            </div>
        );
    }
}
