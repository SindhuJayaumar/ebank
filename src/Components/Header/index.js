import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <nav className="nav-card">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="bank-logo"
        />
      </Link>
      <button type="button" className="logout-btn" onClick={onLogoutButton}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
