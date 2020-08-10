// // Create Knockout.JS PROTOTYPE LOANS VIEW MODEL

// On doc ready create Knockout.JS PROTOTYPE LOANS VIEW MODEL

$(document).ready(function () {

	var LoanType = function (_id, _name) {
		var self = this;
		self.id = ko.observable(_id);
		self.name = ko.observable(_name);
	};

	var personalLoan = function (_loanType, _applicantList, _balance, _monthlyRepayment, _expires, _repaidCompletion) {
		var self = this;
		self.loanType = ko.observable(_loanType);
		self.applicantList = ko.observable(_applicantList);
		self.balance = ko.observable(_balance);
		self.monthlyRepayment = ko.observable(_monthlyRepayment);
		self.expires = ko.observable(_expires);
		self.repaidCompletion = ko.observable(_repaidCompletion);
	};

	var data = [
		new personalLoan("Overdraft", "Two", "300", "42.00", "2020", "YES" ),
	];

	var NewData = [new personalLoan("Overdraft", "Two", "90", "6.00", "2019", "YES" )];


	var loantypelisttosave = [];

	var loantypelistOne = [
		new LoanType(1, "Existing residential mortgage"),
		new LoanType(2, "Personal loans"),
		new LoanType(3, "Hire purchase"),
		new LoanType(4, "Mail order"),
		new LoanType(5, "Credit cards"),
		new LoanType(6, "Overdraft"),
		new LoanType(7, "Other mortgages")
	];

	var loantypelistTwo = [
		new LoanType(9, "Existing residential mortgage"),
		new LoanType(10, "Personal loans"),
		new LoanType(11, "Hire purchase"),
		new LoanType(12, "Mail order"),
		new LoanType(13, "Credit cards"),
		new LoanType(14, "Overdraft"),
		new LoanType(15, "Other mortgages")
	];


	var appViewModel = function () {
		var self = this;

		self.borrowingModel = ko.observableArray();

		self.app1loantypes = ko.observableArray(loantypelistOne);
		self.app2loantypes = ko.observableArray(loantypelistTwo);

		self.Loans = ko.observableArray(data);

		borrowingModel =  function() {
			if (self.borrowingModel.indexOf(this.id) > 0) {
				self.borrowingModel.push.apply(self.borrowingModel, [this.id]);	
			};		
		};

		addToCookie =  function() {
			var cookie = ['borrowing', '=', ko.toJSON(ko.mapping.toJS(self.borrowingModel), null)].join('');
  			document.cookie = cookie;
			return true;
		};

		self.Loans = ko.observableArray(data);

		self.AddNewData = function () {
			self.Loans.push.apply(self.Loans, NewData);
		};
		
		self.DeleteItem = function (dataContext) {
			var itemToDelete = dataContext;
			self.Loans.remove(itemToDelete);
		}

		self.applicationType = $.cookie('applicationType');
		
		self.UiSwitcher = $.cookie('income');

		self.UiSwitcher2 = $.cookie('borrowing');

		self.DataSwitcher = ko.mapping.fromJSON(self.UiSwitcher);

		self.BorrowingSwitcher = ko.mapping.fromJSON(self.UiSwitcher2);

		self.shouldShow = ko.observable(false);
  
		self.checkIfShowApp1 = function() {
			if (vm.BorrowingSwitcher().includes(1)) {
				return this.shouldShow(true);
			} else if (vm.BorrowingSwitcher().includes(!1)) {
				return this.shouldShow(false);
			}

		};

		self.checkIfShowApp2 = function() {
			if (vm.BorrowingSwitcher().includes(9)) {
				return this.shouldShow(true);
			} else if (vm.BorrowingSwitcher().includes(!9)) {
				return this.shouldShow(false);
			}

		};


		borrowingNavigation = function() {
			if (vm.BorrowingSwitcher().includes(7)) {
				window.location.href = "/borrowing7.html";
			} else if (vm.BorrowingSwitcher().includes(8)) {
				window.location.href = "/borrowing8.html";
			}	else {
				window.location.href = "/expenditure-sidenav.html";
			}
		}

		previousNavigation = function() {
			if (vm.BorrowingSwitcher().includes(5)) {
				window.location.href = "/borrowing5.html)";
			} else if (vm.BorrowingSwitcher().includes(4)) {
				window.location.href = "/borrowing4.html";
			} else if (vm.BorrowingSwitcher().includes(3)) {
				window.location.href = "/borrowing3.html";
			} else if (vm.BorrowingSwitcher().includes(2)) {
				window.location.href = "/borrowing2.html";
			} else if (vm.BorrowingSwitcher().includes(1)) {
				window.location.href = "/borrowing1.html";
			} else {
				window.location.href = "/borrowingQuestions-sidenav.html";
			}
		}
		
	};
	var vm = new appViewModel();
	ko.applyBindings(vm);
});