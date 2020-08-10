/** 
 * Remember username, stores username in a cookie
 */

$( document ).ready(function() {

    // If username exists in cookie, populate username field
    
    fillByMemory();

    // If remember username is checked, will call rememberMe() to store username to cookie on clicking submit button

    $('button#loginButton').on('click', function (e) {
        
        e.preventDefault();

        if ($('#rememberChkBox').val()) {
            rememberMe();
        }
        $( "#loginForm" ).submit();
    });

// Store username to cookie

function rememberMe() {
    $.cookie('username', $('#username').val());
}

// Fills username with cookie value if it exists

function fillByMemory() {
    if (!!$.cookie('username'))
        $('#username').val($.cookie('username'));
}

// Hide server validation on keypress user input

$("input[name='username']").keypress(function() {
    $('#loginAuthError').css("display", "none");
});

$("input[name='password']").keypress(function() {
    $('#loginAuthError').css("display", "none");
});

/** 
 * show / hide functionality on password fields
 * Changes the input type from password to text to allow users to see what they entered
 */

	$("input[type='password'][data-eye]").each(function(i) {
		var $this = $(this);

		$this.wrap($("<div/>", {
			style: 'position:relative'
		}));
		$this.css({
			paddingRight: 60
		});
		$this.after($("<div/>", {
			html: 'Show',
			class: 'btn btn-primary btn-sm',
			id: 'passeye-toggle-'+i,
			style: 'position:absolute;right:10px;top:17px;transform:translate(0,-50%);padding: 2px 7px;font-size:12px;cursor:pointer;'
		}));
		$this.after($("<input/>", {
			type: 'hidden',
			id: 'passeye-' + i
		}));
		$this.on("keyup paste", function() {
			$("#passeye-"+i).val($(this).val());
		});
		$("#passeye-toggle-"+i).on("click", function() {
			if($this.hasClass("show")) {
				$this.attr('type', 'password');
                $this.removeClass("show");
                $('#passeye-toggle-'+i).text("Show");
				$(this).removeClass("btn-outline-primary");
			}else{
				$this.attr('type', 'text');
				$this.val($("#passeye-"+i).val());				
                $this.addClass("show");
                $('#passeye-toggle-'+i).text("Hide");
				$(this).addClass("btn-outline-primary");
			}
		});
	});
});

jQuery(function () {
    jQuery('#myTab a:last').tab('show')
})

// SET JQUERY VALIDATE DEFAULTS
var messages = window.messages; // contains all validation messages

jQuery.validator.setDefaults({
    errorElement: 'span', //default input error message container type ie a span
    errorClass: 'error errorMsg', // set the error span class name to match thymeleaf errors
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

    // Place the error text for different input element types
    errorPlacement: function (error, element) {
        if (element.prop('name') === 'password') {
            error.appendTo(element.parent().parent());
        }
        else {
            error.insertAfter(element);
        }
    }
});

// Validate forms

// Validate Applicant Form

$('#loginForm').validate({
    // set validation rules
    rules: {
        // set applicant rules
        'username': {
            required: true,
            pattern: /^[a-zA-Z0-9]+$/
        },
        'password': {
            required: true
        }
    },
    messages: {
        // set applicant validation messages
        'username': {
            required: "Please complete all fields",
            pattern: "Enter a valid username."
        },
        'password': {
            required: "Please complete all fields"
        }
    }
});