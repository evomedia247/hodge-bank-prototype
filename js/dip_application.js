// Create Knockout.JS PROTOTYPE DIP VIEW MODEL

const dipDetails = {
	applicantDetails: {
		applicantOne: {
			title: ko.observable(''),
			firstName: ko.observable(''),
			middleNames: ko.observable(''),
			lastName: ko.observable(''),
			dob: ko.observable(''),
		},
		applicantTwo: {
			title: ko.observable(''),
			firstName: ko.observable(''),
			middleNames: ko.observable(''),
			lastName: ko.observable(''),
			dob: ko.observable(''),
		},
	},
	employmentDetails: {
		applicantOne: {
			occupation: ko.observable(''),
			ageStopWorking: ko.observable(''),
			grossAnnualIncome: ko.observable(''),
			shiftAllowance: ko.observable(''),
			regularCommission: ko.observable(''),
		},
		applicantTwo: {
			occupation: ko.observable(''),
			ageStopWorking: ko.observable(''),
			grossAnnualIncome: ko.observable(''),
			shiftAllowance: ko.observable(''),
			regularCommission: ko.observable(''),
		}
	},
	selfEmploymentDetails: {
		applicantOne: {
			typeOfSelfEmployment: ko.observable(''),
		},
		applicantTwo: {
			typeOfSelfEmployment: ko.observable(''),
		}
	},
	pensionDetails: {
		applicantOne: {},
		applicantTwo: {}
	},
	rentalIncome: {
		applicantOne: {},
		applicantTwo: {}
	},
	maintenanceIncome: {
		applicantOne: {},
		applicantTwo: {}
	},
	privateInvestmentIncome: {
		applicantOne: {},
		applicantTwo: {}
	},
	collectiveInvestmentIncome: {
		applicantOne: {},
		applicantTwo: {}
	}
};

ko.applyBindings(dipDetails);
console.log(dipDetails);