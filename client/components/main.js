import React, {Component} from 'react'

class Main extends Component {
  render() {
    return (
      <div className="container">
        <div className="intros" id="welcome">
          <div className="row">
            <div className="col-sm">Welcome to BeYonce!</div>
          </div>
        </div>
        <div className="intros">
          <div className="row">
            <div className="col-sm">
              Take an interactive journey to dress yourself up in your favorite
              iconic looks from Beyonce, pick a song, and let yourself unwind
              and dance! For a few minutes you can empower yourself to
              BE...yonce!
            </div>
          </div>
        </div>
        <div className="intros">
          <div className="row">
            <div className="col-sm">
              Feel free to login or make an account, or just jump in and play by
              selecting "Camera" from the NavBar above!
            </div>
          </div>
        </div>
        <div className="list-group">
          <div className="row">
            <div className="col-sm">
              This experience is brought to you by four talented software
              engineers attending the Grace Hopper Program:
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <li className="list-group-item">
                Chelsi Asulin
                <br />
                <a href="https://www.linkedin.com/in/chelsi-asulin/">
                  Chelsi's LinkedIn
                </a>
              </li>
            </div>
            <div className="col-sm">
              <li className="list-group-item">
                Alex Grazier
                <br />
                <a href="https://www.linkedin.com/in/alex-grazier/">
                  Alex's LinkedIn
                </a>
              </li>
            </div>
            <div className="col-sm">
              <li className="list-group-item">
                Linda Saraguro
                <br />
                <a href="https://www.linkedin.com/in/linda-saraguro-123524122/">
                  Linda's LinkedIn
                </a>
              </li>
            </div>
            <div className="col-sm">
              <li className="list-group-item">
                Macarena Carreno
                <br />
                <a href="https://www.linkedin.com/in/mcarrenog/">
                  Macarena's LinkedIn
                </a>
              </li>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
