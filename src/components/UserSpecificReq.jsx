import React, { Component } from 'react';
import {connect} from 'react-redux';
import {requestRef} from '../firebase';

class UserSpecificReq extends Component {

  cancelReq(e){
    requestRef.child(`${e.target.value}`).remove();
  }

  render(){
      const {req} = this.props;
      const {email} = this.props.user
    return(
      <div className="container">
        <ol>
        {
          req.map((r,i)=>{
            if(r.employee === email){
              return(
                <li key={i}><strong><u>Asset</u></strong>: {r.request} <br /><strong><u>Asset Type</u></strong>: {r.assetType} <br /><button
                  className="btn btn-danger" value={r.reqKey} onClick={(e)=>this.cancelReq(e)}>Cancel</button></li>)
            }
          })
        }
        </ol>
      </div>
    )
  }
}
function mapStateToProps(state){
  const {user} = state;
  return {
    user
  }
}
export default connect (mapStateToProps)(UserSpecificReq);
