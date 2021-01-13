import React from "react";

const HoursRecord= (props) => (
    <tr>
      <td>{props.records.missingHours}</td>
      <td>{props.records.extraHours}</td>
    </tr>
  )

  export default HoursRecord;