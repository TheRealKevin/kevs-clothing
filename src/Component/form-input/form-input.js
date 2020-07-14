import React from 'react';
import './form-input.scss';

const FormInput = ({handleChange,label,...otherProps}) => {
    return (
        <div className='group'> {/* Because we want the label and inputs to be together */}
            <input className='form-input' onChange={handleChange} {...otherProps}/>
            {
                label ? 
                (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                    {label.toUpperCase()}
                </label>)
                :
                null
            }
        </div>
    );
}

export default FormInput;