import { ThemeProvider } from "@/components/theme-provider"
import Homepage from '../components/Homepage'
function Index() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Homepage />
    </ThemeProvider>
  )
}

export default Index