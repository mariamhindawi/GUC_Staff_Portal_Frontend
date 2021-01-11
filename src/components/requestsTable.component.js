import React, { useState } from 'react'
import { Button, Table, Popover, PopoverBody, PopoverHeader, List } from 'reactstrap'

const RequestsTableComponent = ({ requests, cancelRequest, acceptRequest, rejectRequest }) => {
    const requestRows = requests.map(request => {
        return <RequestsTableRow key ={request.id} request={request} cancelRequest={cancelRequest} acceptRequest={acceptRequest} rejectRequest={rejectRequest} />
    })

    return <Table striped>
        <thead>
            <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Message</th>
                <th>Day</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {requestRows}
        </tbody>
    </Table>
}
const RequestsTableRow = ({ request, cancelRequest, acceptRequest, rejectRequest }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    console.log(Object.keys(request))
    let requestDetails = Object.keys(request).filter(key=> key!=='__v'&&key!=='_id').map(key => {
        return <li key={request.id + key}>{key + ": " + (key === 'day' && request.type !== 'dayOffChangeRequest' ? request[key].split('T')[0] : request[key])}</li>
    })

    return <>
        <tr key={request.id}>
            <th><span id={"row" + request.id}>{request.id}</span></th>
            <td>{request.type}</td>
            <td>{request.status}</td>
            <td>{request.type === 'slotLinkingRequest' ? request.ccComment : request.HODComment}</td>
            <td>{request.day.split("T")[0]}</td>
            {cancelRequest && request.type !== 'slotLinkingRequest' && request.type !== 'dayOffChangeRequest' &&
                new Date(request.day) > new Date() ||
                cancelRequest && request.status === 'Under review' ?
                <td><Button className="bg-danger" onClick={() => cancelRequest(request.id)}>Cancel</Button></td> : <td></td>}
            {acceptRequest ? <td><Button className="" onClick={() => acceptRequest(request.id)}>Accept</Button></td> : <td></td>}
            {rejectRequest ? <td><Button className="" onClick={() => rejectRequest(request.id)}>Reject</Button></td> : <></>}
        </tr>
        <Popover
            placement="bottom"
            isOpen={popoverOpen}
            target={"row" + request.id}
            toggle={toggle}>
            <PopoverHeader>Request {request.id}</PopoverHeader>
            <PopoverBody>
                <List type="unstyled">
                    {requestDetails}
                </List>
            </PopoverBody>
        </Popover>
    </>
}

export default RequestsTableComponent