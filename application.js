var onlyRoot = function(obj) {
  if (obj == undefined) { return true; }
  var keys = allKeys(obj);
  if (keys.length == 0) { return true; }
  if (keys.length > rootNodes.length) { return false; }
  for (var c = 0; c < keys.length; c++ ) {
    if (! rootNodes.includes(keys[c])) { return false; }
  }
  return true;
}

var extractAll = function() {
  var result = [];

  var all = (allKeys(window.dependencies));
  for (var i = 0, len = all.length; i < len; i++) {
    if (! result.includes(all[i])) {
      result.push(all[i])
      var internal = allKeys(window.dependencies[all[i]])

      for (var c = 0, lengt = internal.length; c < lengt; c++) {
        if (! result.includes(internal[c])) {
          result.push(internal[c])
        }
      }
    }
  }
  var sorted = result.sort();
  var dropdown = $("#selectbasic");
  for (var i = 0, len = sorted.length; i < len; i++) {
    dropdown.append("<option value='" + sorted[i] + "'>" + sorted[i] +"</option>")
  }
};


var allKeys = function(obj) {
  return Object.getOwnPropertyNames(obj);
};

var getSubElements = function(obj) {
  var keys = allKeys(obj);
  return window.dependencies[keys[0]];
};

var append = function(obj) {
  var text = $("#textinput2").val();
  $("#textinput2").val(text + s(obj) + "\n")
};


var reduce = function(obj) {
  var akeys = allKeys(obj);
  var result = {};
  for (var i = 0; i < akeys.length; i++) {
    var currentKey = akeys[i];
    var currentValue =  obj[currentKey];


    // Resolve Dependencies
    var subelements = window.dependencies[currentKey];
    if (subelements !== undefined) {
      var subelementskeys = allKeys(subelements)
      for (var o = 0; o < subelementskeys.length; o++) {
        var currentSubelementKey = subelementskeys[o];
        var currentSubelementValue = subelements[currentSubelementKey];
        // In traget
        if (result[currentSubelementKey]) {
          var oldValue =  result[currentSubelementKey];
          var ValueElem = currentSubelementValue;
          var multiplay = window.dependencies[currentKey][currentSubelementKey];
          var newValue = (oldValue + (ValueElem * multiplay));
          result[akeys[i]] = newValue;
        }
        // In src
        else if (obj[currentSubelementKey]) {
          var old = obj[currentSubelementKey];
          var multiplay = obj[currentKey];
          result[currentSubelementKey] = currentSubelementValue + (old * multiplay);
        }
        // not inside
        else {
          var multiplay = obj[currentKey];
          result[currentSubelementKey] =  currentSubelementValue * multiplay;
        }
      }
    }

    if (! window.rootNodes.includes(currentKey)) {
      delete obj[currentKey];
    }
  }

  // Remove just processed element from obj if not root
  var leftKeys = allKeys(obj);
  for (var i = 0; i < leftKeys.length; i++) {
    var currentKey = leftKeys[i];
    var currentValue =  obj[currentKey];
    // Add everything that is left
    if (! result[currentKey]) {
        result[currentKey] = currentValue;
    }
  }

  return result;
};

var s = function(obj) {
   return JSON.stringify(obj);
};

var traverse = function(selection, number) {
  var d = window.dependencies[selection]
  var level = 10;
  var result = {};
  var currentLevel = 0;
  while(onlyRoot(d) != true) {
    append(d);
    d = reduce(d);
    currentLevel++;
  }
  append(d); // Final Result
};

$( document ).ready( function() {
  $("#singlebutton").click(function(event) {
    event.preventDefault();
    $("#textinput2").val("");
    var selection = $("#selectbasic").val();
    traverse(selection);
  });
});

$( document).ready(function() {
  extractAll();
})
