import * as SecureStore from "expo-secure-store"

export async function logIn(email, password, setUser) {
	try {
		const base64encodedData = btoa(email + ":" + password)
		// validate with authenticator
		fetch("http://127.0.0.1:8000/login/", {
			method: "GET",
			headers: {
				Authorization: "Basic " + base64encodedData,
			},
		})
			.then((response) => response.json())
			.then(
				(json) =>
					(document.getElementById("output").textContent = JSON.stringify(
						json.results[0]
					))
			)

		// temporary stand in for if authenticator failed
		if (false) {
			return false
		}

		// filler data that would be recieved from authenticator
		name = "Demo User"
		role = "student"
		profilePic = null
		classes = []
		flows = []
		videos = []

		const userDetails = {
			name: name,
			email: email,
			role: role,
			profilePic: profilePic,
			classes: classes,
			flows: flows,
			videos: videos,
		}
		await SecureStore.setItemAsync("user", JSON.stringify(userDetails))
		setUser(userDetails)
	} catch (e) {
		console.warn(e)
		return false
	}
}

export async function signUp(name, email, tel, password, setUser) {
	try {
		const base64encodedData = btoa(email + ":" + password)
		fetch("http://127.0.0.1:8000/users/create", {
			method: "POST",
			headers: {
				Authorization: "Basic " + base64encodedData,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: email,
				password: password,
				name: name,
				email: email,
				phoneNumber: tel,
			}),
		}).then((response) => console.log(response))
		// verify with authenticator

		// temporary standin for if authenticator failed
		if (false) {
			return false
		}

		const userDetails = {
			name: name,
			email: email,
			role: "student",
			profilePic: null,
			classes: [],
			flows: [],
			videos: [],
		}
		await SecureStore.setItemAsync("user", JSON.stringify(userDetails))
		setUser(userDetails)
	} catch (e) {
		console.warn(e)
	}
}

export async function logOut(setUser) {
	try {
		await SecureStore.deleteItemAsync("user")
		setUser(null)
		return true
	} catch (e) {
		console.warn(e)
		return false
	}
}

export async function updateUserDetails(
	name,
	email,
	tel,
	password,
	user,
	setUser
) {
	try {
		// validate with authenticator (i.e. if email unused)

		// updates password if given new password
		if (password) {
			// validate with auth
		}

		const newUserDetails = {
			...user,
			name: name,
			phoneNumber: tel,
			email: email,
		}

		await SecureStore.setItemAsync("user", JSON.stringify(newUserDetails))
		setUser(newUserDetails)
	} catch (e) {}
}

export async function updateProfilePhoto(uri, user, setUser) {
	try {
		const newUserDetails = { ...user, profilePic: uri }
		await SecureStore.setItemAsync("user", JSON.stringify(newUserDetails))
		setUser(newUserDetails)
	} catch (e) {
		console.warn(e)
	}
}

export async function updateSavedFlows(flows, user, setUser) {
	try {
		const updatedUser = { ...user, flows: flows }
		await SecureStore.setItemAsync("user", JSON.stringify(updatedUser))
		setUser(updatedUser)
	} catch (e) {
		console.warn(e)
	}
}

export async function updateClasses(classes, user, setUser) {
	try {
		const updatedUser = { ...user, classes: classes }
		await SecureStore.setItemAsync("user", JSON.stringify(updatedUser))
		setUser(updatedUser)
	} catch (e) {
		console.warn(e)
	}
}

export async function updateVideos(videos, user, setUser) {
	try {
		const updatedUser = { ...user, videos: videos }
		await SecureStore.setItemAsync("user", JSON.stringify(updatedUser))
		setUser(updatedUser)
	} catch (e) {
		console.warn(e)
	}
}
