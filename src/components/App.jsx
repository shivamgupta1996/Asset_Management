import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import { firebaseApp, assetRef, requestRef } from '../firebase';
import { browserHistory, Link } from 'react-router';
import { sendHwAssets, sendRequest } from '../actions';
import UserSpecificReq from './UserSpecificReq';
const adminCred = "admin@gmail.com";

class App extends Component {

    componentWillMount() {
        assetRef.on('value', snap => {
            let hwAssets = [];
            snap.forEach(assetObj => {
                const { assetType, employee, assetInfo } = assetObj.val();
                hwAssets.push({ assetInfo, assetType, employee })
            })
            this.props.sendHwAssets(hwAssets);
        })

        requestRef.on('value', snap => {
            const requests = [];

            snap.forEach(reqObj => {
                const reqKey = reqObj.key;
                const { employee, assetType, request } = reqObj.val();
                requests.push({ employee, assetType, request, reqKey })

            })
            this.props.sendRequest(requests);
        })
    }


    signout() {
        const r = window.confirm("Do you really want to Sign Out?");
        if (r === true) {
            firebaseApp.auth().signOut().then(browserHistory.push("/signin"));

        }
    }

    pushSignIn() {
        browserHistory.push('/signin');
    }

    renderAuthButton() {
        if (this.props.user.email) {
            return (<Glyphicon className="glyphi" onClick={() => this.signout()} title="Sign Out" glyph="off" />);
        } else {
            return (<button className="btn btn-warning" onClick={() => this.pushSignIn()}>Sign in</button>);
        }
    }

    renderAdminView() {
        const { email } = this.props.user;
        if (email === null) {
            return (<div></div>)
        } else
            if (email === adminCred) {
                return (
                    <div className="admin-btns">
                        <Link to="/empreq">
                            <button className="btn btn-primary">
                                View Pending Requests
                            </button>
                        </Link>
                        <br />
                        <Link to="/empass">
                            <button className="btn btn-primary">
                                Employee Assets
                            </button>
                        </Link>
                    </div>
                )
            } else {
                return (
                    <Link to={`/request/${email}`}>
                        <button className="btn btn-primary">
                            Request an Asset
                        </button>
                    </Link>
                );
            }
    }

    renderAccessories() {
        const userEmail = this.props.user.email;
        if (userEmail) {
            const assetsList = this.props.hwAssets.filter(hwa => hwa.employee === userEmail);
            if (assetsList.length) {
                return assetsList.map((hwa, index) =>
                ( 
                    <tr key={index}>
                        <td>
                            {hwa.assetType}
                        </td>
                        <td>
                            {hwa.assetInfo}
                        </td>  
                    </tr>
                ))
            }
            else {
                return (
                    <tr>
                        <td rowSpan={2}>
                            No Accessories assigned to you. Please place a request
                        </td>
                    </tr>
                )
            }
        } else {
            return (
                <tr>
                    <td rowSpan={2}>
                        Only authorized personnels are allowed
                    </td>
                </tr>
              
            )
        }
    }


    render() {

        return (
            <div className="container">
                <div className="heading"><h1><u>Asset Management System</u></h1></div>
                <span>
                    Hello <strong>{this.props.user.email}</strong> !
                </span>
                <div>
                    {this.renderAuthButton()}
                </div>
                <div>{this.renderAdminView()}</div>
                <hr />

                <div className="asset-req-box">
                    <h3><u>Your Accessories</u></h3>
                    <table className="table table-striped table-bordered table-condensed table-hover">
                        <thead>
                            <tr>
                                <th>Asset type</th>
                                <th>Asset name and info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderAccessories()}
                        </tbody>
                    </table>
                </div>
                <hr />
                <div className="asset-req-box">
                    <h3>
                        <u>
                            Pending asset requests
                        </u>
                    </h3>
                    <UserSpecificReq req={this.props.requests} />
                </div>
                <hr />
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { user, hwAssets, requests } = state;
    return {
        user,
        hwAssets,
        requests
    }
}
export default connect(mapStateToProps, { sendHwAssets, sendRequest })(App);
