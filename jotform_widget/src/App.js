import React, { Component } from 'react';
import './App.css';
import Auth from './components/auth';
import './components/leadInput.js';
import Input from './components/leadInput';
import Grid from './components/grid';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: null,
      selectedEmail: null,
      leads:[],
      page:1,
    }
  
    this.setPassword = this.setPassword.bind(this);
    this.setLeads = this.setLeads.bind(this);
  }


  setPassword(password){
    this.setState({password:password, page:2});
    console.log(password);
  }  

  setLeads(receivedLeads){
    this.setState({leads:receivedLeads, page:3});
    console.log(receivedLeads);
  }  

 

  render() {
    var page;
    if (this.state.page == 1 ){
      page = <Auth setPassword={this.setPassword}> </Auth>;
    } else if (this.state.page == 2){
      page = <Input password={this.state.password} setLeads={this.setLeads}></Input>;
    } else {
      page = <Grid leads={this.state.leads}></Grid>
    }
    return (
      <div className="App">
        <h2> Salesforce Lead Lookup</h2>
        {<Grid leads={this.state.leads}></Grid>}
      </div>
    );
  }
}

export default App;
