import { Container, Nav, Navbar, Spinner } from 'react-bootstrap'
import { logout } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {FaUser, FaSignInAlt} from 'react-icons/fa'

const Header = () => {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector(state => state.auth)
  const onLogout = () => {
   dispatch(logout())
    
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
       <Navbar.Brand as={Link} to={"/login"}>Goal Setter App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {!user ? 
              ( <>
                <Nav.Link as={Link} to={"/register"}><FaUser /> Register</Nav.Link>
               <Nav.Link as={Link} to={"/login"}><FaSignInAlt /> Login</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to={"/login"} onClick= {onLogout}>Logout</Nav.Link>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
      {isLoading && (<Spinner />)}
    </Navbar>
  )
}

export default Header
