import { getPoseImage } from "../assets/poses"
import { getUserToken } from "./authUtils"

export const poseFilters = {
	difficulty: {
		label: "Difficulty",
		options: ["Beginner", "Intermediate", "Advanced"],
	},
	position: {
		label: "Position",
		options: [
			"Standing",
			"Seated",
			"Supine",
			"Prone",
			"Arm Balance",
			"Supported",
		],
	},
	posture: {
		label: "Posture",
		options: [
			"Back Bend",
			"Forward Bend",
			"Lateral Bend",
			"Twist",
			"Balance",
			"Neutral",
		],
	},
}

export function getPoseImageSource(pose) {
	if (pose.imageFile) return getPoseImage(pose.imageFile)
	// eventually add if (pose.imageUrl) when user-added poses implemented
	return require("../assets/poses/placeholder.png")
}

export async function fetchPoseData(setPoses) {
	try {
		console.log("fetch poses")
		const response = await fetch("http://localhost:3000/pose", {
			method: "GET",
		})
			.then((response) => response.json())
			// drop timestamps + update column names to match naming conventions
			.then((response) =>
				response.map(
					({ image_file, var_id, created_at, updated_at, ...rest }) => ({
						imageFile: image_file,
						varId: var_id,
						...rest,
					}),
				),
			)
		setPoses(await response)
		return true
	} catch (e) {
		console.warn(e)
		return false
	}
}

function loadFlowSequence(sequence, poses) {
	console.log(sequence)
	return sequence.map((item) => ({
		...item,
		...poses.find((pose) => pose.id === item.id),
	}))
}

export async function fetchFlow(flowId, poses) {
	try {
		console.log(poses)
		console.log(poses.find((pose) => pose.id === 6))
		console.log(flowId)
		console.log(await getUserToken())
		const response = await fetch(`http://localhost:3000/flows/${flowId}`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + (await getUserToken()),
			}, //b4bb540b3f0f1c0a0e5d63f397e49572
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						`HTTP error when fetching flows! Status: ${response.status}`,
					)
				}
				return response.json()
			})
			.then((response) => ({
				id: flowId,
				title: response.name,
				sequence: response.flow_items.map(({ id, pose_id, position }) => ({
					id: pose_id,
					flowId: id,
					seqPosition: position,
					...poses.find((pose) => pose.id === id),
				})),
			}))
		return await response
	} catch (e) {
		console.warn(e)
		return null
	}
}

export async function createFlow(name, sequence) {
	try {
		const flowItems = sequence.map((pose) => ({
			pose_id: pose.id,
			position: pose.seqPosition,
		}))
		const response = await fetch(`http://localhost:3000/flows`, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + (await getUserToken()),
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				flow: {
					name: name,
					flow_items_attributes: flowItems,
				},
			}),
		})
		if (!response.ok) {
			throw new Error(
				`HTTP error when creating flow! Status: ${response.status}`,
			)
		}
		return true
	} catch (e) {
		console.warn(e)
		return false
	}
}


function getFlowUpdates(oldSequence, newSequence) {
	const oldSeq = new Set(oldSequence)
	const newSeq = new Set(newSequence)
	const updatedFlow = newSeq
		.filter((item) => !item.flowId)
		.map((item) => ({ pose_id: item.id, position: item.seqPosition }))

	updatedFlow = updatedFlow.push(
		...oldSeq.map((item) => {
			if (newSeq.has(item.flowId))
				return { id: item.flowId, pose_id: item.id, position: item.seqPosition }
			else return { id: item.flowId, _destroy: true }
		}),
	)
	console.log(updatedFlow)
	return updatedFlow
}

export async function updateFlow(oldFlow, name, sequence) {
	try {
		const response = await fetch(`http://localhost:3000/flows/${oldFlow.id}`, {
			method: "PUT",
			headers: {
				Authorization: "Bearer " + (await getUserToken()),
			},
			body: JSON.stringify({
				flow: {
					name: name,
					flow_items_attributes: getFlowUpdates(oldFlow.sequence, sequence),
				},
			}),
		})
		if (!response.ok) {
			throw new Error(
				`HTTP error when updating flow! Status: ${response.status}`,
			)
		}
		return true
	} catch (e) {
		console.warn(e)
		return false
	}
}

export async function deleteFlow(flowId) {
	try {
		console.log("delete start")
		const response = await fetch(`http://localhost:3000/flows/${flowId}`, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + (await getUserToken()),
			},
		})
		if (!response.ok) {
			throw new Error(
				`HTTP error when deleting flow! Status: ${response.status}`,
			)
		}
		return true
	} catch (e) {
		console.warn(e)
		return false
	}
}
