const { tagged } = require("daggy");
const { xprod, range } = require("ramda");
const Time = require("./Time.js");

// { hour:: string, minute:: string }
const FuzzyTime = tagged("FuzzyTime", ["hour", "minute"]);

// FuzzyTime ~> () -> [Time]
FuzzyTime.toTimes = ({ hour, minute }) => {
  const hours = hour === "*" ? range(0, 24) : [parseInt(hour, 10)];
  const minutes = minute === "*" ? range(0, 60) : [parseInt(minute, 10)];

  return xprod(hours, minutes).map(([h, m]) => Time(h, m));
};

FuzzyTime.prototype.toTimes = function() {
  return FuzzyTime.toTimes(this);
};

// FuzzyTime ~> Time -> { Time, isSameDay }
FuzzyTime.nextTime = (fuzzyTime, offset) => {
  const candidates = fuzzyTime.toTimes();

  const todayTime = candidates.find(time => time.gte(offset));

  return todayTime
    ? { time: todayTime, isSameDay: true }
    : { time: candidates[0], isSameDay: false };
};

FuzzyTime.prototype.nextTime = function(offset) {
  return FuzzyTime.nextTime(this, offset);
};

module.exports = FuzzyTime;
