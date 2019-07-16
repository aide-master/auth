import './setup'
import React from 'react'
import logo from './logo.svg'
import './App.css'
import { AUTH_LINK } from './providers/github'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

const MyLoadingComponent = ({ isLoading, error }: any) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>
  } else if (error) {
    // Handle the error state
    return <div>Sorry, there was a problem loading the page.</div>
  } else {
    return null
  }
}

const Home: React.FC = () => {
  return (
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
}

const AsyncGithubCallback = Loadable({
  loader: () => import('./callbacks/github'),
  loading: MyLoadingComponent
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
