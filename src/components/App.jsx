import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import { firebaseApp } from '../firebase';
import {assetRef} from '../firebase';
import { browserHistory, Link } from 'react-router';
import {sendHwAssets} from '../actions';

class App extends Component{

  componentWillMount(){
    const {email} = this.props.user;
    assetRef.on('value', snap =>{
      const hwAssets = [];

      snap.forEach(assetObj => {
        const {assetType, employee} = assetObj.val();
        if(email===employee){
          const {assetInfo, assetType} = assetObj.val();
          hwAssets.push({assetInfo, assetType})

        }
      })
      this.props.sendHwAssets(hwAssets);
    })
  }

  signout(){
    const r = window.confirm("Do you really want to Sign Out?");
    if(r === true){
      firebaseApp.auth().signOut().then(browserHistory.push("/signin"));

    }
  }

  renderAuthButton(){
    if(this.props.user.email!=null){
      return(<Glyphicon className="glyphi" onClick={()=>this.signout()} title="Sign Out" glyph="off" />);
    } else {
      return(<button className="btn btn-warning"><Link to="/signin">Sign in</Link></button>);
    }
  }

  renderAdminView(){
    const {email} = this.props.user;
  if(email==="vivek@gmail.com"){
    return (
      <div>
        <Link to="/empreq">Employee Requests</Link><br />
        <Link to="/empass">Employee Assets</Link>
      </div>
    )
  } else {
    return (<Link to={`/request/${email}`}>Request</Link>)
    }
  }

  renderAccessories(){
    if(this.props.user.email!= null){
      return(
        this.props.hwAssets.map((hwa,index)=>{

            console.log(hwa)
            return (<li style={{marginBottom: '10px'}} key={index}><strong><u>Type</u></strong>: {hwa.assetType} <br /> <strong><u>Asset Info</u></strong>: {hwa.assetInfo}</li>)

        })
      )
    } else {
      return(<div>Only authorized personnels are allowed</div>)
    }
  }

  render(){

    return(
      <div className="container">
        <div className="heading"><h1><u>Asset Management System</u></h1></div>
        <span>Hello {this.props.user.email} !</span>
        <div>
          {this.renderAuthButton()}
        </div>
        <hr />

        <div>
          <h3><u>Accessories</u></h3>
          <ol>
          {this.renderAccessories()}
          </ol>
        </div>


        <div>{this.renderAdminView()}</div>
      </div>
    )
  }
}


function mapStateToProps(state){
  const {user, hwAssets} = state;
  return {
    user,
    hwAssets,

  }
}
export default connect (mapStateToProps,{sendHwAssets})(App);
