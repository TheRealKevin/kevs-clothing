import React, { Component } from 'react';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import {signInWithGoogle, auth} from '../../firebase/firebase';
import './sign-in.scss';

class SignIn extends Component {
    constructor(){
        super()
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email : '',
            password : ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email,password} = this.state; 

        try {
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({email : '',password : ''})
        } catch (error) {
            console.log(error); 
        }   
    }

    handleChange = (event) => {
        const {value,name} = event.target;
        this.setState({ [name] : value })
    }
     
    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your e-mail and password</span>

                <form>
                    <FormInput name='email' type='email' value = {this.state.email} handleChange={this.handleChange} label="email" required/>
                    <FormInput name='password' type='password' value = {this.state.password} handleChange={this.handleChange} label="password" required/>
                    <div className='buttons'>
                        <CustomButton handleSubmit={this.handleSubmit} type='submit'>SIGN IN</CustomButton>
                        <CustomButton isGoogleSignIn onClick = {signInWithGoogle}>SIGN IN WITH GOOGLE</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;