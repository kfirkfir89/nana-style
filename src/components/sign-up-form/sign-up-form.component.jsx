import { useState } from 'react';
import FormInput from '../form-input/form-input.component';

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
    <div className='fontFamily'>
      <h1 className="pb-2">Sign up with your email and password</h1>
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
        <button type="submit" className="signUpButton fontFamily bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded w-2/4 flex justify-center self-center" >Sign Up</button>

      </form>
      
    </div>
    
  )
};

export default SignUpForm;