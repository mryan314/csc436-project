import { Stack } from "expo-router"
import { FlowProvider } from "../../../context/FlowContext"

export default function FlowsStack() {
	return (
		<FlowProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="saves" options={{ headerShown: false, presentation: "card" }} />
			</Stack>
		</FlowProvider>
	)
}
