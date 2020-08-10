// On doc ready create Knockout.JS PROTOTYPE LOANS VIEW MODEL

$(document).ready(function () {

	var Job = function (_type, _applicant, _occupation, _years, _retirement, _rate) {
		var self = this;
		self.type = ko.observable(_type);
		self.applicant = ko.observable(_applicant);
		self.occupation = ko.observable(_occupation);
		self.years = ko.observable(_years);
		self.retirement = ko.observable(_retirement);
		self.rate = ko.observable(_rate);
	};

	var joblist = [
		new Job("Sole Trader", "One", "Builder", "18", "60", "120" ),
		new Job("Director", "Two", "Hair Dresser", "30", "70", "80" ),
	];

	var Source = function (_id, _name) {
		var self = this;
		self.id = ko.observable(_id);
		self.name = ko.observable(_name);
	};

	var sourcelisttosave = [];

	var sourcelistOne = [
		new Source(1, "Employment Income"),
		new Source(2, "Self-Employment Income"),
		new Source(3, "State Pension and Benefits"),
		new Source(4, "Defined Benefit or Final/Average Salary Pension"),
		new Source(5, "Pension Savings (Annuities, Drawdown or SIPP)"),
		new Source(6, "Rental Income"),
		new Source(7, "Investments"),
		new Source(8, "Maintenance Income"),
	];

	var sourcelistTwo = [
		new Source(9, "Employment Income"),
		new Source(10, "Self-Employment Income"),
		new Source(11, "State Pension and Benefits"),
		new Source(12, "Defined Benefit or Final/Average Salary Pension"),
		new Source(13, "Pension Savings (Annuities, Drawdown or SIPP)"),
		new Source(14, "Rental Income"),
		new Source(15, "Investments"),
		new Source(16, "Maintenance Income"),
	];

	var NewData = [new Job("Partnership", "One", "Solicitor", "10", "65", "200" )];

	var appViewModel = function () {
		var self = this;

		self.incomeModel = ko.observableArray();

		self.linkref = ko.observable();

		self.app1sources = ko.observableArray(sourcelistOne);
		self.app2sources = ko.observableArray(sourcelistTwo);

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
			if (vm.DataSwitcher().includes(6)) {
				return this.shouldShow(true);
			} else if (vm.DataSwitcher().includes(!6)) {
				return this.shouldShow(false);
			}
		};

		self.checkIfShowApp2 = function() {
			if (vm.DataSwitcher().includes(14)) {
				return this.shouldShow(true);
			} else if (vm.DataSwitcher().includes(!14)) {
				return this.shouldShow(false);
			}
		};

		incomeNavigation = function() {
			if (vm.DataSwitcher().includes(10)) {
				window.location.href = "/incomea7.html";
			} else if (vm.DataSwitcher().includes(11)) {
				window.location.href = "/incomea8.html";
			} else {
				window.location.href = "/borrowingQuestions-sidenav.html";
			}
		}

		previousNavigation = function() {
			if (vm.DataSwitcher().includes(8)) {
				window.location.href = "/incomea5.html";
			} else if (vm.DataSwitcher().includes(7)) {
				window.location.href = "/incomea4.html";
			} else if (vm.DataSwitcher().includes(6)) {
				window.location.href = "/incomea3.html";
			} else if (vm.DataSwitcher().includes(5)) {
				window.location.href = "/incomea2d.html";
			} else if (vm.DataSwitcher().includes(4)) {
				window.location.href = "/incomea2c.html";
			} else if (vm.DataSwitcher().includes(3)) {
				window.location.href = "/incomea2b.html";
			} else if (vm.DataSwitcher().includes(2)) {
				window.location.href = "/incomea2a.html";
			} else if (vm.DataSwitcher().includes(1)) {
				window.location.href = "/incomea1.html";
			} else {
				window.location.href = "/incomeQuestions2-sidenav.html";
			}
		}
		
		
	};
	var linkref;
	var vm = new appViewModel();
	ko.applyBindings(vm);

	console.log(vm.linkref);
});
