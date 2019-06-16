import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../actions/items';

export class Category extends Component {
  viewCategory = () => {
    this.props.getItems(this.props.category.id, 0, 100);
  };

  render() {
    console.log('render');
    console.log(this.props.state);
    return (
      <div onClick={this.viewCategory}>
        {this.props.category.name}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getItems,
};

export default connect(null, mapDispatchToProps)(Category);
