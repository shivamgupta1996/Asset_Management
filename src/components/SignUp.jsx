import React, { Component } from 'react';
import {firebaseApp} from '../firebase';
import { Link } from 'react-router';
import logo from './Double Ring-4s-200px.svg';
import ReactDOM from 'react-dom';

class SignUp extends Component {
  constructor(props){
    super(props);

    this.state = {
      email : '',
      password : '',

      error : {
        message : ''
      }
    }
  }
signUp(){
  ReactDOM.render(<img src={logo} />, document.getElementById('rat'))
  const {email, password} = this.state;
  firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(error => {
    this.setState({error});
    ReactDOM.render(
                  <div id="rat"><button
                    className = "btn btn-primary"
                    type = "button"
                    style={{marginBottom:'5px'}}
                    onClick = {() => this.signUp()}>
                    Sign Up
                  </button></div>, document.getElementById('rat'))
  });

}

showErrorMessage(){
    if(this.state.error.message){
    return(<div className="errorBox">{this.state.error.message}</div>)
  } else {
      return <div></div>
    }
  }

  render(){
    return(
    <div className="root-signin">
      <div className= "form-inline" style={{margin:'5%'}}>
        <h2>Sign Up</h2>
        <div className = "form-group">

          <input
            className="form-control"
            style={{marginBottom:'5px'}}
            type="text"
            placeholder = "Username"
            onChange = {event => this.setState({email : event.target.value})} />
            <br />
            <input
              className="form-control"
              style={{marginBottom:'5px'}}
              type="password"
              placeholder = "Password"
              onChange = {event => this.setState({password : event.target.value})} />
              <br />
              <div id="rat"><button
                className = "btn btn-primary"
                type = "button"
                style={{marginBottom:'5px'}}
                onClick = {() => this.signUp()}>
                Sign Up
              </button></div>
                <div>{this.showErrorMessage()}</div>
        </div>
        <br />
        <div>
          Already have an ID? <Link to="/signin" >Sign In </Link>
        </div>

      </div>
    </div>
    );
  }
}

export default SignUp;
