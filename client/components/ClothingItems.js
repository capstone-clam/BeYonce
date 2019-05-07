import React, {Component} from 'react'
import {fetchCategory, addSelectedItem} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class ClothingItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.findItems = this.findItems.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
  }

  componentDidMount() {
    const categoryId = Number(this.props.match.params.categoryId)
    this.props.fetchCategory(categoryId)
  }

  findItems(category) {
    if (category.inventories !== undefined) {
      const inventories = category.inventories
      return inventories
    }
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Link to="/closet/"> </Link>
    }
  }
  handleClick(ev) {
    ev.preventDefault()
    let mySelection = Number(ev.target.id)
    this.props.addSelectedItem(mySelection)
    this.setState({redirect: true})
    console.log('STATE', this.state)
    this.renderRedirect()
  }

  render() {
    const {inventories} = this.props

    return (
      <div id="closet-details">
        <h1 id="closeth1">BEYONCÉ CLOSET</h1>
        <p id="closetp">Please choose up to one of each</p>

        {inventories.map(inventory => (
          <div id="singlepic" key={inventory.id} onClick={this.handleClick}>
            <img
              className="closetpics"
              src={inventory.filePath}
              id={inventory.id}
              value={inventory.item}
            />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.closet.loading,
    inventories: state.closet.inventories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategory: categoryId => dispatch(fetchCategory(categoryId)),
    addSelectedItem: inventoryId => dispatch(addSelectedItem(inventoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothingItems)
