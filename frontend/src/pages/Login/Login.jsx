import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import slogan from '../../assets/images/title.svg'
import { useLogin } from '../../hooks/auth'
import LoginForm from './components/LoginForm/LoginForm'
import './login.scss'
import loginHero from '/public/amico.png'

const Login = () => {
  const { error, isError, isSuccess, login } = useLogin()
  const navigate = useNavigate()

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse)
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data)

      const data = {
        email: userInfo?.email,
        provider: 'google',
      }

      login(data)
    },
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Logged in successfully')
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
    if (isError) {
      toast.error(error.response?.data?.message ?? 'Something went wrong')
    }
  }, [isSuccess, isError, navigate, error?.response?.data?.message])

  return (
    <div className="container">
      <Toaster containerStyle={{ fontFamily: 'Montserrat' }} />
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
        <div className="header">
          <h1>Sign In</h1>
          <p>Streamline Your Event Experience: RSVP Easily and Seamlessly Today</p>
        </div>
        <button className="signup-with-google" onClick={googleLogin}>
          <FcGoogle size={30} />
          Sign In with Google
        </button>
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
