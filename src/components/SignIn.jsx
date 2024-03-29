import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { Link } from 'react-router';
import logo from './Double Ring-4s-200px.svg';

class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            },
            isLoading: false
        }
    }
    signIn = () => {
        this.setState({ isLoading: true });
        const { email, password } = this.state;
        firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(
            error => {
                this.setState({ error, isLoading: false });
            });

    }
    showErrorMessage() {
        if (this.state.error.message) {
            return (<div className="errorBox">{this.state.error.message}</div>)
        }
        return null
    }

    render() {
        return (
            <div className="root-signin">
                <div className="form-inline" style={{ margin: '5%' }}>
                    <div className="signindiv">
                        <h2>Sign In</h2>
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            style={{ marginBottom: '5px' }}
                            type="text"
                            placeholder="Username"
                            onChange={event => this.setState({ email: event.target.value })} />
                        <br />
                        <input
                            className="form-control"
                            style={{ marginBottom: '5px' }}
                            type="password"
                            placeholder="Password"
                            onChange={event => this.setState({ password: event.target.value })} />
                        <br />
                        <div id="rat">
                            {
                                this.state.isLoading ? 
                                <img src={logo} alt="Loader" />
                                :
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    style={{ marginBottom: '5px' }}
                                    onClick={this.signIn}
                                >
                                    Sign In
                                </button>
                            }
                            </div>
                        <div>{this.showErrorMessage()}</div>
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
