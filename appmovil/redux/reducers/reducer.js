import types from "../actions/types";

const initialState = {
  items: [],
  price: 0,
  orders: [],
  barName: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_ARRAY: {
      return {
        ...state,
        items: action.payload
      };
    }
    case types.CLEAN_ARRAY: {
      return {
        ...state,
        items: []
      };
    }
    case types.SUM_PRICE: {
      return {
        ...state,
        price: state.price + action.sum,
      };
    }
    case types.SUBS_PRICE: {
      return {
        ...state,
        price: state.price - action.substration,
      };
    }
    case types.CHECK_ORDERS: {
      return {
        ...state,
        orders: action.payload,
      };
    }
    case types.CLEAN_ORDERS: {
      return {
        ...state,
        orders: [],
      };
    }
    case types.SAVE_BARNAME: {
      return {
        ...state,
        barName: action.payload,
      };
    }
  }
  return state;
};

export default reducer;
