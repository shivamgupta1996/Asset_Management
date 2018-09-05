import React, {Component} from 'react';
import { requestRef } from '../firebase';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {Glyphicon} from 'react-bootstrap';


class AssetRequest extends Component{

  constructor(props){
    super(props);

    this.state = {
      assetType: '',
      asset: ''
    }
  }

  renderThis(){
    const {email} = this.props.user;
    if(email != null){
      return(
        <div className="form-group">
        <h5><u>Asset Type:</u></h5><br />

        <input
        type="text"
        className="form-control"
        placeholder="Hardware or Software"
        onChange={e => this.setState({assetType: e.target.value})}
        />
        <h5><u>Asset (Max 1 at a time):</u></h5><br />
        <input
        type="text"
        className="form-control"
        placeholder="Type in your asset"
        onChange={e => this.setState({asset: e.target.value})}
        />

        <button
        type="button"
        className="btn btn-primary"
        onClick={()=> this.submitRequest()}>Submit request</button>
        </div>
      )
    } else {
      return(<div>You have to Login First</div>)
    }
  }

  submitRequest(){
    const {assetType,asset} = this.state;
    const aType = assetType.toUpperCase();
    const {email} = this.props.user;
    if(assetType ==="hardware" || assetType==="Hardware" || assetType==="software" || assetType==="Software"){
      requestRef.push({employee: email, assetType: aType , request: asset });
      browserHistory.push('/app');

    } else {
      return alert("Asset Type must be either Hardware or Software");
    }
  }
  
  goBack(){
    browserHistory.push('/app');
  }

  render(){

    return(
      <div className="container">
      <button className="btn btn-default" onClick={()=>this.goBack()}><Glyphicon title="back" glyph="menu-left" />Back</button>
        <h2><u>Request Asset</u></h2>
        <hr />
        <div>{this.renderThis()}</div>
      </div>
    )
  }
}


function mapStateToProps(state){
  const {user} = state;
  return {
    user,
  }
}
export default connect (mapStateToProps)(AssetRequest);
