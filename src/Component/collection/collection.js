import React from 'react';
import './collection.scss';
import CollectionItem from '../collection-item/collection-item';

const CollectionPreview = ({title,items}) => {
    return(
        <div className='collection-preview'> {/* The overall container that holds the preview */}
            <h1 className='title'>{title.toUpperCase()}</h1>
            <div className='preview'> {/* The actual Item that will be in the preview */}
                {items.filter((collection,index) => index < 4).map(collection => (
                    <CollectionItem key = {collection.id} collection={collection}/>
                ))}
            </div>
        </div>
    );
}

export default CollectionPreview;