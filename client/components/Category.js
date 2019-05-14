import React from 'react'
import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

const Category = props => {
  const categories = props.categories
  const pickCategory = props.pickCategory
  return (
    <div className="uppercase">
      <Typography component="h6" variant="h6" align="center" gutterBottom>
        BROWSE & CHOOSE YOUR FAVORITE
      </Typography>

      <div>
        <Grid container spacing={20} align="center">
          <Grid item xs={12}>
            <Button variant="contained" size="small" color="secondary">
              <Icon>home</Icon>
              Home
            </Button>
          </Grid>
        </Grid>
      </div>

      {categories.map(category => (
        <div id="closetpics" key={category.id}>
          <div id="singlepic">
            <div>
              <img
                className="closetpics"
                id={category.id}
                src={category.image}
                onClick={() => pickCategory(category.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Category
