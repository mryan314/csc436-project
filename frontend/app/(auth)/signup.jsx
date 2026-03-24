import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Link, useRouter } from "expo-router"
import React, { useContext, useState } from "react"
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import Colors from "../../constants/Colors"
import Styles from "../../constants/Styles"
import { signUp } from "../../utils/authUtils"
import { UserContext } from "../../context/UserContext"
import Input from "../../components/basic/Input"

export default function SignupScreen() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [tel, setTel] = useState("")
	const [password, setPassword] = useState("")
	const [reenter, setReenter] = useState("")
	const [error, setError] = useState()
	const router = useRouter()
	const setUser = useContext(UserContext).setUser

	const onSignup = () => {
		// Make api call to auth service
		// if signup success, update context & nav back to original page (or profile/splash)
		// else show error and clear pass/fields??

		if (!name || !email || !tel || !password || !reenter) {
			setError("Please fill all fields.")
		} else if (password !== reenter) {
			setError("Passwords do not match.")
		} else {
			signUp(name, email.text, tel, password, setUser)
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
				<Text style={styles.header}>Sign Up</Text>
				{error && <Text style={Styles.error}>{error}</Text>}
				<Input
					value={name}
					placeholder="Name"
					autoComplete="name"
					onChangeText={(text) => setName(text)}
					style={Styles.textInput}
				/>
				<Input
					value={email}
					placeholder="Email"
					inputMode="email"
					autoComplete="email"
					keyboardType="email-address"
					onChangeText={(text) => setEmail({ text })}
					style={Styles.textInput}
				/>
				<Input
					value={tel}
					placeholder="Phone Number"
					inputMode="tel"
					autoComplete="tel"
					keyboardType="phone-pad"
					onChangeText={(text) => setTel({ text })}
					style={Styles.textInput}
				/>
				<Input
					value={password}
					placeholder="Password"
					autoComplete="new-password"
					onChangeText={(text) => setPassword(text)}
					style={Styles.textInput}
				/>
				<Input
					value={reenter}
					placeholder="Re-enter Password"
					autoComplete="new-password"
					onChangeText={(text) => setReenter(text)}
					style={Styles.textInput}
					placeholderTextColor={Colors.placeholderTextColor}
				/>
				<Pressable onPress={onSignup} style={Styles.button}>
					<Text style={Styles.buttonText}>Sign Up</Text>
				</Pressable>
				<View style={styles.login}>
					<Text style={Styles.text}>Already have an account?</Text>
					<Link replace href={"/login"} style={Styles.link}>
						Log in
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
	login: {
		flexDirection: "row",
		gap: 5,
	},
})
