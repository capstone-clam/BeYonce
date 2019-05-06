import React, {Component} from 'react'
// import {fetchCategoryFromCloset} from '../store/closet'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class AllSongs extends Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
  }

  render() {
    const {loading, category} = this.props

    if (loading) return <div>Loading...</div>

    return (
      <div className="allSongs">
        <h2>Songs: </h2>
        {/* {
                            category.map(item =>
                                <div id="songlinks" key={item.id}>
                                    <url>{item.url}</url>
                                </div>
                            )
                        } */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    category: state.category
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchCategoryFromCloset: (categoryId) => dispatch(fetchCategoryFromCloset(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSongs)
