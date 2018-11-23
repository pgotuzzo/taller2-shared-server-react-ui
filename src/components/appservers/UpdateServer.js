import React, {Component} from 'react';
import {Session, SharedServerService} from "../../di";
import ConfirmImg from "../../images/ic_check.png";
import "./AppServers.css"

export default class UpdateServer extends Component {

    constructor(props) {
        super(props);
		this.state = {
			serverName: this.props.serverName
		}
        // Events Listeners
        this.updateServer = this.updateServer.bind(this);
    }

	onInputChange(serverName) {
        const show = serverName !== null && serverName !== '';
        this.setState({
            serverName: serverName,
            showConfirmBtn: show
        })
    }

    updateServer() {
		SharedServerService.updateAppServer(this.props.serverId, this.state.serverName, this.props.rev, response => {
			if (response.ok) {
                this.props.dismiss();
            } else {
                response.json().then((data) => {
                    const title = "Fallo la actualizacion del app server!";
                    const desc = data.message;
					alert(desc);
                    // this.props.showToast(title, desc);
                });
            }
		});
	}

    render() {
		const button = this.state.showConfirmBtn ?
            <img alt="" src={ConfirmImg} onClick={this.updateServer}/>
            : null;
        return (
            <div className={"add-server-modal-box"}>
                <input placeholder={"Ingresar nombre del App Server"} value={this.state.serverName}
                       onChange={e => this.onInputChange(e.target.value)}/>
                {button}
            </div>
        );
    }
}
