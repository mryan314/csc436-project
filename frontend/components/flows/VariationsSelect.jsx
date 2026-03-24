import { useCallback, useEffect, useState } from "react"
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native"
import Poses from "../../temp/poses"
import Colors from "../../constants/Colors"

export default function VariationsSelect({ pose, updatePose }) {
	const [variations, setVariations] = useState([])

	useEffect(() => {
		if (pose?.variations) {
			setVariations(pose.variations.map((index) => Poses[index]))
		} else {
			setVariations([pose])
		}
	}, [pose])

	const renderButton = useCallback(
		({ item }) => {
			return (
				<Pressable onPress={() => updatePose(item)}>
					<Image
						source={{uri: "https://drive.google.come/file/d/"+item.image+"/preview"}}
						style={
							item.name == pose.name ? styles.varSelected : styles.varImage
						}
					/>
				</Pressable>
			)
		},
		[pose]
	)

	return (
		<View style={{ flex: 1 }}>
			<FlatList data={variations} renderItem={renderButton} horizontal />
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
