import { createContext, useContext, useState } from "react";

const FlowContext = createContext(null)

export const FlowProvider = ({ children }) => {
  const [pendingFlow, setPendingFlow] = useState(null)

  return (
    <FlowContext.Provider value={{ pendingFlow, setPendingFlow}}>
      {children}
    </FlowContext.Provider>
  )
}

export const useFlow = () => {
  const context = useContext(FlowContext)
  if (!context) throw new Error("useFlow must be used within a FlowProvider")
  return context
}