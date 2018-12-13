import React, {Component} from 'react';
import {SharedServerService} from "../../di";
import "./Rules.css"
import RemoveImg from "../../images/ic_trash.png";
import EditImg from "../../images/ic_settings.png";
import AddImg from "../../images/ic_add.png";
import AddRule from "./AddRule";
import DeleteRule from "./DeleteRule";
import UpdateRule from "./UpdateRule";

export default class Rules extends Component {

    POP_UP_TYPE = {ADD: 0, EDIT: 1, REMOVE: 2};

    constructor(props) {
        super(props);
        this.state = {
            rules: [],
			filteredRules: [],
            popUp: {
                show: false,
            },
			filter: {
				description: '',
				condition: '',
				type: ''
			}
        }
        ;
        // Events Listeners
        this.fetchRules = this.fetchRules.bind(this);
        this.addRule = this.addRule.bind(this);
        this.editRule = this.editRule.bind(this);
        this.removeRule = this.removeRule.bind(this);
        this.onPopUpDismiss = this.onPopUpDismiss.bind(this);
		this.filterRules = this.filterRules.bind(this);
    }

    componentDidMount() {
        this.fetchRules();
    }

    fetchRules() {
        SharedServerService.getRules(response => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({rules: data});
					this.filterRules();
                });
            } else {
                response.json().then((data) => {
                    const title = "Fallo la carga de reglas!";
                    const desc = data.message;
                    this.props.showToast(title, desc);
                });
            }
        });
    }

    addRule() {
        this.setState({
            popUp: {
                show: true,
                type: this.POP_UP_TYPE.ADD
            }
        });
    }

    editRule(rule) {
        this.setState({
            popUp: {
                show: true,
                type: this.POP_UP_TYPE.EDIT,
                rule: rule
            }
        });
    }

    removeRule(ruleId) {
        this.setState({
            popUp: {
                show: true,
                type: this.POP_UP_TYPE.REMOVE,
                ruleId: ruleId
            }
        });
    }

    onPopUpDismiss() {
        // Update content
        this.fetchRules();
        // Remove pop up
        this.setState({
            popUp: {
                show: false
            }
        });
    }

	filterRules() {
		const filteredRules = this.state.rules.filter((item) => {
			var isValid = true;
			if (this.state.filter.description)
				isValid &= item.description.toLowerCase().indexOf(this.state.filter.description.toLowerCase()) != -1;
			if (this.state.filter.condition)
				isValid &= item.condition.toLowerCase().indexOf(this.state.filter.condition.toLowerCase()) != -1;
			if (this.state.filter.type)
				isValid &= item.type.toLowerCase().indexOf(this.state.filter.type.toLowerCase()) != -1;
			return isValid;
		});
		this.setState({filteredRules: filteredRules});
	}

	onFilterChange(property, value) {
		var newFilter = this.state.filter;
		newFilter[property] = value;
		this.setState({
				filter: newFilter
		});
		setTimeout(
		    function() {
		        this.filterRules();
		    }
		    .bind(this),
		    100
		);
	}

    render() {
        const rules = this.state.filteredRules.map((item) => {
            return <tr>
				<td>{item.position}</td>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>{item.condition}</td>
				<td>{item.type}</td>
				<td>{item.value}</td>
				<td>{item.property}</td>
                <td><img className={"img-btn"} alt="" src={EditImg}
                         onClick={() => this.editRule(item)}/></td>
                <td><img className={"img-btn"} alt="" src={RemoveImg}
                         onClick={() => this.removeRule(item.id)}/></td>
            </tr>
        });
        let popUp = null;
        if (this.state.popUp.show) {
            switch (this.state.popUp.type) {
                case this.POP_UP_TYPE.ADD:
                    popUp = <AddRule dismiss={this.onPopUpDismiss} showToast={this.props.showToast}/>;
                    break;
                case this.POP_UP_TYPE.EDIT:
                    popUp = <UpdateRule rule={this.state.popUp.rule} dismiss={this.onPopUpDismiss} showToast={this.props.showToast}/>;
                    break;
                case this.POP_UP_TYPE.REMOVE:
                    popUp = <DeleteRule ruleId={this.state.popUp.ruleId} dismiss={this.onPopUpDismiss} showToast={this.props.showToast}/>;
                    break;
                default:
                    popUp = null;
            }
        }
        return (
            <div>
				<div className="filter">
					<input placeholder={"Descripción"} onChange={e => this.onFilterChange('description', e.target.value)}/>
					<input placeholder={"Condición"} onChange={e => this.onFilterChange('condition', e.target.value)}/>
					<input placeholder={"Tipo"} onChange={e => this.onFilterChange('type', e.target.value)}/>
				</div>
                <table>
					<thead>
	                    <tr>
	                        <th>Posición</th>
	                        <th>ID</th>
	                        <th>Descripción</th>
	                        <th>Condición</th>
	                        <th>Tipo</th>
	                        <th>Valor</th>
	                        <th>Property</th>
	                        <th>Editar</th>
	                        <th>Eliminar</th>
	                    </tr>
					</thead>
					<tbody>
                    	{rules}
					</tbody>
                </table>
                <div className={"add-btn-box"}>
                    <img className={"img-btn"} alt="" src={AddImg}
                         onClick={this.addRule}/>
                    <span onClick={this.addRule}>Crear Regla</span>
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
