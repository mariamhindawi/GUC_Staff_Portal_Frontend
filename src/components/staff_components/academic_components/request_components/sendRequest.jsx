import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import RequestForm from "../../../form_components/RequestForm";

function sendRequest() {
  const [requestType, setRequestType] = useState("");
  const [requestTypeShown, setRequestTypeShown] = useState("");

  return (
    <div className="view-container">
      <div className="view-select">
        <div>
          <span className="mr-2">Request type</span>
          <DropdownButton bsPrefix="view-dropdown-button" title={requestTypeShown || "Choose type"}>
            <Dropdown.Item
              key="annual-leave"
              onClick={() => { setRequestType("annualLeave"); setRequestTypeShown("Annual Leave"); }}
            >
              Annual Leave
            </Dropdown.Item>
            <Dropdown.Item
              key="accidental-leave"
              onClick={() => { setRequestType("accidentalLeave"); setRequestTypeShown("Accidental Leave"); }}
            >
              Accidental Leave
            </Dropdown.Item>
            <Dropdown.Item
              key="sick-leave"
              onClick={() => { setRequestType("sickLeave"); setRequestTypeShown("Sick Leave"); }}
            >
              Sick Leave
            </Dropdown.Item>
            <Dropdown.Item
              key="maternity-leave"
              onClick={() => { setRequestType("maternityLeave"); setRequestTypeShown("Maternity Leave"); }}
            >
              Maternity Leave
            </Dropdown.Item>
            <Dropdown.Item
              key="compensation-request"
              onClick={() => { setRequestType("compensationRequest"); setRequestTypeShown("Compensation Request"); }}
            >
              Compensation Request
            </Dropdown.Item>
            <Dropdown.Item
              key="change-day-off-request"
              onClick={() => { setRequestType("dayOffChangeRequest"); setRequestTypeShown("Change Day Off Request"); }}
            >
              Change Day Off Request
            </Dropdown.Item>
            <Dropdown.Item
              key="replacement-request"
              onClick={() => { setRequestType("replacementRequest"); setRequestTypeShown("Replacement Request"); }}
            >
              Replacement Request
            </Dropdown.Item>
            <Dropdown.Item
              key="slot-linking-request"
              onClick={() => { setRequestType("slotLinkingRequest"); setRequestTypeShown("Slot Linking Request"); }}
            >
              Slot Linking Request
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>

      {requestType === "" ? <></>
        : <RequestForm requestType={requestType} />}
    </div>
  );
}

export default sendRequest;
