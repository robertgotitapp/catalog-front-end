import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Category extends Component {
  render() {
    return (
      <div>
        {this.props.category.name}
      </div>
    );
  }
}

function mapStateToProps({ categoriesReducer }, { id }) {
  return {
    category: categoriesReducer.categories[id],
  };
}

export default connect(mapStateToProps)(Category);
