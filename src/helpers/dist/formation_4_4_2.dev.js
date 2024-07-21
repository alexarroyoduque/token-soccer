"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.positionCounter = exports.positionMap = exports.formation = void 0;
var formation = {
  id: '4-4-2',
  goalkeepers: {
    goalkeeper: {
      type: 'goalkeeper',
      capId: ''
    }
  },
  defenders: {
    defender1: {
      type: 'defender central',
      capId: ''
    },
    defender2: {
      type: 'defender central',
      capId: ''
    },
    defender3: {
      type: 'lateral left',
      capId: ''
    },
    defender4: {
      type: 'lateral right',
      capId: ''
    }
  },
  midfielders: {
    midfielder1: {
      type: 'midfielder defensive',
      capId: ''
    },
    midfielder2: {
      type: 'midfielder defensive',
      capId: ''
    },
    midfielder3: {
      type: 'midfielder offensive',
      capId: ''
    },
    midfielder4: {
      type: 'midfielder offensive',
      capId: ''
    }
  },
  attackers: {
    attacker1: {
      type: 'forward',
      capId: ''
    },
    attacker2: {
      type: 'forward',
      capId: ''
    }
  }
}; // Asignar capId a la formación

exports.formation = formation;
var positionMap = {
  goalkeeper: ['goalkeepers.goalkeeper'],
  defender: ['defenders.defender1', 'defenders.defender2', 'defenders.defender3', 'defenders.defender4'],
  'midfielder defensive': ['midfielders.midfielder1', 'midfielders.midfielder2'],
  'midfielder offensive': ['midfielders.midfielder3', 'midfielders.midfielder4'],
  forward: ['attackers.attacker1', 'attackers.attacker2']
};
exports.positionMap = positionMap;
var positionCounter = {
  goalkeeper: 0,
  defender: 0,
  'midfielder defensive': 0,
  'midfielder offensive': 0,
  forward: 0
};
exports.positionCounter = positionCounter;