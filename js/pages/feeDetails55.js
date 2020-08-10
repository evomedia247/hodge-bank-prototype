/**
 * Fee Details 55+ JS Controller
 * TODO: Extract common functionality with 'feeDetails.js'
 *
 */

var setBrokerFeeSymbolPercentage = function() {
    $('#brokerFeeSymbolSterling').html("&nbsp;&nbsp;&nbsp;"); // add spaces otherwise the box would move
    $('#brokerFeeSymbolPercentage').removeClass("hidden");
    $('#brokerFee').val("");
};

var setBrokerFeeSymbolSterling = function(){
    $('#brokerFeeSymbolPercentage').addClass("hidden");
    $('#brokerFeeSymbolSterling').html("&pound;");
    $('#brokerFee').val("");
};

$('#solicitorFee').attr("disabled", true);
$('#solicitorFee').attr("readonly", true);

$('#editSolicitorsFee').change(function(){
    if ($('input[name="editSolicitorsFee"]').is(':checked')) {
        $('#solicitorFee').attr("disabled", false);
        $('#solicitorFee').attr("readonly", false);
    } else {
        $('#solicitorFee').val('400.00');
        $('#solicitorFee').attr("disabled", true);
        $('#solicitorFee').attr("readonly", true);
    }
});

var FeeDetailsFiftyFivePlusController = {

    defaultFees : 0,

    init : function(){
        // handle broker fee radio buttons
        $('input[type=radio]').change(function() {
            if($(this).val()==='FIXED_FEE'){
                setBrokerFeeSymbolSterling();
                $('#brokerFee').attr("disabled", false);
                $('#brokerFee').attr("readonly", false);
            }
            
            if($(this).val()==='NO_FEE'){
                setBrokerFeeSymbolSterling();
                $('#brokerFee').val("0");
                $('#brokerFee').attr("disabled", true);
                $('#brokerFee').attr("readonly", true);
            }

            if($(this).val()==='PERCENTAGE'){
                setBrokerFeeSymbolPercentage();
                $('#brokerFee').attr("disabled", false);
                $('#brokerFee').attr("readonly", false);
            }
        });

        // handle solicitor option dropdown value
        $('#solicitorOption').change(function(){
            if($(this).val()==='HODGE'){
                // when hodge free legal is selected the solicitor fee will be read-only with value `0`
                $('#solicitorFee').val('0');
            } else {
                // solicitor fee set to "default" value and read-only attribute removed
            }
        });

        // Force FEE Numerical Inputs to two decimal places
        $('input#brokerFee').blur(function(){
                var brokVal = parseFloat($(this).val());
                var cleanNum = brokVal.toFixed(2);
                $(this).val(cleanNum);
        });

        $('input#solicitorFee').keyup(function(){
            var str = parseFloat($(this).val());
            var regex = /^[1-9]\d{0,4}(((,\d{3}){1})?(\.\d{0,2})?)$/;
            if (regex.test(str)) {
                $('input#solicitorFee').removeClass("errorField");
            } else {
                if (str == 0) {
                    $('input#solicitorFee').removeClass("errorField");
                } else {
                    var cleanNum = str.toFixed(2);
                    $(this).val(cleanNum);
                    $('input#solicitorFee').addClass("errorField");
                }
            }
        });

        $('input#solicitorFee').blur(function () {
            var solVal = parseFloat($(this).val());
            if (isNaN(solVal)) {
                $('input#solicitorFee').addClass("errorField");
            }
        });

        $(document).ready(function() {
            $('#solicitorFee').attr("placeholder", "");
            $("#my_form").submit(function() {
                if($("#price-max").val()==="") {
                    $("#price-max").val('999');
                }
            });
        });
    }

}

FeeDetailsFiftyFivePlusController.init();