import { IoNotificationsSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import Button from '../Button/Button'
import Navbar from '../Navbar/Navbar'
import './header.scss'

const Header = () => {
  const { user } = useAuthContext()
  const mobileMenu = () => {
    let menu = document.querySelector('.desktop')
    let close = document.querySelector('.menu')
    if (menu.style.display === 'flex') {
      menu.style.display = 'none'
      close.classList.remove('active')
    } else {
      menu.style.display = 'flex'
      close.classList.add('active')
    }
  }

  return (
    <header className="header">
      <Link to="/" className="brand">
        WILL.BE.THERE
      </Link>
      {/* <div className="menu" onClick={mobileMenu}>
        <div className="lines"></div>

        <div className="lines"></div>

        <div className="lines"></div>
      </div> */}
      <Navbar />
      {!user ? (
        <div>
          <Link to="/login">
            <Button size="sm">Log In</Button>
          </Link>
        </div>
      ) : (
        <div className="user-container">
          <div className="bell-container">
            <IoNotificationsSharp className="icon" size={30} />
          </div>
          <div className="profile-image">{user.name[0].toUpperCase()}</div>
        </div>
      )}
      {/* <div className="desktop"></div> */}
    </header>
  )
}

export default Header
