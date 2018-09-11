const { tagged } = require("daggy");

// { hour:: int, minute:: int }
const Time = tagged("Time", ["hour", "minute"]);

// string -> Time
Time.fromString = rawTime => {
  const [hour, minute] = rawTime.split(":").map(x => parseInt(x, 10));
  return Time(hour, minute);
};

// Time -> int
Time.toMinutes = ({ hour, minute }) => hour * 60 + minute;

Time.prototype.toMinutes = function() {
  return Time.toMinutes(this);
};

// Time -> bool
Time.gte = (a, b) => a.toMinutes() >= b.toMinutes();

Time.prototype.gte = function(b) {
  return Time.gte(this, b);
};

module.exports = Time;
