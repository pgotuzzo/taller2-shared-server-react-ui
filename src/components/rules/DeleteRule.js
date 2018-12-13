import React, {Component} from 'react';
import {Session, SharedServerService} from "../../di";
import ConfirmImg from "../../images/ic_check.png";
import "./Rules.css"

export default class DeleteRule extends Component {

    constructor(props) {
        super(props);
        // Events Listeners
        this.deleteRule = this.deleteRule.bind(this);
    }

    deleteRule() {
		SharedServerService.deleteRule(this.props.ruleId, response => {
			if (response.ok) {
                this.props.dismiss();
            } else {
                response.json().then((data) => {
                    const title = "Fallo la eliminacion de la regla!";
                    const desc = data.message;
                    this.props.showToast(title, desc);
                });
            }
		});
	}

    render() {
		const ruleId = this.props.ruleId;
        return (
            <div className={"add-rule-modal-box"}>
                <span>¿Está seguro que desea eliminar la regla {ruleId}?</span>
                <img alt="" src={ConfirmImg} onClick={this.deleteRule}/>
            </div>
        );
    }
}
