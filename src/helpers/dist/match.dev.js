"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simulateMatch = simulateMatch;

function simulateMatch(team1, team2) {
  var positionsImportance = {
    goalkeeper: {
      goalKeeping: 5,
      stability: 3,
      control: 2
    },
    'defender central': {
      steal: 4,
      stability: 5,
      control: 2,
      pass: 1,
      speed: 1,
      shoot: 0.5
    },
    'lateral left': {
      speed: 4,
      control: 3,
      steal: 3,
      pass: 2,
      stability: 2,
      shoot: 1,
      effect: 1
    },
    'lateral right': {
      speed: 4,
      control: 3,
      steal: 3,
      pass: 2,
      stability: 2,
      shoot: 1,
      effect: 1
    },
    'midfielder defensive': {
      pass: 4,
      control: 3,
      steal: 3,
      speed: 2,
      shoot: 1,
      stability: 2
    },
    'midfielder offensive': {
      pass: 4,
      control: 4,
      shoot: 3,
      speed: 3,
      stability: 1,
      effect: 1
    },
    winger: {
      speed: 5,
      control: 4,
      pass: 3,
      shoot: 2,
      effect: 1,
      stability: 1
    },
    forward: {
      shoot: 5,
      speed: 4,
      control: 3,
      pass: 2,
      stability: 1,
      effect: 1
    }
  };

  function calculateStatScore(player, importance) {
    var score = 0;

    for (var stat in importance) {
      score += player.stats[stat] * importance[stat];
    }

    return score;
  }

  function calculatePerformanceAdjustedScore(player, importance) {
    var baseScore = calculateStatScore(player, importance);
    var performanceFactor = player.performance / 100;
    var conditionFactor = player.condition / 100;
    return baseScore * performanceFactor * conditionFactor;
  }

  function calculateTeamScore(team) {
    var score = 0;

    var _loop = function _loop(position) {
      var _loop2 = function _loop2(playerId) {
        var player = team.caps.find(function (cap) {
          return cap.id === team.formation[position][playerId].capId;
        });

        if (player) {
          var playerImportance = positionsImportance[team.formation[position][playerId].type];
          score += calculatePerformanceAdjustedScore(player, playerImportance);
        }
      };

      for (var playerId in team.formation[position]) {
        _loop2(playerId);
      }
    };

    for (var position in team.formation) {
      _loop(position);
    }

    return score / Object.keys(team.formation).length;
  }

  var team1Score = calculateTeamScore(team1);
  var team2Score = calculateTeamScore(team2);

  function simulateGameEvents(team1, team2) {
    var events = [];
    var totalEvents = Math.floor(Math.random() * 5) + 5; // Between 5 and 10 events

    for (var i = 0; i < totalEvents; i++) {
      var team1EventProbability = team1Score / (team1Score + team2Score);
      var team1Event = Math.random() < team1EventProbability;
      var scoringTeam = team1Event ? team1 : team2;
      var opposingTeam = team1Event ? team2 : team1;
      var scorer = scoringTeam.caps[Math.floor(Math.random() * scoringTeam.caps.length)];
      var minute = Math.floor(Math.random() * 30) + 1; // Random minute between 1 and 30

      events.push({
        scoringTeam: scoringTeam.name,
        scorer: scorer.name,
        scorerId: scorer.id,
        minute: minute
      });
    }

    return events;
  }

  var gameEvents = simulateGameEvents(team1, team2);

  function calculateMatchStats(events) {
    var stats = {
      team1: {
        name: team1.name,
        goals: 0,
        possession: 0,
        scorers: []
      },
      team2: {
        name: team2.name,
        goals: 0,
        possession: 0,
        scorers: []
      }
    };
    var scorerMap = {
      team1: {},
      team2: {}
    };
    events.forEach(function (event) {
      var teamKey = event.scoringTeam === team1.name ? 'team1' : 'team2';
      var opposingTeamKey = teamKey === 'team1' ? 'team2' : 'team1';
      stats[teamKey].goals++;

      if (!scorerMap[teamKey][event.scorerId]) {
        scorerMap[teamKey][event.scorerId] = {
          goals: 0,
          minutes: [],
          capId: event.scorerId,
          name: event.scorer
        };
      }

      scorerMap[teamKey][event.scorerId].goals++;
      scorerMap[teamKey][event.scorerId].minutes.push(event.minute);
    });

    for (var _i = 0, _arr = ['team1', 'team2']; _i < _arr.length; _i++) {
      var teamKey = _arr[_i];
      stats[teamKey].scorers = Object.values(scorerMap[teamKey]);
    }

    var team1Possession = Math.round(team1Score / (team1Score + team2Score) * 100);
    var team2Possession = 100 - team1Possession;
    stats.team1.possession = team1Possession;
    stats.team2.possession = team2Possession;
    return stats;
  }

  var matchStats = calculateMatchStats(gameEvents);

  function reduceDurabilityAndCondition(team) {
    // Iterar sobre las posiciones en la formación del equipo
    for (var position in team.formation) {
      var _loop3 = function _loop3(playerId) {
        var capId = team.formation[position][playerId].capId;
        var cap = team.caps.find(function (cap) {
          return cap.id === capId;
        });

        if (cap) {
          var involvement = Math.random();
          var conditionReduction = Math.min(20, Math.round(involvement * 20));
          var durabilityReduction = Math.min(10, Math.round(involvement * 10));
          cap.condition = Math.max(0, cap.condition - conditionReduction);
          cap.durability = Math.max(0, cap.durability - durabilityReduction);
        }
      };

      for (var playerId in team.formation[position]) {
        _loop3(playerId);
      }
    }
  }

  reduceDurabilityAndCondition(team1);
  reduceDurabilityAndCondition(team2);
  return matchStats;
}