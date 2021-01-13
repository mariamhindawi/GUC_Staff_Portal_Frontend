import React from "react";
import axios from '../axios'
import { Col, Table, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Spinner, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap'


export default class Hours extends React.Component {
    constructor(props) {
      super(props);
      this.state = {hours:[],
        dropdownOpen: false,
        dropdownOpenY: false,
        month:null,
        year:null
    };
    }

    componentDidMount() {
      axios({
        method:'get',
        url:'/staff/view-hours' ,
        headers: {
          'token': sessionStorage.token
      }, 
        params: {
            month:this.state.month, year:this.state.year
        }
      })
          .then(res => {
            
            let x = res.data
            console.log(x);
            this.setState({ hours: res.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      componentDidUpdate() {
        axios({
          method:'get',
          url:'/staff/view-hours' ,
          headers: {
            'token': sessionStorage.token
        }, 
          params: {
              month:this.state.month,
              year:this.state.year
          }
        })
          .then(res => {
            
            let x = res.data
            console.log(x);
            this.setState({ hours: res.data })
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
            <h3>Hours</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Missing Hours</th>
                  <th>Extra Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>{this.state.hours.missingHours}</td>
                    <td>{this.state.hours.extraHours}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        )
}
}