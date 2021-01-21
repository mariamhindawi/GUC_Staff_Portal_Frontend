import React from "react";

const Record= (props) => (
    <tr>
      <td>{props.records.user}</td>
      <td>{props.records.signInTime}</td>
      <td>{props.records.signOutTime}</td>
    </tr>
  )

  export default Record;