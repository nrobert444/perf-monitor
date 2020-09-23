import React, { Component } from 'react'
import './App.css'
import socket from './utilities/socketConnection'

class App extends Component {
  constructor() {
    super()
    this.state = {
      performanceData: {}
    }
  }

  componentDidMount() {
    socket.on('data', data => {
      console.log(data)
    })
  }

  render() {
    return <div>app</div>
  }
}

export default App
