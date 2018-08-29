import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { Link } from 'react-router';

class SignIn extends Component {

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
signIn(){
  //console.log("credentials", this.state);
  const {email, password} = this.state;
  firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(
    error => {
    this.setState({error});
  });

}

  render(){
    return(
    <div className="root-signin">
      <div className= "form-inline" style={{margin:'5%'}}>
        <div className="signindiv">
          <h2>Sign In</h2>
        </div>
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
              <button
                className = "btn btn-primary"
                type = "button"
                style={{marginBottom:'5px'}}
                onClick = {() => this.signIn()}>
                Sign In
                </button>
                <div>{this.state.error.message}</div>
        </div>
        <br />
        <div>
          Do not have an ID? <Link to="/signup" >Sign Up </Link>
        </div>


      </div>
    </div>
    );
  }
}


export default SignIn;
