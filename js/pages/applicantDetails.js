
/**
 * JS Controller for the Applicants details page
 *
 */

function ApplicantDetailsController() {

        $.getJSON("./js/dip.json", null, function(applicationForm){
            var applicantViewModel = {
                caseRef: ko.observable(applicationForm.caseReference),
                noApplicants: ko.observable(applicationForm.numberOfApplicants),
                eligibility: ko.observable(applicationForm.eligibility),
                dob: ko.observable(applicationForm.applicantOne.dateOfBirth),
                firstName: ko.observable(applicationForm.applicantOne.firstName),
                middleName: ko.observable(applicationForm.applicantOne.middleName),
                lastName: ko.observable(applicationForm.applicantOne.lastName),
                previousNames: ko.observable(applicationForm.applicantOne.previousNames),
                rightsToReside: ko.observable(applicationForm.applicantOne.rightsToReside),
                maritalStatus: ko.observable(applicationForm.applicantOne.maritalStatus),
                residentialStatus: ko.observable(applicationForm.applicantOne.residentialStatus),
                fullName: ko.pureComputed(function(){
                    return applicationForm.applicantOne.title + ' ' + applicationForm.applicantOne.firstName + ' ' + applicationForm.applicantOne.lastName;
                }),
                flatNumber: ko.observable(applicationForm.applicantOne.currentAddress.flatNumber),
                houseNumber: ko.observable(applicationForm.applicantOne.currentAddress.houseNumber),
                houseName: ko.observable(applicationForm.applicantOne.currentAddress.houseName),
                street: ko.observable(applicationForm.applicantOne.currentAddress.street),
                district: ko.observable(applicationForm.applicantOne.currentAddress.district),
                city: ko.observable(applicationForm.applicantOne.currentAddress.city),
                county: ko.observable(applicationForm.applicantOne.currentAddress.county),
                postcode: ko.observable(applicationForm.applicantOne.currentAddress.postcode),
                country: ko.observable(applicationForm.applicantOne.currentAddress.country)
            };  
            ko.applyBindings(applicantViewModel); 
        });

};

new ApplicantDetailsController();
