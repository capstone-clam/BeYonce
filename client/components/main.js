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
            <h2 className="About"> About </h2>
            <div className="aboutText">
              Be Yoncé is an interactive augmented reality experience in which
              you can channel your inner Queen by wearing some of her most
              iconic pieces of clothing.
              <br />
              <br />
              Click through and select a headpiece, a bodysuit, and a song.
              <br />
              <br />
              For the optimal experience: open Be Yoncé in Google Chrome, with a
              glass of wine in hand, and crank up the volume.
            </div>
          </div>
          {/* <div className="fiveBeysDiv">
            <img className="fiveBeysImg" src="/5Beys.png" />
          </div> */}

          <div className="enterButton">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className="button"
            >
              <Link to="/camera">Enter</Link>
            </Button>
          </div>

          {/* <div className="description">misc description, directions, etc</div> */}
          <div className="namesList">
            <div className="name">
              <p>Built with love by:</p>
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
