import React, { Component } from 'react';
import $ from 'jquery';
import ScrollMagic from 'scrollmagic';
import Navbar from './Navbar';
import './Home.css';
import LogInModal from './LogInModal';

  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;

class Home extends Component {

  constructor(){
    super();
    this.state ={
      showLogInModal: false,
      logged: false
    }

  }


  checkLogInActive(){
      if(localStorage.getItem("userId") !== null){
        this.setState({logged: true})
      }
      else {
        this.setState({logged: false})
      }
  }
  
  showLogInModalCreate() {
      if(localStorage.getItem("userId") !== null){
          this.props.router.push({
            pathname: '/create'
          })
      } else{
            this.setState({
              createPartyActivity: true,
            showLogInModal: true
      });
        }
  }

  

  componentDidMount() {
    this.setAnimations();
    this.checkLogInActive();
  }


  setAnimations() {
    var controller = new ScrollMagic.Controller({
          globalSceneOptions: {
              reverse: true,
              triggerHook: 0
          }
      });

    if (windowWidth > 767) {
      $(".about-me").click(function (){
                  $('html, body').animate({
                      scrollTop:  $("#top").scrollTop() + windowHeight*0.81
                  }, 0);
      })
      $(".portfolio").click(function (){
                  $('html, body').animate({
                      scrollTop: $("#top").scrollTop() + windowHeight*2*0.81
                  }, 0);
      })            
      $(".about-projects").click(function (){
                  $('html, body').animate({
                      scrollTop: $("#top").scrollTop() + windowHeight*2*0.81
                  }, 0);
      })
      $(".scroll-about").click(function (){
                  $('html, body').animate({
                      scrollTop:  $("#top").scrollTop() + windowHeight*0.81
                  }, 0);
      })
      var pinIntroScene = new ScrollMagic.Scene({
        triggerElement: '.how-works',
        duration: '400%'
      })
      .setPin('.how-works')
      .addTo(controller);
        // build a scene
      var ourScene = new ScrollMagic.Scene()
      .setClassToggle('.how-works-box-1', 'fadeIn') 
      .offset(windowHeight*0.9)
      .addTo(controller);

      // build a scene
      var ourScene2 = new ScrollMagic.Scene()
      .setClassToggle('.how-works-box-1', 'fadeOut')
      .offset(windowHeight*0.9+windowHeight*0.8)
      .addTo(controller);
      //.on("enter", function () {
       // $('.triangle-1').removeClass('animacja-1');
      //});

      // build a scene
      var ourScene3 = new ScrollMagic.Scene()
      .setClassToggle('.how-works-box-2', 'fadeIn')
      .offset(windowHeight*0.9+windowHeight*0.8) 
      .addTo(controller);

      // build a scene
      var ourScene4 = new ScrollMagic.Scene()
      .setClassToggle('.how-works-box-2', 'fadeOut')
      .offset(windowHeight*0.9+windowHeight*0.8+windowHeight*0.9) 
      .addTo(controller);

      var ourScene5 = new ScrollMagic.Scene()
      .setClassToggle('.how-works-box-3', 'fadeIn')
      .offset(windowHeight*0.9+windowHeight*0.8+windowHeight*0.9) 
      .addTo(controller);

      // build a scene
      var ourScene6 = new ScrollMagic.Scene()
      .setClassToggle('.how-works-box-3', 'fadeOut')
      .offset(windowHeight*0.9+windowHeight*0.8+windowHeight*0.9+windowHeight*0.9) 
      .addTo(controller);

      var ourScene7 = new ScrollMagic.Scene()
      .setClassToggle('.how-works-box-4', 'fadeIn')
      .offset(windowHeight*0.9+windowHeight*0.8+windowHeight*0.9+windowHeight*0.9) 
      .addTo(controller);

    }
  }





  render() {
    return (
      <div>
      <LogInModal router={this.props.router} showActivity={this.state.showLogInModal} onClose={() => this.setState({showLogInModal: false})} createPartyActivity={this.state.createPartyActivity} checkLogInActive={this.checkLogInActive.bind(this)}/>
        <div className="main-bg">
          <Navbar router={this.props.router} myprofile={false}/>
          <div className="main-slogan">
            <div className="main-slogan-box">
              <p className="main-slogan-text">Spotkaj się ze znajomymi!</p>
              <p className="main-slogan-text">Uniknij problemów z organizacją</p>
              <button className="btn main-slogan-btn" onClick={this.showLogInModalCreate.bind(this)}>Stwórz wydarzenie!</button>
            </div>
          </div>
        </div>
      <div className="how-works">
        <div className="container">
          <h2 className="how-works-title">JAK TO DZIAŁA</h2>
          <div className="col-md-6 col-sm-12 how-works-box how-works-box-1">
            <img className="how-works-img" src="http://ecsmedia.pl/c/gamepad-esperanza-eg102-b-iext41915319.jpg" alt="dodawanie uzytkownikow"/>
          </div>
          <div className="col-md-6 col-sm-12 how-works-description how-works-box-1">
            <p>Tekst jak to dzialaTekst jak to dzialaTekst jak to dzialaTekst jak to dzialaTekst jak to dzialaTekst jak to dziala</p>
          </div>
          <div className="col-md-6 col-sm-12 how-works-description how-works-box-2">
            <p>Tekst jak to dzialaTekst jak to dzialaTekst jak to dzialaTekst jak to dzialaTekst jak to dzialaTekst jak to dziala</p>
          </div>
          <div className="col-md-6 col-sm-12 how-works-box how-works-box-2">
            <img className="how-works-img" src="http://ecsmedia.pl/c/gamepad-esperanza-eg102-b-iext41915319.jpg" alt="dodawanie uzytkownikow"/>
          </div>
          <div className="col-md-6 col-sm-12 how-works-box how-works-box-3">
            <img className="how-works-img" src="http://ecsmedia.pl/c/gamepad-esperanza-eg102-b-iext41915319.jpg" alt="dodawanie uzytkownikow"/>
          </div>
          <div className="col-md-6 col-sm-12 how-works-description how-works-box-3">
            <p>Tekst jak to dzialaTekst jak to dzialaTekst jak to dzialaTekst jak to dzialaTekst jak to dzialaTekst jak to dziala</p>
          </div>
          <div className="col-md-6 col-sm-12 how-works-description how-works-box-4">
            <p>Tekst jak to dzialaTekst jak to dzialaTekst jak to dzialaTekst jak to dzialaTekst jak to dzialaTekst jak to dziala</p>
          </div>
          <div className="col-md-6 col-sm-12 how-works-box how-works-box-4">
            <img className="how-works-img" src="http://ecsmedia.pl/c/gamepad-esperanza-eg102-b-iext41915319.jpg" alt="dodawanie uzytkownikow"/>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Home;