import React, {Component} from 'react';
import {assetRef} from '../firebase';

class AllAssetItem extends Component{

  revoke(){
    assetRef.child(`${this.props.aas.assetKey}`).remove()
  }

  render(){
    const {aas} = this.props;
    return(
      <div>

        <li><strong><u>Employee Name</u></strong>: {aas.employee} <br /> <strong><u>Asset Type</u></strong>: {aas.assetType} <br /> <strong><u>Details</u></strong>: {aas.assetInfo}</li>
        <span><button className="btn btn-danger" onClick={()=>this.revoke()}>Revoke</button></span>
        <hr />
      </div>
    )
  }
}

export default AllAssetItem;
