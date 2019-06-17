import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems, selectItemPage } from '../actions/items';
import { selectCurrentCategory } from '../actions/categories';

export class Category extends Component {
  viewCategory = () => {
    this.props.selectCurrentCategory(this.props.category);
    this.props.selectItemPage(1);
    const limit = 10;
    this.props.getItems(this.props.category.id, 0, limit);
  };

  render() {
    return (
      <div onClick={this.viewCategory}>
        {this.props.category.name}
      </div>
    );
  }
}

function mapStateToProps({ itemsReducer }) {
  return {
    currentPage: itemsReducer.currentPage,
  };
}

const mapDispatchToProps = {
  getItems,
  selectCurrentCategory,
  selectItemPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
