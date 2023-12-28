import { createContext, useEffect, useState } from "react"
import Paths from "./comp/Paths"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"

const queryClient = new QueryClient()
export const AppContext = createContext()

export default function App() {
  const [contextValues, setContextValues] = useState({
    venueID: "testVenueID",
    // date: new Date().toLocaleDateString("en-GB"),
  })

  const updateContext = (newValues) => {
    setContextValues((prevValues) => ({
      ...prevValues,
      ...newValues
    }))
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ ...contextValues, updateContext }}>
        <Paths />
      </AppContext.Provider>
    </QueryClientProvider>
  )
}
