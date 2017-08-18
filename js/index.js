const size = 3;
const sqs = 9;
let comp = ''
let human = ''
let grid = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];


$(".btn-large").click(function () {
  let that = this.id;
  if (grid[Number(this.id)] === " ") {
    grid[Number(this.id)] = human
    showMove(this.id, human);
    let check = checkForWinner(grid)
    if (check != undefined) {
      if (check === 'X') {
        alert("X WINS")
        reset()
      } else if (check === 'O') {
        alert("O WINS")
        reset()
      } else if (check === '0') {
        alert("DRAW")
        reset()
      }
    } else {
      callComp(grid)
    }
  }
});

function minimax(arr, depth, comp) {
  let test = checkForWinner(arr)
  if (test != undefined) {
    if (test === 'X') {
      return -10 + depth
    }
    if (test === 'O') {
      return 10 - depth
    }
    if (test === '0') {
      return 0
    }
  }
  if (comp) {
    let max = -100000000
    for (var i = 0; i < 9; i++) {
      if (arr[i] === " ") {
        let copy = arr.slice()
        copy[i] = 'O'
        max = Math.max(max, minimax(copy, depth + 1, false))
      }
    }
    return max;
  }
  if (!comp) {
    let best = 100000000
    for (var i = 0; i < 9; i++) {
      if (arr[i] === " ") {
        let copy = arr.slice()
        copy[i] = 'X'
        best = Math.min(best, minimax(copy, depth + 1, true))
      }
    }
    return best;
  }
}

function callComp(arr) {
  let compMove = 0
  let scoreTracker = -10000000
  for (var i = 0; i < 9; i++) {
    if (arr[i] === " ") {
      let copy = arr.slice()
      copy[i] = 'O'
      let bestScore = minimax(copy, 0, false)
      if (bestScore > scoreTracker) {
        scoreTracker = JSON.parse(JSON.stringify(bestScore))
        compMove = JSON.parse(JSON.stringify(i))
      }
    }
  }
  grid[compMove] = comp;
  showMove(compMove.toString(), comp)
  let test1 = checkForWinner(grid)
  if (test1 != undefined) {
    if (test1 === 'X') {
      alert("X WINS")
      reset()
    }
    if (test1 === 'O') {
      alert("O WINS")
      reset()
    }
    if (test1 === '0') {
      alert("DRAW")
      reset()
    }
  }
}

function checkForWinner(arr) {
  const table = document.getElementById('mytab1');
  for (var i = 0; i < sqs; i += 3) {
    if (arr[i] === arr[i + 1] &&
      arr[i] === arr[i + 2] && arr[i] != " ") {
      return arr[i]
    }
  }
  //col
  for (var i = 0; i < size; i++) {
    if (arr[i] === arr[i + 3] &&
      arr[i] === arr[i + 6] && arr[i] != " ") {
      return arr[i]
    }
  }
  //diag
  if (arr[0] === arr[4] &&
    arr[0] === arr[8] && arr[0] != " ") {
    return arr[0]
  }

  //anti-diag
  if (arr[2] === arr[4] &&
    arr[2] === arr[6] && arr[2] != " ") {
    return arr[2]
  }
  //draw
  if (isFilled(arr)) {
    return "0"
  }
}

function isFilled(arr) {
  for (var i = 0; i < sqs; i++) {
    if (arr[i] === " ") {
      return false
    }
  }
  return true
}

function reset() {
  grid = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  for (var i = 0; i < sqs; i++) {
    document.getElementById(i).innerHTML = "<span class='thing'></span>";
  }
}
$('.reset').click(function () {
  comp = ''
  human = ''
  $("#game").css({ "visibility": "hidden" });
  $(".relative").css({ "visibility": "visible" });
  reset()
});
$('.cross').click(function () {
  comp = 'O'
  human = 'X'
  $("#game").css({ "visibility": "visible" });
  $(".relative").css({ "visibility": "hidden" });
});
$('.circle').click(function () {
  comp = 'X'
  human = 'O'
  callComp(grid)
  $("#game").css({ "visibility": "visible" });
  $(".relative").css({ "visibility": "hidden" });
});
function showMove(id, p) {
  document.getElementById(id).innerHTML = "<span class='thing' id='" + id
    + "c'>" + p + "</span>";
  var elem = document.getElementById(id + 'c');
  elem.style.opacity = 1;
}