import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Redirect, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {auth, createUserProfileDocument} from './firebase/firebase';
import {setCurrentUser} from './redux/user/user-actions';
import {selectCurrentUser} from './redux/user/user-selectors';
import Header from './Component/header/header';
import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import CheckoutPage from './pages/checkout/checkout';
import SignInAndSignUp from './pages/sign-in and sign-out/sign-in and sign-out';
import './App.css';

class App extends Component {

  unsubscribeFromAuth = null

  // What this function is doing is that we're setting our State to the current User
  // Therefore We get that user using createUserProfileDocument.
  // Now if the user isn't in our db, we create the user in the createUserProfileDocument
  // Either way, we get back a userAuth object (that big complex object) and rest is explained below

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      // We get userAuth from the createUserProfileDocument in firebase.js
      // userAuth is a documentReference returned from createUserProfileDocument

      if(userAuth){ // Here we're checking if we get a userAuth or null
        const userRef = await createUserProfileDocument(userAuth);
      
        // userRef has a snapshot that can be accessed using .onSnapShot
        // and this snapShot contains the data of a user that's already in our
        // db or is going to be entered in our db
        userRef.onSnapshot( snapShot => {
          setCurrentUser({
              id : snapShot.id,
              ...snapShot.data()
          })
        })
      }else{
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render(){
    return (
      <div>
        <Router>
          <Header/>
            <Switch>
              <Route path='/' exact component={Homepage}/>
              <Route path='/shop' component={ShopPage}/>
              <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUp/>)}/>
              <Route exact path='/checkout' component={CheckoutPage}/>
            </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
