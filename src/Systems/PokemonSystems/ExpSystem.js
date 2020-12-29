const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
module.exports = class ExpSystem
{

	async ExpNeeded(level, growthRate)
	{
		let result = await new Promise((resolve) =>
		{
			P.getGrowthRateByName(growthRate)
				.then((response) =>
				{
					// console.debug(response);
					resolve(response.levels[level].experience);
				}).catch((error) => console.error(error));
		});

		return result;
	}
};