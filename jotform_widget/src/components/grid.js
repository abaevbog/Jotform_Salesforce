import React, { Component } from 'react';
import './lead_row';
import LeadRow from './lead_row';
import { Row , Button } from 'react-bootstrap';
class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {leads: props.leads, selected:null, rows: []};
        this.setSelectedEmail = this.setSelectedEmail.bind(this);
        this.leadClick = this.leadClick.bind(this);
      }

      leadClick(event){
          console.log("LEAD CLICK");
        console.log(event.target);
      }
    
    componentDidMount(){
        var lst = [];
        this.state.leads.forEach((lead) => {
            var addr = lead["Address"]["street"] + ',' + lead["Address"]["city"] + ',' + lead["Address"]["state"] + ',' + lead["Address"]["postalCode"];
            lst.push(<LeadRow key={lead["Email"]} name={lead["Name"]} email={lead["Email"]} address={addr} setSelectedEmail={this.setSelectedEmail} selectedEmail={this.state.selected}> </LeadRow> )
        });
        this.setState({rows:lst});

        window.JFCustomWidget.subscribe("submit", function(){
            var msg = {
                //you should valid attribute to data for JotForm
                //to be able to use youw widget as required
                valid: true,
                value: this.state.selected
            }
            // send value to JotForm
            window.JFCustomWidget.sendSubmit(msg);
        });
    }  

    setSelectedEmail(newEmail){
        var lst = [];
        for (var i =0;i<5;i++){
            lst.push(<LeadRow name={"SomeName"} email={i+"email@kuku.com"} address={"This address is suuper long like the longeder theins ever"} setSelectedEmail={this.setSelectedEmail} selectedEmail={newEmail}> </LeadRow> )
        }
        this.state.leads.forEach((lead) => {
            var addr = lead["Address"]["street"] + ',' + lead["Address"]["city"] + ',' + lead["Address"]["state"] + ',' + lead["Address"]["postalCode"];
            lst.push(<LeadRow key={lead["Email"]} name={lead["Name"]} email={lead["Email"]} address={addr} setSelectedEmail={this.setSelectedEmail} selectedEmail={newEmail}> </LeadRow> )
        });
        console.log("set email");
        this.setState({rows:lst,selected:newEmail});
    }

  

    render() {
        return (
        <div className="container">
            <Row className="justify-content-md-center" >
                <div className="table-wrapper-scroll-y my-custom-scrollbar">

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
                </div>
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