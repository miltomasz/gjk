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

function CitySelector(name) {
  this.name = name.trim();

  this.city = function() {
    if (this.name == 'Warszawa') {
      return 'Warszawa';
    }

    if (this.name == 'Kraków') {
      return 'Krakow';
    }

    return undefined;
  };
};

function GeoLocator() {
  this.locate = function(latitude, longitude) {
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
    var async = false;
    var addres;

    request.open(method, url, async);

    request.onreadystatechange = function(){
      if(request.readyState == 4 && request.status == 200){
        var data = JSON.parse(request.responseText);
        address = data.results[0];
        console.log("Geolocated address: " + address.formatted_address)
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
       var addressString = this.geoLocator.locate(this.lat, this.lng);
       this.address = addressString.split(",");
     }
  };

  this.city = function() {
    this.initializeAddress();
    var cityWithZipCode = this.address[1].split(" ");
    var city = cityWithZipCode[cityWithZipCode.length-1];
    return city.trim();
  };

  this.street = function() {
    this.initializeAddress();
    return this.address[0].trim();
  };

  this.country = function() {
    this.initializeAddress();
    return this.address[2].trim();
  };
};

function MeansOptionsCreator(city) {
  this.city = city;

  this.options = function() {
    if (this.city == 'Warszawa') {
      return this.createFor(cities['Warszawa']);
    }

    if (this.city == 'Krakow') {
      return this.createFor(cities['Krakow']);
    }
  };

  this.createFor = function(meansOfTransport) {
    var keys = getKeys(meansOfTransport);

    var options = '';
    for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = meansOfTransport.getName(key.toUpperCase());
        
        options += '<option value="' + key + '">' + value + '</option>';
    }

    return options;
  }
};

function OptionsCreator(cityObject, transportType) {
  this.cityObject = cityObject;
  this.transportType = transportType;

  this.getTransportNumbers = function() {
    return this.cityObject[this.transportType];
  };

  this.options = function() {
    return this.createFor(this.transportType);
  };

  this.createFor = function(transportType) {
      var transportNumbers = this.cityObject[transportType];

      var options = '';
      for(var i = 0; i < transportNumbers.length; i++) {
          options += '<option value="' + transportNumbers[i] + '">' + transportNumbers[i] + '</option>';
      }
      return options;
  };

  this.changeTo = function(transportType) {
    if (transportType != null) {
      transportType = transportType.toUpperCase();
    }
    this.transportType = transportType;
  }
};

function TransportMapper() {
  var FILE_NAMES = [{'bus':'bus'}, {'autobuses':'bus'}, {'trams':'tram'}, 
                      {'night_autobuses':'bus'}, {'wkd':'train'}, {'skm':'train'}, {'aglo_autobuses':'bus'}];
  var NAMES_VALUES = [{'bus':'Autobus'}, {'autobuses':'Autobus'}, {'trams':'Tramwaj'}, 
                      {'night_autobuses':'Autobus nocny'}, {'wkd':'WKD'}, {'skm':'SKM'}, {'aglo_autobuses':'Autobus podmiejski'}];

  this.getFileExt = function(param) {
    var value = getPropertyValue(param, FILE_NAMES);
    return (typeof value === 'undefined') ? undefined : value.concat('.png');
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

function getKey(index, hash) {
  var i = 0;
  
  for(var property in hash) {
    if (index == i) {
      return property.toString();
    }
    i++;
  }
};

function getKeys(hash) {
  var keys = [];

  for(var property in hash) {
    if (!(hash[property] instanceof Function)) {
      keys.push(property.toLowerCase());
    }
  }

  return keys;
};

function isFunction(x) {
  return Object.prototype.toString.call(x) == '[object Function]';
};

