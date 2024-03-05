
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./routes/home/home";
import About from "./routes/about/about";
import Header from "./components/header";
import Footer from "./components/footer";
import AddNote from "./routes/home/add-note";

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/add-note' element={<AddNote/>}/>
          <Route path='/note/:id' element={<AddNote/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
