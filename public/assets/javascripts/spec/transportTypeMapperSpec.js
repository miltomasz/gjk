describe('Means of transport mapper', function() {
  var trasportMapper = new TransportMapper();

  describe('maps to correct file extension', function() {
    it('bus type & night bus to bus.png', function() {
      expect(trasportMapper.getFileExt('bus')).toEqual("bus.png");
      expect(trasportMapper.getFileExt('night_bus')).toEqual("bus.png");
    });

    it('tram type to tram.png', function() {
      expect(trasportMapper.getFileExt('tram')).toEqual("tram.png");
    });

    it('train type to train.png', function() {
      expect(trasportMapper.getFileExt('train')).toEqual("train.png");
    });

    it('return undefined when transport type not found', function() {
      expect(trasportMapper.getFileExt('unknown')).toEqual(undefined);
    });
  });

  describe('converts shortcuts to full names', function() {
    it('bus to Autobus', function() {
      expect(trasportMapper.convert("bus")).toEqual("Autobus");
    });

    it('tram to Tramwaj', function() {
      expect(trasportMapper.convert("tram")).toEqual("Tramwaj");
    });

    it('night_bus to Autobus nocny', function() {
      expect(trasportMapper.convert("night_bus")).toEqual("Autobus nocny");
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