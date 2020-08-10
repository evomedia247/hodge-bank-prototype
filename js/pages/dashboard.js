
/**
 * Dashboard JS Controller
 *
 */
var DashboardController = {


    /**
    * Initialises date pickers date-from and date-to
    *
    */
    initialiseDatePicker : function(){
        $('#submissionDateFrom').datepicker({
            minDate: new Date('2018/12/18'),
            format: 'dd/mm/yyyy',
            uiLibrary: 'bootstrap4'
        });

        $('#submissionDateTo').datepicker({
            minDate: new Date('2018/12/18'),
            format: 'dd/mm/yyyy',
            uiLibrary: 'bootstrap4'
        });
    },


    /**
    * Trims texts over N-chars appending 3 dots
    *
    */
    trimText : function(text, chars){
        if(text.length > chars){
            text = text.substring(0,chars)+"...";
        }
        return text;
    },

     /**
     * Provides with a new Date minus x days.
     *
     */
    getDateMinus : function(days){
        var fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - days);
        return fromDate;
    },


    handleDateSearch : function(value){
        if( value === 'dateSubmitted' ){
            $('#searchInput').prop("disabled", true);
        } else {
            $('#searchInput').prop("disabled", false);
        }
     },

    /**
    * Initialisation
    *
    */
    init : function(){

        this.initialiseDatePicker(new Date(), new Date());
        
        var innerGetDateMinus = this.getDateMinus;	
        
        // handles quick date link
        $('#quickDateFilterLink').on( "click", function() {
            $('#submissionDateFrom').val(innerGetDateMinus(7).toLocaleDateString());
            $('#submissionDateTo').val(new Date().toLocaleDateString());
            $('#searchType option[value=dateSubmitted]').attr('selected','selected');
            this.handleDateSearch('dateSubmitted');
            $('#search-btn').click();
        });

        // ensure the status filter is highlighted after a search

        if($('#statusFilter').val() === "accepted"){
            $('#filterStatusAccept').addClass("active");
        } else if($('#statusFilter').val() === "declined"){
            $('#filterStatusDecline').addClass("active");
        } else if($('#statusFilter').val() === "expired"){
            $('#filterStatusExpired').addClass("active");
        } else if($('#statusFilter').val() === "refer"){
            $('#filterStatusActionRequired').addClass("active");
        }
        else {
            $('#resetFilters').addClass("active");
        }

        this.handleDateSearch($('#searchType').val());


        // cookie handling code
        if(!localStorage.getItem("cookie") || localStorage.getItem("cookie") === "false"){
            $("#notification").fadeIn("slow");
        }
        $("#cookie-accept").click(function(){
               $("#notification").fadeOut("slow");
               localStorage.setItem("cookie", true);
        });

        var innerTrimText = this.trimText;

        // handle long applicant names
        $('span.applicant-name').each(function(){
            var fileName = innerTrimText($(this).text(), 25);
            $(this).text(fileName);
        });

    }

}

DashboardController.init();

// Handle Validation of search

// SET JQUERY VALIDATE DEFAULTS

jQuery.validator.setDefaults({
    errorElement: 'span', //default input error message container type ie a span
    errorClass: 'errorMsg', // set the error span class name to match thymeleaf errors
    // Style the HTML error elements to match server validation and bootstrap styling

    highlight: function (element, errorClass, validClass) {
        if (!$(element).hasClass('novalidation')) {
            $(element).closest('.form-row').removeClass('has-success').addClass('has-error');
        }
    },

    // Remove error styling on validation success

    unhighlight: function (element, errorClass, validClass) {
        if (!$(element).hasClass('novalidation')) {
            $(element).closest('.form-row').removeClass('has-error').addClass('has-success');
        }
    },

    /**
     * 
     * The following code is designed to mimic the server validation placement using bootstrap 4 selectors
     * 
     */

    
    // Place the error text for different input element types
    errorPlacement: function (error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        }
        else if (element.prop('type') === 'radio' && element.parent('.radio-inline').length) {
            error.insertAfter(element.parent());
        }
        else if (element.hasClass('dob')) {
            error.insertAfter(element.parent());
        }
        else if (element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
            error.appendTo(element.parent().parent());
        }
        else {
            error.insertAfter(element);
        }
    }
});



// ADD NEW VALIDATION METHODS

