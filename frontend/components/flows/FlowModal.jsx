import {
	FlatList,
	Modal,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native"
import PoseCard from "./PoseCard"
import Colors from "../../constants/Colors"
import Styles from "../../constants/Styles"
import { useMemo } from "react"
import { Difficulty } from "../../utils/poses"

export default function FlowModal({ flow, onCancel, onEdit, onSave }) {
	const difficulty = useMemo(() => {
		if (flow.sequence.find((pose) => pose.difficulty === 2)) return 2
		else if (flow.sequence.find((pose) => pose.difficulty === 1)) return 1
		else return 0
	}, [flow.sequence])

	return (
		<Modal animationType="slide">
			<SafeAreaView style={{ ...Styles.container, gap: 15 }}>
				<View>
					<Text style={styles.title}>{flow?.title}</Text>
					<Text style={styles.difficulty}>{Difficulty[difficulty]}</Text>
				</View>
				<View style={styles.seqView}>
					<FlatList
						data={flow?.sequence}
						renderItem={({ item }) => (
							<PoseCard pose={item} onPress={() => {}} />
						)}
						numColumns={3}
						contentContainerStyle={{ gap: 10 }}
						columnWrapperStyle={{ gap: 10 }}
					/>
				</View>
				<View style={styles.buttonView}>
					<Pressable onPress={onCancel} style={{ flex: 1 }}>
						<Text style={Styles.buttonTextInverse}>Cancel</Text>
					</Pressable>
					{onSave && (
						<Pressable
							onPress={() => onSave({ ...flow, difficulty: difficulty })}
							style={{ flex: 1 }}
						>
							<Text style={Styles.buttonText}>Save</Text>
						</Pressable>
					)}
					{onEdit && (
						<Pressable onPress={onEdit} style={{ flex: 1 }}>
							<Text style={Styles.buttonText}>Edit</Text>
						</Pressable>
					)}
				</View>
			</SafeAreaView>
		</Modal>
	)
}

const styles = StyleSheet.create({
	title: {
		...Styles.header,
		fontSize: 24,
		paddingBottom: 0,
	},
	difficulty: {
		...Styles.subheader,
		color: Colors.inactiveUI,
	},
	seqView: {
		backgroundColor: Colors.tintedBackground,
		minHeight: 115,
		maxHeight: "75%",
		width: "105%",
		padding: "2.5%",
		borderWidth: 1,
		borderRadius: 20,
		borderColor: Colors.border,
		alignSelf: "center",
	},
	buttonView: {
		flexDirection: "row",
		marginTop: 5,
		gap: 15,
		justifyContent: "space-around",
	},
})
