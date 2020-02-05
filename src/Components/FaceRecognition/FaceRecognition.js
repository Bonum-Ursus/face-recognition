import React from 'react';
import './FaceRecognition.css'



const FaceRecognition = ({imageURL, box}) => {
    return (
        <div className='center'>
            <div className='absolute mt2'>
                <img id='inputImage' className='image mt2' alt='' src={imageURL}/>
                <div className='bounding-box' 
                    style={{top: box.topRow, 
                            right: box.rightCol, 
                            left: box.leftCol, 
                            bottom: box.bottom}}>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;