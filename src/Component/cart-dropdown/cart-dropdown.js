import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter,Link } from 'react-router-dom';
import { selectCartItems } from '../../redux/cart/cart-selectors';
import CustomButton from '../custom-button/custom-button';
import CartItem from '../cart-item-component/cart-item-component';
import './cart-dropdown.scss';

const CartDropdown = ({cartItems,history}) => {
    return(
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    cartItems.length ? 
                    cartItems.map(cartitem => <CartItem key={cartitem.id} item={cartitem}/>)
                    :
                    <span className='empty-message'>Your cart is empty</span>
                }
                <Link to='/checkout'>
                <   CustomButton>GO TO CHECKOUT</CustomButton>
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems
})

export default withRouter(connect(mapStateToProps,null)(CartDropdown));
