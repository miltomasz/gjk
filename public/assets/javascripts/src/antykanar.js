function DateBuilder(date) {
  this.date = (function(date) {
    if (typeof date == 'string' || date instanceof String ) {
      return new Date(Date.parse(date));
    } else {
      return date;
    }
  })(date);
  
  this.toHMS = function() {
      var h = this.date.getHours();
      var m = this.date.getMinutes();
      var s = this.date.getSeconds();

      return '' + h + ':' + (m <= 9 ? '0' + m : m) + ':' + (s <= 9 ? '0' + s : s);
  };

  this.toYMD = function() {
      var d = this.date.getDate();
      var m = this.date.getMonth() + 1;
      var y = this.date.getFullYear();

      return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  };  
};

function OptionsCreator(transportNumbers) {
  this.transportNumbers = transportNumbers;

  this.getTransportNumbers = function() {
    return this.transportNumbers;
  }

  this.options = function() {
    return this.createFor(this.transportNumbers);
  };

  this.createFor = function(transportNumbers) {
      var options = '';
      for(var i = 0; i < transportNumbers.length; i++) {
          options += '<option value="' + transportNumbers[i] + '">' + transportNumbers[i] + '</option>';
      }
      return options;
  };

  this.changeTo = function(transportType) {
    var meansAndNumbers = [{'bus':AUTOBUSES}, {'tram':TRAMS}, {'night_bus':NIGHT_AUTOBUSES}, {'wkd':WKD}, {'skm':SKM}];

    for (var i = 0; i < meansAndNumbers.length; i++) {
      var object = meansAndNumbers[i];

      for(var property in object) {
        if (transportType == property) {
          this.transportNumbers = object[property];
        }
      }
    }
  }
};

function TransportMapper() {
  var FILE_NAMES = ['bus', 'tram', 'night_bus', 'train'];
  var NAMES_VALUES = [{'bus':'Autobus'}, {'tram':'Tramwaj'}, 
                      {'night_bus':'Autobus nocny'}, {'wkd':'WKD'}, {'skm':'SKM'}];

  this.getFileExt = function(param) {
    for (var i = 0; i < FILE_NAMES.length; i++) {
      if (param == FILE_NAMES[i]) {
        if (param == 'night_bus') {
          return 'bus.png';
        }

        return param + '.png';
      }
    }

    return undefined;
  };

  this.convert = function(param) {
    for (var i = 0; i < NAMES_VALUES.length; i++) {
      var object = NAMES_VALUES[i];

      for(var property in object) {
        if (param == property) {
          return object[property];
        }
      }
    }

    return undefined;
  };
};
