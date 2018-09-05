import React,{Component} from 'react';
import { requestRef, assetRef } from '../firebase';
import {sendRequest} from '../actions';
import { connect } from 'react-redux';
import RequestListItem from './RequestListItem';
import { browserHistory, Link } from 'react-router';
import {Glyphicon} from 'react-bootstrap';

class AdminView extends Component{

  constructor(props){
    super(props);

    this.state={
      editBoxShow: false,
      assetBody: ''
    }
  }
  componentDidMount(){
    requestRef.on('value', snap =>{
      const requests = [];

      snap.forEach(reqObj => {
        const {employee, assetType, request} = reqObj.val();
        const reqKey = reqObj.key;
        requests.push({employee, assetType, request, reqKey})
      })
      this.props.sendRequest(requests);
    })

  }

  renderList(){
    if(this.props.user.email === "vivek@gmail.com"){
      return(
        <div>
        {
          this.props.requests.map((r, index) => {
            return(
              <RequestListItem req={r} index={index} />
            )
          })
        }
        </div>
      )
    }
  }

  goBack(){
    browserHistory.push('/app');
  }

  render(){

    return(
      <div className="container">
        <button className="btn btn-default" onClick={()=>this.goBack()}><Glyphicon title="back" glyph="menu-left" />Back</button>
        <h2><u>Admin View</u></h2>
        <h3>Requests:</h3>
        <div>
          <ul>
          {
            this.renderList()
          }
          </ul>
        </div>
        </div>
    )
  }
}

function mapStateToProps(state){
  const {requests} = state;
  const {user} = state;
  return {
    requests,
    user
  }
}

export default connect (mapStateToProps, {sendRequest})(AdminView);
