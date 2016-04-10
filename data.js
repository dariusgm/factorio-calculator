$( document ).ready( function() {
  window.data = {};


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

  $("#singlebutton").click(function(event) {
    event.preventDefault()
    var auswahl = $("#selectbasic").val();
    var daten = window.data[auswahl]
    var level = 10;
    var result = {};
    for (var i = 0; i < level; i++) {
      if (daten != undefined) {
        var internal = Object.getOwnPropertyNames(daten)
        for (var c = 0; c < internal.length; c++ ) {
          var obj = window.data[internal[c]]
          if (obj) {
            if (result[obj]) {
              console.log("Existing obj: " + JSON.stringify(obj))
            } else {
              // console.log("New obj: " + JSON.stringify(obj));
             for(elem in obj) {
               if (result[elem]) {
                 result[elem] = obj[elem] + result[elem]
                 console.log("Merging obj: " + JSON.stringify(obj));
               } else {
                   result[elem] = obj[elem]
                   console.log("Pushing obj: " + JSON.stringify(obj));
               }
             }
            }
          }
          else { console.log("Skipped obj: " + internal[c]) }
        }
        daten = result;
     }
     console.log(JSON.stringify(result))
    }
  });
});

$( document ).ready( function() {
    var result = [];

    var all = (Object.getOwnPropertyNames(window.data));
    for (var i = 0, len = all.length; i < len; i++) {
      if (! result.includes(all[i])) {
        result.push(all[i])
        var internal = Object.getOwnPropertyNames(window.data[all[i]])

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
});
