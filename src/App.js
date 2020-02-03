import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import 'tachyons';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'

const app = new Clarifai.App({
  apiKey: '308c0465acc8444881aeb17341641f49'
 });
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
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: ''
    }
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit =() => {
    this.setState({imageURL: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(
      function(response) {
            console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
          },
    function(err) {
      // there was an error
    }
  );
  }

  render(){
    return (
      <div className="App">
        <Particles classname='particles' params={particlesOptions}/>
        <div className='test'>
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition imageURL={this.state.imageURL}/>
        </div>
        <div>
          
        </div>
      </div>
    );
  }
}

export default App;
