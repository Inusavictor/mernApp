import { Container, Card, Form, Spinner, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGoals, setGoal, deleteGoal, reset, updateGoal } from '../features/goals/goalsSlice'
import { toast } from 'react-toastify'
import { FaTimes, FaEdit, FaCheck } from 'react-icons/fa'



const Dashboard = () => {
  const { user } = useSelector(state => state.auth)
  const {goals, isLoading, isError, message} = useSelector(state => state.Goal)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [updateId, setUpdateId] = useState('')
  const [toggleForm, setToggleForm] = useState(false)



  useEffect(() => {
    if(!user) {return navigate('/login')}
    dispatch(getGoals())
    if (isError) {toast.error(message)}

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch, navigate])


    const onToggleUpdate = (id) => {
      setUpdateId(id)
      setToggleForm(!toggleForm)
    }
    
    const orderedGoals = goals.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  
  return (
    <Container className="col-md-11">
      <h1 className='text-center py-3'>Goals Dashboard</h1>
      <h5 className='text-center px-5 py-3'>Welcome <span className='text-danger'>{user && user.name.toUpperCase()}</span>, What do you want to do today?</h5>
      {isLoading && <Spinner />}
      <AddGoalForm />
    <Row className='py-3'>
      <Col className='col-12 text-center'><h3 className='py-4'>View Update And Delete Goals</h3></Col>
    {
    goals.length > 0 ? (
      orderedGoals.map((goal) => {
        return (
          <Col key={goal._id} className='col-sm-12 col-md-4 col-xl-3 py-1'>
                  <Card>
                  <Card.Body>
                    <div style={{float: 'right' }}>
                     <FaEdit style={{color:'blue'}} onClick={() => onToggleUpdate(goal._id)} /> &nbsp; 
                     <FaTimes style={{color: 'red'}} onClick={() => dispatch(deleteGoal(goal._id))} />
                    </div>
                     
                    { (updateId === goal._id && toggleForm ) ? <GoalUpdate setToggleForm={setToggleForm} goal={goal} /> 
                    :
                    <>
                    <Card.Title>{goal.text.charAt(0).toUpperCase()+goal.text.slice(1)}</Card.Title>
                    <Card.Text>{goal.description.charAt(0).toUpperCase()+goal.description.slice(1)}</Card.Text>
                    </>
                    }

                    
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">Created on {new Date(goal.createdAt).toLocaleString('en-US')}</small>
                  </Card.Footer>
                </Card>
                </Col>
        )
      })
    ) : (<h5 className='text-center'>You have not set any goals yet</h5>)
    }
    </Row>
    </Container>
  )
}

export default Dashboard



//Goal Form
const AddGoalForm = () => {
  const dispatch = useDispatch()
  const {isSuccess} = useSelector(state => state.Goal)

    //Add a goal
    const [formData, setFormData] = useState({
      text: '', description: ''
    })
  
    //destructure formdata
    const {text, description} = formData

    const onChange = (e) => {
      setFormData((prevState) => {
      return  {...prevState, [e.target.name]: e.target.value}
      })
    }

    //on submit
    const onSubmit = (e) => {
      dispatch(setGoal(formData))
      setFormData({text:'',description:''})
    //  isSuccess === true && toast('Goal Added')
    }

  return (
    <Form className='col-md-6 mx-auto' >
      <h3 className='text-center'>Add A Goal</h3>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="Goal" name='text' value={text} onChange={onChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} placeholder='Goal Description' name='description' value={description} onChange={onChange} />
      </Form.Group>
      <Form.Group className="d-grid gap-2">
      <Button variant="primary" onClick={onSubmit}>
        Submit
      </Button>
      </Form.Group>
    </Form>
  )
}


//Goal Update Form

const GoalUpdate = ({goal, setToggleForm}) => {
  const [upData, setUpData] = useState({ text:'', description:''})
  const {text, description } = upData

  const onChange = (e) => {
    setUpData((prevState) => ({...prevState, [e.target.name]:e.target.value }))
  }
  const dispatch = useDispatch()
  return (
     <>
                        
                       <InputGroup size="sm" className="mb-3">
                         <InputGroup.Text id="inputGroup-sizing-sm">Goal</InputGroup.Text>
                         <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                                        name='text' value={text} onChange={onChange}/>
                       </InputGroup>
                       <InputGroup size="sm" className="mb-3">
                         <InputGroup.Text id="inputGroup-sizing-sm">Desc</InputGroup.Text>
                         <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                                        name='description' value={description} onChange={onChange}/>
                       </InputGroup>
                       <div align='right'>
                         <FaCheck style={{color:'green'}} onClick={()=>{dispatch(updateGoal({id:goal._id, ...upData})); setToggleForm(false)}} />
                       </div>
                      </>
  ) }
