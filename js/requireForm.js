
// checks form is submitting and ensure submit button is not disabled
var formSubmitting = false;
$('#submitBtnModal').removeAttr("disabled", "disabled");

/**
* This is used to avoid the Cancel Quote confirmation message to pop-up.
* I.e. when a quote form is actually submitting data. 
* Plus disable submit button when form is submitting to avoid kicking off multiple quotes
*
*/
function setFormSubmitting() { 
    formSubmitting = true; 
};

/**
* Cancel Quote Functions -- only trigger when in quote workflow -- open modal to confirm 'navigating away will cancel quote'
*
*/

// Pass hrefs to 'cancel quote' modal --these hrefs are generated as js vars from thymeleaf in the navbar.html

$("#cancelBtn,#homeLink,#footerLogoLink,#hodgeLogo").on("click", function(e) {
    modalOpen(e, dashboard.html);
 });

 $("#newQuoteBtn").on("click", function(e) {
    modalOpen(e, beginApplication.html);
 });

 $("#newQuoteBtnHlt").on("click", function(e) {
    modalOpen(e, beginApplication.html);
 });

 $("#logoutLink").on("click", function(e) {
    modalOpen(e, dashboard.html);
 });

 $("#brokerLink").on("click", function(e) {
    modalOpen(e, brokerLink);
 });

 $("#companiesAndContacts").on("click", function(e) {
    modalOpen(e, companiesLink);
 });

 $("#contactsLink").on("click", function(e) {
    modalOpen(e, contactsLink);
 });

 $("#clubsLink").on("click", function(e) {
    modalOpen(e, clubsLink);
 });

 // Function to open 'cancel quote' modal and set href on button

 function modalOpen(e, href) {
    e.preventDefault();
    $('#closeQuote').modal('show');
    $("#closeQuoteBtn").on("click", function() {
        location.href = beginApplication.html;
    });
     $("#yesCloseBtn").on("click", function() {
         location.href = beginApplication.html
     });
 }

/**
* Close 'cancel quote' modal
*
*/

 $("#dontCloseBtn").on("click", function(e) {
    e.preventDefault();
    $('#closeQuote').modal('hide');
 });

// Add input mask to mobile number

 $(document).ready(function(){
    $('.phone').mask('00000000000');
  });