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
          <div className="title">BE-YONCÉ</div>
          <div className="fiveBeysDiv">
            <img className="fiveBeys" src="/5Beys.png" />
          </div>
          <div className="intro">
            Take an interactive journey to dress yourself up in your favorite
            iconic looks from Beyoncé, pick a song, and let yourself unwind and
            dance! For a few minutes you can empower yourself to Be...Yoncé
          </div>
          <div className="enterButton">
            <Button variant="contained" color="secondary" size="large">
              <Link to="/camera">Enter</Link>
            </Button>
          </div>
          <div className="description">misc description</div>
          <div className="namesList">
            <div className="name">
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
