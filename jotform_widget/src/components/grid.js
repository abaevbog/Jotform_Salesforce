import React, { Component } from 'react';
import './lead_row';
import LeadRow from './lead_row';
import { Row , Button } from 'react-bootstrap';
class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {leads: props.leads, selected:null, rows: []};
        this.setSelectedEmail = this.setSelectedEmail.bind(this);
      }
 
    
    componentDidMount(){
        var lst = [];
        this.state.leads.forEach((lead) => {
            var addr = lead["Address"]["street"] + ',' + lead["Address"]["city"] + ',' + lead["Address"]["state"] + ',' + lead["Address"]["postalCode"];
            lst.push(<LeadRow key={lead["Email"]} Id={lead["Id"]} name={lead["Name"]} email={lead["Email"]} address={addr} setSelectedEmail={this.setSelectedEmail} selectedEmail={this.state.selected}> </LeadRow> )
        });
        this.setState({rows:lst});

        window.JFCustomWidget.subscribe("submit", (e) => {
            var msg = {
                valid: true,
                value: this.state.selected
            }
            // send value to JotForm
            window.JFCustomWidget.sendSubmit(msg);
        });
    }  

    setSelectedEmail(newEmail){
        var lst = [];
        this.state.leads.forEach((lead) => {
            var addr = lead["Address"]["street"] + ',' + lead["Address"]["city"] + ',' + lead["Address"]["state"] + ',' + lead["Address"]["postalCode"];
            lst.push(<LeadRow key={lead["Email"]} Id={lead["Id"]} name={lead["Name"]} email={lead["Email"]} address={addr} setSelectedEmail={this.setSelectedEmail} selectedEmail={newEmail}> </LeadRow> )
        });
        this.setState({rows:lst,selected:newEmail});
        window.JFCustomWidget.sendData({value:newEmail});
    }

  

    render() {
        return (
        <div className="container">
            <Row className="justify-content-md-center" >
                {this.state.leads.length>0?<div className="table-wrapper-scroll-y my-custom-scrollbar">

                    <table className="table table-bordered mb-0 ">
                        <thead >
                            <tr className="base">
                                <th scope="col-sm">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.rows}
                        </tbody>
                    </table>
                </div>:<h3>No clients found</h3> }
            </Row>
            <Row className="justify-content-md-center" >
                <div className="col align-self-center">
                    <Button id="button" onClick={this.props.backToSearch}>Go back to search</Button>
                </div>
            </Row>
        </div>
        );
    }

}
export default Grid;