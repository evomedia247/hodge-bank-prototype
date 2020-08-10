/**
 * Adviser Selection JS Controller
 *
 */
var createBrokerAccountController = {

    /**
     * Initialisation
     *
     */
    init: function () {

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
        });
    }

}

createBrokerAccountController.init();