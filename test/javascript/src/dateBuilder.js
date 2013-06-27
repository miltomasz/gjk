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