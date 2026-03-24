import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	TouchableOpacity,
	Image,
} from "react-native"
import Header from "../../../components/Header"
import Styles from "../../../constants/Styles"
import Colors from "../../../constants/Colors"
import { useRouter } from "expo-router"
import { updateVideos } from "../../../utils/authUtils"
import { useContext } from "react"
import { UserContext } from "../../../context/UserContext"

const DUMMY_VIDEOS = [
	{
		id: "1",
		title: "Flowsie Yoga Video",
		duration: "2 min",
		thumbnail: "",
		youtubeId: "giaFiF1glU4",
	},
	{
		id: "2",
		title: "Morning Yoga Flow",
		duration: "7 min",
		thumbnail: "https://img.youtube.com/vi/PLACEHOLDER1/0.jpg",
		youtubeId: "0-gb8PEecPw",
	},
	{
		id: "3",
		title: "Beginner Yoga Class",
		duration: "5 min",
		thumbnail: "https://img.youtube.com/vi/PLACEHOLDER2/0.jpg",
		youtubeId: "PLACEHOLDER2",
	},
]

const VideoCard = ({ video, onPress }) => (
	<TouchableOpacity
		onPress={onPress}
		style={{
			backgroundColor: Colors.background,
			borderRadius: 10,
			margin: 10,
			padding: 10,
			elevation: 3,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.25,
		}}
	>
		<Image
			source={{
				uri: `https://img.youtube.com/vi/${video.youtubeId}/default.jpg`,
			}}
			style={{ width: "100%", height: 140, borderRadius: 8 }}
			resizeMode="cover"
		/>
		<View style={{ padding: 10 }}>
			<Text style={Styles.subheader}>{video.title}</Text>
			<Text style={Styles.text}>Duration: {video.duration}</Text>
		</View>
	</TouchableOpacity>
)

export default function VideosScreen() {
	const router = useRouter()
	const { user, setUser } = useContext(UserContext)

	const handleVideoPress = (video) => {
		router.navigate({ pathname: "/videos/watch", params: video })
	}

	return (
		<SafeAreaView style={Styles.container}>
			<Header title="Yoga Videos" />
			<FlatList
				data={DUMMY_VIDEOS}
				renderItem={({ item }) => (
					<VideoCard video={item} onPress={() => handleVideoPress(item)} />
				)}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ padding: 10 }}
			/>
		</SafeAreaView>
	)
}
