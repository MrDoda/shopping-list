import { useState } from 'react'
import { TextField, Button, Typography, Grid, Link, Paper } from '@mui/material'
import { useAuthentication } from '../hooks/useAuthentication'
import { appStore } from '../store/appStore'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../store/pages'
import { useUsers } from '../hooks/useUsers'
import { useIntl } from 'react-intl'

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
  const intl = useIntl()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async () => {
    if (isRegistering) {
      if (await register(formData)) {
        setIsRegistering(false)
      }
    }
    const result = await login({
      email: formData.email,
      password: formData.password,
    })
    if (result?.token) {
      appStore.setState({ token: result.token })
      const user = await getMyself()
      appStore.setState({ user: user || undefined })

      navigate(Pages.Home)
    }
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ minHeight: 'calc(100vh - 100px)' }}
    >
      <Paper
        sx={{
          maxWidth: 340,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 3,
          border: '1px solid #ccc',
          borderRadius: '8px',
          mt: 6,
        }}
      >
        <Typography variant="h5" textAlign="center">
          {intl.formatMessage({
            id: isRegistering ? 'auth.register' : 'auth.login',
          })}
        </Typography>
        {isRegistering && (
          <TextField
            label={intl.formatMessage({ id: 'auth.name' })}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />
        )}
        <TextField
          label={intl.formatMessage({ id: 'auth.email' })}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label={intl.formatMessage({ id: 'auth.password' })}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          {intl.formatMessage({
            id: isRegistering ? 'auth.register' : 'auth.login',
          })}
        </Button>
        <Typography textAlign="center">
          {isRegistering ? (
            <>
              {intl.formatMessage({ id: 'auth.alreadyHaveAccount' })}{' '}
              <Link
                component="button"
                onClick={() => setIsRegistering(false)}
                underline="none"
              >
                {intl.formatMessage({ id: 'auth.login' })}
              </Link>
            </>
          ) : (
            <>
              {intl.formatMessage({ id: 'auth.noAccount' })}{' '}
              <Link
                component="button"
                onClick={() => setIsRegistering(true)}
                underline="none"
              >
                {intl.formatMessage({ id: 'auth.register' })}
              </Link>
            </>
          )}
        </Typography>
      </Paper>
    </Grid>
  )
}
