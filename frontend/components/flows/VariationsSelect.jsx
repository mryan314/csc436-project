import { useEffect, useState } from "react"
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native"
import Colors from "../../constants/Colors"
import { getPoseImageSource } from "../../utils/poseUtils"

export default function VariationsSelect({ poses, pose, updatePose }) {
	const [variations, setVariations] = useState([])

	useEffect(() => {
		if (pose.variations.length) {
			setVariations([
				...pose.variations.map(({ id }) => poses.find((p) => p.id === id)),
			])
		} else {
			setVariations([pose])
		}
	}, [pose])

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={variations}
				renderItem={({ item }) => {
					return (
						<Pressable onPress={() => updatePose(item)}>
							<Image
								source={getPoseImageSource(item)}
								style={
									item.name == pose.name ? styles.varSelected : styles.varImage
								}
							/>
						</Pressable>
					)
				}}
				horizontal
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	varImage: {
		backgroundColor: Colors.background,
		flex: 1,
		aspectRatio: "1/1",
		resizeMode: "contain",
		marginTop: 5,
		marginRight: 5,
		borderWidth: 2,
		borderRadius: 30,
		borderColor: Colors.border,
	},
	varSelected: {
		backgroundColor: Colors.background,
		flex: 1,
		aspectRatio: "1/1",
		marginTop: 5,
		marginRight: 5,
		resizeMode: "contain",
		borderWidth: 2,
		borderRadius: 30,
		borderColor: Colors.ui,
	},
})
