let numStat = new Map();
let extraStat = new Map();
let history = [];

window.onload = function () {
  generate();
};

function generate() {
  numStat = new Map();
  extraStat = new Map();
  var gl = generateSetsList(3490, 37);
  let best = findPopularSet(gl);
  document.getElementById("weight").innerHTML = "( " + best.weight + " )";
  document.getElementById("genNumber").innerHTML = best.pSet;

  var gel = generateExtrassList(1000, 7);
  let bestExtra = findPopularExtra(gel);
  document.getElementById("extra").innerHTML = bestExtra.pSet;
  history.push({
    weight: best.weight,
    popSet: best.pSet,
    extra: bestExtra.pSet,
  });

  history.sort(function (a, b) {
    return b.weight - a.weight;
  });

  var histData = history.map(
    (x) =>
      "<li><h3> (" +
      x.weight +
      ") " +
      x.popSet +
      " --> " +
      x.extra +
      "</h3></li>"
  );
  document.getElementById("hData").innerHTML = histData;
}

function generateSetsList(listSize, maxBall) {
  var listResults = [];
  for (let i = 0; i < listSize; i++) {
    listResults.push(generateOneSet(maxBall));
  }
  return listResults;
}

function generateOneSet(maxBall) {
  var resultList = [];
  for (let i = 1; i < 7; i++) {
    let num = Math.floor(Math.random() * maxBall) + 1;
    if (!resultList.includes(num)) {
      resultList.push(num);
      numStat.set(
        num,
        numStat.get(num) !== undefined ? numStat.get(num) + 1 : 1
      );
    } else {
      i--;
    }
  }

  resultList.sort(function (a, b) {
    return a - b;
  });

  return resultList;
}

function findPopularSet(lr) {
  let popSet = [];
  let maxWeight = 0;
  lr.forEach((element) => {
    let w = 0;
    element.forEach((e) => {
      w += numStat.get(e);
    });
    if (w > maxWeight) {
      maxWeight = w;
      popSet = element;
    }
  });
  return { pSet: popSet, weight: maxWeight };
}

function generateExtrassList(listSize, maxBall) {
  var listResults = [];
  for (let i = 0; i < listSize; i++) {
    listResults.push(generateOneExtraSet(maxBall));
  }
  return listResults;
}

function generateOneExtraSet(maxBall) {
  var resultList = [];
  for (let i = 0; i < 1; i++) {
    let num = Math.floor(Math.random() * maxBall) + 1;
    if (!resultList.includes(num)) {
      resultList.push(num);
      extraStat.set(
        num,
        extraStat.get(num) !== undefined ? extraStat.get(num) + 1 : 1
      );
    } else {
      i--;
    }
  }

  resultList.sort(function (a, b) {
    return a - b;
  });

  return resultList;
}

function findPopularExtra(lr) {
  let popSet = [];
  let maxWeight = 0;
  lr.forEach((element) => {
    let w = 0;
    element.forEach((e) => {
      w += numStat.get(e);
    });
    if (w > maxWeight) {
      maxWeight = w;
      popSet = element;
    }
  });
  return { pSet: popSet, weight: maxWeight };
}
