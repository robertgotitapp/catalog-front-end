import { ItemsAction } from '../utils/const';

const initialState = { items: {} };

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case ItemsAction.GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
      };
    case ItemsAction.ADD_ITEM_SUCCESS:
      // fixing problem with id not consitent
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
