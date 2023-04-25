import { Container, Button, Form } from 'react-bootstrap'
import { useState } from 'react'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', password2: ''
  })

  const {name, email, password, password2} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.name] : e.target.value
    }))
  }

  return (
    <Container className='col-md-6 pt-5'>
        <h1 style={{textAlign: 'center'}}>Register</h1>
        <Form>
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

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control name='password2' type="password" placeholder="Confirm Password"
                      value={password2} onChange={onChange} />
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

export default Register
