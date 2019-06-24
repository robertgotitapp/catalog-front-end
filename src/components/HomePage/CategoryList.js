import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { getItems } from '../../actions/items';
import { selectCurrentCategory, getCategories } from '../../actions/categories';
import { PaginationConfig } from '../../utils/const';

export class CategoryList extends Component {
  componentDidMount() {
    this.props.selectCurrentCategory(this.props.categoryId);
    this.props.getItems(
      this.props.categoryId,
      this.props.pageNumber,
      PaginationConfig.ITEMS_PER_PAGE,
    );
  }

  viewCategory = (e) => {
    const categoryChosen = Number(e.target.name);
    this.props.selectCurrentCategory(categoryChosen);
    this.props.getItems(categoryChosen,
      PaginationConfig.DEFAULT_OFFSET,
      PaginationConfig.ITEMS_PER_PAGE);
    this.props.history.push(`/categories/${categoryChosen}/items/1`);
  };


  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Categories</Card.Title>
        </Card.Body>
        <Tab.Container>
          <Nav variant="pills" className="flex-column">
            { Object.keys(this.props.categories).map(key => (
              <Nav.Item key={key}>
                <Nav.Link
                  eventKey={key}
                  name={key}
                  onClick={this.viewCategory}
                >
                  {this.props.categories[key].name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Tab.Container>
      </Card>
    );
  }
}

function mapStateToProps({ categories }, { categoryId, pageNumber }) {
  return {
    categories: categories.categories,
    currentCategory: categoryId,
    pageNumber,
    // currentCategory: categories.currentCategory,
  };
}

const mapDispatchToProps = {
  getCategories,
  selectCurrentCategory,
  getItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
