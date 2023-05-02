import { Container, Button, Form, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '', password: ''
    }) 

const dispatch = useDispatch()
const navigate = useNavigate()

const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

const {email, password} = formData

const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState, [e.target.name] : e.target.value
    }))
}

useEffect(() => {
    if (isError) {toast(message)}
    if (isSuccess) {toast('login successful');   navigate('/')}
    dispatch(reset())
    user && navigate('/')

}, [user, formData, isSuccess, isError, message, dispatch, navigate])

const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formData))
}

  return (
    <Container className='col-md-4 pt-5'>
      {isLoading && (<Spinner />)}
    <h1 style={{textAlign: 'center'}}><FaSignInAlt /> Login</h1>
    <h6 style={{textAlign: 'center'}}>Login and Start Setting Your Goals</h6>
    <Form onSubmit={onSubmit}>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Control name='email' type="email" placeholder="Enter Email"
                  value={email} onChange={onChange} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Control name='password' type="password" placeholder="Enter Password"
                  value={password} onChange={onChange} />
  </Form.Group>

  <Button variant="primary" type="submit" className={!password || !email ? 'disabled' : ''}>
    Submit
  </Button>
</Form>
</Container>
  )
}

export default Login
