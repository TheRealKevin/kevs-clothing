import React from 'react';
import './custom-button.scss';

const CustomButton = ({handleSubmit,children,isGoogleSignIn,inverted,...otherProps}) => {
    return (
        <div onClick={handleSubmit} className={`${inverted ? 'inverted' : ''} custom-button`} {...otherProps}>
             {children}
        </div>
    );
}

export default CustomButton;