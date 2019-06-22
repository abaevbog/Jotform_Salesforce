import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class LeadRow extends Component {
    constructor(props){
        super(props);
    this.sendEmail = this.sendEmail.bind(this);
    }

    sendEmail(event){
        const found = ReactDOM.findDOMNode(event.target).parentNode.childNodes[1].textContent;
        console.log(found);
        event.target.set
        this.props.setSelectedEmail(found);
    }
    render() {
        return (
            <tr className="slide" onClick={this.sendEmail}> 
                <th scope="row">{this.props.name}</th>
                <td>{this.props.email}</td>
                <td>{this.props.address}</td>
            </tr>
        );
    }

}
export default LeadRow;