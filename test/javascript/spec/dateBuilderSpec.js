describe('Date builder helper', function() {
  describe('hours, minutes, seconds builder', function() {
    it('builds HH:mm:ss string from Date object', function() {
    	var dateBuilder = new DateBuilder(new Date(Date.parse("2007-06-09T12:46:21Z")));
      expect(dateBuilder.toHMS()).toEqual("14:46:21");
    });
  });

  describe('days, months, years builder', function() {
    it('builds HH:mm:ss string from Date object', function() {
      var dateBuilder = new DateBuilder(new Date(Date.parse("2007-06-09T12:46:21Z")));
      expect(dateBuilder.toYMD()).toEqual("2007-06-09");
    });
  });

  describe('converting uknown date format', function() {
    it('builds correct date format', function() {
      var dateBuilder = new DateBuilder("2007-06-09T12:46:21Z");
      
      expect(dateBuilder.toHMS()).toEqual("14:46:21");
      expect(dateBuilder.toYMD()).toEqual("2007-06-09");
    });
  });
});