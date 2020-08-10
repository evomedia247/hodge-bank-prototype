

/**
* Handler for the progress bar active status, to simplify the amount of code necessary to run it.
* In the client code simply instantiate the handler like this: new ProgressBarHandler(1);
*/
function ProgressBarHandler(step){

    /**
    * Set the progress bar 'active' styling to the relevant step in the quote progress bar,
    * given a 'step' parameter (number);
    *
    */
    function setProgressBarActiveStep(step){
        if(typeof step === "number"){
            $('.progressBar__step').each(function(index){
                if(index+1 <= step){
                    // add active class to the specified step.
                     $(this).addClass("progressBar__step--active");
                } else {
                    // remove active class from all step.
                    $(this).removeClass("progressBar__step--active");
                }
            });
        } else {
            console.error(step + " is not type number.");
        }
    }

    // ensure the document is loaded
    $(document).ready(function() {
        setProgressBarActiveStep(step);
    });
}
