import React, {Component} from 'react';
import "./Dashboard.css";
import ExitBtnImg from "../../images/ic_exit.png";
import UserImg from "../../images/ic_user.png";
import {Session} from "../../di";
import Home from "../home/Home";
import Deliveries from "../deliveries/Deliveries";
import Payments from "../payments/Payments";
import AppServers from "../appservers/AppServers";

export default class Dashboard extends Component {

    SECTIONS = {"HOME": 0, "PAYMENTS": 1, "DELIVERIES": 2, "APP_SERVERS": 3, "ANALYTICS": 4};

    constructor(props) {
        super(props);
        // State
        this.state = {
            section: this.SECTIONS.HOME
        }
        ;
        // Events Listeners
        this.showSection = this.showSection.bind(this);
    }

    showSection(sectionId) {
        this.setState({section: sectionId});
    }

    render() {
        const defaultClass = "option";
        const selectedClass = "option-selected";
        let content = null;
        let homeClass = defaultClass;
        let paymentClass = defaultClass;
        let deliveryClass = defaultClass;
        let appServerClass = defaultClass;
        let analyticsClass = defaultClass;
        switch (this.state.section) {
            case this.SECTIONS.HOME:
                content = <Home/>;
                homeClass = selectedClass;
                break;
            case this.SECTIONS.PAYMENTS:
                content = <Payments/>;
                paymentClass = selectedClass;
                break;
            case this.SECTIONS.DELIVERIES:
                content = <Deliveries/>;
                deliveryClass = selectedClass;
                break;
            case this.SECTIONS.APP_SERVERS:
                content = <AppServers showToast={this.props.showToast}/>;
                appServerClass = selectedClass;
                break;
            case this.SECTIONS.ANALYTICS:
                analyticsClass = selectedClass;
                break;
        }
        return (
            <div>
                <header>
                    <div className={"box"}>
                        <div className={"box-left"}>
                            <img className={"user-img"} alt="" src={UserImg}/>
                            <span>{Session.getUserName()}</span>
                        </div>
                        <div className={"box-center"}>
                            <div className={homeClass} onClick={() => this.showSection(this.SECTIONS.HOME)}>
                                <span>Inicio</span>
                            </div>
                            <div className={paymentClass} onClick={() => this.showSection(this.SECTIONS.PAYMENTS)}>
                                <span>Pagos</span>
                            </div>
                            <div className={deliveryClass} onClick={() => this.showSection(this.SECTIONS.DELIVERIES)}>
                                <span>Envios</span>
                            </div>
                            <div className={appServerClass} onClick={() => this.showSection(this.SECTIONS.APP_SERVERS)}>
                                <span>App Servers</span>
                            </div>
                            <div className={analyticsClass} onClick={() => this.showSection(this.SECTIONS.ANALYTICS)}>
                                <span>Estadisticas</span>
                            </div>
                        </div>
                        <div className={"box-right"}>
                            <img className={"sign-out-btn"} alt="" src={ExitBtnImg}
                                 onClick={this.props.onUserSignedOut}/>
                            <span className={"sign-out-label"}
                                  onClick={this.props.onUserSignedOut}>Cerrar Session</span>
                        </div>
                    </div>
                </header>
                {content}
            </div>
        );
    }
}