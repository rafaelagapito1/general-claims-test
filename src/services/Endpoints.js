
import axios from 'axios'
let env;
env = require("../env.js").default;
let url = env.WS.URL;
const Products = {
	async getCharactersbyName(offset, filter, name) {
		return await axios.get(url + '/v1/public/characters?name=' + name + '&orderBy=' + filter + '&offset=' + offset + '&apikey=' + env.WS.public_KEY)
	},
	async getCharactersbyFilter(offset, filter) {
		return await axios.get(url + '/v1/public/characters?orderBy=' + filter + '&offset=' + offset + '&apikey=' + env.WS.public_KEY)
	},
	async getCharacterByid(id) {
		return await axios.get(url + '/v1/public/characters/' + id + '?apikey=' + env.WS.public_KEY)
	},
	async getComicsByid(id) {
		return await axios.get(url + '/v1/public/characters/' + id + '/comics?apikey=' + env.WS.public_KEY)
	},


}
export default Products
