import React from 'react'

const Category = props => {
  const categories = props.categories
  const pickCategory = props.pickCategory
  return (
    <div>
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
