import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {auth} from '../../firebase/firebase';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart-selectors';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import './header.scss';

const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser,
    hidden : selectCartHidden
}) 
 
const Header = ({currentUser,hidden}) => {
    return (
        <div className='header'>
             <Link className='logo-container' to='/'>
                <Logo className='logo'/>                 
             </Link>
             <h3>Kev's Clothing</h3>
             <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/contact'>
                    CONTACT
                </Link>
                {
                    currentUser ? 
                    <div className='option' onClick={() => auth.signOut()}>
                        SIGN OUT 
                    </div>
                    :
                    <Link className='option' to='/signin'>
                        SIGN IN
                    </Link>
                }
                <CartIcon/>
             </div>
             {hidden ? null : <CartDropdown/>}
        </div>
    );
}
 
export default connect(mapStateToProps)(Header);