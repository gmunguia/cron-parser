const { compose, curryN, filter, join, map, split } = require("ramda");
const zeroFill = require("zero-fill");

const FuzzyTime = require("./FuzzyTime.js");
const Time = require("./Time.js");

// string -> [string]
const splitLines = compose(
  filter(l => l !== ""),
  map(l => l.trim()),
  split("\n")
);

// string -> [string]
const splitWords = compose(
  filter(s => s !== ""),
  split(" ")
);

// (string, Time, bool) -> string
const formatResult = (command, { hour, minute }, isToday) => {
  // From example output, minutes must be padded with leading zeros; hours must not.
  const time = `${hour}:${zeroFill(2, minute)}`;
  return `${time} ${isToday ? "today" : "tomorrow"} - ${command}`;
};

// (Time, string) -> string
const processLine = curryN(2, (currentTime, line) => {
  const [minute, hour, command] = splitWords(line);
  const { time, isSameDay } = FuzzyTime(hour, minute).nextTime(currentTime);
  return formatResult(command, time, isSameDay);
});

module.exports = (rawCurrentTime, config) => {
  const currentTime = Time.fromString(rawCurrentTime);

  return compose(
    join("\n"),
    map(processLine(currentTime)),
    splitLines
  )(config);
};
