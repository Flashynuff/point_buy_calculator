var config = ko.observable(configArray[0]);
config.subscribe(function(newValue) {
	my.viewModel.resetAll();	
});

function AbilityRow(name, baseScore, pointCosts) {
	var self = this;
	self.name = name;
	self.scoreOffset = ko.observable(0)
	self.score = ko.computed(function() {
		return parseInt(baseScore()) + parseInt(self.scoreOffset());
	}, this);

	self.totalCost = ko.computed(function() {
		return pointCosts()[self.score() - 1].cost();
	}, this);

	self.modifier = ko.computed(function() {
		return config().abilityModifiers[self.score() - 1];
	}, this);

	self.increase = function () {
		self.scoreOffset(self.scoreOffset() + 1);
	}

	self.decrease = function() {
		self.scoreOffset(self.scoreOffset() - 1);
	}

	self.reset = function() {
		while(self.scoreOffset() != 0) {
		 if(self.scoreOffset() > 0) {
				self.decrease();
			}
		 if(self.scoreOffset() < 0) {
				self.increase();
			}
		}
	}

}

function PointCost(score, cost) {
	var self = this;
	self.score = ko.observable(score);
	self.cost = ko.observable(cost);

	self.reset = function() {
		self.cost(config().pointCosts[self.score() - 1]);
	};
}

function CalculatorViewModel() {
	var self = this;
	self.baseScore = ko.observable(config().baseScore);
	self.pointTotal = ko.observable(config().pointTotal);
	self.scoreCap = ko.observable(config().scoreCap);


	self.pointCosts = ko.computed(function() {
		var all = ko.observableArray([]);
		for (var i = 0; i < config().pointCosts.length; i++){
			all().push(
				new PointCost((i + 1), config().pointCosts[i])
			);
		}
		return all()
	});

	self.abilityRows = ko.computed(function() {
		var all = ko.observableArray([]);
		for (var i = 0; i < config().abilityNames.length; i++){
			all().push(new AbilityRow(config().abilityNames[i], self.baseScore, self.pointCosts));
		}
		return all()
	})

	// self.abilityRows = ko.observableArray();
	// for (var i = 0; i < config().abilityNames.length; i++){
	// 	self.abilityRows.push(new AbilityRow(config().abilityNames[i], self.baseScore, self.pointCosts))
	// }
	
	self.pointsOffset = ko.computed(function() {
		var sum = 0;
		for (var i = 0; i < self.abilityRows().length; i++) {
			sum = sum + self.abilityRows()[i].totalCost();
		}
		return sum;
	});
	self.pointPool = ko.computed(function() {
		return parseInt(self.pointTotal()) - parseInt(self.pointsOffset())
	});



	self.configs = ko.observableArray(configArray);

	self.addPointScore = function() {
	// 	// config().pointCosts.push(0);
	// 	console.log(all());
	// 	all().push(new PointCost(all().length, 0));
	}

	self.resetAbilities = function() {
		ko.utils.arrayForEach(self.abilityRows(), function(row) {
			row.reset();
		});
	}

	self.resetPointCosts = function() {
		ko.utils.arrayForEach(self.pointCosts(), function(cost) {
			cost.reset();
		});
	}

	self.resetSettings = function() {
		self.baseScore(config().baseScore);
		self.pointTotal(config().pointTotal);
		self.scoreCap(config().scoreCap);
	}

	self.resetAll = function() {
		self.resetAbilities();
		self.resetPointCosts();
		self.resetSettings();
	}
}

my = { viewModel: new CalculatorViewModel() };
ko.applyBindings(my.viewModel);