import React, { useCallback, useContext, useEffect, useState } from "react"
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Alert,
	SafeAreaView,
} from "react-native"
import { Calendar } from "react-native-calendars"
import Header from "../../components/Header"
import Colors from "../../constants/Colors"
import Styles from "../../constants/Styles"
import { UserContext } from "../../context/UserContext"
import { updateClasses } from "../../utils/authUtils"
import { createClass, enrollInClass, getClasses } from "../../utils/classUtils"

const CalendarScreen = () => {
	const { user, setUser } = useContext(UserContext)
	const [selectedDate, setSelectedDate] = useState("")
	const [markedDates, setMarkedDates] = useState("2024-12-20")
	const [showAddClass, setShowAddClass] = useState(false)
	const [availableClasses, setAvailableClasses] = useState([])
	const [isInstructor, setIsInstructor] = useState(false)

	useEffect(() => {
		getClasses(setAvailableClasses)
	}, [])

	useEffect(() => {
		setMarkedDates(
			Object.keys(availableClasses).reduce((acc, obj) => {
				acc[obj] = { marked: true, dotColor: Colors.ui }
				return acc
			}, []),
		)
	}, [availableClasses])

	useEffect(() => {
		setIsInstructor(user && user.role === teacher)
	}, [user])

	/** 

	const [availableClasses, setAvailableClasses] = useState({
		"2024-10-24": [
			{
				id: 1,
				time: "09:00",
				title: "Morning Flow",
				instructor: "Sarah",
				spots: 10,
			},
			{
				id: 2,
				time: "17:00",
				title: "Power Yoga",
				instructor: "Mike",
				spots: 8,
			},
		],
	})
	*/

	const handleDayPress = (day) => {
		setSelectedDate(day.dateString)
	}

	const handleEnroll = (classId, date) => {
		console.log(classId)
		Alert.alert(
			"Confirm Enrollment",
			"Would you like to enroll in this class?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Enroll",
					onPress: async () => {
						if (await enrollInClass()) {
							Alert.alert("Success", "Enrolled successfully!")
							getClasses(setAvailableClasses)
						} else {
							Alert.alert(
								"Failed to Enroll",
								"There was an error when trying to enroll in the class. Please try again.",
							)
						}
						/** 
					const classesCopy = { ...availableClasses }
					classesCopy[date] = classesCopy[date].map((c) => {
						if (c === classId) {
							return { ...c, spots: classId.spots - 1 }
						} else return c
					})
					setAvailableClasses(classesCopy)
					updateClasses(
						[...user.classes, { ...classId, date: date }],
						user,
						setUser
					)*/
						//user?.classes.push({ date: date, ...classId })
					},
				},
			],
		)
	}

	const addClass = async (name, desc, scheduledAt, capacity, location) => {
		await createClass(name, desc, scheduledAt, capacity, location)
		getClasses(setAvailableClasses)
	}

	const ClassList = useCallback(
		({ date }) => {
			const dayClasses = availableClasses[date] || []

			return (
				<ScrollView style={styles.classList}>
					{dayClasses.map((yogaClass) => (
						<TouchableOpacity
							key={yogaClass.id}
							style={styles.classCard}
							onPress={() => !isInstructor && handleEnroll(yogaClass, date)}
						>
							<Text style={styles.classTitle}>{yogaClass.name}</Text>
							<Text style={styles.classInfo}>Time: {yogaClass.time}</Text>
							<Text style={styles.classInfo}>
								Instructor: {yogaClass.instructor.first_name}
							</Text>
							<Text style={styles.classInfo}>
								Available Spots: {yogaClass.capacity - yogaClass.numEnrolled}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			)
		},
		[availableClasses],
	)

	return (
		<SafeAreaView style={styles.container}>
			<Header title="Schedule" />
			<Calendar
				onDayPress={handleDayPress}
				markedDates={{
					...markedDates,
					[selectedDate]: { selected: true, selectedColor: Colors.ui },
				}}
				theme={{
					selectedDayBackgroundColor: Colors.ui,
					todayTextColor: Colors.ui,
					arrowColor: Colors.ui,
					calendarBackground: "transparent",
					monthTextColor: Colors.text,
					dayTextColor: Colors.text,
					textSectionTitleColor: Colors.textPlaceholder,
					textDisabledColor: Colors.textPlaceholder,
				}}
				style={styles.calendar}
			/>

			{selectedDate && (
				<View style={styles.classesContainer}>
					<Text style={Styles.subheader}>Classes for {selectedDate}</Text>

					{isInstructor && (
						<TouchableOpacity
							style={Styles.button}
							onPress={() => showAddClass()}
						>
							<Text style={Styles.buttonText}>Add Class</Text>
						</TouchableOpacity>
					)}

					<ClassList date={selectedDate} />
				</View>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		...Styles.container,
		flex: 1,
	},
	calendar: {
		backgroundColor: Colors.background,
		color: Colors.background,
		borderWidth: 1,
		borderRadius: 12,
		borderColor: Colors.border,
	},
	classesContainer: {
		borderRadius: 10,
		paddingVertical: 15,
		flex: 1,
		gap: 10,
	},
	classList: {
		flex: 1,
		backgroundColor: Colors.tintedBackground,
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.border,
	},
	classCard: {
		backgroundColor: Colors.background,
		//backgroundColor: "#fff",
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	classTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: Colors.ui,
	},
	classInfo: {
		fontSize: 14,
		color: "#666",
		marginTop: 5,
	},
	addButton: {
		backgroundColor: Colors.ui,
		padding: 10,
		borderRadius: 5,
		marginBottom: 15,
		alignItems: "center",
	},
	addButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
})

export default CalendarScreen
