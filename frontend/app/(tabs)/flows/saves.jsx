import { useCallback, useContext, useEffect, useState } from "react"
import { useFlow } from "../../../context/FlowContext"
import { useRouter } from "expo-router"
import {
	Alert,
	FlatList,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native"
import Colors from "../../../constants/Colors"
import { UserContext } from "../../../context/UserContext"
import { SafeAreaView } from "react-native-safe-area-context"
import IconButton from "../../../components/basic/IconButton"
import Styles from "../../../constants/Styles"
import { deleteFlow } from "../../../utils/poseUtils"
import { updateSavedFlows } from "../../../utils/authUtils"

export default function FlowSavesScreen() {
	const router = useRouter()
	const { user, setUser } = useContext(UserContext)
	const { setPendingFlow } = useFlow()
	const [flows, setFlows] = useState([])
	const [showPreview, setShowPreview] = useState(false)
	const [previewFlow, setPreview] = useState(null)

	useEffect(() => {
		setFlows(user.flows)
	}, [user])

	const handleSelect = (flow) => {
		setPendingFlow(flow)
		router.back()
	}

	const handleDelete = (flow, index) => {
		Alert.alert(
			`Delete Flow '${flow.title}'?`,
			"This action cannot be undone.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					onPress: () => {
						deleteFlow(flow.id)

						//setFlows([...flows.slice(0, index), ...flows.slice(index + 1)])
						updateSavedFlows(
							[...flows.slice(0, index), ...flows.slice(index + 1)],
							user,
							setUser,
						)
					},
				},
			],
		)
	}

	const renderSaveCard = useCallback(
		(flow, index) => (
			<View style={styles.card}>
				<Pressable onPress={() => onLoadSave(flow)}>
					<Text style={Styles.subheader}>{flow.title}</Text>
					<Text style={Styles.text}>{flow.difficulty}</Text>
				</Pressable>
				<View style={{ flexDirection: "row", gap: 10 }}>
					<IconButton
						name="trash-can-outline"
						onPress={() => {
							handleDelete(flow, index)
						}}
					/>
				</View>
			</View>
		),
		[flows],
	)

	return (
		<SafeAreaView style={Styles.container}>
			<IconButton name={"arrow-left"} onPress={() => router.back()} />
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
			{/** 
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
      */}
		</SafeAreaView>
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
