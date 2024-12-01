import { useState } from 'react'
import { TextField, Button, Typography, Grid, Link, Paper } from '@mui/material'
import { useAuthentication } from '../hooks/useAuthentication'
import { appStore } from '../store/appStore'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../store/pages'
import { useUsers } from '../hooks/useUsers'

export const Login = () => {
  const { login, register } = useAuthentication()
  const [isRegistering, setIsRegistering] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })
  const navigate = useNavigate()
  const { getMyself } = useUsers()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async () => {
    if (isRegistering) {
      if (await register(formData)) {
      }
      setIsRegistering(false)
    }
    const result = await login({
      email: formData.email,
      password: formData.password,
    })
    if (result?.token) {
      const user = await getMyself()
      appStore.setState({ token: result.token, user: user || undefined })
      navigate(Pages.Home)
    }
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Paper
        sx={{
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 3,
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h5" textAlign="center">
          {isRegistering ? 'Register' : 'Login'}
        </Typography>
        {isRegistering && (
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />
        )}
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          {isRegistering ? 'Register' : 'Login'}
        </Button>
        <Typography textAlign="center">
          {isRegistering ? (
            <>
              Already have an account?{' '}
              <Link
                component="button"
                onClick={() => setIsRegistering(false)}
                underline="none"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <Link
                component="button"
                onClick={() => setIsRegistering(true)}
                underline="none"
              >
                Register
              </Link>
            </>
          )}
        </Typography>
      </Paper>
    </Grid>
  )
}
