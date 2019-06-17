import { CategoriesAction, ItemsAction } from '../utils/const';

const formatIncomingData = store => next => (action) => {
  if (action.type === ItemsAction.GET_ITEMS_SUCCESS) {
    const newItemsArray = {};
    action.payload.items.forEach((element) => {
      newItemsArray[element.id] = element;
    });
    action.payload.items = newItemsArray;
  }
  if (action.type === CategoriesAction.GET_CATEGORIES_SUCCESS) {
    const newCategoriesArray = {};
    action.payload.categories.forEach((element) => {
      newCategoriesArray[element.id] = element;
    });
    action.payload.categories = newCategoriesArray;
  }
  return next(action);
};

export default formatIncomingData;
