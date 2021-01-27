import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
const SetUserContext = createContext();
UserContext.displayName = "User Context";
SetUserContext.displayName = "Set User Context";

function UserProvider(props) {
	const [user, setUser] = useState({});

	return (
		<UserContext.Provider value={user}>
			<SetUserContext.Provider value={setUser}>
				{props.children}
			</SetUserContext.Provider>
		</UserContext.Provider>
	);
}

function useUserContext() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
}

function useSetUserContext() {
	const context = useContext(SetUserContext);
	if (context === undefined) {
		throw new Error("useSetUser must be used within a UserProvider");
	}
	return context;
}

export { UserProvider, useUserContext, useSetUserContext };