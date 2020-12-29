

module.exports = {
	starters: [
		["bulbasaur", "charmander", "squirtle"],
		["chikorita", "cyndaquil", "totodile"],
		["treecko", "torchic", "mudkip"],
		["turtwig", "chimchar", "piplup"],
		["snivy", "tepig", "oshawott"],
		["chespin", "fennekin", "froakie"],
		["rowlet", "litten", "popplio"],
		["grookey", "scorbunny", "sobble"]
	],
	natures: [
		{name: "Hardy", stats: {}, flavor: {}},
		{name: "Lonely", stats: {atk: 1, def: -1}, flavor: {like: "spicy", dislike: "sour"}},
		{name: "Brave", stats: {atk: 1, spe: -1}, flavor: {like: "spicy", dislike: "sweet"}},
		{name: "Adamant", stats: {atk: 1, spa: -1}, flavor: {like: "spicy", dislike: "dry"}},
		{name: "Naughty", stats: {atk: 1, spd: -1}, flavor: {like: "spicy", dislike: "bitter"}},
		{name: "Bold", stats: {atk: -1, def: 1}, flavor: {like: "sour", dislike: "spicy"}},
		{name: "Docile", stats: {}, flavor: {}},
		{name: "Relaxed", stats: {def: 1, spe: -1}, flavor: {like: "sour", dislike: "sweet"}},
		{name: "Impish", stats: {def: 1, spa: -1}, flavor: {like: "sour", dislike: "dry"}},
		{name: "Lax", stats: {def: 1, spd: -1}, flavor: {like: "sour", dislike: "bitter"}},
		{name: "Timid", stats: {atk: -1, spe: 1}, flavor: {like: "sweet", dislike: "spicy"}},
		{name: "Hasty", stats: {def: -1, spe: 1}, flavor: {like: "sweet", dislike: "sour"}},
		{name: "Serious", stats: {}, flavor: {}},
		{name: "Jolly", stats: {spa: -1, spe: 1}, flavor: {like: "sweet", dislike: "dry"}},
		{name: "Naive", stats: {spd: -1, spe: 1}, flavor: {like: "sweet",dislike: "bitter"}},
		{name: "Modest", stats: {atk: -1, spa: 1}, flavor: {like: "dry", dislike: "spicy"}},
		{name: "Mild", stats: {def: -1, spa: 1}, flavor: {like: "dry", dislike: "sour"}},
		{name: "Quiet", stats: {spa: 1, spe: -1}, flavor: {like: "dry", dislike: "sweet"}},
		{name: "Bashful", stats: {}, flavor: {}},
		{name: "Rash", stats: {spa: 1, spd: -1}, flavor: {like: "dry", dislike: "bitter"}},
		{name: "Calm", stats: {atk: -1, spd: 1}, flavor: {like: "bitter", dislike: "spicy"}},
		{name: "Gentle", stats: {def: -1, spd: 1},flavor: {like: "bitter", dislike: "sour"}},
		{name: "Sassy", stats: {spd: 1, spe: -1},flavor: {like: "bitter", dislike: "sweet"}},
		{name: "Careful", stats: {spa: -1, spd: 1},flavor: {like: "bitter", dislike: "dry"}},
		{name: "Quirky", stats: {}, flavor: {}}
	]
};
