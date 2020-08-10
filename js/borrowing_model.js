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
			if (vm.borrowingModel().includes(1)) {
				window.location.href = "/borrowing1.html";
			} else if (vm.borrowingModel().includes(2)) {
				window.location.href = "/borrowing2.html";
			} else if (vm.borrowingModel().includes(3)) {
				window.location.href = "/borrowing3.html";
			} else if (vm.borrowingModel().includes(4)) {
				window.location.href = "/borrowing4.html";
			} else if (vm.borrowingModel().includes(5)) {
				window.location.href = "/borrowing5.html";
			} else if (vm.borrowingModel().includes(6)) {
				window.location.href = "/borrowing6.html";
			} else if (vm.borrowingModel().includes(7)) {
				window.location.href = "/borrowing7.html";
			} else if (vm.borrowingModel().includes(8)) {
				window.location.href = "/borrowing8.html";
			}	else {
				window.location.href = "/borrowingQuestions2-sidenav.html";
			}
		}

		previousNavigation = function() {
			if (vm.DataSwitcher().includes(11)) {
				window.location.href = "/incomea8.html";
			} else if (vm.DataSwitcher().includes(10)) {
				window.location.href = "/incomea7.html";
			} else if (vm.DataSwitcher().includes(9)) {
				window.location.href = "/incomea6.html";
			} else if (vm.DataSwitcher().includes(8)) {
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
	var vm = new appViewModel();
	ko.applyBindings(vm);
});
