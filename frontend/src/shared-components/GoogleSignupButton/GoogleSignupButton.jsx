/* eslint-disable react/prop-types */
import { useGoogleLogin } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import './google-signup-button.scss'

const GoogleSignupButton = () => {
  const navigate = useNavigate()
  // const { isError, isSuccess, googleLogin, isPending, error } =
  //   useGoogleAuth(type);

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("Signed in successfully");
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 1000);
  //   }

  //   if (isError) {
  //     toast.error(error.response?.data?.message ?? "Something went wrong");
  //   }
  // }, [isSuccess, isError]);

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const req = await axios.post('/auth/google', {
          code,
        })

        if (req.status.toString().startsWith('2')) {
          navigate('/')
        }
      } catch (error) {
        console.log(error)
      }
    },
    flow: 'auth-code',
  })

  return (
    <>
      <Toaster containerStyle={{ fontFamily: 'Montserrat' }} />
      <button
        className="signup-with-google"
        onClick={googleLogin}
        // disabled={isPending}
      >
        <FcGoogle size={30} />
        Sign In with Google
      </button>
    </>
  )
}

export default GoogleSignupButton
