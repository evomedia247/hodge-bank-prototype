/**
 * Quote Details JS Controller
 *
 */

  /**
     * Trims texts over N-chars appending 3 dots
     *
     */

    function trimText(text, chars) {
        if(text.length > chars){
            text = text.substring(0,chars)+"...";
        }
        return text;
    };

    // Removes underscores dashes and spaces
    String.prototype.removeUnderscores = function () {
        return this.replace(/_|-/g, " ");
    };

    // Create sentence case - upper first followed by lower
    String.prototype.toProperCase = function () {
        return this.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g,function(c){return c.toUpperCase()});
    };

    // Create title case - uppercase for first letter of each word followed by lower
    String.prototype.toTitleCase = function () {
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    // Extract requester name from email
    String.prototype.extractHltUserName = function () {
        return this.split('@')
    };

    var QuoteDetailsController = {

    /**
     * Initialisation
     *
     */
    init: function () {


        $('span.file-name').each(function(){
            var fileName = trimText($(this).text(), 55);
            $(this).text(fileName);
        });


    }
};

QuoteDetailsController.init();




