function AbilityRow(name, baseScore, pointCosts) {
	var self = this;
	self.name = name;
	self.offset = ko.observable(0)
	self.score = ko.computed(function() {
		return parseInt(baseScore()) + parseInt(self.offset());
	}, this);
	self.pointCost = ko.computed(function() {
		return pointCosts()[self.score() - 1].cost();
	}, this);

	self.modifier = ko.computed(function() {
		return config.abilityModifiers[self.score() - 1];
	}, this);

	self.increase = function() {
		var prev = self.offset();
		self.offset(prev + 1);
	};

	self.decrease = function() {
		var prev = self.offset();
		self.offset(prev - 1);
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

	self.pointCosts = ko.observableArray();
	for (var i = 0; i < config.pointCosts.length; i++){
		self.pointCosts.push(
			new PointCost((i + 1), config.pointCosts[i])
		);
	}

	console.log(self.pointCosts);

	self.abilityRows = ko.observableArray();
	for(var i = 0; i < config.abilityNames.length; i++){
		self.abilityRows.push(new AbilityRow(config.abilityNames[i], self.baseScore, self.pointCosts))
	}
	
}

ko.applyBindings(new CalculatorViewModel());