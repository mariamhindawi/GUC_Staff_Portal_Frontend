import React from "react";
import axios from '../axios'
import Record from "./attendance_item.component"

  export default class Attendance extends React.Component {
    constructor(props) {
      super(props);
      this.state = {records: []};
    }

    componentDidMount() {
        axios.get('/staff/view-attendance-records' , {
          headers: {
              'token': sessionStorage.token
          }}, {
          data: {
              month:1, year:2020
            }})
          .then(res => {
            
            let x = res.data
            console.log(x);
            this.setState({ records: res.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      attendanceList() {
        if(this.state.records){
        return this.state.records.map((currentRecord) => {
            return <Record records={currentRecord}/>;
        })
      }
      else return [];
    }


    render() {
        return (
          <div>
            <h3>Attendance Records</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>User</th>
                  <th>SignIn Time</th>
                  <th>SignOut Time</th>
                </tr>
              </thead>
              <tbody>
                {this.attendanceList()}
              </tbody>
            </table>
          </div>
        )
      }
  }
