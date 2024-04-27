import { Link } from 'react-router-dom'
import slogan from '../../assets/images/title.svg'
import GoogleSignupButton from '../../shared-components/GoogleSignupButton/GoogleSignupButton'
import LoginForm from './components/LoginForm/LoginForm'
import './login.scss'
import loginHero from '/amico.png'

const Login = () => {
  return (
    <div className="container">
      <div>
        <div className="brand-container">
          <img src={slogan} />
          <p>From vows to wow - manage any event with ease!</p>
        </div>
        <div className="img-container">
          <img
            src={loginHero}
            alt="A cartoon image of people creating an event next to a calendar."
          />
        </div>
      </div>
      <div>
        <div className="login-header">
          <h1>Sign In</h1>
          <p>Streamline Your Event Experience: RSVP Easily and Seamlessly Today</p>
        </div>
        <GoogleSignupButton type="login" />
        <div className="or-container">
          <hr />
          <span>Or</span>
          <hr />
        </div>
        <div className="form-container">{<LoginForm />}</div>
        <div className="link-container">
          <span>
            Already have an account, <Link to="/signup">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
