import {
	FlatList,
	Image,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native"
import { useCallback, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { Link } from "expo-router"
import Colors from "../../constants/Colors"
import Styles from "../../constants/Styles"

const recentVideos = [
	{ title: "Flowsie Yoga Video", duration: "2 min", youtubeId: "giaFiF1glU4" },
]

const recentFlows = [
	{ title: "Temp Flow", sequence: [] },
	{ title: "Temp Flow", sequence: [] },
]

export default function HomeScreen() {
	const { user } = useContext(UserContext)
	console.log(user)

	// date + "T" + time

	const renderClass = useCallback((lesson) => {
		const date = new Date(lesson.date + "T" + lesson.time + "-7:00")
			.toDateString()
			.split(" ")
		return (
			<View style={styles.classCard}>
				<View style={{ alignContent: "center" }}>
					<Text style={Styles.text}>{date[0]}</Text>
					<Text style={{ ...Styles.subheader, color: Colors.ui }}>
						{date[2]}
					</Text>
					<Text style={Styles.text}>{date[1]}</Text>
				</View>
				<View style={{ justifyContent: "center", gap: 5 }}>
					<Text style={Styles.text}>
						{lesson.title} with {lesson.instructor}
					</Text>
					<Text style={Styles.text}> {lesson.time}</Text>
				</View>
			</View>
		)
	})

	const renderVideoCard = (video) => (
		<Pressable
			onPress={() => {
				// navigate to video
			}}
			style={styles.card}
		>
			<Image
				source={{
					uri: `https://img.youtube.com/vi/${video.youtubeId}/default.jpg`,
				}}
				style={styles.videoImage}
			/>
			<Text style={styles.cardTitle}>{video?.title}</Text>
		</Pressable>
	)

	const renderFlowCard = (flow) => (
		<Pressable
			onPress={() => {
				// navigate to flow
			}}
			style={{ ...styles.card, flexDirection: "row", gap: 10 }}
		>
			<View style={{ justifyContent: "center" }}>
				<Text style={styles.cardTitle}>{flow?.title}</Text>
				<Text style={styles.cardText}>{flow?.difficulty}</Text>
			</View>
			<View
				style={{ padding: 2.5, borderLeftWidth: 1, borderColor: Colors.border }}
			>
				<Image source={{uri: "https://drive.google.come/file/d/"+flow.sequence[0]?.image+"/preview"}} style={styles.flowImage} />
			</View>
		</Pressable>
	)

	return (
		<SafeAreaView style={Styles.container}>
			<View style={styles.greetingView}>
				<Text style={{ ...Styles.header, color: Colors.ui }}>
					{"Hello, " + (user?.name ? user.name.split(" ")[0] : "Guest")}
				</Text>
			</View>
			{user === null && (
				<View>
					<Link style={Styles.buttonText} push href="/login">
						Log in
					</Link>
				</View>
			)}
			{user !== null && (
				<View style={{ flex: 1, marginBottom: 15, gap: 20 }}>
					<View style={{ flex: 1 }}>
						<Text style={styles.sectionTitle}>Upcoming Classes</Text>
						<View style={styles.classView}>
							<FlatList
								data={user.classes}
								renderItem={({ item }) => renderClass(item)}
								extraData={user}
								ListEmptyComponent={() => (
									<Link
										style={{ ...Styles.text, color: Colors.ui }}
										href="/calendar"
									>
										Sign up for yoga classes here!
									</Link>
								)}
							/>
						</View>
					</View>
					<View>
						<Text style={styles.sectionTitle}>Recently Watched</Text>
						<View>
							<FlatList
								data={recentVideos}
								renderItem={({ item }) => renderVideoCard(item)}
								horizontal
								contentContainerStyle={{ gap: 10 }}
								extraData={user}
								ListEmptyComponent={() => (
									<Link
										style={{ ...Styles.text, color: Colors.ui }}
										href="/videos"
									>
										Watch a yoga video!
									</Link>
								)}
							/>
						</View>
					</View>
					<View>
						<Text style={styles.sectionTitle}>Saved Flows</Text>
						<View>
							<FlatList
								data={user.flows}
								renderItem={({ item }) => renderFlowCard(item)}
								horizontal
								contentContainerStyle={{ gap: 10 }}
								extraData={user}
								ListEmptyComponent={() => (
									<Link
										style={{ ...Styles.text, color: Colors.ui }}
										href="/flows"
									>
										Try making a flow!
									</Link>
								)}
							/>
						</View>
					</View>
				</View>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	greetingView: { marginTop: 10 },
	classView: {
		backgroundColor: Colors.tintedBackground,
		padding: 8,
		flex: 1,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.border,
	},
	classCard: {
		backgroundColor: Colors.background,
		flexDirection: "row",
		padding: 10,
		paddingHorizontal: 20,
		gap: 15,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.border,
	},
	sectionTitle: {
		...Styles.subheader,
		marginBottom: 5,
		borderBottomWidth: 2,
		borderColor: Colors.border,
	},
	list: {
		gap: 10,
	},
	card: {
		backgroundColor: Colors.background,
		overflow: "hidden",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.border,
	},
	cardTitle: {
		...Styles.subheader,
		fontSize: 16,
		padding: 10,
	},
	cardText: {
		...Styles.text,
		padding: 10,
		paddingTop: 0,
		color: Colors.inactiveUI,
	},
	videoImage: {
		height: 100,
		aspectRatio: "16/9",
		backgroundColor: Colors.tintedBackground,
	},
	flowImage: {
		height: 75,
		width: 75,
		resizeMode: "contain",
	},
})

// want images to overlap w/ text box
