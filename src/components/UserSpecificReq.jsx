import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestRef } from '../firebase';

class UserSpecificReq extends Component {

    cancelReq(e) {
        requestRef.child(`${e.target.value}`).remove();
    }

    renderPendingReq = (req, email) => {
        const assetReqList = req.filter(r => r.employee === email);
        if (assetReqList.length) {
            return assetReqList.map((request, index) => (
                <tr key={index}>
                    <td>
                        {request.request}

                    </td>
                    <td>
                        {request.assetType}
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            value={request.reqKey}
                            onClick={(e) => this.cancelReq(e)}
                        >
                            Cancel Request
                        </button>
                    </td>
                </tr>
            ));
        }
        else {
            return (
                <tr>
                    <td rowSpan={3}>
                        You do not have any pending request
                    </td>
                </tr>
            )
        }
    }

    render() {
        const { req } = this.props;
        const { email } = this.props.user
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                        <tr>
                            <th>Asset name and info</th>
                            <th>Asset type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderPendingReq(req, email)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    }
}
export default connect(mapStateToProps)(UserSpecificReq);
