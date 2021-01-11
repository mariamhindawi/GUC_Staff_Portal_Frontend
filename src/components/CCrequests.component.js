import React, { useEffect, useState } from 'react'
import { Spinner } from 'reactstrap';
import Axios from '../axios'
import RequestsTable from './requestsTable.component'

const HODRequestsComponent = (props) => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        Axios.get('/cc/slot-linking-requests', {
            'headers': {
                'token': sessionStorage.token
            }
        }
        ).then((res) => {console.log(res.data);setLeaveRequests(res.data);setLoading(false)}).catch(error=>alert(error))
    },[])
    const acceptRequest = id => {
        Axios.put(`/cc/slot-linking-requests/${id}/reject`, {
            'headers': {
                'token': sessionStorage.token
            }
        }).then(res=>alert(res.data)).then(()=>Axios.get('/cc/slot-linking-requests', {
            'headers': {
                'token': sessionStorage.token
            }
        }
        ).then((res) => {setLeaveRequests(res.data);setLoading(false)})).catch(error=>alert(error))
    }
    const rejectRequest = (id, HODComment) => {
        Axios.put(`/cc/slot-linking-requests/${id}/accept`, {
            'headers': {
                'token': sessionStorage.token
            },
            data: {
                HODComment: HODComment
            }
        }).then(res=>alert(res.data)).then(()=>Axios.get('/cc/slot-linking-requests', {
            'headers': {
                'token': sessionStorage.token
            }
        }
        ).then((res) => {setLeaveRequests(res.data);setLoading(false)})).catch(error=>alert(error))
    }
    if (loading) {
        return <div className="container">
            <div className="row">
                <div className="offset-5">
                    <Spinner color="primary"/>
                </div>
            </div>
        </div>
    }
    else {
        return (<div className="container">
            <div className="row">
                <RequestsTable requests={leaveRequests} acceptRequest={acceptRequest} rejectRequest={rejectRequest} />
            </div>
        </div>
        )
    }
}

export default HODRequestsComponent;