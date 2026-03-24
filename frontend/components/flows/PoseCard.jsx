import React from "react"
import {
	Dimensions,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native"
import Styles from "../../constants/Styles"
import Colors from "../../constants/Colors"

const { width } = Dimensions.get("window")

function PoseCard({ pose, onPress, onLongPress, index, isCurrent, showName }) {
	return (
		<Pressable
			onPress={() => onPress(pose)}
			onLongPress={onLongPress}
			style={isCurrent ? styles.selected : styles.container}
		>
			<ImageBackground
				source={{uri: "https://drive.google.come/file/d/"+pose.image+"/preview"}}
				style={styles.imageContainer}
				imageStyle={styles.image}
			>
				<View style={styles.bar}>
					<Text style={Styles.text}>{index}</Text>
				</View>
				{showName && (
					<View style={styles.titleWrapper}>
						<Text style={isCurrent ? styles.selectedTitle : styles.title}>
							{pose.name}
						</Text>
					</View>
				)}
			</ImageBackground>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.background,
		flex: 1,
		aspectRatio: "1/1",
		paddingTop: 5,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.border,
		overflow: "hidden",
		maxWidth: width / 3 - 30,
	},
	selected: {
		backgroundColor: Colors.background,
		flex: 1,
		aspectRatio: "1/1",
		paddingTop: 5,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: Colors.ui,
		overflow: "hidden",
	},
	imageContainer: {
		flex: 1,
		justifyContent: "space-between",
	},
	image: {
		resizeMode: "contain",
		justifyContent: "center",
		marginBottom: 5,
	},
	bar: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 5,
	},
	titleWrapper: {
		backgroundColor: "rgba(247,234,229,0.9)",
		paddingVertical: "5%",
	},
	title: {
		...Styles.subheader,
		fontSize: 14,
		textAlign: "center",
	},
	selectedTitle: {
		...Styles.subheader,
		fontSize: 14,
		textAlign: "center",
		color: Colors.activeUI,
	},
})

export default React.memo(PoseCard)
