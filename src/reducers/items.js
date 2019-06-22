import { ItemsAction } from '../utils/const';

const initialState = { items: {}, currentPage: null };

export default function items(state = initialState, action) {
  switch (action.type) {
    case ItemsAction.GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
        totalItems: action.payload.total_items,
      };
    case ItemsAction.ADD_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case ItemsAction.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case ItemsAction.SELECT_ITEM_PAGE:
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };
    default:
      return state;
  }
}
