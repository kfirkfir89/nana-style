
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import './sign-in.styles.scss'


const SignIn = () => {
  
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return(
    <div className='container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 px-1'>
      <div className='lg:col-span-2'>
        <h1 className='pb-3 text-center'>Sign In Page</h1>
      </div>
      <div className=''>
        <SignUpForm />
      </div>
      <div className='flex justify-center'>
        <button type="button" className='login-with-google-btn whitespace-nowrap w-2/4' onClick={logGoogleUser}>Sign in with Google Popup</button>
      </div>
    </div>
  )
};

export default SignIn;