import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Link, Redirect } from "expo-router"
import { StyleSheet, View } from "react-native"
import Styles from "../../../constants/Styles"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../../../components/Header"
import Colors from "../../../constants/Colors"
import { useContext, useEffect } from "react"
import { UserContext } from "../../../context/UserContext"

export default function NoProfileScreen() {
	const user = useContext(UserContext).user

	if (user) return <Redirect href="/profile/" />

	return (
		<SafeAreaView style={Styles.container}>
			<Header title="Profile" />
			<MaterialCommunityIcons
				style={styles.image}
				size={125}
				name="account-question-outline"
				color={Colors.text}
			/>
			<View style={Styles.button}>
				<Link style={Styles.buttonText} push href="/login">
					Log in
				</Link>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	image: {
		alignSelf: "center",
		marginBottom: 10,
	},
})
