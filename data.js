'use strict';

var rootNodes = ["Eisenerz", "Kupfererz", "Wasser", "Stein", "Rohöl", "Alien-Artefakt", "Kohle", "Baumstämme"];
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
  data.Auto = {"Verbrennungsmotorenbestandteil": 8, "Eisenplatte": 20, "Stahlträger": 5};
  data.Batterie = {"Eisenplatte": 1,"Kupferplatte": 1,"Schwefelsäure": 2};
  data.Baumstämme = {};
  data.Beton = {"Wasser": 10,"Eisenerz": 1, "Ziegelstein": 5};
  data.Chemiefabrik = {"Stahlträger": 5, "Eisenzahnrad": 5, "Schaltkreis": 5, "Rohr": 5};
  data.Dampfmaschine = {"Eisenzahnrad": 5, "Rohr": 5, "Eisenplatte": 5};
  data.Eisenkiste = {"Eisenplatte": 8};
  data.Eisenplatte = {"Eisenerz": 1};
  data.Eisenspitzhacke = {"Eisenstange": 2, "Eisenplatte": 3};
  data.Eisenstange = {"Eisenstange": 0.5};
  data.Eisenzahnrad = {"Eisenplatte": 2};
  data.Elektromotorenbauteil = {"Schaltkreis": 2,"Verbrennungsmotorenbestandteil": 1,"Schmiermittel": 2};
  data.Fließband = {"Eisenplatte": 1,"Eisenzahnrad": 1};
  data.Geschützturm = {"Eisenzahnrad": 10, "Kupferplatte": 10, "Eisenplatte": 20};
  data.Greifarm = {"Eisenplatte": 1,"Schaltkreis": 1,"Eisenzahnrad": 1};
  data.Heizkessel = {"Schmelzofen": 1, "Rohr": 1};
  data.Hochofen = {"Stahlträger":8, "Ziegelstein": 10};
  data.Holzbohlen = {"Baumstämme": 1};
  data.Holzkiste = {"Holzbohlen": 4};
  data.Kohle = {};
  data.Kunststoffstange = {"Kohle": 1, "Petroleum": 3};
  data.Kupferkabel = {"Kupferplatte": 2}
  data.Kupferplatte = {"Kupfererz": 1};
  data.Labor = {"Schaltkreis": 10, "Eisenzahnrad": 10, "Fließband": 4};
  data.Lagertank = {"Eisenplatte": 20, "Stahlträger": 5};
  data.Lampe = {"Schaltkreis": 1, "Eisenstange": 3, "Eisenplatte": 1};
  data.Laserturm = {"Stahlträger": 20, "Schaltkreis": 20, "Batterie": 12};
  data.Lichtbogenofen = {"Stahlträger": 15, "Erweiterter elektronischer Schaltkreis": 5, "Ziegelstein": 10};
  data.Ölraffinierte = {"Stahlträger": 15, "Eisenzahnrad": 10, "Ziegelstein": 10, "Schaltkreis": 10, "Rohr": 10};
  data.Petroleum = {"Rohöl": 1};
  data.Pistole = {"Kupferplatte": 5, "Eisenplatte": 5};
  data.Prozessoreinheit = {"Erweiterter Schaltkreis": 2,"Schaltkreis": 20,"Schwefelsäure": 0.5,"Eisenzahnrad": 1};
  data.Radar = {"Eisenplatte": 10,"Schaltkreis": 5,"Eisenzahnrad": 5};
  data.Rakete = {"Schaltkreis": 1, "Sprengstoff": 2, "Eisenplatte": 2};
  data.Raketenbauteil = {"Baumaterial mit geringer Dichte": 10,"Raketensteuergerät": 10,"Raketentreibstoff": 10};
  data.Raketensilo = {"Stahlträger": 1000,"Beton": 1000,"Rohr": 100,"Prozessoreinheit": 200,"Elektromotorenbauteil": 200};
  data.Raketensteuergerät = {"Prozessoreinheit": 1,"Geschwindigkeitsmodul 1": 1,};
  data.Raketentreibstoff = {"Festbrennstoff": 10};
  data.Raketenwerfer = {"Eisenplatte": 5, "Eisenzahnrad": 5, "Schaltkreis": 5};
  data.Reperaturkit = {"Schaltkreis": 1, "Eisenzahnrad": 1};
  data.Rohöl = {};
  data.Rohr = {"Eisenplatte": 1};
  data.Satelit = {"Baumaterial mit geringer Dichte": 100,"Raketentreibstoff": 50,"Prozessoreinheit": 100,"Solarmodul": 100,"Einfacher Akku": 100,"Radar": 5};
  data.Schaltkreis = {"Eisenplatte": 1,"Kupferkabel": 3};
  data.Schmelzofen = {"Stein": 5};
  data.Schmiermittel = {"Schweröl": 1};
  data.Schwefel = {"Wasser": 3, "Petroleum": 3};
  data.Schwefelsäure = {"Schwefel": 5, "Wasser": 10, "Eisenplatte": 1};
  data.Schweröl = {"Rohöl": 1};
  data.Sprengstoff = {"Schwefel": 1, "Kohle": 1, "Wasser": 1};
  data.Stahlkiste = {"Stahlträger": 8};
  data.Stahlspitzhacke = {"Stahlträger": 5, "Eisenstange": 2};
  data.Stahlträger = {"Eisenplatte": 5};
  data.Stahlträger = {"Eisenplatte": 5};
  data.Stein = {};
  data.Umspannwerk = {"Stahlträger": 10, "Erweiterter elektronischer Schaltkreis": 5, "Kupferplatte": 5};
  data.Verbrennungsmotorenbestandteil = {"Stahlträger": 1,"Rohr": 2, "Eisenzahnrad": 1};
  data.Wasser = {};
  data.Ziegelstein = {"Stein": 2};
  data["Alien-Wissenschaftspaket"] = {"Alien-Artefakt": 0.1};
  data["Baumaterial mit geringer Dichte"] = {"Kupferplatte": 5, "Stahlträger": 10, "Kunststoffstange": 5};
  data["Befeuerter Erzförderer"] = {"Eisenzahnrad": 3, "Schmelzofen": 1, "Eisenplatte": 3};
  data["Befeuerter Greifarm"]= {"Eisenplatte": 1, "Eisenzahnrad": 1};
  data["Einfacher Akku"] = {"Eisenplatte": 2, "Batterie": 5};
  data["Elektrischer Erzbeförderer"] = {"Schaltkreis": 3, "Eisenzahnrad": 5, "Eisenplatte": 10};
  data["Erweiterter Schaltkreis"] = {"Kunststoffstange": 2,"Schaltkreis": 2,"Kupferkabel": 4};
  data["Geschwindigkeitsmodul 1"] = {"Erweiterter Schaltkreis": 5,"Schaltkreis": 5};
  data["Geschwindigkeitsmodul 2"] = {"Geschwindigkeitsmodul 1": 4, "Prozessoreinheit": 5, "Erweiterter elektronischer Schaltkreis": 5};
  data["Geschwindigkeitsmodul 3"] = {"Geschwindigkeitsmodul 2": 2, "Erweiterter elektronischer Schaltkreis": 5, "Prozessoreinheit": 5, "Alien-Artefakt": 1};
  data["Großer Strommast"] = {"Stahlträger": 5, "Kupferplatte": 5};
  data["Intelliger Greifarm"] = {"Schaltkreis": 4,"Schneller Greifarm": 1};
  data["Kleine Pumpe"] = {"Elektromotorenbauteil": 1, "Stahlträger": 1, "Rohr": 1};
  data["Kleiner Strommast"] = {"Holzbohlen": 1, "Kupferkabel": 1};
  data["Leeres Fass"] = {"Stahlträger": 1};
  data["Mittelgroßer Strommast"] = {"Stahlräger": 1, "Kupferplatte": 1};
  data["Montagemaschine 1"] = {"Schaltkreis":3, "Eisenzahnrad": 5, "Eisenplatte": 9};
  data["Montagemaschine 2"] = {"Eisenplatte": 9, "Schaltkreis": 3, "Eisenzahnrad": 5, "Montagemaschine 1": 1};
  data["Montagemaschine 3"] = {"Geschwindigkeitsmodul 1": 4, "Montagemaschine 2": 2};
  data["Normale Munition"] = {"Eisenplatte" :2};
  data["Offshore-Pumpe"] = {"Schaltkreis": 2, "Rohr": 1, "Eisenzahnrad": 1};
  data["Produktivitätsmodul 1"] = {"Erweiterter elektronischer Schaltkreis": 5, "Schaltkreis": 5};
  data["Produktivitätsmodul 2"] = {"Produktivitätsmodul 1": 4, "Erweiterter elektronischer Schaltkreis": 5, "Prozessoreinheit": 5};
  data["Produktivitätsmodul 3"] = {"Produktivitätsmodul 2": 5, "Erweiterter elektronischer Schaltkreis": 5, "Prozessoreinheit": 5, "Alien-Artefakt": 1};
  data["Rohöl-Förderpumpe"] = {"Stahlträger": 15, "Eisenzahnrad": 10, "Schaltkreis": 10, "Rohr": 10};
  data["Schneller Greifarm"] = {"Eisenplatte": 2,"Schaltkreis": 2,"Greifarm": 1};
  data["Schnelles Fließband"] = {"Eisenzahnrad": 5, "Fließband": 1};
  data["Schnelles Teilerfließband"] = {"Teilerfließband": 1, "Eisenzahnrad": 10, "Schaltkreis": 10};
  data["Schnelles unterirdisches Fließband"] = {"Eisenzahnrad": 20, "Unterirdisches Fließband": 2};
  data["Teilerfließband"] = {"Schaltkreis": 5, "Eisenplatte": 5, "Fließband": 4};
  data["Unterirdisches Fließband"] = {"Eisenplatte": 5, "Fließband": 2.5};
  data["Unterirdisches Rohr"] = {"Rohr": 10, "Eisenplatte": 5};
  data["Wissenschaftspaket 1"] = {"Kupferplatte": 1,"Eisenzahnrad": 1};
  data["Wissenschaftspaket 2"] = {"Greifarm": 1,"Fließband": 1};
  data["Wissenschaftspaket 3"] = {"Stahlträger": 1,"Erweiterter Schaltkreis": 1,"Batterie": 1,"Intelliger Greifarm": 1};
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
