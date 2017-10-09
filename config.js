function Config(name, baseScore, pointTotal, scoreCap, pointCosts, abilityModifiers, abilityNames) {
	this.name = name;
	this.baseScore = baseScore;
	this.pointTotal = pointTotal;
	this.scoreCap = scoreCap;
	this.pointCosts = pointCosts;
	this.abilityModifiers = abilityModifiers;
	this.abilityNames = abilityNames;
} 

var defaultConfig = new Config(
	"Default",
	6,
	31,
	18,
	[-1, -1, -1, -1, -1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5],
	[-5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10],
	["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]
);

var dnd5eStandard = new Config(
	"DnD 5e - Standard",
	8,
	27,
	15,
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 7, 9],
	[-5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10],
	["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]
);

var pathfinderStandard = new Config(
	"Pathfinder - Standard",
	10,
	15,
	18,
	[0, 0, 0, 0, 0, 0, -4, -2, -1, 0, 1, 2, 3, 5, 7, 10, 13, 17],
	[-5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10],
	["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]
);

var configArray = [defaultConfig, dnd5eStandard, pathfinderStandard];