import React from "react";
import axios from "../axios"
import Record from "./attendance_item.component"
import {Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from "reactstrap"


  export default class Attendance extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {records: [],
        dropdownOpen: false,
        dropdownOpenY: false,
        month:null,
        year:null};
    }

    componentDidMount() {
        axios({
          method:"get",
          url:"/staff/view-attendance-records" ,
          headers: {
            "token": sessionStorage.token
        }, 
          params: {
              month:this.state.month, year:this.state.year
          }
        })
          .then(res => {
            
            let x = res.data
            console.log(this.state.month);
            console.log(this.state.month);
            this.setState({ records: res.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      componentDidUpdate() {
        axios({
          method:"get",
          url:"/staff/view-attendance-records" ,
          headers: {
            "token": sessionStorage.token
        }, 
          params: {
              month:this.state.month, year:this.state.year
          }
        })
          .then(res => {
            
            let x = res.data
            console.log(this.state.month);
            this.setState({ records: res.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      toggleDropDown() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
    }

    toggleDropDownY() {
      this.setState({ dropdownOpenY: !this.state.dropdownOpenY })
  }

      attendanceList() {
        if(typeof this.state.records ==="object"){
        console.log(this.state.records);
        return this.state.records.map((currentRecord) => {
            return <Record records={currentRecord} key={currentRecord._id}/>;
        })
      }
      else return [];
    }


    render() {
        return (
          <div>
            <div className="row">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggleDropDown()}>
                            <DropdownToggle caret>
                                Month
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => { this.setState({ month: 1 }) }}>1</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 2 }) }}>2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 3 }) }}>3</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 4 }) }}>4</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 5 }) }}>5</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 6 }) }}>6</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 7 }) }}>7</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 8 }) }}>8</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 9 }) }}>9</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 10 }) }}>10</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 11 }) }}>11</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 12 }) }}>12</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="row">
                        <Dropdown isOpen={this.state.dropdownOpenY} toggle={() => this.toggleDropDownY()}>
                            <DropdownToggle caret>
                                Year
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => { this.setState({ year: 2016 }) }}>2016</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ year: 2017 }) }}>2017</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ year: 2018 }) }}>2018</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ year: 2019 }) }}>2019</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ year: 2020 }) }}>2020</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ year: 2021 }) }}>2021</DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </Dropdown>
                    </div>
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
          </div>
        )
      }
  }
