import React from 'react';
import SignIn from '../../Component/sign-in/sign-in';
import SignUp from '../../Component/sign-up/sign-up';
import './sign-in and sign-out.scss';

const SignInAndSignUp = () => {
    return(
        <div className='sign-in-and-sign-out'>
            <SignIn/>
            <SignUp/>
        </div>
    );
} 

export default SignInAndSignUp;