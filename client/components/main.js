import React, {Component} from 'react'

class Main extends Component {
  render() {
    return (
      <div className="container">
        <div className="intros">
          <div className="row">
            <div className="col-sm welcome intros">Welcome to Be-Yoncé!</div>
          </div>
        </div>

        <div className="intros">
          <div className="row">
            <div className="col-sm intros">
              Take an interactive journey to dress yourself up in your favorite
              iconic looks from Beyoncé, pick a song, and let yourself unwind
              and dance! For a few minutes you can empower yourself to
              BE...yoncé!
            </div>
          </div>
        </div>
        <div className="intros">
          <div className="row">
            <div className="col-sm intros">
              Feel free to login or make an account, or just jump in and play by
              selecting "Camera" from the NavBar above!
            </div>
          </div>
        </div>
        <div className="list-group">
          <div className="row">
            <div className="col-sm designer-intro">
              This experience is brought to you by four talented software
              engineers attending the Grace Hopper Program:
            </div>
          </div>
          <div className="row">
            <div className="col-sm list-item">
              <li className="list-group-item">
                Chelsi Asulin
                <br />
                <a href="https://www.linkedin.com/in/chelsi-asulin/">
                  Chelsi's LinkedIn
                </a>
              </li>
            </div>
            <div className="col-sm list-item">
              <li className="list-group-item">
                Alex Grazier
                <br />
                <a href="https://www.linkedin.com/in/alex-grazier/">
                  Alex's LinkedIn
                </a>
              </li>
            </div>
            <div className="col-sm list-item">
              <li className="list-group-item">
                Linda Saraguro
                <br />
                <a href="https://www.linkedin.com/in/linda-saraguro-123524122/">
                  Linda's LinkedIn
                </a>
              </li>
            </div>
            <div className="col-sm list-item">
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
