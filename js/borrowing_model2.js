// On doc ready create Knockout.JS PROTOTYPE LOANS VIEW MODEL

$(document).ready(function () {

	var LoanType = function (_id, _name) {
		var self = this;
		self.id = ko.observable(_id);
		self.name = ko.observable(_name);
	};

	var loantypelisttosave = [];

	var loantypelistOne = [
		new LoanType(1, "Borrowing secured against your home"),
		new LoanType(2, "Personal loans & hire purchase"),
		new LoanType(4, "Credit cards, mail order & overdrafts"),
		new LoanType(7, "Other secured lending")
	];

	var loantypelistTwo = [
		new LoanType(9, "Borrowing secured against your home"),
		new LoanType(10, "Personal loans & hire purchase"),
		new LoanType(12, "Credit cards, mail order & overdrafts"),
		new LoanType(15, "Other secured lending")
	];

	var appViewModel = function () {
		var self = this;

		self.borrowingModel = ko.observableArray();

		self.app1loantypes = ko.observableArray(loantypelistOne);
		self.app2loantypes = ko.observableArray(loantypelistTwo);

		borrowingModel =  function() {
			if (self.borrowingModel.indexOf(this.id) > 0) {
				self.borrowingModel.push.apply(self.borrowingMModel, [this.id]);	
			};		
		};

		addToCookie =  function() {
			var cookie = ['borrowing', '=', ko.toJSON(ko.mapping.toJS(self.borrowingModel), null)].join('');
  			document.cookie = cookie;
			return true;
		};

		self.applicationType = $.cookie('applicationType');
		
		self.UiSwitcher = $.cookie('income');

		self.borrowingModel = ko.observableArray();

		self.DataSwitcher = ko.mapping.fromJSON(self.UiSwitcher);

		self.BorrowingSwitcher = ko.mapping.fromJSON(self.UiSwitcher)

		borrowingNavigation = function() {
				window.location.href = "/expenditure-sidenav.html";
		}

		previousNavigation = function() {
			if (vm.DataSwitcher().includes(7) || vm.DataSwitcher().includes(15)) {
				window.location.href = "/income7.html";
			} else if (vm.DataSwitcher().includes(7) || vm.DataSwitcher().includes(15)) {
				window.location.href = "/income7.html";
			} else if (vm.DataSwitcher().includes(6) || vm.DataSwitcher().includes(14)) {
				window.location.href = "/income6.html";
			} else if (vm.DataSwitcher().includes(5) || vm.DataSwitcher().includes(13)) {
				window.location.href = "/income5.html";
			} else if (vm.DataSwitcher().includes(4) || vm.DataSwitcher().includes(12)) {
				window.location.href = "/income4.html";
			} else if (vm.DataSwitcher().includes(3) || vm.DataSwitcher().includes(11)) {
				window.location.href = "/income3.html";
			} else if (vm.DataSwitcher().includes(2) || vm.DataSwitcher().includes(10)) {
				window.location.href = "/income2.html";
			} else if (vm.DataSwitcher().includes(1) || vm.DataSwitcher().includes(9)) {
				window.location.href = "/income1.html";
			} else {
				window.location.href = "/borrowingQuestions-sidenav.html";
			}
		}
		
	};
	var vm = new appViewModel();
	ko.applyBindings(vm);
});
