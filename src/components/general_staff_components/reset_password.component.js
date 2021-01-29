import React from "react";
import { useUserContext } from "../../contexts/user.context";
import ResetPasswordForm from "../form_components/reset_password_form.component";

const ResetPassword = () => {
	const user = useUserContext();


	return (
		<div className="">
			<h4>Change Password</h4>
			<br />

			{!user.loggedIn ? <>
				<h6>It appears to be your first login. You must reset your password to continue</h6>
				<br />
			</> : null}

			<div className=""> <ResetPasswordForm /> </div>
		</div>
	);
};

export default ResetPassword;