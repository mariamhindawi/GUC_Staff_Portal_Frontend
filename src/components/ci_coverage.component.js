import React from "react";
import axios from "../axios";
import CoverageList from "./list_components/coverage_list.component";

class CIcoverage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            coverages: []
        }
    }

    componentDidMount() {
        axios.get("/ci/view-coverage", {
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    courses: res.data.courses,
                    coverages: res.data.coverages
                });
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response);
                }
                else if (err.request) {
                    console.log(err.request);
                }
                else {
                    console.log(err.message);
                }
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <CoverageList courses={this.state.courses} coverages={this.state.coverages}></CoverageList>
            </div>
        )
    }
}

export default CIcoverage;