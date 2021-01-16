import React from "react";


const HRDaysRecord= (props) => (
    <tr>
      <td>{props.records.id}</td>
      <td>
          
          {
          props.records.missingDays.map((currentRecord)=> {
            return <table ><tbody><tr><td>{currentRecord.substring(0,10)}</td></tr></tbody></table>;})}
        </td>
    </tr>
  )

  export default HRDaysRecord;