import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

class Buttons extends Component {
  // deslectCategory() {
  //   window.location.reload()
  // }
  render() {
    return (
      <div>
        <Grid container spacing={20}>
          <Grid item xs={6}>
            <Button variant="contained" size="small" color="secondary">
              Closet
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" size="small" color="secondary">
              Clear
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Buttons
