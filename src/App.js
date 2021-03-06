import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Signin from './Components/Signin/Signin';
import 'tachyons';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Register from './Components/Register/Register';



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
const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id:'',
    email: '',
    name: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
    }

  loadUser = (data) => {
    this.setState({user: {
        id:data.id,
        email: data.email,
        name: data.name,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottom: height - (clarifaiFace.bottom_row * height)
    
    }
  }
// https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQlIGlYgQzCtfNqvfB6A27prEg3xrgx3_H9mulYHr-6q0wwpob5
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => {
        if(response){
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                id: this.state.user.id   
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(
              this.state.user, {entries: count}
            ))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);
    }else if(route === 'home'){
      this.setState({isSignedIn: 'true'});
    }
    this.setState({route: route});

  }

  render(){
    const {isSignedIn, imageURL, box, route} = this.state;
    return (
      <div className="App">
        <Particles className='particles' 
        params={particlesOptions}/> 
        <Navigation 
          isSignedIn={isSignedIn}
          className='component'
          onRouteChange={this.onRouteChange}/>      
          { 
            route === 'home' 
            ? <div>
                <Logo className='component' />
                <Rank name={this.state.user.name} entries={this.state.user.entries} className='component' />
                <ImageLinkForm 
                  className='component'
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition 
                  className='component'
                  box={box} 
                  imageURL={imageURL}/>
              </div> 
            : (
              route === 'signin'
              ? <Signin loadUser={this.loadUser} className='component' onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} className='component' onRouteChange={this.onRouteChange}/> 
              )                       
          }
      </div>
    );
  }
}

export default App;
