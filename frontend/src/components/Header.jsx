import { Container, Nav, Navbar, Spinner } from 'react-bootstrap'
import { logout } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector(state => state.auth)



  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Goal Setter App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {!user ? 
              ( <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                </>
              ) : (
                <Nav.Link href='/login' onClick= {() => dispatch(logout())}>Logout</Nav.Link>
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
