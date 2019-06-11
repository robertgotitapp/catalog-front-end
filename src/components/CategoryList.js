import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../actions/categories';
import Category from './Category';

class CategoryList extends Component {
  componentDidMount() {
    this.props.getCategories(0, 10);
  }

  render() {
    return (
      <div>
        {
          <Category />
        }
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories,
  };
}

const mapDispatchtoProps = {
  getCategories,
};

export default connect(mapStateToProps, mapDispatchtoProps)(CategoryList);
