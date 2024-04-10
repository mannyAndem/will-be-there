import "./login.css"
import loginHero from '/public/amico.png'
import GoogleImage from '/public/google.png'
import { Link } from "react-router-dom";


const Login = () => {
  return <div>

    <div className="mainContainer">
      <div className="container">
        <div className="bannerSide">
          <div className="greenBackground greenRadius">
      <div tabIndex={1}>    WILL.BE.THERE.....</div>
          <div className="slogan" tabIndex={1}>
          From vows to wow - manage any event 
with ease!
          </div>
          </div>
          <img src={loginHero} alt="A cartoon image of people creating an event next to a calendar." className="heroLogin" />
        </div>

        <div className="loginSection" aria-label="Login Section">
         <div className="loginContainer">
         <div className="headingSection">
            <h1 tabIndex={2}>Sign In</h1>
            <h3 tabIndex={3}>Streamline Your Event Experience: RSVP Easily and Seamlessly Today</h3>
          </div>

          <div className="googleAuth"  >
            <a href="/authenticate Google API" aria-label="Log in with your google account">
              <img src={GoogleImage} alt="A logo of Google dot com" />
              Sign in with Google
            </a>
          </div> 
          <div className="or">
            <hr />
            <span tabIndex={0}> or </span>
          </div>
          

          <div className="formSection">
            <form action="/*authentication goes here*/" method="post" className="loginForm">
             <div className="email">
             <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email"  placeholder="Email" required aria-placeholder="Email"/>
             </div>
           
          <div className="password">
          <label htmlFor="password">Password</label>
           <input type="password" name="password" id="password" placeholder="Password" required aria-placeholder="Password"/>
           <div className="forgotPass">
           <a href="password reset page">Forgot Password?</a>
           </div>
          </div>
          <div className="sign">
          <button type="submit" className="login"> Sign In</button>
          
          
          <div className="signUp">
 
        If you don’t have an account? <Link to='/Signup' className="signUpLink">Sign Up</Link>.

          </div>
          </div>
            </form>
          </div>
         </div>
        </div>
      </div>
    </div>


  </div>
};

export default Login;
