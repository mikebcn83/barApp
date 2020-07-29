import Axios from "axios";

const url = "https://pokeapi.co/api/v2/pokemon";
const pokedex = [];
const LoadPokemons = async () => {
  await ApiCall(1, 151, "I");
  await ApiCall(152, 251, "II");
  await ApiCall(252, 386, "III");
  await ApiCall(387, 493, "IV");
  // await ApiCall(494, 649, "V");
  // await ApiCall(650, 721, "VI");
  // await ApiCall(722, 803, "VII");

  return pokedex;
};

const ApiCall = async (limit1, limit2, generation) => {
  for (let i = limit1; i <= limit2; i++) {
    await Axios.get(`${url}/${i}`).then((res) => {
      pokedex.push({
        name: res.data.name,
        id: res.data.id,
        height: res.data.height,
        weight: res.data.weight,
        generation: generation,
        types: res.data.types.map((types) => types.type.name).join(", "),
      });
    });
  }
};

export default {
  loadPokemons: () => LoadPokemons(),
};
