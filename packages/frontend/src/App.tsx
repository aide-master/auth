import './setup'
import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { AUTH_LINK } from './providers/github'
import Loading from './components/loading'
import * as _ from 'lodash'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { useDispatch, useSelector } from 'react-redux'
// import { createSelector } from 'reselect'

const selectProfile = (state: any) => _.get(state, 'auth.profile') || {}

const Login: React.FC = () => (
  <div className='App'>
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <a
        className='App-link'
        href={AUTH_LINK}
        rel='noopener noreferrer'
      >
        Login with github
      </a>
    </header>
  </div>
)

const Profile: React.FC<{profile: any}> = (props) => {
  const { profile } = props
  return <div className='App'>
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      Welcome {profile.nickname}
    </header>
  </div>
}

const Home: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'auth/getProfile'
    })
  }, [dispatch])

  const profile = useSelector(selectProfile)
  return profile._id ? <Profile profile={profile} /> : <Login />
}

const AsyncGithubCallback = Loadable({
  loader: async () => import('./callbacks/github'),
  loading: Loading
})

export default function App () {
  return (
    <Router>
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/callback/github' component={AsyncGithubCallback} />
      </div>
    </Router>
  )
}
