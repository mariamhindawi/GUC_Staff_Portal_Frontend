import React, { useState } from "react";
import axios from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { DropdownItem, DropdownToggle,DropdownMenu,Dropdown } from "reactstrap";
import Record from "./hr_attendance_item.component";


const HRAttendance = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");
    const [dropdownOpen1,setDropdownOpen1]=useState(false);
    const toggle1=()=>setDropdownOpen1(prevState=>!prevState);
    const [dropdownOpen2,setDropdownOpen2]=useState(false);
    const toggle2=()=>setDropdownOpen2(prevState=>!prevState);
    const [records,setRecords]=useState([]);
    const[month,setMonth]=useState(null);
    const [year,setYear]=useState(null);

    const attendanceList=()=> {
      if(typeof records ==="object"){
      console.log(records);
      return records.map((currentRecord) => {
          return <Record records={currentRecord} key={currentRecord._id}/>;
      })
    }
    else return [];
  }
    

    const placeholders = {
        id: "Id"
    }

    const initialValues = {
        id: "",
        month:null,
        year:null
    }

    const validationSchema = Yup.object({
        id: Yup.string()
            .required("This field is required")
    });
    
    const handleSubmit =  values => {
       axios({
        method:"get",
        url:"/hr/view-staff-attendance-records" ,
        headers: {
          "auth-access-token": authTokenManager.getAuthAccessToken()
      }, 
        params: {
          id: values.id,
          month:values.month, 
          year:values.year
        }
        
      })
      .then(res => {
        setRecords(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
    };

  const handleFocus = (e) => {
      e.target.placeholder = "";
  };

  const handleBlur = (e, formikProps) => {
      e.target.placeholder = placeholders[e.target.name];
      formikProps.setFieldTouched(e.target.name);
  };
  
  return (
      <div>
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
          >
              { formikProps => (
                  <Form>
                      <Field name="id" placeholder={placeholders.id}
                          onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                      <div className="form-input-error-message">
                          <ErrorMessage name="id"/>
                      </div>
                      <div className="row">
                        <Dropdown isOpen={dropdownOpen1} toggle={() => toggle1()}>
                            <DropdownToggle caret>
                                Month
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => { setMonth("1")}}>1</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { setMonth("2")}}>2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => {{ setMonth("3")}}}>3</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => {{ setMonth("4")}}}>4</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { { setMonth("5")}}}>5</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { { setMonth("6")}}}>6</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { { setMonth("7")}}}>7</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { { setMonth("8")}}}>8</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { { setMonth("9")} }}>9</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { { setMonth("10")} }}>10</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { { setMonth("11")}}}>11</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { { setMonth("12")} }}>12</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="row">
                    <Dropdown isOpen={dropdownOpen2} toggle={() => toggle2()}>
                            <DropdownToggle caret>
                                Year
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => { { setYear("2016")} }}>2016</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { { setYear("2017")}}}>2017</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { { setYear("2018")}}}>2018</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { { setYear("2019")} }}>2019</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { { setYear("2020")} }}>2020</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => {{ setYear("2021")}}}>2021</DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                      <div>
                          <button type="submit" disabled={formikProps.isSubmitting}>Find</button>
                      </div>
                      <div className={messageStyle}>{message}</div>
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
            {attendanceList()}
                </tbody>
              </table>
            </div>
                  </Form>
              )}
          </Formik>
      </div>
  );
};
export default HRAttendance;