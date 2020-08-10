

describe("DashboardControllerTest", function() {
  var controller;

  beforeEach(function() {
    controller = DashboardController;
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

  it("should get today's date minus 10-days", function() {
    var result = controller.getDateMinus(10);
    var expectedDate = new Date().getDate() - 10;
    expect(result.getDate()).toEqual(expectedDate);
  });

  it("should get today's date minus 0-days", function() {
    var result = controller.getDateMinus(0);
    expect(result.getDate()).toEqual(new Date().getDate());
  });

});
