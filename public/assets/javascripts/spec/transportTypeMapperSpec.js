describe('Means of transport mapper', function() {
  var trasportMapper = new TransportMapper();

  describe('maps to correct file extension', function() {
    it('bus type & night bus & aglo bus to bus.png', function() {
      expect(trasportMapper.getFileExt('autobuses')).toEqual("bus.png");
      expect(trasportMapper.getFileExt('night_autobuses')).toEqual("bus.png");
      expect(trasportMapper.getFileExt('aglo_autobuses')).toEqual("bus.png");
    });

    it('tram type to tram.png', function() {
      expect(trasportMapper.getFileExt('trams')).toEqual("tram.png");
    });

    it('skm type to train.png', function() {
      expect(trasportMapper.getFileExt('skm')).toEqual("train.png");
    });

    it('return undefined when transport type not found', function() {
      expect(trasportMapper.getFileExt('unknown')).toEqual(undefined);
    });
  });

  describe('converts shortcuts to full names', function() {
    it('should convert bus to Autobus', function() {
      expect(trasportMapper.convert("autobuses")).toEqual("Autobus");
    });

    it('tram to Tramwaj', function() {
      expect(trasportMapper.convert("trams")).toEqual("Tramwaj");
    });

    it('night_bus to Autobus nocny', function() {
      expect(trasportMapper.convert("night_autobuses")).toEqual("Autobus nocny");
    });

    it('wkd to WKD', function() {
      expect(trasportMapper.convert("wkd")).toEqual("WKD");
    });

    it('skm to SKM', function() {
      expect(trasportMapper.convert("skm")).toEqual("SKM");
    });

    it('return undefined when shortcut not found', function() {
      expect(trasportMapper.convert("Test")).toEqual(undefined);
    });
  });
});