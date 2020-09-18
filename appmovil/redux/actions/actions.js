import types from "./types";

export const saveArray = (payload) => ({
  type: types.SAVE_ARRAY,
  payload: payload,
});

export const cleanArray = () => ({
  type: types.CLEAN_ARRAY,
});

export const sumPrice = (sum) => ({
  type: types.SUM_PRICE,
  sum: sum,
});

export const subsPrice = (substration) => ({
  type: types.SUBS_PRICE,
  substration: substration,
});

export const checkOrders = (payload) => ({
  type: types.CHECK_ORDERS,
  payload: payload,
});

export const cleanOrders = () => ({
  type: types.CLEAN_ORDERS
});

export const saveBarName = (payload) => ({
  type: types.SAVE_BARNAME,
  payload: payload,
});
