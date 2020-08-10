// SET JQUERY VALIDATE DEFAULTS
var messages = window.messages; // contains all validation messages

jQuery.validator.setDefaults({
    errorElement: 'span', //default input error message container type ie a span
    errorClass: 'errorJsMsg', // set the error span class name to match thymeleaf errors
    // Style the HTML error elements to match server validation and bootstrap styling

    highlight: function (element, errorClass, validClass) {
        if (!$(element).hasClass('novalidation')) {
            $(element).closest('.form-control').removeClass('has-success').addClass('has-error');
        }
    },

    // Remove error styling on validation success

    unhighlight: function (element, errorClass, validClass) {
        if (!$(element).hasClass('novalidation')) {
            $(element).closest('.form-control').removeClass('errorJsField');
            $(element).siblings('.errorJsMsg').css("display", "none");
            $(element).closest('.form-control').removeClass('has-error').addClass('has-success');
        }
    },

    // Place the error text for different input element types
    errorPlacement: function (error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else if (element.prop('type') === 'radio' && element.parent('.radio-inline').length) {
            error.insertAfter(element.parent());
        } else if (element.hasClass('dob')) {
            error.insertAfter(element.parent());
        } else if (element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
            error.appendTo(element.parent().parent());
        } else {
            error.insertAfter(element);
        }
    }
});


// ADD NEW VALIDATION METHODS

// checks dob is valid date
jQuery.validator.addMethod("validDate", function (value, element) {
    //convert date string to valid ISO format for validation
    var dateStr = moment(value, "DD/MM/YYYY").toISOString();
    return this.optional(element) || moment(dateStr).isValid();
}, "Please enter a valid date in the format DD/MM/YYYY");

// checks dob is in past
jQuery.validator.addMethod("inPast", function (value, element) {
    //convert date string to valid ISO format for validation
    var dateStr = moment(value, "DD/MM/YYYY").toISOString();
    return this.optional(element) || moment(dateStr).isBefore();
}, "Please enter a valid date in the format DD/MM/YYYY");

// checks dob is after 01/01/1900
jQuery.validator.addMethod("validDOB", function (value, element) {
    //convert date string to valid ISO format for validation
    var dateStr = moment(value, "DD/MM/YYYY").toISOString();
    return this.optional(element) || moment(dateStr).isAfter("1900-01-01");
}, "Please enter a valid date in the format DD/MM/YYYY");

// checks names contain only letters and at most one apostrophe and/or hyphen
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
});

// Add regex method
jQuery.validator.addMethod("regex", function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },
    "Please check your input."
);


