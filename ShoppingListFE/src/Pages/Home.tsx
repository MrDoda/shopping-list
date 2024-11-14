import { Button, Paper, Stack, Typography } from '@mui/material'
import { appStore } from '../store/appStore'
import { members } from '../mocks/members'
import { owner } from '../mocks/owner'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../store/pages'

const detailPagePath = `${Pages.Detail}/1`

export const Home = () => {
  const navigate = useNavigate()

  const setOwnerAndGo = () => {
    appStore.setState({
      token: 'owner',
      user: owner,
    })
    navigate(detailPagePath)
  }

  const setMemberAndGo = () => {
    appStore.setState({
      token: 'member',
      user: members[1],
    })
    navigate(detailPagePath)
  }

  const setNonMemberUserAndGo = () => {
    appStore.setState({
      token: 'user',
      user: {
        id: 'nonexisting',
        name: 'user',
      },
    })
    navigate(detailPagePath)
  }

  const setPublicUserAndGo = () => {
    appStore.setState({
      token: undefined,
      user: undefined,
    })
    navigate(detailPagePath)
  }

  return (
    <>
      <div>version 0.0.0</div>
      <Paper sx={{ margin: 20 }}>
        <Typography sx={{ padding: 3 }}>
          Notice: These buttons are setting things into app state. So it can
          break. This is just for testing-purposes. Use with caution.
        </Typography>
        <Stack sx={{ padding: 3 }}>
          <Button
            sx={{ marginTop: 1 }}
            variant="contained"
            onClick={setOwnerAndGo}
          >
            Open ShoppingList Detail As a Owner
          </Button>
          <Button
            sx={{ marginTop: 1 }}
            variant="contained"
            onClick={setMemberAndGo}
          >
            Open ShoppingList Detail As a Member
          </Button>
          <Button
            sx={{ marginTop: 1 }}
            variant="contained"
            onClick={setNonMemberUserAndGo}
          >
            Open ShoppingList Detail As a Non-member-User
          </Button>
          <Button
            sx={{ marginTop: 1 }}
            variant="contained"
            onClick={setPublicUserAndGo}
          >
            Open ShoppingList Detail As a Public (not logged user)
          </Button>
        </Stack>
      </Paper>
    </>
  )
}
