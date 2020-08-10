
/**
 * Adviser Selection JS Controller
 *
 */
var adviserSelectionController = {

    /**
    * Initialisation
    *
    */
    init : function(){

        // cookie handling code
        if(!localStorage.getItem("cookie") || localStorage.getItem("cookie") === "false"){
            $("#notification").fadeIn("slow");
        }
        $("#cookie-accept").click(function(){
               $("#notification").fadeOut("slow");
               localStorage.setItem("cookie", true);
        });
    }

}

$(function(){  //on document ready
    function adviserSearchValidation() {
        //here your switch
        if ($('#searchType').val() === 'Adviser Name') {
            $( "input[name='input']" ).attr('maxlength="128"');
            $( "input[name='input']" ).rules('add', {
                required: true,
                letterswithbasicpunc: true,
                minlength: 1,
                maxlength: 128,
                number: false,
                messages: {
                    required: messages['adviserSearch.adviser.required'],
                    letterswithbasicpunc: messages['adviserSearch.adviser.invalid'],
                    minlength: messages['adviserSearch.adviser.invalid'],
                    maxlength: messages['adviserSearch.adviser.invalid'],
                    number: messages['adviserSearch.adviser.invalid'],
                }
            })
        };
        if ($('#searchType').val() === 'Company Name') {
            $( "input[name='input']" ).attr('maxlength="128"');
            $( "input[name='input']" ).rules('add', {
                required: true,
                letterswithbasicpunc: true,
                minlength: 1,
                maxlength: 128,
                number: false,
                messages: {
                    required: messages['adviserSearch.company.required'],
                    letterswithbasicpunc: messages['adviserSearch.company.invalid'],
                    minlength: messages['adviserSearch.company.invalid'],
                    maxlength: messages['adviserSearch.company.invalid'],
                    number: messages['adviserSearch.company.invalid'],
                }
            })
        };
        if ($('#searchType').val() === 'FCA Number') {
            $( "input[name='input']" ).attr('maxlength="6"');
            $( "input[name='input']" ).rules('add', {
                required: true,
                letterswithbasicpunc: false,
                minlength: 6,
                maxlength: 6,
                number: true,
                messages: {
                    required: messages['adviserSearch.fca.required'],
                    letterswithbasicpunc: messages['adviserSearch.fca.invalid'],
                    minlength: messages['adviserSearch.fca.invalid'],
                    maxlength: messages['adviserSearch.fca.invalid'],
                    number: messages['adviserSearch.fca.invalid'],
                }
            })
        };
    };
    
    adviserSearchValidation(); // call it for the first time document is loaded
    
    $('#adviserSearchForm').change(function () { //call function on select element change event
        //btw here you can get the select element  - $(this);
        adviserSearchValidation();
    });
});

adviserSelectionController.init();