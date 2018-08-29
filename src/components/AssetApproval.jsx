import React, {Component} from 'react';
import {requestRef, assetRef} from '../firebase';
import {connect} from 'react-redux';

class AssetApproval extends Component{
  constructor(props){
    super(props);

    this.state={
      assetInfo:'',
    }
  }

  assign(){
    this.props.requests.map(re=>{
      if(re.reqKey===this.props.params.reqKey){
        assetRef.push({employee: re.employee, assetType: re.assetType, assetInfo: this.state.assetInfo})
        requestRef.child(`${re.reqKey}`).remove()
      }
    })

  }

  render(){

    return(
      <div className="container">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Asset Details"
            onChange={(e)=> this.setState({assetInfo: e.target.value})} />

          <button
            type="button"
            className="btn btn-success"
            onClick={()=> this.assign()}
          >Submit and Assign</button>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state){
  const {requests} = state;
  return {
    requests,
  }
}
export default connect (mapStateToProps)(AssetApproval);
