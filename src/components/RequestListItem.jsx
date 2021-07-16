import React, { Component } from 'react';
import { Link } from 'react-router';
import { requestRef } from '../firebase';
class RequestListItem extends Component {

    render() {

        const { employee, request, assetType, reqKey } = this.props.req;
        return (
            <div>
                <li>
                    <strong>
                        {employee}
                    </strong>
                    : {request} ({assetType})
                </li>
                <span>
                    <button>
                        <Link to={`/admin/${reqKey}`}>
                            Approve
                        </Link>
                    </button>
                    <button value={reqKey} onClick={(e) => { requestRef.child(`${e.target.value}`).remove() }}>
                        Decline
                    </button>
                </span>
            </div>
        )
    }
}

export default RequestListItem;
