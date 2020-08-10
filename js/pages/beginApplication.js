var viewModel = function () {
	var self = this;
	var urlParams = new URLSearchParams(window.location.search);
	var caseNo = urlParams.get('CaseRef');
	self.dips = ko.observableArray([]);	

	$.getJSON("http://localhost:8080/dip/", {id: caseNo}, function(data) {
		self.dips(data);
	});

	console.log(self.dips([]));
};
ko.applyBindings(new viewModel());


