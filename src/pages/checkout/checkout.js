import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartTotal, selectCartItems } from '../../redux/cart/cart-selectors';
import CheckoutItem from '../../Component/checkout-item/checkout-item';
import './checkout.scss';

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

const CheckoutPage = ({total,cartItems}) => {
    return(
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(cartItem => 
                    <CheckoutItem key = {cartItem.id} cartItem={cartItem}/>)
            }
            <div className='total'>
                <span className='total'>TOTAL: ${total}</span>
            </div>
        </div>
    );
}

export default connect(mapStateToProps,null)(CheckoutPage);