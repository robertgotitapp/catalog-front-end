import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { getItems, selectItemPage } from '../actions/items';
import { selectCurrentCategory, getCategories } from '../actions/categories';
import { PaginationConfig } from '../utils/const';

export class CategoryList extends Component {
  state = { loading: true };

  componentDidMount() {
    this.props.getCategories(0, PaginationConfig.CATEGORIES_PER_PAGE)
      .then((res) => {
        if (res.statusCode) {
          this.setState({ loading: false });
        }
      });
  }

  viewCategory = (e) => {
    const categoryChosen = Number(e.target.name);
    this.props.selectCurrentCategory(categoryChosen);
    this.props.selectItemPage(PaginationConfig.DEFAULT_PAGE);
    this.props.getItems(categoryChosen,
      PaginationConfig.DEFAULT_OFFSET,
      PaginationConfig.ITEMS_PER_PAGE);
  };


  render() {
    if (this.state.loading === true) {
      return <div className='loader'> ...loading </div>;
    }

    return (
      <Card>
        <Card.Body>
          <Card.Title>Categories</Card.Title>
        </Card.Body>
        <Tab.Container>
          <Nav variant="pills" className="flex-column">
            { Object.keys(this.props.categories).map(key => (
              <Nav.Item key={key}>
                <Nav.Link eventKey={key} name={key} onClick={this.viewCategory}>
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

function mapStateToProps({ categoriesReducer }) {
  return {
    categories: categoriesReducer.categories,
    currentCategory: categoriesReducer.currentCategory,
  };
}

const mapDispatchToProps = {
  getCategories,
  selectCurrentCategory,
  getItems,
  selectItemPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
