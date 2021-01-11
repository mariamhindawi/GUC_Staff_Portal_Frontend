import React from "react";
import axios from '../axios'
import { Col, Table, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Spinner, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap'

export default class MissingDays extends React.Component {
    constructor(props) {
      super(props);
      this.state = {days:[],
        dropdownOpen: false,
        month:6,
        year:2020
    };
    }

    componentDidMount() {
        axios.get('/staff/view-missing-days' , {
          headers: {
              'token': sessionStorage.token
          }}, {
          data: {
              month:5, year:2020
            }})
          .then(res => {
            
            let x = res.data
            console.log(x);
            this.setState({ days: res.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      toggleDropDown() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
    }

      daysList() {
        if(this.state.days){
        return this.state.days.map((currentRecord) => {
            return <tr>{currentRecord}</tr>;
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
                                Day
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => { this.setState({ month: 1 }) }}>1</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 2 }) }}>2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 3 }) }}>3</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 4 }) }}>4</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
            <div>
            <h3>MissingDays</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Day</th>
                </tr>
              </thead>
              <tbody>
                {this.daysList()}
              </tbody>
            </table>
          </div>
          </div>
        )
}
}