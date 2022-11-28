import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import './sign-in-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword:'',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields; 

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    
    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();

    } catch (error) {
        switch(error.code){
          case "auth/wrong-password":
            alert('incorrect password for email');
            break;
          case "auth/user-not-found":
            alert('no user associated with this email');
            break;
          default:
            console.log(error);
        }
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value })

  };

  return(
    <div className='sign-up-container fontFamily px-5'>
      <h2>Already have an account?</h2>
      <span className='pl-1'>Sign in with your email and password</span>
      <form className="grid grid-col-4 mt-2" onSubmit={handleSubmit}>

        <FormInput 
          label="Email"
          name='email' 
          type="text" 
          onChange={handleChange} 
          value={email} 
          required
        />

        <FormInput 
          label="Password"
          name='password' 
          type="password" 
          onChange={handleChange} 
          value={password} 
          required
        />

        <div className='grid grid-cols-4'>
          <div className='flex flex-col col-start-2 col-span-2 gap-3'>
            <Button type="submit" buttonType='default'>Sign In</Button>
            <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google</Button>
          </div>
        </div>

      </form>
      
    </div>
    
  )
};

export default SignInForm;