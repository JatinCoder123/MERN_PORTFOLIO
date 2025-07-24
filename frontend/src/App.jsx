import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import ProjectView from "./pages/ProjectView";
import { ToastContainer, toast } from "react-toastify";
import Certificates from "./pages/Certificates";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectView />} />
            <Route path="/Certificates" element={<Certificates />} />
          </Routes>
          <Footer />
          <ToastContainer position="bottom-right" theme="dark" />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
