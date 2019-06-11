import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCategory } from '../actions/categories';

class AddCategory extends Component {
    state = {
      name: '',
      description: '',
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.addCategory({ ...this.state });
    }

    render() {
      const { name, description } = this.state;

      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Category Name</label>
            <input type="text" name="name" onChange={this.handleChange} value={name} />
            <label>Category Description</label>
            <input type="text" name="description" onChange={this.handleChange} value={description} />
            <button type="submit"> Add Category </button>
          </form>
        </div>
      );
    }
}

const mapDispatchtoProps = {
  addCategory,
};

export default connect(null, mapDispatchtoProps)(AddCategory);
