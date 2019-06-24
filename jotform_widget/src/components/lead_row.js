import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class LeadRow extends Component {
    constructor(props){
        super(props);
    this.state = {selected:false};
    this.sendEmail = this.sendEmail.bind(this);
    }




    sendEmail(event){
        const found = this.props.Id;
        this.props.setSelectedEmail(found);
    }




    render() {
        return (
            <tr onClick={this.sendEmail} className={this.props.Id == this.props.selectedEmail? "selected":""}> 
                <th scope="row" className="fit">{this.props.name}</th>
                <td className="fit">{this.props.email}</td>
                <td className="fit">{this.props.address}</td>
            </tr>
        );
    }

}
export default LeadRow;