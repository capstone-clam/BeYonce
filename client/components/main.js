import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Grid, Button} from '@material-ui/core'

// const styles = theme => ({
//   paper: {
//     height: 100,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })

class Main extends Component {
  render() {
    return (
      <div className="mainPage">
        <div className="container">
          <div>
            {/* <img className="BeyCollage" src="/BeyLogoLighter.png" /> */}
            <img
              className="BeyCollage"
              src="/img/BeyCollageBrightenedThurs.png"
            />
          </div>
          <div className="title">BE-YONCÉ</div>
          <div className="intro">
            <h2> About </h2>
            <div className="aboutText">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque nulla leo, congue ut ligula iaculis, eleifend
              tincidunt nulla. Morbi vehicula ultricies nulla, eget rhoncus
              massa vehicula a. Pellentesque ullamcorper elementum lorem quis
              vehicula. Quisque vel urna mi. Suspendisse pellentesque metus eget
              lectus tristique, nec hendrerit augue pharetra. Sed ut lorem sit
              amet eros congue tempor nec sit amet magna. Vivamus congue felis
              nisl. Maecenas consequat mauris at volutpat varius. Donec dictum
              tempor finibus. Sed finibus sem ut elit placerat condimentum.
              Phasellus sagittis nunc vestibulum odio lobortis, at maximus lacus
              ultricies.
            </div>
          </div>
          {/* <div className="fiveBeysDiv">
            <img className="fiveBeysImg" src="/5Beys.png" />
          </div> */}

          <div className="enterButton">
            <Button variant="contained" color="secondary" size="large">
              <Link to="/camera">Enter</Link>
            </Button>
          </div>

          <div className="description">misc description, directions, etc</div>
          <div className="namesList">
            <div className="name">
              <p>Created with love by:</p>
              <p> </p>
              <a
                href="https://www.linkedin.com/in/chelsi-asulin/"
                target="_blank"
              >
                Chelsi Asulin
              </a>
            </div>
            <div className="name">
              <a href="https://www.linkedin.com/in/mcarrenog/" target="blank">
                Macarena Carreno
              </a>
            </div>
            <div className="name">
              <a
                href="https://www.linkedin.com/in/alex-grazier/"
                target="_blank"
              >
                Alex Grazier
              </a>
            </div>
            <div className="name">
              <a
                href="https://www.linkedin.com/in/linda-saraguro-123524122/"
                target="_blank"
              >
                Linda Saraguro
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
