import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Item from './Item';
import { getItems } from '../../actions/items';
import { PaginationConfig } from '../../utils/const';

export class ItemList extends Component {
  goToPage = (destinationPage) => {
    const offset = (destinationPage - 1) * PaginationConfig.ITEMS_PER_PAGE;
    this.props.getItems(this.props.categoryId, offset, PaginationConfig.ITEMS_PER_PAGE);
    this.props.history.push(`/categories/${this.props.categoryId}/items/${destinationPage}`);
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
                Number(pageNumber) === Number(this.props.pageNumber)
                  ? (
                    <Pagination.Item
                      key={pageNumber}
                      name={pageNumber}
                      active
                    >
                      {pageNumber}
                    </Pagination.Item>
                  )
                  : (
                    <Pagination.Item
                      key={pageNumber}
                      name={pageNumber}
                      className='clickablePage'
                      onClick={() => this.goToPage(pageNumber)}
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

function mapStateToProps({ items }, { pageNumber }) {
  // Find out the right most page and left most page being display
  // in the pagination, then create an array containing list of
  // those pages being displayed
  const lastPage = Math.floor((items.totalItems - 1) / 10) + 1;
  const leftPage = Math.max(pageNumber - 2, 1);
  const rightPage = Math.min(lastPage, pageNumber + 2);
  const pageList = [];
  for (let i = leftPage; i <= rightPage; i += 1) {
    pageList.push(i);
  }
  return {
    itemIds: Object.keys(items.items),
    items: items.items,
    pageNumber,
    pageList,
  };
}

const mapDispatchToProps = {
  getItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
