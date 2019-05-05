import React, {Component} from 'react'

class Main extends Component {
  render() {
    return (
      <div>
        <div>
          Welcome to BeYonce! Take an interactive journey to dress yourself up
          in your favorite iconic looks from Beyonce, pick a song, and let
          yourself unwind and dance! For a few minutes you can empower yourself
          to BE...yonce!
        </div>
        <div>
          Feel free to login our make an account, or just jump in and play by
          selecting "Camera" from the NavBar above!
        </div>
        <div>
          This experience is brought to you by four talented software engineers
          attending the Grace Hopper Program:
        </div>
        <ul className="list-group">
          <li className="list-group-item">Chelsi Asulin</li>
          <li className="list-group-item">Alex Grazier</li>
          <li className="list-group-item">Linda Saraguro</li>
          <li className="list-group-item">Macarena Carreno</li>
        </ul>
      </div>
    )
  }
}

export default Main
