import React from 'react'
import logo from './logo.svg'
import './App.css'
import { AUTH_LINK } from './providers/github'

const App: React.FC = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <a
          className='App-link'
          href={AUTH_LINK}
          target='_blank'
          rel='noopener noreferrer'
        >
          Login with github
        </a>
      </header>
    </div>
  )
}

export default App
