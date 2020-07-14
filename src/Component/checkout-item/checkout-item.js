import React from 'react';
import { connect } from 'react-redux';
import {removeItem, addItem} from '../../redux/cart/cart-action';
import './checkout-item.scss';
import { decrementItemFromCart } from '../../redux/cart/cart-utils';

const CheckoutItem = ({cartItem,removeItem,addItem,decrementItemFromCart}) => {
    const { name,imageUrl, price, quantity} = cartItem;
    console.log(name,imageUrl, price, quantity);
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item'/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => decrementItemFromCart(cartItem)}>&#10094;</div>
                <span className='value '>{quantity}</span>
                <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => removeItem(cartItem)}>
                &#10005;
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    removeItem : item => dispatch(removeItem(item)),
    addItem : item => dispatch(addItem(item)),
    decrementItem : item => dispatch(decrementItemFromCart(item))
})

export default connect(null,mapDispatchToProps)(CheckoutItem);

