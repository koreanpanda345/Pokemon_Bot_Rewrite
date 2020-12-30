

module.exports = {
	PokeBalls: {
		pokeball: {
			base_rate: 1
		},
		greatball: {
			base_rate: 1.5
		},
		ultraball: {
			base_rate: 2
		},
		masterball: {
			base_rate: true,
			fails: ["marowak", "nihilego"],
		},
		safariball: {
			base_rate: 1.5
		},
		levelball: {
			base_rate: (wildLevel, userLevel) =>
			{
				if(userLevel <= wildLevel) return 1;
				else if(userLevel > wildLevel && userLevel < (wildLevel * 2)) return 2;
				else if(userLevel > (wildLevel * 2) && userLevel < (wildLevel * 4)) return 4;
				else if(userLevel > (wildLevel * 4)) return 8;

				return 1;
			}
		},
		lureball: {
			base_rate: (is_fishing) =>
			{
				if(is_fishing) return 5;
				return 1;
			}
		},
		moonball: {
			base_rate: (pokemon) =>
			{
				if(["nidoran-f", "nidorina", "nidoqueen",
					"nidoran-m", "nidorino", "nidoking", 
					"clefairy", "clefable",
					"jigglypuff", "wigglytuff",
					"skitty", "delcatty",
					"munna", "musharna"].includes(pokemon.name))
					return 4;
				return 1;
			}
		},
		friendball: {
			base_rate: 1
		},
		loveball: {
			base_rate: (wild, user) => 
			{
				if(wild.name === user.name && wild.gender !== user.gender)
					return 8;
				return 1;
			}
		},
		heavyball: {}, // @todo needs weight to be implemented to the PokemonModel.
		fastball: {}, // @todo needs speed to be implemented to the PokemonModel.
		sportball: {
			base_rate: 1.5
		},
		netball: {
			base_rate: (wildTypes) =>
			{
				for(const type in wildTypes)
				{
					if(["bug", "water"].includes(type))
						return 3.5;
				}

				return 1;
			}
		},
		nestball: {
			base_rate: (level) =>
			{
				// @todo this equation needs to be looked at. bulbapedia description for it, doesn't make too much sense.
				if(((41 - level) / 10) < 29) return 4;

				return 1;
			}
		},

		repeatball: {}, // @todo need a way to check if the last pokemon the user caught was the same as the one that is being caught currently.
		timerball: {
			base_rate: (turn) =>
			{
				if((1 + turn) * (1229 / 4096) >= 4) return 4;
				return (1 + turn) * (1229 / 4096);
			}
		},
		premierball: {
			base_rate: 1
		},
		luxuryball: {
			base_rate: 1
		},
		diveball: {}, // Idk if this ball is need, as it woul be impossible to simluate diving, and surfing actions in a text base game.
		duskball: {
			base_rate: (time = "day", location = "") =>
			{
				if(time === "night" || location === "cave") return 3;

				return 1;
			}
		},
		quickball: {
			base_rate: (turn) =>
			{
				if(turn === 1) return 5;
				return 1;
			}
		},
		healball: {
			base_rate: 1
		},
		cherishball: { // this is the event ball. this will not be obtainable through normal gameplay. this ball will be used to give the user a pokemon from an event, to signifiant that the pokemon was won in a event.
			base_rate: 1
		},
		parkball: { // this is not obtainable in any way. i am just adding it here.
			base_rate: true
		},
		dreamball: { // this will be a ultra rare item.
			base_rate: (status) =>
			{
				if(status === "asleep") return 4;
				return 1;
			}
		},
		beastball: {
			base_rate: (isUb) =>
			{
				if(isUb) return 5;
				return 0.1;
			}
		}
	}
};