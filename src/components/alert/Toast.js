import React, {Component} from 'react';
import "./Toast.css";

export default class Toast extends Component {

    render() {
        return <div className={"main"}>
            <span className={"close-btn"} onClick={this.props.onCloseBtnClick}>&times;</span>
            <span className={"text"}><strong>{this.props.message.title}</strong> {this.props.message.description}</span>
        </div>
    }

}