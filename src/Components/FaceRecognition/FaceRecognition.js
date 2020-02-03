import React from 'react';
import './FaceRecognition.css'



const FaceRecognition = ({imageURL}) => {
    return (
        <div className='center'>
            <img className='image mt2' alt='' src={imageURL} />
        </div>
    );
}

export default FaceRecognition;