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
import { useCallback, useState } from "react"

/**
 * A fullscreen modal UI to show and allow users to change filters for a search.
 *
 * @param filters  Should be an object with keys of filter names mapping to
 * objects. Those objects should have keys of option names mapping to booleans
 * representing if the option is active. The following is an example filters:
 *  {
 *      "Example Filter": {
 *          "Option 1": false,
 *          "Option 2": true,
 *      }
 *  }
 */
export default function FiltersModal({
	filters,
	setFilters,
	visible,
	setVisible,
}) {
	const [activeFilters, setActiveFilters] = useState(filters)
	const toggleFilter = (filterName, option) => {
		const newFilters = activeFilters
		newFilters[filterName][option] = !activeFilters[filterName][option]
		setActiveFilters(newFilters)
	}

	const renderFilter = (name, options) => (
		<View key={name} style={styles.filter}>
			<Text style={Styles.subheader}>{name}</Text>
			<View style={styles.options}>
				{Object.entries(options).map(([option, isSelected]) =>
					renderOption(name, option, isSelected)
				)}
			</View>
		</View>
	)

	const renderOption = useCallback(
		(filter, option, isSelected) => (
			<Pressable key={option} onPress={() => toggleFilter(filter, option)}>
				<Text style={isSelected ? styles.selected : styles.option}>
					{option}
				</Text>
			</Pressable>
		),
		[activeFilters]
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
						setFilters(activeFilters)
					}}
				/>
				{Object.entries(activeFilters).map(([filter, options], i) =>
					renderFilter(filter, options)
				)}
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
