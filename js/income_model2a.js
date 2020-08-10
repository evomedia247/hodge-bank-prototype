// On doc ready create Knockout.JS PROTOTYPE LOANS VIEW MODEL

$(document).ready(function () {

	var Job = function (_occupation, _years, _retirement, _profitslatest, _profitsprevious ) {
		var self = this;
		self.occupation = ko.observable(_occupation);
		self.years = ko.observable(_years);
		self.retirement = ko.observable(_retirement);
		self.profitslatest = ko.observable(_profitslatest);
		self.profitsprevious = ko.observable(_profitsprevious);
	};

	var joblist = [
		new Job("Builder", "18", "60", "22320", "22320"  ),
		new Job("Hair Dresser", "30", "70", "24500", "22320"  ),
	];

	var Source = function (_id, _name) {
		var self = this;
		self.id = ko.observable(_id);
		self.name = ko.observable(_name);
	};

	var sourcelisttosave = [];

	var sourcelistOne = [
		new Source(1, "Employment Income"),
		new Source(2, "Self-Employment Income > Sole Trader"),
		new Source(3, "Self-Employment Income > Director | Partnership"),
		new Source(6, "State Pension and Benefits"),
		new Source(7, "Defined Benefit or Final/Average Salary Pension"),
		new Source(8, "Pension Savings (Annuities, Drawdown or SIPP)"),
		new Source(9, "Rental Income"),
		new Source(10, "Investment Income")
	];


	var NewData = [new Job("Solicitor", "10", "65", "22320", "22320"  )];

	var appViewModel = function () {
		var self = this;

		self.incomeModel = ko.observableArray();

		self.app1sources = ko.observableArray(sourcelistOne);

		self.Jobs = ko.observableArray(joblist);

		incomeModel =  function() {
			if (self.incomeModel.indexOf(this.id) > 0) {
				self.incomeModel.push.apply(self.incomeModel, [this.id]);	
			};		
		};

		addToCookie =  function() {
			var cookie = ['income', '=', ko.toJSON(ko.mapping.toJS(self.incomeModel), null)].join('');
  			document.cookie = cookie;
			return true;
		};

		self.AddNewData = function () {
			self.Jobs.push.apply(self.Jobs, NewData);
		};
		
		self.DeleteItem = function (dataContext) {
			var itemToDelete = dataContext;
			self.Jobs.remove(itemToDelete);
		}

		self.applicationType = $.cookie('applicationType');
		
		self.UiSwitcher = $.cookie('income');
		self.DataSwitcher = ko.mapping.fromJSON(self.UiSwitcher);

		self.shouldShow = ko.observable(false);
  
		self.checkIfShowApp1 = function() {
			if (vm.DataSwitcher().includes(2)) {
				return this.shouldShow(true);
			} else if (vm.DataSwitcher().includes(!2)) {
				return this.shouldShow(false);
			}

		};

		self.checkIfShowApp2 = function() {
			if (vm.DataSwitcher().includes(10)) {
				return this.shouldShow(true);
			} else if (vm.DataSwitcher().includes(!10)) {
				return this.shouldShow(false);
			}

		};

		incomeNavigation = function() {
			
			if (vm.DataSwitcher().includes(3)) {
				window.location.href = "/income2c.html";
			} else if (vm.DataSwitcher().includes(4)) {
				window.location.href = "/income2c.html";
			} else if (vm.DataSwitcher().includes(5)) {
				window.location.href = "/income2d.html";
			} else if (vm.DataSwitcher().includes(6)) {
				window.location.href = "/income3.html";
			} else if (vm.DataSwitcher().includes(7)) {
				window.location.href = "/income4.html";
			} else if (vm.DataSwitcher().includes(8)) {
				window.location.href = "/income5.html";
			} else if (vm.DataSwitcher().includes(9)) {
				window.location.href = "/income6.html";
			} else if (vm.DataSwitcher().includes(10)) {
				window.location.href = "/income7.html";
			} else if (vm.DataSwitcher().includes(11)) {
				window.location.href = "/income8.html";
			} else {
				window.location.href = "/incomeQuestions2-sidenav.html";
			}
		};

		previousNavigation = function() {

			if (vm.DataSwitcher().includes(1)) {
				window.location.href = "/income1.html";
			} else 
			window.location.href = "/incomeQuestions-sidenav.html";
		}
		
	};
	var vm = new appViewModel();
	ko.applyBindings(vm);
});
