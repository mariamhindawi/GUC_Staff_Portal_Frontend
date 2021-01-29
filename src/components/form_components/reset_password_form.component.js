import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import authTokenManager from "../../others/auth_token_manager";
import errorMessages from "../../others/error_messages";

const ResetPasswordForm = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const history = useHistory();
	const axiosCancelSource = axios.CancelToken.source();


	const cancelRequests = () => {
		return () => { axiosCancelSource.cancel(errorMessages.requestCancellation); };
	};
	useEffect(cancelRequests, []);

	const placeholders = {
		oldPassword: "Old password",
		newPassword: "New password",
		confirmedNewPassword: "Confirm new password"
	};

	const initialValues = {
		oldPassword: "",
		newPassword: "",
		confirmedNewPassword: ""
	};

	const validationSchema = Yup.object({
		oldPassword: Yup.string()
			.required("This field is required"),
		newPassword: Yup.string()
			.required("This field is required"),
		confirmedNewPassword: Yup.string()
			.required("This field is required")
	});

	const handleSubmit = async (values, formikProps) => {
		if (values.newPassword !== values.confirmedNewPassword) {
			formikProps.setFieldValue("oldPassword", "", false);
			formikProps.setFieldTouched("oldPassword", false, false);
			formikProps.setFieldValue("newPassword", "", false);
			formikProps.setFieldTouched("newPassword", false, false);
			formikProps.setFieldValue("confirmedNewPassword", "", false);
			formikProps.setFieldTouched("confirmedNewPassword", false, false);
			setErrorMessage("Entered passwords do not match");
			return;
		}
		await axiosInstance({
			method: "put",
			url: "/staff/reset-password",
			cancelToken: axiosCancelSource.token,
			headers: {
				"auth-access-token": authTokenManager.getAuthAccessToken()
			},
			data: {
				"oldPassword": values.oldPassword,
				"newPassword": values.newPassword,
				"confirmedNewPassword": values.confirmedNewPassword
			}
		})
			.then(response => {
				alert(`${response.data}\nPlease Login again`);
				authTokenManager.removeAuthAccessToken();
				localStorage.setItem("reset-password", Date.now());
				history.push("/login");
			})
			.catch(error => {
				if (axios.isCancel(error)) {
					console.log(`Request cancelled: ${error.message}`);
				}
				else {
					if (error.response) {
						formikProps.setFieldValue("oldPassword", "");
						formikProps.setFieldTouched("oldPassword", false, false);
						formikProps.setFieldValue("newPassword", "");
						formikProps.setFieldTouched("newPassword", false, false);
						formikProps.setFieldValue("confirmedNewPassword", "");
						formikProps.setFieldTouched("confirmedNewPassword", false, false);
						setErrorMessage(error.response.data);
						console.log(error.response);
					}
					else if (error.request) {
						console.log(error.request);
					}
					else {
						console.log(error.message);
					}
				}
			});
	};

	const handleFocus = (e) => {
		e.target.placeholder = "";
		setErrorMessage("");
	};

	const handleBlur = (e, formikProps) => {
		e.target.placeholder = placeholders[e.target.name];
		formikProps.setFieldTouched(e.target.name);
	};


	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}>
			{formikProps => (
				<Form>
					<label htmlFor="oldPassword">

					</label>
					<Field className="" type="password" name="oldPassword" placeholder={placeholders.oldPassword}
						onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
					<div className="form-input-error-message">
						<ErrorMessage name="oldPassword" />
					</div>

					<label htmlFor="newPassword">

					</label>
					<Field className="" type="password" name="newPassword" placeholder={placeholders.newPassword}
						onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
					<div className="form-input-error-message">
						<ErrorMessage name="newPassword" />
					</div>

					<label htmlFor="confirmedNewPassword">

					</label>
					<Field className="" type="password" name="confirmedNewPassword" placeholder={placeholders.confirmedNewPassword}
						onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
					<div className="form-input-error-message">
						<ErrorMessage name="confirmedNewPassword" />
					</div>

					<div className="">
						<button className="" type="submit" disabled={formikProps.isSubmitting} onClick={() => { setErrorMessage(""); }}>Reset Password</button>
						<div className="form-error-message">{errorMessage}</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ResetPasswordForm;