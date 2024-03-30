import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginRoute extends Component {
  state = {
    userId: '',
    pin: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onLoginButton = async event => {
    event.preventDefault()
    const {userId, pin} = this.state

    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-card">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="Login-image"
            />
          </div>

          <div>
            <h1>Welcome Back</h1>
            <form className="form" onSubmit={this.onLoginButton}>
              <div className="form">
                <label htmlFor="userId" className="label">
                  User ID
                </label>
                <input
                  type="text"
                  id="userId"
                  placeholder="enter userId"
                  value={userId}
                  onChange={this.onChangeUserId}
                  className="input"
                />
              </div>

              <div className="form">
                <label htmlFor="pin" className="label">
                  PIN
                </label>
                <input
                  type="password"
                  id="pin"
                  value={pin}
                  placeholder="enter PIN"
                  onChange={this.onChangePin}
                  className="input"
                />
              </div>
              <button type="submit" className="btn">
                Login
              </button>
              {showErrorMsg && <p className="errorMsg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginRoute
