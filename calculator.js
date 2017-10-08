function AbilityRow(name, baseScore, pointCosts, pointsOffset) {
	var self = this;
	self.name = name;
	self.scoreOffset = ko.observable(0)
	self.score = ko.computed(function() {
		return parseInt(baseScore()) + parseInt(self.scoreOffset());
	}, this);

	self.totalPointCost = ko.computed(function() {
		return pointCosts()[self.score() - 1].cost();
	}, this);

	self.modifier = ko.computed(function() {
		return config.abilityModifiers[self.score() - 1];
	}, this);

	self.increase = function() {
		var prevScoreOffset = self.scoreOffset();
		self.scoreOffset(prevScoreOffset + 1);
		var prevPointsUsed = pointsOffset();
		var cost = Math.abs(pointCosts()[self.score() - 1].cost());
		pointsOffset(prevPointsUsed + cost);
	};

	self.decrease = function() {
		var prevScoreOffset = self.scoreOffset();
		self.scoreOffset(prevScoreOffset - 1);
		var prevPointsUsed = pointsOffset();
		var cost = Math.abs(pointCosts()[self.score() - 1].cost());
		pointsOffset(prevPointsUsed - cost);
	};
}

function PointCost(score, cost) {
	var self = this;
	self.score = ko.observable(score);
	self.cost = ko.observable(cost);
}

function CalculatorViewModel() {
	var self = this;
	self.baseScore = ko.observable(config.baseScore);
	self.pointTotal = ko.observable(config.pointTotal);
	self.scoreCap = ko.observable(config.scoreCap);
	self.pointsOffset = ko.observable(0);
	self.pointPool = ko.computed(function() {
		return parseInt(self.pointTotal()) - parseInt(self.pointsOffset())
	})

	self.pointCosts = ko.observableArray();
	for (var i = 0; i < config.pointCosts.length; i++){
		self.pointCosts.push(
			new PointCost((i + 1), config.pointCosts[i])
		);
	}

	self.abilityRows = ko.observableArray();
	for(var i = 0; i < config.abilityNames.length; i++){
		self.abilityRows.push(new AbilityRow(config.abilityNames[i], self.baseScore, self.pointCosts, self.pointsOffset))
	}

	//TODO: Add reset all
	
}

ko.applyBindings(new CalculatorViewModel());