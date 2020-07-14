import React, { Component } from 'react';
import {auth, createUserProfileDocument} from '../../firebase/firebase';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import './sign-up.scss';

class SignUp extends Component {
    constructor(){
        super();
        this.state = {
            displayName : '',
            email : '',
            password : '',
            confirmPassword : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Creating a new user using Normal SignIn
    handleSubmit = async event => {
        event.preventDefault();

        const {displayName,email,password,confirmPassword} = this.state;
    
        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }

        try {

            // The createUserWithEmailAndPassword func. return a userAuth object
            // hence we destructure user below

            const {user} = await auth.createUserWithEmailAndPassword(
                email,
                password
                );

            // The displayName goes in as the value in formInput in SignIn Component 
            await createUserProfileDocument(user,{displayName}) 

            // After the document is created, we want to clear out our states
            // i.e this is our clear out form
            this.setState({
                displayName : '',
                email : '',
                password : '',
                confirmPassword : ''
            })

        } catch( error ){
            console.log(error)
        }
    };

    handleChange = event => {
        const {name,value} = event.target;

        this.setState({[name]: value})
    }
    
    render(){
        const {displayName,email,password,confirmPassword} = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form'>
                    <FormInput
                    type='text'
                    name= 'displayName'
                    value={displayName}
                    onChange={this.handleChange}
                    label = 'Display Name'
                    required
                    />
                    <FormInput
                    type='email'
                    name= 'email'
                    value={email}
                    onChange={this.handleChange}
                    label = 'Email'
                    required
                    />
                    <FormInput
                    type='password'
                    name= 'password'
                    value={password}
                    onChange={this.handleChange}
                    label = 'Password'
                    required
                    />
                    <FormInput
                    type='password'
                    name= 'confirmPassword'
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label = 'Confirm Password'
                    required
                    />
                    <CustomButton handleSubmit={this.handleSubmit} type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;