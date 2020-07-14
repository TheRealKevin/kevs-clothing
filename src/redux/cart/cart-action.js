import {TOGGLE_CART_HIDDEN,ADD_ITEM,REMOVE_ITEM,DECREMENT_ITEM} from '../constants/constants';

export const toggleCartHidden = () => ({
    type : TOGGLE_CART_HIDDEN
})

export const addItem = item => ({
    type : ADD_ITEM,
    payload : item
})

export const removeItem = item => ({
    type : REMOVE_ITEM,
    payload : item
})

export const decrementItem = item => ({
    type : DECREMENT_ITEM,
    payload : item
})