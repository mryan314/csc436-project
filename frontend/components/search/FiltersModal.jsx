import {
	Modal,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native"
import Styles from "../../constants/Styles"
import Colors from "../../constants/Colors"
import IconButton from "../basic/IconButton"
import { useCallback, useEffect, useState } from "react"
import { useFocusEffect } from "expo-router"

/**
 * A fullscreen modal UI to show and allow users to change filters for a search.
 *
 * @param filters  Should be an object with keys of filter names mapping to
 * objects. Those objects should have keys of option names mapping to booleans
 * representing if the option is active. The following is an example filters:
 *  {
 *      filterName: {
 * 				label: "Filter Name"
 * 				Options: [ "Option 1", "Option 2" ]
 *      }
 *  }
 */
export default function FiltersModal({
	filters,
	activeFilters,
	setActiveFilters,
	visible,
	setVisible,
}) {
	const [pendingFilters, setPendingFilters] = useState(activeFilters)

	useEffect(() => {
		setPendingFilters(activeFilters)
	}, [])

	const toggleFilter = (group, value) => {
		console.log(group)
		console.log(value)
		setPendingFilters((prev) => ({
			...prev,
			[group]: prev[group] === value ? null : value,
		}))
	}

	const applyFilters = () => {
		setActiveFilters(pendingFilters)
		setVisible(false)
	}

	const renderFilter = (filter, label, options) => (
		<View key={label} style={styles.filter}>
			<Text style={Styles.subheader}>{label}</Text>
			<View style={styles.options}>
				{options?.map((option) => renderOption(filter, option))}
			</View>
		</View>
	)

	const renderOption = useCallback(
		(filter, option) => (
			<Pressable key={option} onPress={() => toggleFilter(filter, option)}>
				<Text
					style={
						pendingFilters[filter] === option ? styles.selected : styles.option
					}
				>
					{option}
				</Text>
			</Pressable>
		),
		[pendingFilters],
	)

	return (
		<Modal
			animationType="slide"
			visible={visible}
			style={{ backgroundColor: Colors.background }}
		>
			<SafeAreaView style={Styles.container}>
				<IconButton
					name="arrow-left"
					onPress={() => {
						setVisible(false)
					}}
				/>
				{Object.entries(filters).map(([key, { label, options }]) =>
					renderFilter(key, label, options),
				)}

				<Pressable onPress={applyFilters}>
					<Text style={Styles.buttonText}>Apply Filters</Text>
				</Pressable>
			</SafeAreaView>
		</Modal>
	)
}

const styles = StyleSheet.create({
	filter: {
		marginTop: 20,
		gap: 10,
	},
	options: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 5,
	},
	option: {
		...Styles.buttonText,
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.tintedBackground,
		color: Colors.inactiveUI,
		backgroundColor: Colors.background,
	},
	selected: {
		...Styles.buttonText,
		padding: 10,
		borderWidth: 1,
		borderColor: Colors.ui,
	},
})
