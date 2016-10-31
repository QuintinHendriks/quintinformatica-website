$(function() {
  var draw = false;
  var generation = 0;
  var interval;
  var alive = 0;
  var neighbours = [];
  var field = [];
  var temp = [];
  var template = [];
  var size = 40;
  var speed = 1000;
  var spd;
  var playing = false;
  $('#field').css('width', size * 20);
  $('#wrapper').css('width', size * 20);

  function createField() {
    for (var i = 0; i < size; i++) {
      field.push([]);
      for (var j = 0; j < size; j++) {
        field[i].push(false);
      }
    }

    for (var k = field.length - 1; k >= 0; k--) {
      $('#field').append('<section class="row" id="row' + k + '"></section>');
      for (var l = 0; l < field[k].length; l++) {
        $('#row' + k).append('<div class="cell" id="' + l + 'i' + k + '">&nbsp;</div>');
      }
    }
  }
  createField();

  //define who are the neighbouring cells for each cell
  function createNeighbours(b, a, arr) {
    if (b === 0 && a === 0) {
      neighbours.push(
        arr[size - 1][b],
        arr[a + 1][b],
        arr[a][size - 1],
        arr[a][b + 1],
        arr[a + 1][b + 1],
        arr[size - 1][size - 1],
        arr[size - 1][b + 1],
        arr[a + 1][size - 1]
      );
    } else if (b === 0 && a > 0 && a < size - 1) {
      neighbours.push(
        arr[a - 1][b],
        arr[a + 1][b],
        arr[a][size - 1],
        arr[a][b + 1],
        arr[a + 1][b + 1],
        arr[a - 1][size - 1],
        arr[a - 1][b + 1],
        arr[a + 1][size - 1]
      );

    } else if (a === 0 && b > 0 && b < size - 1) {
      neighbours.push(
        arr[size - 1][b],
        arr[a + 1][b],
        arr[a][b - 1],
        arr[a][b + 1],
        arr[a + 1][b + 1],
        arr[size - 1][b - 1],
        arr[size - 1][b + 1],
        arr[a + 1][b - 1]
      );

    } else if (a === size - 1 && b > 0 && b < size - 1) {
      neighbours.push(
        arr[a - 1][b],
        arr[0][b],
        arr[a][b - 1],
        arr[a][b + 1],
        arr[0][b + 1],
        arr[a - 1][b - 1],
        arr[a - 1][b + 1],
        arr[0][b - 1]
      );
    } else if (b === size - 1 && a > 0 && a < size - 1) {
      neighbours.push(
        arr[a - 1][b],
        arr[a + 1][b],
        arr[a][b - 1],
        arr[a][0],
        arr[a + 1][0],
        arr[a - 1][b - 1],
        arr[a - 1][0],
        arr[a + 1][b - 1]
      );
    } else if (b === size - 1 && a === size - 1) {
      neighbours.push(
        arr[a - 1][b],
        arr[0][b],
        arr[a][b - 1],
        arr[a][0],
        arr[0][0],
        arr[a - 1][b - 1],
        arr[a - 1][0],
        arr[0][b - 1]
      );
    } else if (a === 0 && b === size - 1) {
      neighbours.push(
        arr[size - 1][b],
        arr[a + 1][b],
        arr[a][b - 1],
        arr[a][0],
        arr[a + 1][0],
        arr[size - 1][b - 1],
        arr[size - 1][0],
        arr[a + 1][b - 1]
      );
    } else if (a === size - 1 && b === 0) {
      neighbours.push(
        arr[a - 1][b],
        arr[0][b],
        arr[a][size - 1],
        arr[a][b + 1],
        arr[0][b + 1],
        arr[a - 1][size - 1],
        arr[a - 1][b + 1],
        arr[0][size - 1]
      );
    } else {
      neighbours.push(
        arr[a - 1][b],
        arr[a + 1][b],
        arr[a][b - 1],
        arr[a][b + 1],
        arr[a + 1][b + 1],
        arr[a - 1][b - 1],
        arr[a - 1][b + 1],
        arr[a + 1][b - 1]
      );
    }
  }

  $('.cell').attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
  
  $('.cell').on('mousedown', function() {
    draw = true;
    var a = parseInt($(this).attr('id').split('i')[0]);
    var b = parseInt($(this).attr('id').split('i')[1]);
    change(a, b);
  });
  
  $('.cell').on('mouseover', function() {
    if(draw === true){
      var a = parseInt($(this).attr('id').split('i')[0]);
      var b = parseInt($(this).attr('id').split('i')[1]);
      change(a, b);
    }
  });
  
  $('body').on('mouseup', function() {
    draw = false
  });

  function change(a, b) {
    field[b][a] = !field[b][a];
    if (field[b][a] === true) {
      $('#' + a + 'i' + b).css('background', 'yellow');
    } else {
      $('#' + a + 'i' + b).css('background', 'grey');
    }
  }

  function createTemplate() {
    template = [];
    for (var i = 0; i < size; i++) {
      template.push([]);
      for (var j = 0; j < size; j++) {
        template[i].push(false);
      }
    }
  }

  function display(poep) {
    for (var x = 0; x < poep.length; x++) {
      for (var y = 0; y < poep[x].length; y++) {
        if (poep[y][x] === true) {
          $('#' + x + 'i' + y).css('background', 'yellow');
        } else {
          $('#' + x + 'i' + y).css('background', 'grey');
        }
      }
    }
  }

  function next() {
    createTemplate();
    temp = template;
    for (var i = 0; i < field.length; i++) {
      for (var j = 0; j < field[i].length; j++) {
        createNeighbours(j, i, field);
        for (var k = 0; k < neighbours.length; k++) {
          if (neighbours[k] === true) {
            alive++;
          }
          if (neighbours[k] === undefined) {
            corner = true;
          }
        }
        if (field[i][j] === true && alive < 2) {
          temp[i][j] = false;
        } else if (field[i][j] === true && alive >= 4) {
          temp[i][j] = false;
        } else if (field[i][j] === true && alive === 2) {
          temp[i][j] = true;
        } else if (field[i][j] === true && alive === 3) {
          temp[i][j] = true;
        } else if (field[i][j] === false && alive === 3) {
          temp[i][j] = true;
        }
        alive = 0;
        neighbours = [];
      }
    }
    generation++;
    $('p').text('Generation: ' + generation);
    field = temp;
    display(field);
  }

  function play() {
    playing = true;
    spd = parseInt(document.getElementById('spdAmount').value);
    interval = setInterval(function() {
      next();
    }, speed / spd)
  }

  function clear() {
    field = [];
    temp = [];
    createTemplate();
    field = template;
    display(field);
    clearInterval(interval);
    playing = false;
    generation = 0;
    $('p').text('Generation: ' + generation);
    $('#play').text('Play');
  }

  function generateRandom() {
    generation = 0;
    $('p').text('Generation: ' + generation);
    field = [];
    temp = [];
    createTemplate();
    field = template;
    for (var i = 0; i < field.length; i++) {
      for (var j = 0; j < field[i].length; j++) {
        var rand = Math.floor(Math.random() * (2) - 1);
        if (rand === 0) {
          field[i][j] = false;
        } else {
          field[i][j] = true;
        }
      }
      display(field);
    }
  };

  $('#random').on('click', function() {
    generateRandom();
  });

  $('#next').on('click', function() {
    next();
  });

  $('#clear').on('click', function() {
    clear();
  });

  $('#play').on('click', function() {
    if (playing === false) {
      $('#play').text('Pause');
      play();
    } else {
      clearInterval(interval);
      playing = false;
      $('#play').text('Play');
    }
  });

  $('#test').on('click', function() {
    console.log(field);
  });
});