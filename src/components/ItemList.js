import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Item from './Item';
import { getItems, selectItemPage } from '../actions/items';
import { PaginationConfig } from '../utils/const';

export class ItemList extends Component {
  goToPage = (e) => {
    e.preventDefault();
    if (e.target.innerHTML) {
      const destinationPage = Number(e.target.innerHTML);
      this.props.selectItemPage(destinationPage);
      const offset = (destinationPage - 1) * PaginationConfig.ITEMS_PER_PAGE;
      const limit = PaginationConfig.ITEMS_PER_PAGE;
      this.props.getItems(this.props.selectedCategory, offset, limit);
    }
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>Items</Card.Title>
          </Card.Body>
          <div>
            { this.props.itemIds.map(id => (
              <Link className='item-link item-card' key={id} to={`/items/${this.props.items[id].id}`}>
                <Item id={id} />
              </Link>
            ))
          }
          </div>
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
                      name='clickablePage'
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
  // Find out the right most page and left most page being display
  // in the pagination, then create an array containing list of
  // those pages being displayed
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
