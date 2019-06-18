import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Item from './Item';
import { getItems, selectItemPage } from '../actions/items';

export class ItemList extends Component {
  goToPage = (e) => {
    e.preventDefault();
    if (e.target.innerHTML) {
      const destinationPage = Number(e.target.innerHTML);
      this.props.selectItemPage(destinationPage);
      const offset = (destinationPage - 1) * 10;
      const limit = 10;
      this.props.getItems(this.props.selectedCategory.id, offset, limit);
    }
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
            {
              // Current Page does not have onClick event but have active attribute
              // and likewise.
              this.props.pageList.map(pageNumber => (
                pageNumber === this.props.currentPage
                  ? (
                    <Pagination.Item
                      key={pageNumber}
                      active
                    >
                      {pageNumber}
                    </Pagination.Item>
                  )
                  : (
                    <Pagination.Item
                      key={pageNumber}
                      onClick={this.goToPage}
                    >
                      {pageNumber}
                    </Pagination.Item>
                  )
              ))
            }
          </Pagination>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ itemsReducer, categoriesReducer }) {
  const lastPage = Math.floor((itemsReducer.totalItems - 1) / 10) + 1;
  const { currentPage } = itemsReducer;
  const leftPage = Math.max(currentPage - 2, 1);
  const rightPage = Math.min(lastPage, currentPage + 2);
  const pageList = [];
  for (let i = leftPage; i <= rightPage; i += 1) {
    pageList.push(i);
  }
  return {
    itemIds: Object.keys(itemsReducer.items),
    items: itemsReducer.items,
    selectedCategory: categoriesReducer.currentCategory,
    currentPage,
    pageList,
  };
}

const mapDispatchToProps = {
  getItems,
  selectItemPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
