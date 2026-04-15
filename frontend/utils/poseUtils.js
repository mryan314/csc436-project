import { getPoseImage } from "../assets/poses"

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
	} catch (e) {
		console.warn(e)
	}
}
