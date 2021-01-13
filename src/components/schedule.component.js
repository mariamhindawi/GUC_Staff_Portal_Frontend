import React from "react";
import axios from "../axios";

class Schedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Saturday: [],
            Sunday: [],
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            alldata: []
        }
    }

    viewSchedule() {
        axios.get("/academic/schedule", {
            headers: {
                "token": sessionStorage.token
            }
        })
            .then(res => {
                let data = res.data;
                let sat = [{ course: "" }, { course: "" }, { course: "" }, { course: "" }, { course: "" }, { course: "" }];
                let sun = [{ course: "" }, { course: "" }, { course: "" }, { course: "" }, { course: "" }, { course: "" }];
                let mon = [{ course: "" }, { course: "" }, { course: "" }, { course: "" }, { course: "" }, { course: "" }];
                let tue = [{ course: "" }, { course: "" }, { course: "" }, { course: "" }, { course: "" }, { course: "" }];
                let wed = [{ course: "" }, { course: "" }, { course: "" }, { course: "" }, { course: "" }, { course: "" }];
                let thu = [{ course: "" }, { course: "" }, { course: "" }, { course: "" }, { course: "" }, { course: "" }];
                for (let i = 0; i < 6; i++) {
                    if (data[i]) {
                        if (data[i].day === "Saturday") {
                            sat[data[i].slotNumber - 1] = data[i];
                        }
                        if (data[i].day === "Sunday") {
                            sun[data[i].slotNumber - 1] = data[i];
                        }
                        if (data[i].day === "Monday") {
                            mon[data[i].slotNumber - 1] = data[i];
                        }
                        if (tue[i].day === "Tuesday") {
                            tue[data[i].slotNumber - 1] = data[i];
                        }
                        if (data[i].day === "Wednesday") {
                            wed[data[i].slotNumber - 1] = data[i];
                        }
                        if (data[i].day === "Thursday") {
                            thu[data[i].slotNumber - 1] = data[i];
                        }
                    }
                }
               
                this.setState({ Saturday: sat, Sunday: sun, Monday: mon, Tuesday: tue, Wednesday: wed, Thursday: thu, alldata: data })
            })
    }



    render() {
        this.viewSchedule();
        return (
            <div>
                <table className="table text-center schedule-table">
                    <thead className="schedule-head table-head">
                        <tr className="schedule-row table-row">
                            <th scope="col"></th>
                            <th scope="col">First</th>
                            <th scope="col">Second</th>
                            <th scope="col">Third</th>
                            <th scope="col">Fourth</th>
                            <th scope="col">Fifth</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="schedule-row table-row">
                            <th scope="row">Saturday</th>
                            {this.state.Saturday.map(item => (
                                <td key={item._id} >{item.course}</td>
                            ))}
                            <schedulePopoverComponent data={this.state.data} ></schedulePopoverComponent>
                        </tr>
                        <tr className="schedule-row table-row">
                            <th scope="row">Sunday</th>
                            {this.state.Sunday.map(item => (
                                <td key={item.slotNumber}>{item.course}</td>
                            ))}
                        </tr>
                        <tr className="schedule-row table-row">
                            <th scope="row">Monday</th>
                            {this.state.Monday.map(item => (
                                <td key={item.slotNumber}>{item.course}</td>
                            ))}
                        </tr>
                        <tr className="schedule-row table-row">
                            <th scope="row">Tuesday</th>
                            {this.state.Tuesday.map(item => (
                                <td key={item.slotNumber}>{item.course}</td>
                            ))}
                        </tr>
                        <tr className="schedule-row table-row">
                            <th scope="row">Wednesday</th>
                            {this.state.Wednesday.map(item => (
                                <td key={item.slotNumber}>{item.course}</td>
                            ))}
                        </tr>
                        <tr className="schedule-row table-row">
                            <th scope="row">Thursday</th>
                            {this.state.Thursday.map(item => (
                                <td key={item._id}>{item.course}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    };
}

export default Schedule;