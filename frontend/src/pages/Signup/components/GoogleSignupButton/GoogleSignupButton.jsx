import { FcGoogle } from 'react-icons/fc'
import './google-signup-button.scss'

const GoogleSignupButton = () => {
  return (
    <button
      className="signup-with-google"
      onClick={() => location.replace('http://localhost:5000/api/auth/google', '_blank')}
    >
      <FcGoogle size={30} />
      Sign In with Google
    </button>
  )
}

export default GoogleSignupButton
