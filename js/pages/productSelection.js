/**
 * Product Selection JS Controller
 *
 */
var ProductSelectionController = {

   /**
    * Initialisation
    *
    */
    init : function(){
        var requoteProductReference = $('#reQuoteProductReference').val();
        if(requoteProductReference){
            console.log("Requote product reference: " + requoteProductReference);

            // select the product row with the matching product reference and highlight it.
            $('#'+requoteProductReference).addClass('highlightRow');
        }
    }
}

ProductSelectionController.init();
