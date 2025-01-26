import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from "@/components/theme-provider"; // Your custom theme provider
import Index from "./components/Index";
import Cv from "./components/Cv";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "./components/404";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Toaster />
      <Router>
        <ThemeSwitcher />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

const ThemeSwitcher = () => {
  const { setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/cv") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [location, setTheme]);

  return null;
};

export default App;
