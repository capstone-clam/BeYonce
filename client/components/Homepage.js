import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Grid, Button} from '@material-ui/core'

class Homepage extends Component {
  render() {
    return (
      <div className="homePage">
        <div className="container">
          <div>
            <img
              className="BeyCollage"
              src="/img/BeyCollageBrightenedThurs.png"
            />
          </div>
          <div className="title">BE-YONCÉ</div>
          <div className="intro">
            {/* <h2 className="About"> About </h2> */}
            <div className="aboutText">
              An interactive augmented reality experience in which you can
              channel your inner Queen by wearing some of her most iconic pieces
              of clothing.
              <br />
              <br />Click through and select a headpiece, a bodysuit & a song.
              <br />
              <br />For the optimal experience: open Be Yoncé in Google Chrome,
              with a glass of wine in hand & crank up the volume.
            </div>
          </div>
          <div className="enterButton">
            <Link to="/camera">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className="button"
              >
                ENTER
              </Button>
            </Link>
          </div>

          <div className="namesList">
            <p>Built with love by:</p>
            <div className="name">
              <a
                href="https://www.linkedin.com/in/chelsi-asulin/"
                target="blank"
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
                target="blank"
              >
                Alex Grazier
              </a>
            </div>
            <div className="name">
              <a
                href="https://www.linkedin.com/in/linda-saraguro-123524122/"
                target="blank"
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

export default Homepage

// class Homepage extends Component {
//   render() {
//     return (
//       <div className="homePage">
//         <div className="container">
//           <div>
//             <img
//               className="BeyCollage"
//               src="/img/BeyCollageBrightenedThurs.png"
//             />
//           </div>
//           <div className="title">BE-YONCÉ</div>
//           <div className="intro">
//             <h2 className="About"> About </h2>
//             <div className="aboutText">
//               Be Yoncé is an interactive augmented reality experience in which
//               you can channel your inner Queen by wearing some of her most
//               iconic pieces of clothing.
//               <br />
//               <br />
//               Click through and select a headpiece, a bodysuit, and a song.
//               <br />
//               <br />
//               For the optimal experience: open Be Yoncé in Google Chrome, with a
//               glass of wine in hand, and crank up the volume.
//             </div>
//           </div>
//           <div className="enterButton">
//             <Link to="/camera">
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 size="large"
//                 className="button"
//               >
//                 ENTER
//               </Button>
//             </Link>
//           </div>

//           <div className="namesList">
//             <p>Built with love by:</p>
//             <div className="name">
//               <a
//                 href="https://www.linkedin.com/in/chelsi-asulin/"
//                 target="blank"
//               >
//                 Chelsi Asulin
//               </a>
//             </div>
//             <div className="name">
//               <a href="https://www.linkedin.com/in/mcarrenog/" target="blank">
//                 Macarena Carreno
//               </a>
//             </div>
//             <div className="name">
//               <a
//                 href="https://www.linkedin.com/in/alex-grazier/"
//                 target="blank"
//               >
//                 Alex Grazier
//               </a>
//             </div>
//             <div className="name">
//               <a
//                 href="https://www.linkedin.com/in/linda-saraguro-123524122/"
//                 target="blank"
//               >
//                 Linda Saraguro
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default Homepage
