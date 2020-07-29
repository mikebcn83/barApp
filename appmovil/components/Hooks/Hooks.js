import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPokemon } from "../actions/pokeActions";

export const _useLoadPokemons = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPokemon());
  }, []);
};

export const _useLoadingState = () => {
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  return [loading, error];
};
