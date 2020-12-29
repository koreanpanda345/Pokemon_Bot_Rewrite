/**
 * This is the Item's Model. This is to construct items.
 * @type {ItemModel}
 */
module.exports = class ItemModel
{
	constructor(id, name, price, sellPrice, effects, description)
	{
		this.id = id;
		this.name = name;
		this.price = price;
		this.sellPrice = sellPrice;
		this.effects = effects;
		this.descriptions = description;
	}
};
