import { createContext, useReducer } from 'react'
import { getUser, saveUser, removeUser } from '../utils/storage'

export const AuthContext = createContext(null)

const savedUser = getUser()

const initialState = {
  isAuthenticated: !!savedUser,
  user: savedUser,
  error: null,
  isLoading: false,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case 'LOGIN_SUCCESS':
      saveUser(action.payload)

      return {
        isAuthenticated: true,
        user: action.payload,
        error: null,
        isLoading: false,
      }

    case 'LOGIN_FAILURE':
      return {
        isAuthenticated: false,
        user: null,
        error: action.payload,
        isLoading: false,
      }

    case 'LOGOUT':
      removeUser()

      return {
        isAuthenticated: false,
        user: null,
        error: null,
        isLoading: false,
      }

    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}