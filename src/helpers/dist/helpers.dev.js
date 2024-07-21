"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterByIds = filterByIds;
exports.findIndex = findIndex;
exports.calculatePerformance = calculatePerformance;
exports.getSquadMedia = getSquadMedia;
exports.getFormation = getFormation;
Object.defineProperty(exports, "simulateMatch", {
  enumerable: true,
  get: function get() {
    return _match.simulateMatch;
  }
});

var _match = require("./match.js");

var _formation_4_4_ = require("./formation_4_4_2.js");

var _formation_4_3_ = require("./formation_4_3_3.js");

function filterByIds(arrayIds, collection) {
  return arrayIds.map(function (id) {
    return collection.find(function (item) {
      return item.id === id;
    });
  });
}

function findIndex(collection, element) {
  return collection.indexOf(element);
}

function calculatePerformance(ids, collection) {
  var caps = filterByIds(ids, collection);
  caps.forEach(function (cap) {
    if (cap.positionActive === 'bench' || cap.positionActive === 'reserve') {
      cap.performance = 100;
      cap.mediaReal = cap.media;
    } else if (cap.positionFavorite !== cap.positionActive) {
      cap.performance = 60;
      cap.mediaReal = Math.floor(cap.media * (cap.performance / 100));
    } else {
      cap.performance = 100;
      cap.mediaReal = cap.media;
    }
  });
}

function getSquadMedia(caps, ids) {
  // Filtrar los objetos según los IDs proporcionados
  var filteredObjects = caps.filter(function (obj) {
    return ids.includes(obj.id);
  }); // Calcular la suma de los valores de media

  var sumMedia = filteredObjects.reduce(function (acc, obj) {
    return acc + obj.mediaReal;
  }, 0); // Calcular la media

  var mediaSquad = Math.floor(sumMedia / filteredObjects.length);
  return mediaSquad;
}

var formations = {
  '4-4-2': {
    formation: _formation_4_4_.formation,
    positionMap: _formation_4_4_.positionMap,
    positionCounter: _formation_4_4_.positionCounter
  },
  '4-3-3': {
    formation: _formation_4_3_.formation,
    positionMap: _formation_4_3_.positionMap,
    positionCounter: _formation_4_3_.positionCounter
  }
};

function getFormation(tactic) {
  return formations[tactic];
}