import { Container, Button, Form, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import {FaUser} from 'react-icons/fa'

const Register = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
const {isLoading, isSuccess, isError, message, user} = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', password2: ''
  })

  const {name, email, password, password2} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.name] : e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  //  if (!name || !password || !password2 || email) {return toast('Please fill in all fields')}
    if (password !== password2) {return toast('Password Mismatch')}
    dispatch(register({name, email, password}))
  }

  useEffect(() => {
    if (isError) {toast.error(message)}
    if (isSuccess) {toast('Registration Successful'); navigate('/')}
    user && navigate('/')
    dispatch(reset())

  }, [user, isSuccess, isError, message, dispatch, navigate])



  return (
    <Container className='col-md-4 pt-5'>
        <h1 style={{textAlign: 'center'}}><FaUser /> Register</h1>
        <h6 style={{textAlign: 'center'}}>Create An Account To Start Setting Goals</h6>
        {isLoading && <Spinner />}
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Control name='name' type="text" placeholder="Enter Name"
                      value={name} onChange={onChange} />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control name='email' type="email" placeholder="Enter Email"
                      value={email} onChange={onChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control name='password' type="password" placeholder="Enter Password"
                      value={password} onChange={onChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Control name='password2' type="password" placeholder="Confirm Password"
                      value={password2} onChange={onChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
  )
}

export default Register
