import React, { Component } from 'react';
import $ from 'jquery';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

class Input extends Component {

constructor(props) {
    super(props);
    this.state = { password: props.password,input:"",results:[], loading:false, emptyInput:false};
    this.handleChange = this.handleChange.bind(this);
    this.querySalesForce = this.querySalesForce.bind(this);
    this.sendLeadsBack = this.sendLeadsBack.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
}

handleChange(event) {
    console.log(event.target.value);
    this.setState({input: event.target.value});
}

sendLeadsBack(records){
    this.props.setLeads(records);
}

handleKeyDown(event){
    if (event.key === 'Enter') {
        this.querySalesForce(this);
    }
  }


    
querySalesForce(that) {
    if (this.state.input.length > 0){
        that.setState({loading:true,emptyInput:false});
        $.ajax({
            url: "https://zlf1wgdua9.execute-api.us-east-1.amazonaws.com/jotform/jotformproxy",
            method: 'POST',
            data: JSON.stringify({ 'Value': this.state.input, "Verif": this.state.password }),
            success: function (response) {
                console.log(response);
                var data = JSON.parse(response);
                var records = JSON.parse(data).records;
                that.sendLeadsBack(records);
            }
        });
    } else {
        that.setState({emptyInput:true});
    }
}

render() {
    return (
    <div className="container">
        {this.state.loading? <div className="row">
            <div className="col align-self-center">
                 Loading lead ... 
            </div>
        </div> :null }
        {this.state.emptyInput? <div className="row">
            <div className="col align-self-center">
                 Input cannot be empty
            </div>
        </div> :null }
        <div className="row">
            <div className="col-sm-4">Client's last name or email:</div>
            <div className="col-sm-8">
                <input className="input" onChange={this.handleChange} onKeyDown={this.handleKeyDown}></input>
            </div>
        </div>
        <div className="row">
          <div className="col align-self-center">
            <div className="buttons">
                <Button id="button" onClick={() => this.querySalesForce(this)}>Search client</Button>
            </div>
          </div>
        </div>    
    </div>
    );
}

}
export default Input;