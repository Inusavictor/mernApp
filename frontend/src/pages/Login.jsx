import { Container, Button, Form } from 'react-bootstrap'
import { useState } from 'react'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '', password: ''
    }) 

const {email, password} = formData

const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState, [e.target.name] : e.target.value
    }))
}

const onSubmit = (e) => {
    e.preventDefault()
    
}

  return (
    <Container className='col-md-6 pt-5'>
    <h1 style={{textAlign: 'center'}}>Login</h1>
    <Form onSubmit={onSubmit}>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Control name='email' type="email" placeholder="Enter Email"
                  value={email} onChange={onChange} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Control name='password' type="password" placeholder="Enter Password"
                  value={password} onChange={onChange} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Container>
  )
}

export default Login
