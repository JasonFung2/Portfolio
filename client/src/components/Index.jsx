import { ThemeProvider } from "@/components/theme-provider"
import Homepage from './Homepage'
function Index() {

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Homepage />
    </ThemeProvider>
    </>
  )
}

export default Index