// check if a uk postcode
jQuery.validator.addMethod("UKPostcode", function (value, element) {
    return this.optional(element) || /^([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$/i.test(value);
}, "Must be a valid Postcode");

// Checks field value is greater than that of another field

jQuery.validator.addMethod('greaterThan', function (value, element, param) {
    return this.optional(element) || value >= $(param).val();
}, 'Invalid value');

// Validate forms

moment.locale('en');

// Validate Edit broker form

$('#editAdvisorDetailsForm').validate({
        // set validation rules
        rules: {
            // set basic rules
            'contact.title': {
                required: true
            },
            'contact.firstName': {
                required: true,
                letterswithbasicpunc: true
            },
            'contact.lastName': {
                required: true,
                letterswithbasicpunc: true
            },
            'contact.mobileNumber': {
                required: true,
                pattern: /^07\d{3}\s?\d{3}\s?\d{3}$/
            },
            'contact.additionalNumber': {
                required: false,
                pattern: /^0\d{4}\s?\d{3}\s?\d{3}$/
            },
            'contact.emailAddress': {
                required: true,
                email: true
            },
        },
        messages: {
            'contact.title': {
                required: messages['contact.title']
            },
            'contact.firstName': {
                required: messages['contact.firstName.required'],
                letterswithbasicpunc: messages['contact.firstName.invalid']
            },
            'contact.lastName': {
                required: messages['contact.lastName.required'],
                letterswithbasicpunc: messages['contact.lastName.invalid']
            },
            'contact.mobileNumber': {
                required: messages['contact.mobileNumber.required'],
                pattern: messages['contact.mobileNumber.pattern']
            },
            'contact.additionalNumber': {
                pattern: messages['contact.additionalNumber.pattern']
            },
            'contact.emailAddress': {
                required: messages['contact.emailAddress.required'],
                email: messages['contact.emailAddress.invalid']
            },
        }
    }),

    // Validate create security word and password form

    $('#createBrokerAccountForm').validate({
        // set validation rules
        rules: {
            // set basic rules
            'createUsername': {
                required: true,
                pattern: /^[a-zA-Z0-9]+$/,
                minlength: 8,
                maxlength: 20
            },
            'createPassword': {
                required: true,
                pattern: /(?=^.{8,32}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z]*$/,
                equalTo: "#confirmPassword",
                minlength: 8,
                maxlength: 32
            },
            'confirmPassword': {
                required: true,
                equalTo: "#createPassword"
            },
            'createSecurityWord': {
                required: true,
                pattern: /^[a-zA-Z]+$/,
                minlength: 8,
                maxlength: 32,
                equalTo: "#confirmSecurityWord"
            },
            'confirmSecurityWord': {
                required: true,
                equalTo: "#createSecurityWord"
            },
            'createMobileNumber': {
                required: true,
                equalTo: "#confirmMobileNumber",
                pattern: /^07\d{3}\s?\d{3}\s?\d{3}$/,
            },
            'confirmMobileNumber': {
                required: true,
                equalTo: "#createMobileNumber"
            }
        },
        messages: {
            // set basic validation messages
            'createUsername': {
                required: messages['createUsername.username.required'],
                pattern: messages['createUsername.username.pattern'],
                minlength: messages['createUsername.username.minlength'],
                maxlength: messages['createUsername.username.maxlength']
            },
            'createPassword': {
                required: messages['createSecurity.password.required'],
                pattern: messages['createSecurity.password.pattern'],
                minlength: messages['createSecurity.password.minlength'],
                maxlength: messages['createSecurity.password.maxlength'],
                equalTo: ''
            },
            'confirmPassword': {
                required: messages['createSecurity.confirmPassword.required'],
                equalTo: messages['createSecurity.confirmPassword.equalTo']
            },
            'createSecurityWord': {
                required: messages['createSecurity.createSecurityWord.required'],
                pattern: messages['createSecurity.createSecurityWord.pattern'],
                minlength: messages['createSecurity.createSecurityWord.minlength'],
                maxlength: messages['createSecurity.createSecurityWord.maxlength'],
                equalTo: ''
            },
            'confirmSecurityWord': {
                required: messages['createSecurity.confirmSecurityWord.required'],
                equalTo: messages['createSecurity.confirmSecurityWord.equalTo']
            },
            'createMobileNumber': {
                required: messages['createSecurity.mobileNumber.required'],
                pattern: messages['createSecurity.mobileNumber.pattern'],
                equalTo: ''
            },
            'confirmMobileNumber': {
                required: messages['createSecurity.confirmMobileNumber.required'],
                equalTo: messages['createSecurity.confirmMobileNumber.equalTo']
            }
        }
    }),

    // HLT Adviser Search Validation

    $('#adviserSearchForm').validate({
        // set validation rules
        rules: {
            // set basic rules
            'input': {
                required: true,
                letterswithbasicpunc: true,
                minlength: 1,
                maxlength: 128,
                number: false,
            },
            messages: {
                // set basic validation messages
                'input': {
                    required: messages['adviserSearch.adviser.required'],
                    letterswithbasicpunc: messages['adviserSearch.adviser.invalid'],
                    maxlength: messages['adviserSearch.adviser.invalid'],
                    maxlength: messages['adviserSearch.adviser.invalid'],
                    number: messages['adviserSearch.adviser.invalid'],
                }
            }
        }
    }),
    

// Dynamically inject search validation rules and messages depending on search type



// Validate Applicant Form

$('#applicantForm').validate({
    // set validation rules
    rules: {
        // set applicant rules
        'applicantDetails.title': {
            required: true
        },
        'applicantDetails.firstName': {
            required: true,
            letterswithbasicpunc: true,
        },
        'applicantDetails.middleNames': {
            letterswithbasicpunc: true
        },
        'applicantDetails.lastName': {
            required: true,
            letterswithbasicpunc: true
        },
        'applicantDetails.gender': {
            required: true
        },
        'applicantDetails.age': {
            required: "#ageCheckbox:checked",
            number: true,
        },
        'applicantDetails.dob': {
            required: true,
            validDate: true,
            inPast: true,
            validDOB: true,
            rangelength: [10, 10],
        }
    },
    messages: {
        // set applicant validation messages
        'applicantDetails.title': {
            required: messages['applicantDetails.title']
        },
        'applicantDetails.firstName': {
            required: messages['applicantDetails.firstName.required'],
            letterswithbasicpunc: messages['applicantDetails.firstName.invalid'],
        },
        'applicantDetails.middleNames': {
            letterswithbasicpunc: messages['applicantDetails.middleNames']
        },
        'applicantDetails.lastName': {
            required: messages['applicantDetails.lastName.required'],
            letterswithbasicpunc: messages['applicantDetails.lastName.invalid']
        },
        'applicantDetails.gender': {
            required: messages['applicantDetails.gender']
        },
        'applicantDetails.age': {
            required: messages['applicantDetails.age.required'],
            number: messages['applicantDetails.age.required'],
        },
        'applicantDetails.dob': {
            required: messages['applicantDetails.dob.invalid'],
            validDate: messages['applicantDetails.dob.invalid'],
            inPast: messages['applicantDetails.dob.invalid'],
            validDOB: messages['applicantDetails.dob.invalid'],
            rangelength: messages['applicantDetails.dob.invalid'],
        }
    }
});

// Validate Property Loan Form

$('#propertyLoanForm').validate({
    // set validation rules
    rules: {
        'propertyPurchased': {
            required: true
        },
        // set property rules
        'acceptablePropertyCriteria': {
            required: true
        },
        'propertyValue': {
            required: true,
            number: true,
            min: 50000
        },
        'postcode': {
            required: true,
            UKPostcode: true,
        },
        'loanAmountType': {
            required: true
        },
        'loanAmount': {
            required: false,
            number: true,
            min: 10000,
            max: 2000000
        },
        'specifiedTerm': {
            number: true,
            min: 1,
            max: 99
        }
    },
    messages: {
        // set property validation messages
        'propertyPurchased': {
            required: messages['propertyPurchased']
        },
        'acceptablePropertyCriteria': {
            required: messages['acceptablePropertyCriteria']
        },
        'propertyValue': {
            required: messages['propertyValue.required'],
            number: messages['propertyValue.number'],
            greaterThan: messages['propertyValue.greaterThan'],
            min: messages['propertyValue.number'],
        },
        'postcode': {
            required: messages['postcode.required'],
            UKPostcode: messages['postcode.UKPostcode']
        },
        'loanAmountType': {
            required: messages['loanAmountType']
        },
        'loanAmount': {
            required: messages['loanAmount.required'],
            number: messages['loanAmount.number'],
            min: messages['loanAmount.min'],
            max: messages['loanAmount.max']
        },
        'specifiedTerm': {
            number: messages['specifiedTerm.number'],
            min: messages['specifiedTerm.min'],
            max: messages['specifiedTerm.max']
        }
    }
});

// Dynamically inject broker fee validation rules and messages depending on if fixed fee or percentage selected

$('#propertyLoanForm').change(function () {
    if ($("#loanAmountType-SPECIFIED_LOAN_AMOUNT").is(":checked")) {
        $('[name="loanAmount"]').rules('add', {
            required: true,
            number: true,
            min: 10000,
            max: 2000000,
            messages: {
                required: messages['loanAmount.required'],
                number: messages['loanAmount.number'],
                min: messages['loanAmount.min'],
                max: messages['loanAmount.max']
            }
        });
    } else if ($("#loanAmountType-MAXIMUM_LOAN_AVAILABLE").is(":checked")) {
        $('[name="loanAmount"]').rules('add', {
            required: false,
            number: true,
            min: 0,
            max: 0,

            messages: {
                required: "",
                number: "",
                min: "",
                max: ""
            }
        });
    }
});

// Fees Form

// Validate Fees Form

$('#feeDetailsForm').validate({
    // set validation rules
    rules: {
        // set property rules
        'applicationFeeOption': {
            required: true
        },
        'solicitorOption': {
            required: true
        },
        'solicitorFee': {
            required: true,
            number: true,
            min: 0,
            max: 99999.99,
            rangelength: [1, 8]
        },
        'brokerFee': {
            required: true,
            number: true,
            min: 1,
            max: 99999.99
        },
        'personalDataCheck': {
            required: true,
            number: true,
            min: 0,
            max: 99999.99
        },
    },
    messages: {
        // set property validation messages
        'applicationFeeOption': {
            required: messages['applicationFeeOption']
        },
        'solicitorOption': {
            required: messages['solicitorOption']
        },
        'solicitorFee': {
            required: messages['solicitorFee.required'],
            number: messages['solicitorFee.invalid'],
            min: messages['solicitorFee.invalid'],
            max: messages['solicitorFee.invalid'],
            rangelength: messages['solicitorFee.invalid'],
        },
        'brokerFee': {
            required: messages['brokerFee.required'],
            number: messages['brokerFee.number'],
            min: messages['brokerFee.number'],
            max: messages['brokerFee.number']
        }
    }
});