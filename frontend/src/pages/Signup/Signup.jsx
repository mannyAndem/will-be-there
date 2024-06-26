import { Link } from 'react-router-dom'
import signupImg from '../../assets/images/pana.png'
import slogan from '../../assets/images/title.svg'
import GoogleSignupButton from '../../shared-components/GoogleSignupButton/GoogleSignupButton'
import SignupForm from './components/SignupForm/SignupForm'
import './signup.scss'
import Header from '../../ui/Header/Header'
import Footer from '../Home/components/Footer/Footer'

const Signup = () => {
  return (
    <><Header/>
    <div className="container">
      <div>
        <div className="brand-container">
          <img src={slogan} />
          <p>From vows to wow - manage any event with ease!</p>
          <div className="img-container">
            <img src={signupImg} />
          </div>
        </div>
      </div>
      <div>
        <div className="signup-header">
          <h1>Create An Account</h1>
          <p>Secure Your Spot: RSVP Now for an Unforgettable Event</p>
        </div>
        <GoogleSignupButton />
        <div className="or-container">
          <hr />
          <span>Or</span>
          <hr />
        </div>
        <div className="form-container">
          <SignupForm />
        </div>
        <div className="link-container">
          <span>
            Already have an account, <Link to="/login">Log in</Link>
          </span>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Signup
