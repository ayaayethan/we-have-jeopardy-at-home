module.exports.createUserArray = (users) => {
  let arr = [];

  for (key in users) {
    arr.push(users[key]);
  }

  return arr;
}