import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCategories, addCategoryThunk, removeAll} from '../store'
import {CleanButton} from '../components'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

class Category extends Component {
  constructor(props) {
    super(props)
    this.pickCategory = this.pickCategory.bind(this)
    this.resetClick = this.resetClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  resetClick(ev) {
    ev.preventDefault()
    console.log('ResetClick')

    this.props.removeAll()
  }

  pickCategory(ev) {
    ev.preventDefault()
    const categoryId = ev.target.id
    this.props.addCategoryThunk(categoryId)
  }

  render() {
    const categories = this.props.categories

    return (
      <div className="uppercase">
        <Typography component="h6" variant="h6" align="center" gutterBottom>
          BROWSE & CHOOSE A CATEGORY
        </Typography>

        <div className="clearAndHomeButtons">
          <Grid container spacing={16} align="center">
            <Grid item xs={6}>
              <Link to="/homepage">
                <Button variant="contained" size="small" color="secondary">
                  <Icon>home</Icon>
                </Button>
              </Link>
            </Grid>

            <Grid item xs={6}>
              <CleanButton />
            </Grid>
          </Grid>
        </div>

        {categories.map(category => (
          <div id="closetpics" key={category.id} onClick={this.pickCategory}>
            <div id="singlepic">
              <div>
                <img
                  className="closetpics"
                  id={category.id}
                  src={category.image}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    loadingCategories: state.closet.loadingCategories,
    categories: state.closet.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    addCategoryThunk: categoryId => dispatch(addCategoryThunk(categoryId)),
    removeAll: () => dispatch(removeAll())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category)
