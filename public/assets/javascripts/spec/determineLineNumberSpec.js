describe('Options creator', function() {
  var AUTOBUSES = [116, 217, 'E-2', 'N3'];
  var TRAMS = [22, 35, 36, 42];
  var SKM = ['S1', 'S2', 'S3', 'S9'];

  var busesOptions = '<option value="116">116</option><option value="217">217</option>' + 
                     '<option value="E-2">E-2</option><option value="N3">N3</option>';

  var tramsOptions = '<option value="22">22</option><option value="35">35</option>' + 
                     '<option value="36">36</option><option value="42">42</option>';


  var skmOptions = '<option value="S1">S1</option><option value="S2">S2</option>' + 
                   '<option value="S3">S3</option><option value="S9">S9</option>';


  describe("for bus line numbers", function() {
    it('should create options with autobuses', function() {
      var creator = new OptionsCreator(AUTOBUSES);
      expect(creator.options()).toEqual(busesOptions);
    });
  });

  describe("for trams line numbers", function() {
    it('should create options with trams', function() {
      var creator = new OptionsCreator(TRAMS);
      expect(creator.options()).toEqual(tramsOptions);
    });
  });

  describe("selects accurate array", function() {
    it('should select bus array', function() {
      var creator = new OptionsCreator(TRAMS);

      spyOn(creator, 'options').andReturn(busesOptions);

      creator.changeTo('bus');
      var options = creator.options();

      expect(creator.options).toHaveBeenCalled();
      expect(options).toEqual(busesOptions);
    });

    it('should select skm array', function() {
      var creator = new OptionsCreator(AUTOBUSES);

      spyOn(creator, 'options').andReturn(skmOptions);

      creator.changeTo('skm');
      var options = creator.options();

      expect(creator.options).toHaveBeenCalled();
      expect(options).toEqual(skmOptions);
    }); 
  });
});