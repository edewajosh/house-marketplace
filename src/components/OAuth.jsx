import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import {setDoc, doc,serverTimestamp, getDoc} from 'firebase/firestore';
import googleIcon from '../assets/svg/googleIcon.svg'
import { db } from '../firebase.config';
import { toast } from 'react-toastify';


const OAuth = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      // Check for user
      const user = result.user
      const userRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(userRef)

      // If user doesn't exist, create 
      if(!docSnap.exists()){
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      }
      navigate('/')
    } catch (error) {
      toast.error('Could not authorize with Google')
    }
  }
  return (
    <div className='socialLogin'>
      <p>Sign { location.pathname ==='/sign-up' ? 'up ': 'in '}
       with</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt="google" />
      </button>
    </div>
  )
}

export default OAuth