import React, {Component} from 'react';
import {Session, SharedServerService} from "../../di";
import ConfirmImg from "../../images/ic_check.png";
import "./Rules.css"

export default class AddRule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: null,
			position: null,
			condition: null,
			type: null,
			value: null,
			property: null
        };
        // Events Listeners
        this.createRule = this.createRule.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(property, value) {
		const newState = {};
		newState[property] = value;
        this.setState(newState);
    }

    createRule() {
        const rule = this.state;
        SharedServerService.addRule(rule, response => {
            if (response.ok) {
                response.json().then(() => {
                    this.props.dismiss();
                });
            } else {
                response.json().then((data) => {
                    const title = "Fallo la creacion de la regla!";
                    const desc = data.message;
                    this.props.showToast(title, desc);
                });
            }
        });
    }

    render() {
        return (
            <div className={"add-rule-modal-box"}>
                <input placeholder={"Descripción"} onChange={e => this.onInputChange('description', e.target.value)}/>
				<input placeholder={"Posición"} onChange={e => this.onInputChange('position', e.target.value)}/>
				<input placeholder={"Condición"} onChange={e => this.onInputChange('condition', e.target.value)}/>
				<input placeholder={"Tipo"} onChange={e => this.onInputChange('type', e.target.value)}/>
				<input placeholder={"Valor"} onChange={e => this.onInputChange('value', e.target.value)}/>
				<input placeholder={"Propiedad"} onChange={e => this.onInputChange('property', e.target.value)}/>
                <img alt="" src={ConfirmImg} onClick={this.createRule}/>
            </div>
        );
    }
}
