import React from 'react';
import axios from '../axios';
import FacultyList from '../components/faculty_list.component';

class HRfaculty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            faculties: []
        }
    }

    async componentDidMount() {
        await axios.get("/fe/get-faculties",{
            headers: {
                token : sessionStorage.getItem("token")
            }
        })
        .then(res => {
            this.setState({
                faculties: res.data
            });
        })
        .catch(err => {
            if (err.response) {
                alert(err.response.data);
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
                <FacultyList faculties={this.state.faculties} ></FacultyList>
            </div>
        )
    }
}

export default HRfaculty;