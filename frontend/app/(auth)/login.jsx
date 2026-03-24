import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Link, useRouter } from "expo-router"
import React, { useContext, useState } from "react"
import {
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native"
import Colors from "../../constants/Colors"
import Styles from "../../constants/Styles"
import Fonts from "../../constants/Fonts"
import { logIn } from "../../utils/authUtils"
import { UserContext } from "../../context/UserContext"
import Input from "../../components/basic/Input"

export default function LoginScreen() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState()
	const router = useRouter()
	const setUser = useContext(UserContext).setUser

	const onLogin = () => {
		if (!email) {
			setError("Please enter an email address.")
		} else if (!password) {
			setError("Please enter a password.")
		} else {
			// Make api call to authorization service
			// if login success, update context & nav back to original page (or profile/splash)
			// else, show error & clear pass?
			logIn(email.text, password, setUser)
			setPassword("")
			setError()
			router.back()
		}
	}

	const goBack = () => {
		setPassword("")
		router.back()
	}

	return (
		<SafeAreaView style={Styles.container}>
			<Pressable onPress={goBack}>
				<MaterialCommunityIcons
					name="arrow-left"
					size={32}
					color={Colors.text}
				/>
			</Pressable>
			<View style={styles.container}>
				<Text style={styles.header}>Login</Text>
				{error && <Text style={Styles.error}>{error}</Text>}
				<Input
					value={email}
					placeholder="Email"
					inputMode="email"
					autoComplete="email"
					keyboardType="email-address"
					onChangeText={(text) => setEmail({ text })}
					placeholderTextColor={Colors.placeholderText}
				/>
				<Input
					value={password}
					placeholder="Password"
					secureTextEntry
					autoComplete="current-password"
					onChangeText={(text) => setPassword(text)}
				/>
				<Pressable onPress={onLogin} style={Styles.button}>
					<Text style={Styles.buttonText}>Log In</Text>
				</Pressable>
				<View style={styles.signUp}>
					<Text style={Styles.text}>Don't have an account?</Text>
					<Link replace href="/signup" style={Styles.link}>
						Sign up
					</Link>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
		paddingHorizontal: 10,
		alignContent: "center",
		gap: 20,
	},
	header: {
		...Styles.header,
		paddingTop: 50,
		paddingBottom: 10,
		alignSelf: "center",
	},
	signUp: {
		flexDirection: "row",
		gap: 5,
	},
})
