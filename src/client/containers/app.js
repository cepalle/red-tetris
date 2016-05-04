import React from 'react'
import { connect } from 'react-redux'


const App = ({message}) => {
  return (
    <span>{message}</span>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)


