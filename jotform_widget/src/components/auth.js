import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import $ from 'jquery';

class Auth extends Component {

constructor(props) {
    super(props);
    this.state = {password: ""};

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.click = this.click.bind(this);
  }

  handleClick(props, event){
    $.ajax({
      url: "https://zlf1wgdua9.execute-api.us-east-1.amazonaws.com/jotform/jotformproxy",
      method: 'POST',
      data: JSON.stringify({ 'Value': '!', "Verif": this.state.password}),
      success: function (result) {
        console.log(result);
        if (result == "Authorized"){
          console.log("AA");
          props.method(this.state.password);
        }
      } 
    });
}

handleChange(event) {
  this.setState({password: event.target.value});
}


click(){
  this.props.setPassword(this.state.password);
}


render() {
    return (
        
    <div className="container">
        <div className="row">
            <div className="col-sm-4">Password:</div>
            <div className="col-sm-8">
                <input className="input" placeholder="case sensitive" onChange={this.handleChange} ></input>
            </div>
        </div>
        <div className="row">
          <div className="col align-self-center">
            <div className="buttons">
                <Button onClick={() => this.click()}>Authorise</Button>
            </div>
          </div>
        </div>    
    </div>
    );
}

}
export default Auth;