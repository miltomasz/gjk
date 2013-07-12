var AUTOBUSES = [101,102,103,104,105,107,108,109,110,111,112,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,138,139,140,141,142,143,145,146,147,148,149,151,152,153,154,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,201,202,203,204,205,206,207,208,209,210,211,212,213,215,216,217,218,219,220,222,225,226,227,228,245,300,302,303,304,305,306,311,314,315,317,318,319,326,331,338,345,365,394,401,409,410,411,414,422,426,444,460,500,501,502,503,504,507,509,510,511,512,514,516,517,519,520,521,523,525,527,700,701,702,703,704,705,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,727,728,729,730,731,732,733,734,735,736,738,739,740,741,742, 800,805,807,'E-2','E-4','E-6','E-8', 'L-1', 'L-2','L-3','L-4','L-5','L-6','L-7','L-8','L-9','L10','L11','L13','L14','L15','L16','L17','L18','L19'];
var TRAMS = [1,2,3,4,6,7,8,9,10,14,15,17,18,20,22,23,24,25,26,31,33,35,37,41,75,76,78];
var NIGHT_AUTOBUSES = ['N01','N02','N03','N11','N12','N13','N14','N21','N22','N24','N25','N31','N32','N33','N34','N35','N36','N37','N38','N41','N42','N43','N44','N45','N46','N50','N52','N56', 'N58','N61','N62','N63','N64','N71','N72','N75','N81','N83','N85','N88','N91','N95'];
var WKD = ['Z-6','Z-9','Z17','ZS1'];
var SKM = ['S1','S2','S3','S9'];

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

  this.setTransportNumber = function(transportNumbers) {
    this.transportNumbers = transportNumbers;
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
    if (transportType == 'bus') {
      return this.createFor(AUTOBUSES);
    }
    
    return null;
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
