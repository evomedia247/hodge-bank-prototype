

describe("QuoteDetailsControllerTest", function() {
  var controller;

  beforeEach(function() {
    controller = QuoteDetailsController;
  });

  it("should trim the text when over 5 characters", function() {
    var result = controller.trimText("sadasdasdasdasdsadasdadasdsadasduaishduaishduiashudhuasihduashdiuashdiuhasidass", 5);
    expect(result).toEqual("sadas...");
  });

  it("should trim the text when over 10 characters", function() {
    var result = controller.trimText("sadasdasdasdasdsadasdadasdsadasduaishduaishduiashudhuasihd", 10);
    expect(result).toEqual("sadasdasda...");
  });


  it("should not trim the text when exactly 10 characters", function() {
    var result = controller.trimText("qwertyuiop", 10);
    expect(result).toEqual("qwertyuiop");
  });


});
