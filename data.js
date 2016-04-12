'use strict';

var rootNodes = ["Eisenerz", "Kupfererz", "Schwefelsäure", "Wasser"];
var onlyRoot = function(obj) {

  var keys = allKeys(obj);
  if (keys.length == 0) { return true; }
  if (keys.length > rootNodes.length) { return false }
  for (var c = 0; c < keys.length; c++ ) {
    if (! rootNodes.includes(keys[c])) { return false }
  }
  return true;
}

var extractAll = function() {
  var result = [];

  var all = (allKeys(window.data));
  for (var i = 0, len = all.length; i < len; i++) {
    if (! result.includes(all[i])) {
      result.push(all[i])
      var internal = allKeys(window.data[all[i]])

      for (var c = 0, lengt = internal.length; c < lengt; c++) {
        if (! result.includes(internal[c])) {
          result.push(internal[c])
        }
      }
    }
  }
  var sorted = result.sort();
  window.sorted = sorted;
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
  return window.data[keys[0]];
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
    var subelements = window.data[currentKey];
    if (subelements !== undefined) {
      var subelementskeys = allKeys(subelements)
      for (var o = 0; o < subelementskeys.length; o++) {
        var currentSubelementKey = subelementskeys[o];
        var currentSubelementValue = subelements[currentSubelementKey];
        if (result[currentSubelementKey]) {
          var oldValue =  result[currentSubelementKey];
          var ValueElem = currentSubelementValue;
          var multiplay = window.data[currentKey][currentSubelementKey];
          var newValue = oldValue + (ValueElem * multiplay);
          result[akeys[i]] = newValue;
        }
        else {
            result[currentSubelementKey] = currentSubelementValue;
            if (result[currentSubelementKey]) {
              delete obj[currentKey];
            }
        }
      }
    }
  }


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
  var d = window.data[selection]
  var level = 10;
  var result = {};
  var currentLevel = 0;
  while(onlyRoot(d) == false && currentLevel < 10) {
    append(d);
    d = reduce(d);
    currentLevel++;
  }
};

$( document ).ready( function() {
  window.data = {};

  data.Schwefelsäure = {};

  data.Wasser = {};

  data.Eisenplatte = {"Eisenerz": 1};

  data.Kupferplatte = {"Kupfererz": 1};

  data.Stahlträger = {"Eisenplatte": 5};

  data["Baumaterial mit geringer Dichte"] = {
    "Kupferplatte": 5,
    "Stahlträger": 10,
    "Kunststoffstange": 5
  };

  data.Kunststoffstange = {

  };

  data.Raketenbauteil = {
    "Baumaterial mit geringer Dichte": 10,
    "Raketensteuergerät": 10,
    "Raketentreibstoff": 10
  };

  data.Beton = {
    "Wasser": 1,
    "Eisenerz": 1
  };

  data.Raketensilo = {
    "Stahlträger": 1000,
    "Beton": 1000,
    "Rohr": 100,
    "Prozessoreinheit": 200,
    "Elektromotorenbestandteile": 200
  };

  data.Satelit = {
    "Baumaterial mit geringer Dichte": 100,
    "Raketentreibstoff": 50,
    "Prozessoreinheit": 100,
    "Solarmodul": 100,
    "Einfacher Akku": 100,
    "Radar": 5
  };

  data["Einfacher Akku"] = {
    "Eisenplatte": 1
  }

  data.Raketensteuergerät = {
    "Prozessoreinheit": 1,
    "Geschwindigkeitsmodul 1": 1,
  };

  data.Raketentreibstoff = {
    "Festbrennstoff": 10
  };

  data.Rohr = {
    "Eisenplatte": 1
  };

  data["Geschwindigkeitsmodul 1"] = {
    "Erweiterter Schaltkreis": 5,
    "Schaltkreis": 5
  };

  data.Schaltkreis = {
    "Eisenplatte": 1,
    "Kupferkabel": 3
  };

  data["Erweiterter Schaltkreis"] = {
    "Kunststoffstange": 2,
    "Schaltkreis": 2,
    "Kupferkabel": 4
  };

  data.Prozessoreinheit = {
    "Erweiterter Schaltkreis": 2,
    "Schaltkreis": 20,
    "Schwefelsäure": 0.5,
    "Eisenzahnrad": 1
  };

  data.Verbrennungsmotorenbestandteil = {
    "Stahlträger": 1,
    "Rohr": 2
  };

  data.Eisenzahnrad = {
    "Eisenplatte": 2
  };

  data.Elektromotorenbestandteile = {
    "Schaltkreis": 2,
    "Verbrennungsmotorenbestandteil": 1,
    "Schmiermittel": 2
  };

  data.Batterie = {
    "Eisenplatte": 1,
    "Kupferplatte": 1,
    "Schwefelsäure": 2
  };

  data.Radar = {
    "Eisenplatte": 10,
    "Schaltkreis": 5,
    "Eisenzahnrad": 5
  };

  data.Rot = {
    "Kupferplatte": 1,
    "Eisenzahnrad": 1
  };

  data.Grün = {
    "Greifarm": 1,
    "Fließband": 1
  };

  data.Greifarm = {
    "Eisenplatte": 1,
    "Schaltkreis": 1,
    "Eisenzahnrad": 1
  };

  data.Fließband = {
    "Eisenplatte": 1,
    "Eisenzahnrad": 1
  };

  data.Stahlträger = {
    "Eisenplatte": 5
  };

  data.Blau = {
    "Stahlträger": 1,
    "Erweiterter Schaltkreis": 1,
    "Batterie": 1,
    "Intelliger Greifarm": 1
  };

  data["Intelliger Greifarm"] = {
    "Schaltkreis": 4,
    "Schneller Greifarm": 1
  };

  data["Schneller Greifarm"] = {
    "Eisenplatte": 2,
    "Schaltkreis": 2,
    "Greifarm": 1
  };

  data.Kupferkabel = {
    "Kupferplatte": 2
  }
});

$( document ).ready( function() {
  extractAll();
});

$( document ).ready( function() {
  $("#singlebutton").click(function(event) {
    event.preventDefault();
    $("#textinput2").val("");
    var selection = $("#selectbasic").val();
    traverse(selection);
  });
});
