describe('City selector', function() {
  it("should select Warsaw", function() {
    var name = 'Warszawa';

    var citySelector = new CitySelector(name);

    expect(citySelector.city()).toEqual('Warszawa');
  });

  it("should select Cracow", function() {
    var name = 'Kraków';

    var citySelector = new CitySelector(name);

    expect(citySelector.city()).toBe('Krakow');
  });
});