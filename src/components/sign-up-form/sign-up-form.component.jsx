import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword:'',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields; 

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    
    event.preventDefault();

    if(password !== confirmPassword){
      alert("password do not match!");
      return;
    }
    
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth (user, {displayName});
      resetFormFields();

    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
        alert('Cannot Create user, email already in use');
      }
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value })

  };

  return(
    <div className='sign-up-container fontFamily px-5'>
      <h2>Don't have an account?</h2>
      <span className='pl-1'>Sign up with your email and password</span>
      <form className="grid grid-col-4" onSubmit={handleSubmit}>
        
        <FormInput 
          label="Display Name"
          name='displayName' 
          type="text" 
          onChange={handleChange} 
          value={displayName} 
          required
        />

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

        <FormInput 
          label="Comfirm Password"
          name='confirmPassword' 
          type="password" 
          onChange={handleChange} 
          value={confirmPassword} 
          required
        />

        <div className='grid grid-cols-4'>
          <div className='flex flex-col col-start-2 col-span-2 gap-3'>
            <Button buttonType={'default'} type="submit">Sign Up</Button>
          </div>
        </div>

      </form>
      
    </div>
    
  )
};

export default SignUpForm;