import React from "react";

const HRHoursRecord= (props) => (
    <tr>
      <td>{props.records.id}</td>
      <td>{props.records.missingHours}</td>
    </tr>
  )

  export default HRHoursRecord;