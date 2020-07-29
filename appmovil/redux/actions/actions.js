import types from "./types";

export const loadPokemon = () => async (dispatch, getState, api) => {
  dispatch({ type: types.LOAD_STARTED });
  try {
    let pokemons = await api.loadPokemons();

    dispatch({ type: types.LOAD_SUCCEEDED, payload: pokemons });
  } catch (error) {
    dispatch({ type: types.LOAD_FAILED, payload: error });
  }
};


