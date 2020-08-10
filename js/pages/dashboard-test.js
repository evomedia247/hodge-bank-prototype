function dashboardModel() {

    var urlParams = new URLSearchParams(window.location.search);
    var caseRef = urlParams.get('CaseRef');

    console.log(caseRef);

    var self = this;
    self.dips = ko.observableArray([]);

    $.getJSON("./js/dip.json", function(data) {
        self.dips(data);

    });

    console.log(self.dips([]));

}
ko.applyBindings(new dashboardModel());