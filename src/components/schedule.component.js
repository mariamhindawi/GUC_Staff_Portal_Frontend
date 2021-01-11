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

    viewSchedule(day, slot) {
        axios.get("/academic/schedule", {
            headers: {
                "token": sessionStorage.token
            }
        })
            .then(res => {
                let data = res.data;
                let newdata;
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
                            newdata[data[i].slotNumber - 1] = data[i];
                        }
                        if (data[i].day === "Wednesday") {
                            wed[data[i].slotNumber - 1] = data[i];
                        }
                        if (data[i].day === "Thursday") {
                            thu[data[i].slotNumber - 1] = data[i];
                        }
                    }
                }
                //console.log(newdata);
                /* data = data.filter(slots=>slots.day===day && slots.slotNumber===slot); */
                this.setState({ Saturday: sat, Sunday: sun, Monday: mon, Tuesday: tue, Wednesday: wed, Thursday: thu, alldata: data })
            })
    }



    render() {
        this.viewSchedule("Saturday", 1);
        return (
            <div>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">First Slot</th>
                            <th scope="col">Second Slot</th>
                            <th scope="col">Third Slot</th>
                            <th scope="col">Fourth Slot</th>
                            <th scope="col">Fifth slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Saturday</th>
                            {this.state.Saturday.map(item => (
                                <td key={item._id} >{item.course}</td>
                            ))}
                            <schedulePopoverComponent data={this.state.data} ></schedulePopoverComponent>
                        </tr>
                        <tr>
                            <th scope="row">Sunday</th>
                            {this.state.Sunday.map(item => (
                                <td key={item.slotNumber}>{item.course}</td>
                            ))}
                        </tr>
                        <tr>
                            <th scope="row">Monday</th>
                            {this.state.Monday.map(item => (
                                <td key={item.slotNumber}>{item.course}</td>
                            ))}
                        </tr>
                        <tr>
                            <th scope="row">Tuesday</th>
                            {this.state.Tuesday.map(item => (
                                <td key={item.slotNumber}>{item.course}</td>
                            ))}
                        </tr>
                        <tr>
                            <th scope="row">Wednesday</th>
                            {this.state.Wednesday.map(item => (
                                <td key={item.slotNumber}>{item.course}</td>
                            ))}
                        </tr>
                        <tr>
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