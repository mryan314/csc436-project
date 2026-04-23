import { useEffect, useState } from "react"
import IconButton from "../basic/IconButton"
import Input from "../basic/Input"
import { FlatList, StyleSheet, View } from "react-native"
import FiltersModal from "./FiltersModal"

export default function SearchList({ data, filters, searchField, renderItem }) {
	const [input, setInput] = useState("")
	const [filteredData, setFilteredData] = useState(null)
	const [showFilters, setShowFilters] = useState(false)
	const [activeFilters, setActiveFilters] = useState(
		Object.fromEntries(Object.keys(filters).map((k) => [k, null])),
	)

	useEffect(() => {
		setFilteredData(data)
	}, [data])

	// Applies filters when set in filters modal
	useEffect(() => {
		setInput("")
		const result = data.filter((item) =>
			Object.entries(activeFilters).every(([group, value]) => {
				if (!value) return true
				return item[group] === value
			}),
		)

		setFilteredData(result)
	}, [activeFilters])

	const searchResults =
		input.length === 0
			? filteredData
			: filteredData.filter((item) =>
					item[searchField].toLowerCase().includes(input.toLowerCase()),
				)

	return (
		<View style={{ flex: 4 }}>
			<View style={styles.searchBar}>
				<Input
					value={input}
					onChangeText={setInput}
					inputMode="search"
					icon="magnify"
					slim
					style={{ flex: 1 }}
				/>
				{filters && (
					<IconButton
						onPress={() => setShowFilters(true)}
						name="filter-variant"
					/>
				)}

				<FiltersModal
					filters={filters}
					activeFilters={activeFilters}
					setActiveFilters={setActiveFilters}
					visible={showFilters}
					setVisible={setShowFilters}
				/>
			</View>

			<FlatList
				data={searchResults}
				renderItem={renderItem}
				numColumns={3}
				contentContainerStyle={{ gap: 10 }}
				columnWrapperStyle={{ gap: 10 }}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	searchBar: {
		flexDirection: "row",
		padding: 10,
		gap: 10,
	},
})
