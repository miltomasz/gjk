describe('Location dispatcher', function() {
  var lat = 52.3323444;
  var lng = 34.787676;
  var geoLocator = new GeoLocator();
  var lm = new LocationManager(lat, lng, geoLocator);


  describe('City location', function() {
    it('should return name of the city', function() {
      spyOn(geoLocator, "locate").andReturn("Freta 44, Warszawa, Polska");

      var city = lm.city();
      
      expect(geoLocator.locate).toHaveBeenCalledWith(lat, lng);
      expect(city).toEqual("Warszawa");
    });
  });

  describe('Street', function() {
    it('should return name of the street address number', function() {
      spyOn(geoLocator, "locate").andReturn("Freta 44, Warszawa, Polska");

      var street = lm.street();
      
      expect(geoLocator.locate).not.toHaveBeenCalled();
      expect(street).toEqual("Freta 44");
    });
  });

  describe('Country', function() {
    it('should return name of the country', function() {
      spyOn(geoLocator, "locate").andReturn("Freta 44, Warszawa, Polska");

      var country = lm.country();
      
      expect(geoLocator.locate).not.toHaveBeenCalled();
      expect(country).toEqual("Polska");
    });
  });
});