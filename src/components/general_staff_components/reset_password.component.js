import React from "react";

const ResetPassword = () => {
	return (
		<div>
			<h4>Change Password</h4>
			{localStorage.userFirstLogin ?
				<h6>It appears to be your first login. You must reset your password</h6> : null}
		</div>
	);
};

export default ResetPassword;