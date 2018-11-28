import React, {Component} from 'react';
import {Session, SharedServerService} from "../../di";
import ConfirmImg from "../../images/ic_check.png";
import "./AppServers.css"

export default class AddServer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serverName: null,
            showConfirmBtn: false
        }
        ;
        // Events Listeners
        this.createServer = this.createServer.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(serverName) {
        const show = serverName !== null && serverName !== '';
        this.setState({
            serverName: serverName,
            showConfirmBtn: show
        })
    }

    createServer() {
        const userName = Session.getUserName();
        const serverName = this.state.serverName;
        SharedServerService.addAppServers(userName, serverName, response => {
            if (response.ok) {
                response.json().then(() => {
                    this.props.dismiss();
                });
            } else {
                response.json().then((data) => {
                    const title = "Fallo la creacion del app servers!";
                    const desc = data.message;
                    this.props.showToast(title, desc);
                });
            }
        });
    }

    render() {
        const button = this.state.showConfirmBtn ?
            <img alt="" src={ConfirmImg} onClick={this.createServer}/>
            : null;
        return (
            <div className={"add-server-modal-box"}>
                <input placeholder={"Ingresar nombre del App Server"}
                       onChange={e => this.onInputChange(e.target.value)}/>
                {button}
            </div>
        );
    }
}