// check names are only letters, apostrophes and hyphens
jQuery.validator.addMethod("letterswithbasicpunc", function (value, element) {
    var valid = false;
    var check = /[^a-zA-Z\s\-\/']/i.test(value);
    // create value as string
    var str = value;
    // find number of apostrophes
    var apostrophes = str.split("'").length - 1;
    // find number of hyphens  
    var hyphens = str.split("-").length - 1;
    // test if valid
    if (check === false && apostrophes < 2 && hyphens < 2)
        valid = true;
    return this.optional(element) || valid;
}
);

// checks FROM date is equal or before TO date
jQuery.validator.addMethod("equalOrBefore", 
function(value, element, params) {

    var fromDateStr = moment(value, "DD/MM/YYYY");
    var toDateStr = moment($(params).val(), "DD/MM/YYYY");

    return this.optional(element) ||  moment(fromDateStr).isSameOrBefore(toDateStr); 

},'Must be greater than {0}.');

// checks date is valid date
jQuery.validator.addMethod("validDate", function (value, element) {
    //convert date string to valid ISO format for validation
    var dateStr = moment(value, "DD/MM/YYYY");
    return this.optional(element) || moment(dateStr).isValid();
}, "Please enter a valid date in the format DD/MM/YYYY");

// checks date is in past
jQuery.validator.addMethod("inPast", function (value, element) {
    //convert date string to valid ISO format for validation
    var dateStr = moment(value, "DD/MM/YYYY");
    return this.optional(element) || moment(dateStr).isBefore();
}, "Please enter a valid date in the format DD/MM/YYYY");

// Validate forms

moment.locale('en');

// Dashboard Search Validation

$('#searchForm').validate({
    // set validation rules
    rules: {
        // set applicant rules
        'submissionDateFrom': {
            required: false,
            validDate: true,
            inPast: true,
            equalOrBefore: "#submissionDateTo",
        },
        'submissionDateTo': {
            required: false,
            validDate: true,
            inPast: true,  
        }
    },
    messages: {
        // set applicant validation messages
        'submissionDateFrom': {
            required: "Enter a valid date range.",
            validDate: "Enter a valid date.",
            inPast: "Date must be in the past.",
            equalOrBefore: "'To' date must be greater than or equal to 'From' date.",
            validDate: "Enter a valid date.",
        },
        'submissionDateTo': {
            required: "Enter a valid date range.",
            validDate: "Enter a valid date.",
            inPast: "Date must be in the past.",   
            validDate: "Enter a valid date.",
        }
    }
});

// Dynamically inject search validation rules and messages depending on search type

$(function(){  //on document ready
    function dashboardValidation() {
         //switch js validation rules based on search type
         if ($('#searchType').val() === 'customerName') {
            $( '#searchInput' ).rules('add', {
                required: true,
                letterswithbasicpunc: true,
                pattern: false,
                maxlength: 128,
                number: false,
                messages: {
                    required: messages['dashboardSearch.customer.required'],
                    letterswithbasicpunc: messages['dashboardSearch.customer.invalid'],
                    maxlength: messages['dashboardSearch.customer.invalid'],
                    number: messages['dashboardSearch.customer.invalid'],
                }
            })
        };
        if ($('#searchType').val() === 'quoteReference') {
            $( '#searchInput' ).rules('add', {
                required: true,
                letterswithbasicpunc: false,
                pattern: /[Q]{1}\d{6,7}/,
                maxlength: 8,
                number: false,
                messages: {
                    required: messages['dashboardSearch.quoteReference.required'],
                    letterswithbasicpunc: messages['dashboardSearch.quoteReference.required'],
                    pattern: messages['dashboardSearch.quoteReference.required'],
                    maxlength: messages['dashboardSearch.quoteReference.required'],
                    number: messages['dashboardSearch.quoteReference.required'],
                }
            })
        }; 
        if ($('#searchType').val() === 'adviser') {
            $( '#searchInput' ).rules('add', {
                required: true,
                letterswithbasicpunc: true,
                pattern: false,
                maxlength: 128,
                number: false,
                messages: {
                    required: messages['dashboardSearch.adviser.required'],
                    letterswithbasicpunc: messages['dashboardSearch.adviser.invalid'],
                    maxlength: messages['dashboardSearch.adviser.invalid'],
                    number: messages['dashboardSearch.adviser.invalid'],
                }
            })
        };

        $("#searchForm").validate().settings.ignore = ":hidden";
    };  

    // Disable validation on filter clicks

    $('#filterStatusAccept').click(function() {
        $("#searchForm").validate().cancelSubmit = true;
        $( '#searchInput' ).rules('add', {
            required: false,
            letterswithbasicpunc: false,
            pattern: false,
            maxlength: false,
            number: false,
            messages: {
                required: messages['dashboardSearch.date.invalid'],
                letterswithbasicpunc: messages['dashboardSearch.date.invalid'],
                maxlength: messages['dashboardSearch.date.invalid'],
                number: messages['dashboardSearch.date.invalid'],
            }
        });
        $('#statusFilter').val('accepted');
        $(this).addClass("active");
        $('#filterStatusDecline').removeClass("active");
        $('#filterStatusExpired').removeClass("active");
        $('#filterStatusActionRequired').removeClass("active");
        $('#search-btn').click();
    });
    $('#filterStatusDecline').click(function() {
        $("#searchForm").validate().cancelSubmit = true;
        $( '#searchInput' ).rules('add', {
            required: false,
            letterswithbasicpunc: false,
            pattern: false,
            maxlength: false,
            number: false,
            messages: {
                required: messages['dashboardSearch.date.invalid'],
                letterswithbasicpunc: messages['dashboardSearch.date.invalid'],
                maxlength: messages['dashboardSearch.date.invalid'],
                number: messages['dashboardSearch.date.invalid'],
            }
        });
        $('#statusFilter').val('declined');
        $('#filterStatusDecline').addClass("active");
        $('#filterStatusAccept').removeClass("active");
        $('#filterStatusExpired').removeClass("active");
        $('#filterStatusActionRequired').removeClass("active");
        $('#search-btn').click();
    });
    $('#filterStatusExpired').click(function() {
        $("#searchForm").validate().cancelSubmit = true;
        $( '#searchInput' ).rules('add', {
            required: false,
            letterswithbasicpunc: false,
            pattern: false,
            maxlength: false,
            number: false,
            messages: {
                required: messages['dashboardSearch.date.invalid'],
                letterswithbasicpunc: messages['dashboardSearch.date.invalid'],
                maxlength: messages['dashboardSearch.date.invalid'],
                number: messages['dashboardSearch.date.invalid'],
            }
        });
        $('#statusFilter').val('expired');
        $('#filterStatusExpired').addClass("active");
        $('#filterStatusAccept').removeClass("active");
        $('#filterStatusDecline').removeClass("active");
        $('#filterStatusActionRequired').removeClass("active");
        $('#search-btn').click();
    });
    $('#filterStatusActionRequired').click(function() {
        $("#searchForm").validate().cancelSubmit = true;
        $( '#searchInput' ).rules('add', {
            required: false,
            letterswithbasicpunc: false,
            pattern: false,
            maxlength: false,
            number: false,
            messages: {
                required: messages['dashboardSearch.date.invalid'],
                letterswithbasicpunc: messages['dashboardSearch.date.invalid'],
                maxlength: messages['dashboardSearch.date.invalid'],
                number: messages['dashboardSearch.date.invalid'],
            }
        });
        $('#statusFilter').val('refer');
        $('#filterStatusActionRequired').addClass("active");
        $('#filterStatusExpired').removeClass("active");
        $('#filterStatusAccept').removeClass("active");
        $('#filterStatusDecline').removeClass("active");
        $('#search-btn').click();
    });
    $('#resetFilters').click(function() {
        $("#searchForm").validate().cancelSubmit = true;
        $( '#searchInput' ).rules('add', {
            required: false,
            letterswithbasicpunc: false,
            pattern: false,
            maxlength: false,
            number: false,
            messages: {
                required: messages['dashboardSearch.date.invalid'],
                letterswithbasicpunc: messages['dashboardSearch.date.invalid'],
                maxlength: messages['dashboardSearch.date.invalid'],
                number: messages['dashboardSearch.date.invalid'],
            }
        });
        $('#statusFilter').val("");
        $('#filterStatusAccept').removeClass("active");
        $('#filterStatusDecline').removeClass("active");
        $('#filterStatusExpired').removeClass("active");
        $('#filterStatusActionRequired').removeClass("active");
        $('#resetFilters').addClass("active");
        $('#search-btn').click();
    });

    $('#submissionDateFrom').change(function () {
        $('#submissionDateFrom').rules('add', {
            required: '#submissionDateFrom',
            messages: {
                required: "Enter a valid date range."
            }
        });
        $( '#searchInput' ).rules('add', {
            required: false,
            letterswithbasicpunc: false,
            pattern: false,
            maxlength: false,
            number: false,
            messages: {
                required: messages['dashboardSearch.date.invalid'],
                letterswithbasicpunc: messages['dashboardSearch.date.invalid'],
                maxlength: messages['dashboardSearch.date.invalid'],
                number: messages['dashboardSearch.date.invalid'],
            }
        });
        
    });

    $('#submissionDateTo').change(function () {
        $('#submissionDateTo').rules('add', {
        });
        $( '#searchInput' ).rules('add', {
            required: false,
            letterswithbasicpunc: false,
            pattern: false,
            maxlength: false,
            number: false,
            messages: {
                required: messages['dashboardSearch.date.invalid'],
                letterswithbasicpunc: messages['dashboardSearch.date.invalid'],
                maxlength: messages['dashboardSearch.date.invalid'],
                number: messages['dashboardSearch.date.invalid'],
            }
        });
    });

    $('#submissionDateFrom').mask('00/00/0000');
    $('#submissionDateTo').mask('00/00/0000');

    dashboardValidation(); // call it for the first time document is loaded

   $('#searchForm').change(function() { //call function on select element change event
         //btw here you can get the select element  - $(this);
         dashboardValidation();
   });
});

