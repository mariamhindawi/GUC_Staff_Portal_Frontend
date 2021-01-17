import React from "react";
import axios from "../others/axios_instance";
import CoverageList from "./list_components/coverage_list.component";

class HODcoverage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            coverages: [],
            loading:true
        }
    }

    componentDidMount() {
        axios.get("/hod/view-coverage", {
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    courses: res.data.courses,
                    coverages: res.data.coverages,
                    loading:false
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
                <CoverageList courses={this.state.courses} coverages={this.state.coverages} loading={this.state.loading}></CoverageList>
            </div>
        )
    }
}

export default HODcoverage;