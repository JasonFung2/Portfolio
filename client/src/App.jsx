import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import Cv from './components/Cv';

import { ThemeProvider } from "@/components/theme-provider"
import Header from '@/components/Header';
import { Toaster } from "@/components/ui/toaster"
import NotFound from './components/404';
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Header />
    <Toaster />
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cv" element={<Cv />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;