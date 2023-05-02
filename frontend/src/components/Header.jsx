import { Container, Nav, Navbar, Spinner } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector(state => state.auth)



  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
       <LinkContainer to="/"> <Navbar.Brand >Goal Setter App</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {!user ? 
              ( <>
               <LinkContainer to="/register"> <Nav.Link>Register</Nav.Link> </LinkContainer>
               <LinkContainer to="/login"><Nav.Link>Login</Nav.Link> </LinkContainer>
                </>
              ) : (
                <LinkContainer to="/login"><Nav.Link onClick= {() => dispatch(logout())}>Logout</Nav.Link></LinkContainer>
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
