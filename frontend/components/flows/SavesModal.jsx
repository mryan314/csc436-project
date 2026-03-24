import {
	FlatList,
	Modal,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native"
import IconButton from "../basic/IconButton"
import { useCallback, useState } from "react"
import Styles from "../../constants/Styles"
import FlowModal from "./FlowModal"
import Colors from "../../constants/Colors"
import { Difficulty } from "../../utils/poses"

export default function SavesModal({
	savedFlows,
	onClose,
	onEditSave,
	visible,
}) {
	const [flows, setFlows] = useState(savedFlows)
	const [showPreview, setShowPreview] = useState(false)
	const [previewFlow, setPreview] = useState(null)

	const handleSelect = (flow) => {
		setShowPreview(true)
		setPreview(flow)
	}

	const handleDelete = (index) => {
		setFlows([...flows.slice(0, index), ...flows.slice(index + 1)])
	}

	const renderSaveCard = useCallback(
		(flow, index) => (
			<View style={styles.card}>
				<Pressable onPress={() => handleSelect(flow)}>
					<Text style={Styles.subheader}>{flow.title}</Text>
					<Text style={Styles.text}>{Difficulty[flow.difficulty]}</Text>
				</Pressable>
				<View style={{ flexDirection: "row", gap: 10 }}>
					<IconButton
						name="trash-can-outline"
						onPress={() => {
							handleDelete(index)
						}}
					/>
				</View>
			</View>
		),
		[flows]
	)

	return (
		<Modal visible={visible} animationType="slide">
			<SafeAreaView style={Styles.container}>
				<IconButton name={"arrow-left"} onPress={() => onClose(flows)} />
				<Text style={Styles.header}>Saved Flows</Text>
				<View style={styles.list}>
					<FlatList
						data={flows}
						renderItem={({ item, index }) => renderSaveCard(item, index)}
						contentContainerStyle={{ gap: 5 }}
						ListEmptyComponent={() => (
							<Text style={{ ...Styles.subheader, color: Colors.inactiveUI }}>
								No saved flows
							</Text>
						)}
					/>
				</View>
			</SafeAreaView>
			<View>
				{showPreview && (
					<FlowModal
						flow={previewFlow}
						onCancel={() => setShowPreview(false)}
						onEdit={() => {
							setShowPreview(false)
							onEditSave(previewFlow)
							onClose(flows)
						}}
					/>
				)}
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	list: {
		backgroundColor: Colors.tintedBackground,
		padding: 10,
		gap: 5,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.border,
	},
	card: {
		backgroundColor: Colors.background,
		flexDirection: "row",
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.border,
		justifyContent: "space-between",
	},
})
