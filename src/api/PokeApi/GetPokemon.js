const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();

module.exports = {
	async getSprite(name, shiny = false, front = true)
	{
		let result = await new Promise((resolve, reject) =>
		{
			P.getPokemonByName(name)
				.then((response) =>
				{
					console.debug(response);
					if(front)
						if(shiny)
							resolve(response.sprites.front_shiny);
						else
							resolve(response.sprites.front_default);
					else
					{
						if(shiny)
							resolve(response.sprites.back_shiny);
						else
							resolve(response.sprites.back_default);
					}
				})
				.catch((error) =>
				{
					console.error(error);
					reject(error);
				});
		});

		return result;
	}
};