describe('Options creator', function() {
  var AUTOBUSES = [116, 217, 'E-2', 'N3'];
  var TRAMS = [22, 35, 36, 42];
  var busesOptions = '<option value="116">116</option><option value="217">217</option>' + 
                     '<option value="E-2">E-2</option><option value="N3">N3</option>';

  var tramsOptions = '<option value="22">22</option><option value="35">35</option>' + 
                     '<option value="36">36</option><option value="42">42</option>';


  describe("for bus line numbers", function() {
    it('should create options with autobuses', function() {
      var creator = new OptionsCreator(AUTOBUSES);
      expect(creator.options()).toEqual(busesOptions);
    });
  });

  // describe("for trams line numbers", function() {
  //   it('should create options with trams', function() {
  //     expect(creator.createFor(TRAMS)).toEqual(tramsOptions);
  //   });
  // });

  // describe("selects accurate array", function() {
  //   it('should select bus array', function() {
  //     creator.createFor(TRAMS);
  //     expect(creator.changeTo('bus')).toEqual(busesOptions);
  //   });
  // });
});