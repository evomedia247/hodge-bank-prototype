/**
 * Fee Details JS Controller
 */

// set defaultFee value

var defaultFees;
var solicitorFee;


// Make solicitors fee optional for Flexible Lifetime


$('#solicitorFee').attr("disabled", true);
$('#solicitorFee').attr("readonly", true);

$('#editSolicitorsFee').change(function () {
    if ($('input[name="editSolicitorsFee"]').is(':checked')) {
        $('#solicitorFee').attr("disabled", false);
        $('#solicitorFee').attr("readonly", false);
    } else {
        $('#solicitorFee').val('400.00');
        $('#solicitorFee').attr("disabled", true);
        $('#solicitorFee').attr("readonly", true);
    }
});

if (solicitorFee == null) {
    $('#solicitorFee').val('400');
};

if (fees != null && fees == 'PERCENTAGE') {
    setBrokerFeeSymbolPercentage();
};
if (fees != null && fees != 'PERCENTAGE') {
    setBrokerFeeSymbolSterling();
};

// Set broker fee symbols

function setBrokerFeeSymbolPercentage() {
    $('#brokerFeeSymbolSterling').html("&nbsp;&nbsp;&nbsp;"); // add spaces otherwise the box would move
    $('#brokerFeeSymbolPercentage').removeClass("hidden");
};

function setBrokerFeeSymbolSterling() {
    $('#brokerFeeSymbolPercentage').addClass("hidden");
    $('#brokerFeeSymbolSterling').html("&pound;");
};

// FeeDetailController
var FeeDetailsController = {

    init: function () {

        $(function(){  //on document ready
            function feesValidation() {
                 //switch js validation rules based on fee type
                 if (fees != null && fees === 'FIXED_FEE' ||  $('input[name=brokerFeeType]:checked').val() === 'FIXED_FEE') {
                    setBrokerFeeSymbolSterling();
                    $('#brokerFee').attr("disabled", false);
                    $('#brokerFee').attr("readonly", false);
                    $('[name="brokerFee"]').rules('add', {
                        required: true,
                        number: true,
                        min: 1,
                        max: 99999.99,
                        messages: {
                            required: messages['brokerFee.required'],
                            number: messages['brokerFee.number'],
                            min: messages['brokerFee.number'],
                            max: messages['brokerFee.number']
                        }
                    });
                };
        
                if (fees != null && fees === 'NO_FEE' || $('input[name=brokerFeeType]:checked').val() === 'NO_FEE') {
                    setBrokerFeeSymbolSterling();
                    $('#brokerFee').val("0");
                    $('#brokerFee').attr("disabled", true);
                    $('#brokerFee').attr("readonly", true);
                    $('[name="brokerFee"]').rules('add', {
                        required: false,
                        number: true,
                        min: 0,
                        max: 0,
                        messages: {
                            required: messages['brokerFee.required'],
                            number: messages['brokerFee.number'],
                            min: messages['brokerFee.number'],
                            max: messages['brokerFee.number']
                        }
                    });
                };
        
                if (fees != null && fees === 'PERCENTAGE' || $('input[name=brokerFeeType]:checked').val() === 'PERCENTAGE') {
                    setBrokerFeeSymbolPercentage();
                    $('#brokerFee').attr("disabled", false);
                    $('#brokerFee').attr("readonly", false);
                    $('[name="brokerFee"]').rules('add', {
                        required: true,
                        number: true,
                        min: 0,
                        max: 99,
                        messages: {
                            required: messages['brokerFee.required'],
                            number: messages['brokerFee.percentage'],
                            min: messages['brokerFee.percentage'],
                            max: messages['brokerFee.percentage']
                        }
                    })
                };
            };  
        
            feesValidation(); // call it for the first time document is loaded
        
           $('#searchForm').change(function() { //call function on select element change event
                 //btw here you can get the select element  - $(this);
                 feesValidation();
           });
        });
        

        // handle broker fee radio buttons

        $('input[type=radio]').change(function () {
            if ($(this).val() === 'FIXED_FEE') {
                $('#brokerFee').val('');
                setBrokerFeeSymbolSterling();
                $('#brokerFee').attr("disabled", false);
                $('#brokerFee').attr("readonly", false);
                $('[name="brokerFee"]').rules('add', {
                    required: true,
                    number: true,
                    min: 1,
                    max: 99999.99,
                    messages: {
                        required: messages['brokerFee.required'],
                        number: messages['brokerFee.number'],
                        min: messages['brokerFee.number'],
                        max: messages['brokerFee.number']
                    }
                });

            }
            if ($(this).val() === 'NO_FEE') {
                $('#brokerFee').val('');
                setBrokerFeeSymbolSterling();
                $('#brokerFee').val("0");
                $('#brokerFee').attr("disabled", true);
                $('#brokerFee').attr("readonly", true);
                $('[name="brokerFee"]').rules('add', {
                    required: false,
                    number: true,
                    min: 0,
                    max: 0,
                    messages: {
                        required: messages['brokerFee.required'],
                        number: messages['brokerFee.number'],
                        min: messages['brokerFee.number'],
                        max: messages['brokerFee.number']
                    }
                });
            }
            if ($(this).val() === 'PERCENTAGE') {
                $('#brokerFee').val('');
                setBrokerFeeSymbolPercentage();
                $('#brokerFee').attr("disabled", false);
                $('#brokerFee').attr("readonly", false);
                $('[name="brokerFee"]').rules('add', {
                    required: true,
                    number: true,
                    min: 0,
                    max: 99,
                    messages: {
                        required: messages['brokerFee.required'],
                        number: messages['brokerFee.percentage'],
                        min: messages['brokerFee.percentage'],
                        max: messages['brokerFee.percentage']
                    }
                });

            }
        });

        // handle solicitor option dropdown value
        $('#solicitorOption').change(function () {
            if ($(this).val() === 'HODGE') {
                // when hodge free legal is selected the solicitor fee will be read-only with value `0`
                $('#solicitorFee').val('0');
            } else if ($(this).val() === 'CLIENT') {
                // solicitor fee set to "default" value and read-only attribute removed
            }
        });

        // Force FEE Numerical Inputs to two decimal places
        $('input#brokerFee').blur(function () {
            var brokVal = parseFloat($(this).val());
            var cleanNum = brokVal.toFixed(2);
            $(this).val(cleanNum);
        });

        $('input#solicitorFee').blur(function () {
            var str = parseFloat($(this).val());
            var cleanNum = str.toFixed(2);
            $(this).val(cleanNum);
        });

        $('#submitBtn').on("click", function(event) {
            event.preventDefault();
            $('#feeDetailsForm').validate();
            if ($("#feeDetailsForm").valid()) {
                $('#modal1').modal('show');
                $('[name="confirmPersonalDataStatement"]').rules('add', {
                    required: true,
                    messages: {
                        required: messages['personalDataStatement']
                    }
                });
            }
        });

        $("#submitBtnModal").on("click", function(event) {
            event.preventDefault();
            $('#feeDetailsForm').validate();
            if ($("#feeDetailsForm").valid()) {
                $('#submitBtnModal').attr("disabled", "disabled");
                $('#feeDetailsForm').submit();
            }
        });
    }
}


FeeDetailsController.init();

