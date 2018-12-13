import React, {Component} from 'react';
import {Session, SharedServerService} from "../../di";
import ConfirmImg from "../../images/ic_check.png";
import "./Rules.css"

export default class UpdateRule extends Component {

    constructor(props) {
        super(props);
		this.state = {
			id: this.props.rule.id,
			description: this.props.rule.description,
			position: this.props.rule.position,
			condition: this.props.rule.condition,
			type: this.props.rule.type,
			value: this.props.rule.value,
			property: this.props.rule.property
		}
        // Events Listeners
        this.updateRule = this.updateRule.bind(this);
    }

	onInputChange(property, value) {
		const newState = {};
		newState[property] = value;
        this.setState(newState);
    }

    updateRule() {
		SharedServerService.updateRule(this.state, response => {
			if (response.ok) {
                this.props.dismiss();
            } else {
                response.json().then((data) => {
                    const title = "Fallo la actualizacion de la regla!";
                    const desc = data.message;
                    this.props.showToast(title, desc);
                });
            }
		});
	}

    render() {
		const button = this.state.showConfirmBtn ?
            <img alt="" src={ConfirmImg} onClick={this.updateServer}/>
            : null;
        return (
			<div className={"add-rule-modal-box"}>
                <input placeholder={"Descripción"} value={this.state.description} onChange={e => this.onInputChange('description', e.target.value)}/>
				<input placeholder={"Posición"} value={this.state.position} onChange={e => this.onInputChange('position', e.target.value)}/>
				<input placeholder={"Condición"} value={this.state.condition} onChange={e => this.onInputChange('condition', e.target.value)}/>
				<input placeholder={"Tipo"} value={this.state.type} onChange={e => this.onInputChange('type', e.target.value)}/>
				<input placeholder={"Valor"} value={this.state.value} onChange={e => this.onInputChange('value', e.target.value)}/>
				<input placeholder={"Propiedad"} value={this.state.property} onChange={e => this.onInputChange('property', e.target.value)}/>
                <img alt="" src={ConfirmImg} onClick={this.updateRule}/>
            </div>
        );
    }
}
