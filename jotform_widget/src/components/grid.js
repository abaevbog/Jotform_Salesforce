import React, { Component } from 'react';
import './lead_row';
import LeadRow from './lead_row';

class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {leads: props.leads, selected:null, rows: []};
        this.setSelectedEmail = this.setSelectedEmail.bind(this);
      }
    
    componentDidMount(){
        var lst = [];
        // this.state.leads.forEach((lead) => {
        //     var addr = lead["Address"]["street"] + ',' + lead["Address"]["city"] + ',' + lead["Address"]["state"] + ',' + lead["Address"]["postalCode"];
        //     lst.push(<LeadRow name={lead["Name"]} email={lead["Email"]} address={addr}> </LeadRow> )
        // });
        for (var i =0;i<5;i++){
            lst.push(<LeadRow name={"SomeName"} email={i+"email@kuku.com"} address={"This address is suuper long like the longeder theins ever"} setSelectedEmail={this.setSelectedEmail}> </LeadRow> )
        }
        console.log(lst);
        this.setState({rows:lst});
    }  

    setSelectedEmail(email){
        this.setState({selected:email});
        console.log(email);
    }


    render() {
        return (
            <div className="table-wrapper-scroll-y my-custom-scrollbar">

                <table className="table table-bordered mb-0 table-hover">
                    <thead className="thead-dark">
                        <tr>
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
        );
    }

}
export default Grid;