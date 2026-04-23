import * as SecureStore from "expo-secure-store"

async function generateUserToken(email, password) {
	const base64encodedData = btoa(email.toLowerCase() + ":" + password)
	// validate with authenticator
	const response = await fetch("http://localhost:3000/api-keys", {
		method: "POST",
		headers: {
			Authorization: "Basic " + base64encodedData,
		},
	}).then((response) => response.json())

	return response
}

async function saveUserToken(token, id) {
	await SecureStore.setItemAsync("userToken", token)
	await SecureStore.setItemAsync("userTokenId", String(id))
}

export async function getUserToken() {
	return await SecureStore.getItemAsync("userToken")
}

async function fetchUserFlows() {
	try {
		const response = await fetch(`http://localhost:3000/flows`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + (await getUserToken()),
			},
		}).then((response) => {
			if (!response.ok) {
				throw new Error(
					`HTTP error when fetching flows! Status: ${response.status}`,
				)
			}
			return response.json()
		}).then((response) => response.map(({ name, id }) => ({
				id: id,
				title: name,
			})))

		console.log(response)
		return await response
	} catch (e) {
		console.warn(e)
		return null
	}
}

async function fetchUserData(token, userId) {
	const response = await fetch(`http://localhost:3000/user/${userId}`, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	}).then((response) => {
		if (!response.ok) {
			throw new Error(
				`HTTP error when creating user! Status: ${response.status}`,
			)
		}
		return response.json()
	})
	return {
		id: await response.id,
		name: await response.first_name,
		email: await response.email,
		role: await response.role,
		flows: await fetchUserFlows(),
		// below values not yet in DB
		profilePic: null,
		classes: [],
		videos: [],
	}
}

export async function logIn(email, password, setUser) {
	try {
		const response = await generateUserToken(email, password)

		await saveUserToken(response.token, response.id)

		const userDetails = await fetchUserData(response.token, response.bearer_id)
		await setUser(userDetails)
		return true
	} catch (e) {
		console.warn(e)
		return false
	}
}

export async function signUp(name, email, password, setUser) {
	try {
		const response = await fetch("http://localhost:3000/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				user: {
					email: email,
					password: password,
					first_name: name,
				},
			}),
		})
		if (!response.ok) {
			throw new Error(
				`HTTP error when creating user! Status: ${response.status}`,
			)
		}
		const data = await response.json()
		// generates and saves api token and user info
		const tokenResponse = await generateUserToken(email, password)
		await saveUserToken(tokenResponse.token, tokenResponse.bearer_id)

		const userDetails = {
			id: data.id,
			name: data.first_name,
			email: data.email,
			role: data.role,
			profilePic: null,
			classes: [],
			flows: [],
			videos: [],
		}
		await setUser(userDetails)

		return true
	} catch (e) {
		console.warn(e)
		return false
	}
}

export async function logOut(setUser) {
	try {
		const tokenId = await SecureStore.getItemAsync("userTokenId")
		// delete api auth token from db
		const response = await fetch(`http://localhost:3000/api-keys/${tokenId}`, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + await getUserToken(),
			},
		})

		// remove api auth token from local storage
		await SecureStore.deleteItemAsync("userToken")
		await SecureStore.deleteItemAsync("userTokenId")
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
	setUser,
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
