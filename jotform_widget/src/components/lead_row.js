import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class LeadRow extends Component {
    constructor(props){
        super(props);
    this.state = {selected:false, email: "None"};
    this.sendEmail = this.sendEmail.bind(this);
    }



    sendEmail(event){
        const found = ReactDOM.findDOMNode(event.target).parentNode.childNodes[1].textContent;
        this.props.setSelectedEmail(found);
    }




    render() {
        return (
            <tr onClick={this.sendEmail} className={this.props.email == this.props.selectedEmail? "selected":""}> 
                <th scope="row">{this.props.name}</th>
                <td>{this.props.email}</td>
                <td>{this.props.address}</td>
            </tr>
        );
    }

}
export default LeadRow;