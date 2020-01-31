import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import 'tachyons';
import Particles from 'react-particles-js';
import './App.css';


const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 4
      }
    },
    number: {
      value: 100,
      density:{
        enable: true,
        value_area: 1000
      }
    },
    move: {
      speed:3
    }
  },
  interactivity: {
    events:{
      onclick: {
        enable: true,
        mode: 'push'
        }
      }
  } 
};

class App extends Component {
  render(){
    return (
      <div className="App">
        <Particles classname='particles' params={particlesOptions}/>
        <div className='test'>
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm />
        </div>
        
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
