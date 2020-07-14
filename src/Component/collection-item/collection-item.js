import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart-action';
import CustomButton from '../custom-button/custom-button'
import './collection-item.scss';

const CollectionItem = ({collection,addItem}) => {
    const { name , price , imageUrl} = collection;
    return(
        <div className='collection-item'>
            <div className='image' style={{backgroundImage: `url(${imageUrl})`}}/> {/* Didn't understand the self closing div tag */}
                <div className='collection-footer'>
                    <span className='name'>{name}</span>
                    <span className='price'>{price}</span>
                </div>
            <CustomButton onClick = {() => addItem(collection)} inverted>Add to cart</CustomButton>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addItem : item => dispatch(addItem(item))
})

export default connect(null,mapDispatchToProps)(CollectionItem);