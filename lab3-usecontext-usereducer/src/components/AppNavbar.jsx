import { Navbar, Container, Button } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../context/ThemeContext'

function AppNavbar() {
  const { state, dispatch } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const { user } = state

  if (!user) return null

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Login App</Navbar.Brand>

        <span className="text-white">
          {user.name}
        </span>

        <div>
          <Button
            variant="outline-warning"
            className="me-2"
            onClick={toggleTheme}
          >
            {theme === 'light'
              ? '🌙 Dark'
              : '☀️ Light'}
          </Button>

          <Button
            variant="outline-light"
            onClick={() =>
              dispatch({ type: 'LOGOUT' })
            }
          >
            Đăng xuất
          </Button>
        </div>
      </Container>
    </Navbar>
  )
}

export default AppNavbar