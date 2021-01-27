import React from "react";
import { useUserContext } from "../../contexts/user.context";

const ResetPassword = () => {
	const user = useUserContext();

	return (
		<div>
			<h4>Change Password</h4>
			{!user.loggedIn ?
				<h6>It appears to be your first login. You must reset your password to continue</h6> : null}
		</div>
	);
};

export default ResetPassword;