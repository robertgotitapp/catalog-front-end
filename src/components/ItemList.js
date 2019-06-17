import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Item from './Item';
import { getItems, selectItemPage } from '../actions/items';

export class ItemList extends Component {
  getNextSetofItems = (nextPage) => {
    const offset = (nextPage - 1) * 10;
    const limit = 10;
    this.props.getItems(this.props.selectedCategory.id, offset, limit);
  }

  prevPage = (e) => {
    e.preventDefault();
    const nextPage = this.props.currentPage - 1;
    this.props.selectItemPage(nextPage);
    this.getNextSetofItems(nextPage);
  }

  nextPage = (e) => {
    e.preventDefault();
    const nextPage = this.props.currentPage + 1;
    this.props.selectItemPage(nextPage);
    this.getNextSetofItems(nextPage);
  }

  firstPage = (e) => {
    e.preventDefault();
    const nextPage = 1;
    this.props.selectItemPage(nextPage);
    this.getNextSetofItems(nextPage);
  }

  lastPage = (e) => {
    e.preventDefault();
    const nextPage = this.props.lastPage;
    this.props.selectItemPage(nextPage);
    this.getNextSetofItems(nextPage);
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>Items</Card.Title>
          </Card.Body>
          { this.props.itemIds.map(id => (
            <Link key={id} to={`/items/${this.props.items[id].id}`}>
              <Item id={id} />
            </Link>
          ))
          }
          <Pagination>
            <Pagination.First onClick={this.firstPage} />
            <Pagination.Prev onClick={this.prevPage} />
            <Pagination.Item>{this.props.currentPage}</Pagination.Item>
            <Pagination.Next onClick={this.nextPage} />
            <Pagination.Item onClick={this.lastPage}>{this.props.lastPage}</Pagination.Item>
          </Pagination>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ itemsReducer, categoriesReducer }) {
  return {
    itemIds: Object.keys(itemsReducer.items),
    items: itemsReducer.items,
    lastPage: Math.floor((itemsReducer.totalItems - 1) / 10) + 1,
    selectedCategory: categoriesReducer.currentCategory,
    currentPage: itemsReducer.currentPage,
  };
}

const mapDispatchToProps = {
  getItems,
  selectItemPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
