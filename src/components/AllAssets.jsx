import React, {Component} from 'react';
import { assetRef } from '../firebase';
import { connect } from 'react-redux';
import { sendAllAssets } from '../actions';
import AllAssetItem from './AllAssetItem';
import { browserHistory, Link } from 'react-router';
import {Glyphicon} from 'react-bootstrap';

class AllAssets extends Component {

  componentDidMount(){
    assetRef.on('value', snap =>{
      const allAssets = [];

      snap.forEach(assObj => {
        const {employee, assetType, assetInfo} = assObj.val();
        const assetKey = assObj.key;
        allAssets.push({employee, assetType, assetInfo, assetKey})
      })
      this.props.sendAllAssets(allAssets);
    })
  }

  renderAssets(){
    const {email} = this.props.user;
    if(email==="vivek@gmail.com"){
      return (
        <div>
          <ul>
          {
            this.props.allAssets.map((aas,index)=>{
              return(<AllAssetItem aas={aas} index={index} />)
            })
          }
          </ul>
        </div>
      )
    }
  }

  goBack(){
    browserHistory.push('/app');
  }

  render(){

    return(
      <div className="container transition-item">
        <button className="btn btn-default" onClick={()=>this.goBack()}><Glyphicon title="back" glyph="menu-left" />Back</button>
        <h3><u>All Assets</u></h3>
        {
          this.renderAssets()
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  const {user, allAssets} = state;
  return {
    user,
    allAssets
  }
}
export default connect (mapStateToProps,{ sendAllAssets })(AllAssets);
