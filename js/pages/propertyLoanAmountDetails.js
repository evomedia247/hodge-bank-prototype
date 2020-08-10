/**
 * Property Loan Amount Details JS Controller
 *
 */

function PropertyLoanAmountDetailsController(){

    function init(){

        // handle loan amount details radio buttons
        $('input[name=loanAmountType]').on("change", function() {
            toggleLoanAmount($(this));
        });

        $('input[name=loanAmountType]:checked').ready().trigger("change");
    }

    function toggleLoanAmount(el){
         var errorMsg = document.getElementById('loanAmountErrorMsg');
         if(el.val() === 'SPECIFIED_LOAN_AMOUNT') {
            document.getElementById('loanAmountSymbol').style.visibility = 'visible';
            document.getElementById('loanAmount').style.visibility = 'visible';
            if(errorMsg){
                errorMsg.style.visibility = 'visible';
            }
         } else {
            document.getElementById('loanAmountSymbol').style.visibility = 'hidden';
            document.getElementById('loanAmount').style.visibility = 'hidden';
            if(errorMsg){
               errorMsg.style.visibility = 'hidden';
            }
            document.getElementById('loanAmount').value=null;
         }
    }

    // remove postcode white spaces
/*
    $('input#postcode').blur(function() {
        $(this).val($(this).val().replace(/\s/g, ""));
    });
*/

    // Force Numerical Inputs to NO decimal places
    $('input#loanAmount').blur(function(){
        var num = parseFloat($(this).val());
        var cleanNum = num.toFixed(0);
        $(this).val(cleanNum);
    });

    $('input#propertyValue').blur(function(){
        var num = parseFloat($(this).val());
        var cleanNum = num.toFixed(0);
        $(this).val(cleanNum);
    });

    $('input#lumpSum').blur(function(){
        var num = parseFloat($(this).val());
        var cleanNum = num.toFixed(0);
        $(this).val(cleanNum);
    });

    // init

    $(document).ready(function() {
        init();
    });

}

new PropertyLoanAmountDetailsController();