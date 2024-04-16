import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { useSignup } from '../../../../hooks/auth'
import './google-signup-button.scss'

const GoogleSignupButton = () => {
  const { error, isError, isSuccess, signup } = useSignup()
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
        name: userInfo?.name,
        provider: 'google',
      }

      signup(data)
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
    <button className="signup-with-google" onClick={googleLogin}>
      <FcGoogle size={30} />
      Sign In with Google
    </button>
  )
}

export default GoogleSignupButton
