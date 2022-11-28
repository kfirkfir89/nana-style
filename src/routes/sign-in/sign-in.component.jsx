
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import Button from '../../components/button/button.component';

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
      <div className='grid grid-cols-4 px-5'>
        <div className='flex flex-col col-start-2 col-span-2 gap-3'>
          <Button buttonType={'google'} type="submit" onClick={logGoogleUser}>
            Sign in with Google Popup
          </Button>
        </div>
      </div>
    </div>
  )
};

export default SignIn;