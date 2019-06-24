import { ItemsAction } from '../utils/const';

const initialState = { items: {} };

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
    default:
      return state;
  }
}
