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
    this.backToSearch = this.backToSearch.bind(this);
  }


  setPassword(password){
    this.setState({password:password, page:2});
    console.log("set password");
  }  

  setLeads(receivedLeads){
    this.setState({leads:receivedLeads, page:3});
    console.log(receivedLeads);
  }  

  backToSearch(){
    this.setState({page:2});
  }

 

  render() {
    var page;
    if (this.state.page == 1 ){
      page = <Auth setPassword={this.setPassword}> </Auth>;
    } else if (this.state.page == 2){
      page = <Input password={this.state.password} setLeads={this.setLeads}></Input>;
    } else {
      page = <Grid leads={this.state.leads} backToSearch = {this.backToSearch}></Grid>
    }
    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
