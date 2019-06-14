import { ItemsAction } from '../utils/const';

export default function itemsReducer(state = { items: {} }, action) {
  switch (action.type) {
    case ItemsAction.GET_ITEMS_SUCCESS:
      return { items: action.payload.items };
    case ItemsAction.ADD_ITEM_SUCCESS:
      // fixing problem with id not consitent
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case ItemsAction.UPDATE_ITEM_SUCCESS:
      return state;
    case ItemsAction.DELETE_ITEM_SUCCESS:
      return state;
    default:
      return state;
  }
}
