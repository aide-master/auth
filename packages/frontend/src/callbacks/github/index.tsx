import React, { useEffect } from 'react'
import useReactRouter from 'use-react-router'
import { login } from '../../providers/github'
import './github.css'

const GithubCallback: React.FC = () => {
  const { location, history } = useReactRouter()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const code = params.get('code') || ''
    const state = params.get('state') || ''

    // login
    login(code, state).then(() => {
      // return to home page
      history.push('/')
    })
  }, [location.search])
  return (
    <div className='Github'>
      github callback page
    </div>
  )
}

export default GithubCallback
