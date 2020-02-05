import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='textP f3'>
                {'Detecting faces on your photo.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br4 shadow-5'>
                    <input className='center f4 pa2 br3 w-70 bg-transparent hover-bg-black hover-white shadow-3' type='text'  onChange={onInputChange} />
                    <button className='center w-25 grow f4 br3 link ph3 pv2 dib white bg-light-purple'
                    onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;