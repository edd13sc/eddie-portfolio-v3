// @ts-ignore
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Error404 from './pages/Error404';
import Project from './pages/Project';
import ProjectsList from './pages/ProjectsList';
import Skills from './pages/Skills';

function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/project:id" element={<Project />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
