import "./App.css";
import Header from "./components/Header";
import { theme } from "./values/colors";
import { ThemeProvider } from "@emotion/react";
import "./values/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Showing from "./pages/showing/Showing";
import NotFound from "./pages/notfound/NotFound";
import MovieDetails from "./pages/movie/MovieDetails";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/showing" element={<Showing />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<NotFound></NotFound>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
