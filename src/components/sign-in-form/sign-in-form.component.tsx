import { useState, FormEvent, ChangeEvent } from 'react';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword:'',
}

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields; 
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
    navigate("/");
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    
    try {
      dispatch(emailSignInStart(email, password));
      navigate("/");
      resetFormFields();

    } catch (error) {
        switch((error as AuthError).code){
          case AuthErrorCodes.INVALID_PASSWORD:
            alert('incorrect password for email');
            break;
          case AuthErrorCodes.USER_DELETED:
            alert('no user associated with this email');
            break;
          default:
            console.log(error);
        }
    }

  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.default}>Sign In</Button>
            <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google</Button>
          </div>
        </div>

      </form>
      
    </div>
    
  )
};

export default SignInForm;