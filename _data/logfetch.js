const date = new Date();
const twoHour = date.getTime() - 4 * 60 * 1000 * 60;
const oneMinute = 60 * 1000;
var result = [];
for (var i = twoHour; i < date.getTime(); i += 5 * oneMinute) {
  result.push({
    date: new Date(i),
    humidity: Math.floor(Math.random() * 20) + 5,
    temperatue: Math.floor(Math.random() * 70) + 30,
  });
}
console.log(result);
