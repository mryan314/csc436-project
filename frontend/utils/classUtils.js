import { getUserToken } from "./authUtils"

function formatClassesByDate(classList) {
	return classList.reduce((acc, obj) => {
		acc[obj.date] ||= []
		acc[obj.date].push(obj)
		return acc
	}, {})
}

export async function getClasses(setClasses) {
	try {
		const response = await fetch("http://localhost:3000/classes", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + (await getUserToken()),
			},
		})
			.then((response) => response.json())
			.then((response) =>
				response.map(
					({
						class_cap,
						class_size,
						instructor_id,
						scheduled_at,
						...rest
					}) => ({
						capacity: class_cap,
						numEnrolled: class_size,
						instructorId: instructor_id,
						scheduledAt: new Date(scheduled_at),
						date: scheduled_at.slice(0, scheduled_at.indexOf("T")),
						time: new Date(scheduled_at).toLocaleTimeString([], {
							hour: "numeric",
							minute: "numeric",
						}),
						...rest,
					}),
				),
			)
		console.log(response)
		const classesByDate = formatClassesByDate(await response)
		console.log(classesByDate)
		setClasses(classesByDate)
		return true
	} catch (e) {
		console.warn(e)
		return false
	}
}

export async function getClassInfo(classId) {
	try {
		const response = await fetch(`http://localhost:3000/classes/${classId}`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + (await getUserToken()),
			},
		})
			.then((response) => response.json())
			.then((response) =>
				response.map(
					({
						class_cap,
						class_size,
						instructor_id,
						scheduled_at,
						...rest
					}) => ({
						capacity: class_cap,
						numEnrolled: class_size,
						instructorId: instructor_id,
						scheduledAt: new Date(scheduled_at),
						date: scheduled_at.slice(0, scheduled_at.indexOf("T")),
						time: new Date(scheduled_at).toLocaleTimeString([], {
							hour: "numeric",
							minute: "numeric",
						}),
						...rest,
					}),
				),
			)
		console.log(response)
		return await response
	} catch (e) {
		console.warn(e)
		return false
	}
}

export async function createClass(
	name,
	desc,
	scheduled_at,
	capacity,
	location,
) {
	try {
		const response = await fetch("http://localhost:3000/classes", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + (await getUserToken()),
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				yoga_class: {
					name: name,
					desc: desc,
					scheduled_at: scheduledAt.toISOString(),
					class_cap: capacity,
					location: location,
				},
			}),
		})
		if (!response.ok) {
			throw new Error(
				`HTTP error when creating class! Status: ${response.status}`,
			)
		}
		return true
	} catch (e) {
		console.warn(e)
		return false
	}
}

export async function updateClass(updatedClassInfo) {
	try {
		const response = await fetch(`http://localhost:3000/classes/${classId}`, {
			method: "PUT",
			headers: {
				Authorization: "Bearer " + (await getUserToken()),
			},
			body: JSON.stringify({
				yoga_class: updatedClassInfo, //{...updatedClassInfo, scheduledAt: `${updatedClassInfo.date}T${updatedClassInfo.time}Z`},
			}),
		})
		console.log(response)
		return true
	} catch (e) {
		console.warn(e)
		return false
	}
}

export async function removeClass(params) {
	try {
		const response = await fetch(`http://localhost:3000/classes/${classId}`, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + (await getUserToken()),
			},
		})
		console.log(response)
		return true
	} catch (e) {
		console.warn(e)
		return false
	}
}

export async function enrollInClass() {
	try {
		const response = await fetch(
			`http://localhost:3000/classes/${classId}/enroll`,
			{
				method: "POST",
				headers: {
					Authorization: "Bearer " + (await getUserToken()),
				},
			},
		)
		if (!response.ok) {
			throw new Error(
				`HTTP error when enrolling in class! Status: ${response.status}`,
			)
		}
		return true
	} catch (e) {
		console.warn(e)
		return false
	}
}

export async function unenrollInClass() {
	try {
		const response = await fetch(
			`http://localhost:3000/classes/${classId}/enroll`,
			{
				method: "DESTROY",
				headers: {
					Authorization: "Bearer " + (await getUserToken()),
				},
			},
		)
		console.log(response)
		return true
	} catch (e) {
		console.warn(e)
		return false
	}
}
