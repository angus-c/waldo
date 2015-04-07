(function(){
  var traverse = function(util, searchTerm, options) {
    var options = options || {};
    var obj = options.obj || window;
    var path = options.path || ((obj==window) ? "window" : "");
    var props = Object.keys(obj);
    props.forEach(function(prop) {
      if ((tests[util] || util)(searchTerm, obj, prop)){
        console.log([path, ".", prop].join(""), "->",["(", typeof obj[prop], ")"].join(""), obj[prop]);
      }
      if(Object.prototype.toString.call(obj[prop])=="[object Object]" &&
          (obj[prop] != obj) && path.split(".").indexOf(prop) == -1) {
        traverse(util, searchTerm, {obj: obj[prop], path: [path,prop].join(".")});
      }
    });
  }
 
  var dealWithIt = function(util, expected, searchTerm, options) {
    (!expected || typeof searchTerm == expected) ?
      traverse(util, searchTerm, options) :
      console.error([searchTerm, 'must be', expected].join(' '));
  }
 
  var tests = {
    'name': function(searchTerm, obj, prop) {return searchTerm == prop},
    'nameContains': function(searchTerm, obj, prop) {return prop.indexOf(searchTerm)>-1},
    'type': function(searchTerm, obj, prop) {return obj[prop] instanceof searchTerm},
    'value': function(searchTerm, obj, prop) {return obj[prop] === searchTerm},
    'valueCoerced': function(searchTerm, obj, prop) {return obj[prop] == searchTerm},
    'valueCoercedContains': function(searchTerm, obj, prop) {return obj[prop] ? String.prototype.indexOf.call(obj[prop], searchTerm) > -1 : false}
  }
 
  window.find={
    byName: function(searchTerm, options) {dealWithIt('name', 'string', searchTerm, options);},
    byNameContains: function(searchTerm, options) {dealWithIt('nameContains', 'string', searchTerm, options);},
    byType: function(searchTerm, options) {dealWithIt('type', 'function', searchTerm, options);},
    byValue: function(searchTerm, options) {dealWithIt('value', null, searchTerm, options);},
    byValueCoerced: function(searchTerm, options) {dealWithIt('valueCoerced', null, searchTerm, options);},
    byValueCoercedContains: function(searchTerm, options) {dealWithIt('valueCoercedContains', null, searchTerm, options);},
    custom: function(fn, options) {traverse(fn, null, options);}
  }
})();
