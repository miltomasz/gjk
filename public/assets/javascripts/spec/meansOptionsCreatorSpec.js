describe('Means options creator', function() {

  var meansWarsaw = '<option value="autobuses">Autobus</option><option value="trams">Tramwaj</option>' + 
                    '<option value="night_autobuses">Autobus nocny</option><option value="wkd">WKD</option>' + 
                    '<option value="skm">SKM</option>'; 
  var meansKrakow = '<option value="autobuses">Autobus</option><option value="trams">Tramwaj</option>' +
                    '<option value="aglo_autobuses">Autobus podmiejski</option><option value="night_autobuses">Autobus nocny</option>'; 

  it("should select Warsaw means of transport", function() {
    var name = 'Warszawa';

    var meansOptionsCreator = new MeansOptionsCreator(name);

    expect(meansOptionsCreator.options()).toEqual(meansWarsaw);
  });

   it("should select Krakow means of transport", function() {
    var name = 'Krakow';

    var meansOptionsCreator = new MeansOptionsCreator(name);

    expect(meansOptionsCreator.options()).toEqual(meansKrakow);
  });
});