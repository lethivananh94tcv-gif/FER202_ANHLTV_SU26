import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import MyModal from './MyModal';

function RegistrationForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = 'Username không được để trống.';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email không được để trống.';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Email không đúng định dạng.';
    }

    if (!form.password) {
      newErrors.password = 'Password không được để trống.';
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        'Password phải từ 6 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt.';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password không được để trống.';
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Confirm password không khớp.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValidated(true);

    const isValid = validateForm();

    if (isValid) {
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setForm({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    setErrors({});
    setValidated(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/home');
  };

  return (
    <>
      <Container className="register-wrapper">
        <Card className="register-card" style={{ maxWidth: 620, width: '100%' }}>
          <Card.Body className="p-4">
            <h3 className="register-title">
  Create Account
</h3>

            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  isInvalid={validated && !!errors.username}
                  isValid={validated && !errors.username && form.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  isInvalid={validated && !!errors.email}
                  isValid={validated && !errors.email && form.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  isInvalid={validated && !!errors.password}
                  isValid={validated && !errors.password && form.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  isInvalid={validated && !!errors.confirmPassword}
                  isValid={
                    validated &&
                    !errors.confirmPassword &&
                    form.confirmPassword
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col>
                  <Button
                     type="submit"
                     variant="primary"
                     className="w-100 register-btn"
 >
                    Register
                  </Button>
                </Col>

                <Col>
                  <Button
  type="button"
  variant="outline-secondary"
  className="w-100 cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <MyModal
        show={showModal}
        title="Đăng ký thành công"
        message="Tài khoản của bạn đã được đăng ký thành công."
        onClose={handleCloseModal}
      />
    </>
  );
}

export default RegistrationForm;