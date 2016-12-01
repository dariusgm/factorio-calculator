'use strict';

var rootNodes = ["Eisenerz", "Kupfererz", "Wasser", "Stein", "Rohöl", "Alien-Artefakt", "Kohle", "Baumstämme"];

var dependencies = {};
dependencies.Auto = {"Verbrennungsmotorenbestandteil": 8, "Eisenplatte": 20, "Stahlträger": 5};
dependencies.Batterie = {"Eisenplatte": 1,"Kupferplatte": 1,"Schwefelsäure": 2};
dependencies.Baumstämme = {};
dependencies.Beton = {"Wasser": 10,"Eisenerz": 1, "Ziegelstein": 5};
dependencies.Chemiefabrik = {"Stahlträger": 5, "Eisenzahnrad": 5, "Schaltkreis": 5, "Rohr": 5};
dependencies.Dampfmaschine = {"Eisenzahnrad": 5, "Rohr": 5, "Eisenplatte": 5};
dependencies.Eisenkiste = {"Eisenplatte": 8};
dependencies.Eisenerz = {};
dependencies.Eisenplatte = {"Eisenerz": 1};
dependencies.Eisenspitzhacke = {"Eisenstange": 2, "Eisenplatte": 3};
dependencies.Eisenstange = {"Eisenstange": 0.5};
dependencies.Eisenzahnrad = {"Eisenplatte": 2};
dependencies.Elektromotorenbauteil = {"Schaltkreis": 2,"Verbrennungsmotorenbestandteil": 1,"Schmiermittel": 2};
dependencies.Fließband = {"Eisenplatte": 1,"Eisenzahnrad": 1};
dependencies.Geschützturm = {"Eisenzahnrad": 10, "Kupferplatte": 10, "Eisenplatte": 20};
dependencies.Greifarm = {"Eisenplatte": 1,"Schaltkreis": 1,"Eisenzahnrad": 1};
dependencies.Heizkessel = {"Schmelzofen": 1, "Rohr": 1};
dependencies.Hochofen = {"Stahlträger":8, "Ziegelstein": 10};
dependencies.Holzbohlen = {"Baumstämme": 1};
dependencies.Holzkiste = {"Holzbohlen": 4};
dependencies.Kohle = {};
dependencies.Kunststoffstange = {"Kohle": 1, "Petroleum": 3};
dependencies.Kupferkabel = {"Kupferplatte": 2}
dependencies.Kupferplatte = {"Kupfererz": 1};
dependencies.Labor = {"Schaltkreis": 10, "Eisenzahnrad": 10, "Fließband": 4};
dependencies.Lagertank = {"Eisenplatte": 20, "Stahlträger": 5};
dependencies.Lampe = {"Schaltkreis": 1, "Eisenstange": 3, "Eisenplatte": 1};
dependencies.Laserturm = {"Stahlträger": 20, "Schaltkreis": 20, "Batterie": 12};
dependencies.Lichtbogenofen = {"Stahlträger": 15, "Erweiterter elektronischer Schaltkreis": 5, "Ziegelstein": 10};
dependencies.Ölraffinierte = {"Stahlträger": 15, "Eisenzahnrad": 10, "Ziegelstein": 10, "Schaltkreis": 10, "Rohr": 10};
dependencies.Petroleum = {"Rohöl": 1};
dependencies.Pistole = {"Kupferplatte": 5, "Eisenplatte": 5};
dependencies.Prozessoreinheit = {"Erweiterter Schaltkreis": 2,"Schaltkreis": 20,"Schwefelsäure": 0.5,"Eisenzahnrad": 1};
dependencies.Radar = {"Eisenplatte": 10,"Schaltkreis": 5,"Eisenzahnrad": 5};
dependencies.Rakete = {"Schaltkreis": 1, "Sprengstoff": 2, "Eisenplatte": 2};
dependencies.Raketenbauteil = {"Baumaterial mit geringer Dichte": 10,"Raketensteuergerät": 10,"Raketentreibstoff": 10};
dependencies.Raketensilo = {"Stahlträger": 1000,"Beton": 1000,"Rohr": 100,"Prozessoreinheit": 200,"Elektromotorenbauteil": 200};
dependencies.Raketensteuergerät = {"Prozessoreinheit": 1,"Geschwindigkeitsmodul 1": 1,};
dependencies.Raketentreibstoff = {"Festbrennstoff": 10};
dependencies.Raketenwerfer = {"Eisenplatte": 5, "Eisenzahnrad": 5, "Schaltkreis": 5};
dependencies.Reperaturkit = {"Schaltkreis": 1, "Eisenzahnrad": 1};
dependencies.Rohöl = {};
dependencies.Rohr = {"Eisenplatte": 1};
dependencies.Satelit = {"Baumaterial mit geringer Dichte": 100,"Raketentreibstoff": 50,"Prozessoreinheit": 100,"Solarmodul": 100,"Einfacher Akku": 100,"Radar": 5};
dependencies.Schaltkreis = {"Eisenplatte": 1,"Kupferkabel": 3};
dependencies.Schmelzofen = {"Stein": 5};
dependencies.Schmiermittel = {"Schweröl": 1};
dependencies.Schwefel = {"Wasser": 3, "Petroleum": 3};
dependencies.Schwefelsäure = {"Schwefel": 5, "Wasser": 10, "Eisenplatte": 1};
dependencies.Schweröl = {"Rohöl": 1};
dependencies.Sprengstoff = {"Schwefel": 1, "Kohle": 1, "Wasser": 1};
dependencies.Stahlkiste = {"Stahlträger": 8};
dependencies.Stahlspitzhacke = {"Stahlträger": 5, "Eisenstange": 2};
dependencies.Stahlträger = {"Eisenplatte": 5};
dependencies.Stein = {};
dependencies.Umspannwerk = {"Stahlträger": 10, "Erweiterter elektronischer Schaltkreis": 5, "Kupferplatte": 5};
dependencies.Verbrennungsmotorenbestandteil = {"Stahlträger": 1,"Rohr": 2, "Eisenzahnrad": 1};
dependencies.Wasser = {};
dependencies.Ziegelstein = {"Stein": 2};
dependencies["Alien-Artefakt"] = {};
dependencies["Alien-Wissenschaftspaket"] = {"Alien-Artefakt": 0.1};
dependencies["Baumaterial mit geringer Dichte"] = {"Kupferplatte": 5, "Stahlträger": 10, "Kunststoffstange": 5};
dependencies["Befeuerter Erzförderer"] = {"Eisenzahnrad": 3, "Schmelzofen": 1, "Eisenplatte": 3};
dependencies["Befeuerter Greifarm"]= {"Eisenplatte": 1, "Eisenzahnrad": 1};
dependencies["Einfacher Akku"] = {"Eisenplatte": 2, "Batterie": 5};
dependencies["Elektrischer Erzbeförderer"] = {"Schaltkreis": 3, "Eisenzahnrad": 5, "Eisenplatte": 10};
dependencies["Erweiterter Schaltkreis"] = {"Kunststoffstange": 2,"Schaltkreis": 2,"Kupferkabel": 4};
dependencies["Geschwindigkeitsmodul 1"] = {"Erweiterter Schaltkreis": 5,"Schaltkreis": 5};
dependencies["Geschwindigkeitsmodul 2"] = {"Geschwindigkeitsmodul 1": 4, "Prozessoreinheit": 5, "Erweiterter elektronischer Schaltkreis": 5};
dependencies["Geschwindigkeitsmodul 3"] = {"Geschwindigkeitsmodul 2": 2, "Erweiterter elektronischer Schaltkreis": 5, "Prozessoreinheit": 5, "Alien-Artefakt": 1};
dependencies["Großer Strommast"] = {"Stahlträger": 5, "Kupferplatte": 5};
dependencies["Intelliger Greifarm"] = {"Schaltkreis": 4,"Schneller Greifarm": 1};
dependencies["Kleine Pumpe"] = {"Elektromotorenbauteil": 1, "Stahlträger": 1, "Rohr": 1};
dependencies["Kleiner Strommast"] = {"Holzbohlen": 1, "Kupferkabel": 1};
dependencies["Leeres Fass"] = {"Stahlträger": 1};
dependencies["Mittelgroßer Strommast"] = {"Stahlräger": 1, "Kupferplatte": 1};
dependencies["Montagemaschine 1"] = {"Schaltkreis":3, "Eisenzahnrad": 5, "Eisenplatte": 9};
dependencies["Montagemaschine 2"] = {"Eisenplatte": 9, "Schaltkreis": 3, "Eisenzahnrad": 5, "Montagemaschine 1": 1};
dependencies["Montagemaschine 3"] = {"Geschwindigkeitsmodul 1": 4, "Montagemaschine 2": 2};
dependencies["Normale Munition"] = {"Eisenplatte" :2};
dependencies["Offshore-Pumpe"] = {"Schaltkreis": 2, "Rohr": 1, "Eisenzahnrad": 1};
dependencies["Produktivitätsmodul 1"] = {"Erweiterter elektronischer Schaltkreis": 5, "Schaltkreis": 5};
dependencies["Produktivitätsmodul 2"] = {"Produktivitätsmodul 1": 4, "Erweiterter elektronischer Schaltkreis": 5, "Prozessoreinheit": 5};
dependencies["Produktivitätsmodul 3"] = {"Produktivitätsmodul 2": 5, "Erweiterter elektronischer Schaltkreis": 5, "Prozessoreinheit": 5, "Alien-Artefakt": 1};
dependencies["Rohöl-Förderpumpe"] = {"Stahlträger": 15, "Eisenzahnrad": 10, "Schaltkreis": 10, "Rohr": 10};
dependencies["Schneller Greifarm"] = {"Eisenplatte": 2,"Schaltkreis": 2,"Greifarm": 1};
dependencies["Schnelles Fließband"] = {"Eisenzahnrad": 5, "Fließband": 1};
dependencies["Schnelles Teilerfließband"] = {"Teilerfließband": 1, "Eisenzahnrad": 10, "Schaltkreis": 10};
dependencies["Schnelles unterirdisches Fließband"] = {"Eisenzahnrad": 20, "Unterirdisches Fließband": 2};
dependencies["Teilerfließband"] = {"Schaltkreis": 5, "Eisenplatte": 5, "Fließband": 4};
dependencies["Unterirdisches Fließband"] = {"Eisenplatte": 5, "Fließband": 2.5};
dependencies["Unterirdisches Rohr"] = {"Rohr": 10, "Eisenplatte": 5};
dependencies["Wissenschaftspaket 1"] = {"Kupferplatte": 1,"Eisenzahnrad": 1};
dependencies["Wissenschaftspaket 2"] = {"Greifarm": 1,"Fließband": 1};
dependencies["Wissenschaftspaket 3"] = {"Stahlträger": 1,"Erweiterter Schaltkreis": 1,"Batterie": 1,"Intelliger Greifarm": 1};

// Append to document
window.dependencies = dependencies;
window.rootNodes = rootNodes;
