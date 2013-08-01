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

function GeoLocator() {
  this.locate = function(latitude, longitude) {
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
    var async = true;
    var addres;

    request.open(method, url, async);

    request.onreadystatechange = function(){
      if(request.readyState == 4 && request.status == 200){
        var data = JSON.parse(request.responseText);
        address = data.results[0];
      }
    };

    request.send();

    return address.formatted_address;
  };
};

function LocationManager(lat, lng, geoLocator) {
  this.lat = lat;
  this.lng = lng;
  this.geoLocator = geoLocator;
  this.address = null;

  this.initializeAddress = function() {
     if (this.address == null) {
       this.address = this.geoLocator.locate(this.lat, this.lng);
     }
  };

  this.city = function() {
    this.initializeAddress();
    return this.address[1];
  };

  this.street = function() {
    this.initializeAddress();
    return this.address[0];
  };

  this.country = function() {
    this.initializeAddress();
    return this.address[2];
  };
};

function OptionsCreator(transportNumbers) {
  this.transportNumbers = transportNumbers;

  this.getTransportNumbers = function() {
    return this.transportNumbers;
  };

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

    this.transportNumbers = getPropertyValue(transportType, meansAndNumbers);
  }
};

function TransportMapper() {
  var FILE_NAMES = ['bus', 'tram', 'night_bus', 'skm', 'wkd'];
  var NAMES_VALUES = [{'bus':'Autobus'}, {'tram':'Tramwaj'}, 
                      {'night_bus':'Autobus nocny'}, {'wkd':'WKD'}, {'skm':'SKM'}];

  this.getFileExt = function(param) {
    for (var i = 0; i < FILE_NAMES.length; i++) {
      if (param == FILE_NAMES[i]) {
        if (param == 'night_bus') {
          return 'bus.png';
        }

        if (param == 'skm' || param == 'wkd') {
          return 'train.png';
        }

        return param + '.png';
      }
    }

    return undefined;
  };

  this.convert = function(param) {
    return getPropertyValue(param, NAMES_VALUES);
  };
};

var MessagePresenter = {
  showMessage : function(text) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'>" +
        "<h3>" + text + "</h3>" +
      "</div>").css({ "display": "block", "opacity": 0.96, "left": 10, "right": 10, "top": $(window).scrollTop() + 100})
    .appendTo( $.mobile.pageContainer )
    .delay( 3000 )
    .fadeOut( 1500, function(){
      $(this).remove();
    });
  },

  hasParam : function(paramName) {
    var results = new RegExp('[\\?&amp;]' + paramName + '=([^&amp;#]*)').exec(window.location.href);
    if (results == null) {
      return 0;
    }
    return results[1];
  }
};

function getPropertyValue(propertyName, array) {
  for (var i = 0; i < array.length; i++) {
    var object = array[i];

    for(var property in object) {
      if (propertyName == property) {
        return object[property];
      }
    }
  }
  return undefined;
};
