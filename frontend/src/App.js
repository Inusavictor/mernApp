import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Dashboard from "./pages/Dashboard";
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header';


function App() {
  return (
    <>
    <Router>
    <Header />
    <Container className='col-md-10' >
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Container>
    </Router>
    </>
  );
}

export default App;
