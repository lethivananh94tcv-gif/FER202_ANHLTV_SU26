import { useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { findUser } from '../utils/authHelpers'

function LoginForm() {
  const { state, dispatch } = useAuth()
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
const handleSubmit = (e) => {
  e.preventDefault()

  dispatch({ type: 'LOGIN_START' })

  const user = findUser(form.username, form.password)

  if (user) {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: user,
    })
  } else {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: 'Sai username hoặc password!',
    })
  }
}

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={5}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white text-center py-3">
              <h4 className="mb-0">Đăng nhập</h4>
            </Card.Header>

            <Card.Body className="p-4">
              {state.error && (
                <Alert variant="danger">
                  {state.error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    disabled={state.isLoading}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={state.isLoading}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={state.isLoading}
                  >
                    {state.isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Đang đăng nhập...
                      </>
                    ) : (
                      'Đăng nhập'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>

            <Card.Footer className="text-center text-muted">
              Demo: admin/123 hoặc user/123
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm