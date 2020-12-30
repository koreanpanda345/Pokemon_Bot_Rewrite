

module.exports = class BattleSystem
{
	constructor(side1, side2, weather, field, rules = "default")
	{
		this.side1 = side1;
		this.side2 = side2;
		this.weather = weather;
		this.field = field;
		this.rules = rules;
	}
};

