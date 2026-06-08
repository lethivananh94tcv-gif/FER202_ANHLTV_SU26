import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ListGroup,
} from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

function Dashboard() {
  const { state, dispatch } = useAuth()
  const { user } = state

  if (!user) return null

  const badgeVariant = user.role === 'admin' ? 'danger' : 'success'

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={9} md={6} lg={5}>
          <Card className="shadow-sm text-center">
            <Card.Header className="bg-success text-white py-3">
              <h4 className="mb-0">Xin chào, {user.name}</h4>
            </Card.Header>

            <Card.Body className="p-4">
              <div
                className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: 72, height: 72, fontSize: 28 }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              <ListGroup variant="flush" className="text-start mb-4">
                <ListGroup.Item>
                  <strong>ID:</strong> {user.id}
                </ListGroup.Item>

                <ListGroup.Item>
                  <strong>Username:</strong> @{user.username}
                </ListGroup.Item>

                <ListGroup.Item>
                  <strong>Role:</strong>{' '}
                  <Badge bg={badgeVariant}>{user.role}</Badge>
                </ListGroup.Item>
              </ListGroup>

              <div className="d-grid">
                <Button
                  variant="outline-danger"
                  onClick={() => dispatch({ type: 'LOGOUT' })}
                >
                  Đăng xuất
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
