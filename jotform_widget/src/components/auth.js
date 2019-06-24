import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

class Auth extends Component {

constructor(props) {
    super(props);
    this.state = {password: "", failedLogin:false};

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleClick(that,props){
    $.ajax({
      url: "https://zlf1wgdua9.execute-api.us-east-1.amazonaws.com/jotform/jotformproxy",
      method: 'POST',
      data: JSON.stringify({ 'Value': '!', "Verif": this.state.password}),
      success: function (result) {
        if (result == "Authorized"){
          that.props.setPassword(that.state.password);
        } else {
          that.setState({failedLogin:true});
        }
      },
      error: function(err){
        that.setState({failedLogin:true});
      } 
    });
}

handleChange(event) {
  this.setState({password: event.target.value});
}

handleKeyDown(event){
  if (event.key === 'Enter') {
    this.handleClick(this);
  }
}

render() {
    return (
        
    <div className="container">
        {this.state.failedLogin? <div className="row">
            <div className="col align-self-center">
                 Login failed
            </div>
        </div> :null }
        <div className="row">
            <div className="col-sm-2">Password:</div>
            <div className="col-sm-10">
                <input className="input" placeholder="case sensitive" onChange={this.handleChange} onKeyDown={this.handleKeyDown} ></input>
            </div>
        </div>
        <div className="row">
          <div className="col align-self-center">
            <div className="buttons">
                <Button id="button" onClick={() => this.handleClick(this)}>Authorize</Button>
            </div>
          </div>
        </div>    
    </div>
    );
}

}
export default Auth;