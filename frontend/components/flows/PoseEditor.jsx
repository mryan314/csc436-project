import { Image, Text, View } from "react-native"
import IconButton from "../basic/IconButton"
import VariationsSelect from "./VariationsSelect"
import { getPoseImageSource } from "../../utils/poseUtils"
import { StyleSheet } from "react-native"
import Styles from "../../constants/Styles"
import Colors from "../../constants/Colors"

export default function PoseEditor({
	poses,
	pose,
	updateVariation,
	handleDelete,
}) {
	if (!pose) {
		return (
			<View style={styles.editView}>
				<Text style={styles.editPlaceholder}>
					Select a pose to add it to the flow.
				</Text>
			</View>
		)
	}
	return (
		<View style={styles.editView}>
			<Image source={getPoseImageSource(pose)} style={styles.editImage} />
			<View style={styles.editDetails}>
				<Text numberOfLines={1} style={styles.editHeader}>
					{pose.name}
				</Text>
				<Text style={styles.editDescription}>{pose.difficulty}</Text>
				<VariationsSelect
					poses={poses}
					pose={pose}
					updatePose={updateVariation}
				/>
			</View>
			<IconButton
				name="trash-can-outline"
				onPress={() => handleDelete(pose.seqPosition)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	editView: {
		flex: 1.35,
		flexDirection: "row",
		backgroundColor: Colors.tintedBackground,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.border,
		overflow: "hidden",
		paddingRight: 5,
		gap: 5,
	},
	editPlaceholder: {
		...Styles.subheader,
		padding: 35,
		alignSelf: "center",
		textAlign: "center",
		color: Colors.inactiveUI,
	},
	editImage: {
		backgroundColor: Colors.background,
		flex: 0.75,
		height: "100%",
		resizeMode: "contain",
		justifyContent: "center",
		alignSelf: "center",
		borderRightWidth: 1,
		borderColor: Colors.border,
	},
	editDetails: {
		flex: 1,
		padding: 5,
	},
	editHeader: {
		...Styles.subheader,
		fontSize: 16,
	},
	editDescription: {
		...Styles.text,
		fontSize: 13,
		color: Colors.inactiveUI,
	},
	editInputs: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
})
