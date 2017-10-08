function AbilityRow(name, baseScore, pointCosts) {
	var self = this;
	self.name = name;
	self.offset = ko.observable(0)
	self.score = ko.computed(function() {
		return baseScore() + self.offset();
	});
	self.pointCost = ko.computed(function() {
		return pointCosts()[self.score() - 1];
	});

	self.modifier = ko.computed(function() {
		return config.abilityModifiers[self.score() - 1];
	});

	self.increase = function() {
		var prev = self.offset();
		self.offset(prev + 1);
	};

	self.decrease = function() {
		var prev = self.offset();
		self.offset(prev - 1);
	};

}

function CalculatorViewModel() {
	var self = this;
	self.baseScore = ko.observable(config.baseScore);
	self.pointTotal = ko.observable(config.pointTotal);

	self.scoreCap = ko.observable(config.scoreCap);

	self.pointCosts = ko.observableArray(config.pointCosts);

	self.abilityRows = ko.observableArray();
	for(var i = 0; i < config.abilityNames.length; i++){
		self.abilityRows.push(new AbilityRow(config.abilityNames[i], self.baseScore, self.pointCosts))
	}
	console.log(self.abilityRows);

}

ko.applyBindings(new CalculatorViewModel());