$(function () {
    //assign varibles
    var pieces = ["pion", "tower", "horse", "bishop", "queen", "king", "bishop", "horse", "tower"];
    var field = [];
    var turn = 0;
    var path = [];
    var selected = '';
    var destination = '';
    var piece = '';
    var kingpos = '';


    //show whose turn it is
    setInterval(function () {
     if (turn === 0) {
     $("#test").text('white turn');
     } else {
     $("#test").text('black turn');
     }
     }, 100);

    //creates the board
    function createBoard() {
        for (var i = 7; i >= 0; i--) {
            $("#board").append("<div id='row" + i + "' class='row'></div>");
            for (var j = 0; j < 8; j++) {
                if (i % 2 === 0) {
                    if (j % 2 === 0) {
                        $("#row" + i).append("<div id='" + j + "i" + i + "' class='fieldw field'></div>");
                    } else if (j % 2 !== 0) {
                        $("#row" + i).append("<div id='" + j + "i" + i + "' class='fieldb field'></div>");
                    }
                } else {
                    if (j % 2 !== 0) {
                        $("#row" + i).append("<div id='" + j + "i" + i + "' class='fieldw field'></div>");
                    } else if (j % 2 === 0) {
                        $("#row" + i).append("<div id='" + j + "i" + i + "' class='fieldb field'></div>");
                    }
                }
            }
        }
    }

    createBoard();

    //places the pieces on the board and makes an array of all the pieces and positions
    function placePieces() {
        for(var i=0; i< 6; i++) {
            $(".field").removeClass(pieces[i] + "b").removeClass(pieces[i] + "w").removeClass("empty").removeClass('path');
        }
        field = [];
        for (var i = 0; i < 8; i++) {
            field.push([]);
            for (var j = 0; j < 8; j++) {
                if (i === 0) {
                    field[i].push(pieces[1 + j] + "b");
                    $('#' + i + "i" + j).addClass(pieces[1 + j] + "b");
                } else if (i === 7) {
                    field[i].push(pieces[1 + j] + "w");
                    $('#' + i + "i" + j).addClass(pieces[1 + j] + "w");
                } else if (i === 6) {
                    field[i].push(pieces[0] + "w");
                    $('#' + i + "i" + j).addClass(pieces[0] + "w");
                } else if (i === 1) {
                    field[i].push(pieces[0] + "b");
                    $('#' + i + "i" + j).addClass(pieces[0] + "b");
                } else {
                    field[i].push(0);
                    $('#' + i + "i" + j).addClass("empty");
                }
            }
        }
    }

    placePieces();

    //creates the range of movement for every piece
    function createpath(x, y, a) {
        path = [];
        if (a === 'pionb') {
            if (field[x + 1][y] === 0) {
                path.push((x + 1) + 'i' + y);
            }
            if (x === 1 && field[x + 1][y] === 0 && field[x + 2][y] === 0) {
                path.push((x + 2) + 'i' + y);
            }
            if (y < 7 && field[x + 1][y + 1][field[x + 1][y + 1].length - 1] === 'w') {
                path.push((x + 1) + 'i' + (y + 1));
            }
            if (y > 0 && field[x + 1][y - 1][field[x + 1][y - 1].length - 1] === 'w') {
                path.push((x + 1) + 'i' + (y - 1));
            }
        }

        if (a === "pionw") {
            if (field[x - 1][y] === 0) {
                path.push((x - 1) + 'i' + y);
            }
            if (x === 6 && field[x - 1][y] === 0 && field[x - 2][y] === 0) {
                path.push((x - 2) + 'i' + y);
            }
            if (y < 7 && field[x - 1][y + 1][field[x - 1][y + 1].length - 1] === 'b') {
                path.push((x - 1) + 'i' + (y + 1));
            }
            if (y > 0 && field[x - 1][y - 1][field[x - 1][y - 1].length - 1] === 'b') {
                path.push((x - 1) + 'i' + (y - 1));
            }
        }

        if (a === "towerw" || a === 'towerb') {
            path.push('tower');
            for (var i = 1; i < 8; i++) {
                path.push(
                    x + 'i' + (y - i),
                    x + 'i' + (y + i),
                    (x - i) + 'i' + y,
                    (x + i) + 'i' + y
                );
            }
            clearpath();
        }

        if (a === "horseb" || a === 'horsew') {
            path.push(
                (x + 2) + 'i' + (y + 1),
                (x + 2) + 'i' + (y - 1),
                (x - 2) + 'i' + (y + 1),
                (x - 2) + 'i' + (y - 1),
                (x + 1) + 'i' + (y + 2),
                (x + 1) + 'i' + (y - 2),
                (x - 1) + 'i' + (y + 2),
                (x - 1) + 'i' + (y - 2)
            );
        }

        if (a === 'bishopb' || a === 'bishopw') {
            path.push('bishop');
            for (var i = 1; i < 9; i++) {
                path.push(
                    (x + i) + 'i' + (y - i),
                    (x + i) + 'i' + (y + i),
                    (x - i) + 'i' + (y - i),
                    (x - i) + 'i' + (y + i)
                );
            }
            clearpath();
        }

        if (a === "queenw" || a === "queenb") {
            path.push('queen');
            for (var i = 1; i < 9; i++) {
                path.push(
                    (x + i) + 'i' + (y + i),
                    (x + i) + 'i' + (y - i),
                    (x - i) + 'i' + (y + i),
                    (x - i) + 'i' + (y - i),
                    x + 'i' + (y - i),
                    x + 'i' + (y + i),
                    (x - i) + 'i' + y,
                    (x + i) + 'i' + y
                );
            }
            clearpath();
        }

        if (a === "kingb" || a === 'kingw') {
            path.push(
                x + "i" + (y + 1),
                x + "i" + (y - 1),
                (x + 1) + "i" + y,
                (x + 1) + 'i' + (y + 1),
                (x + 1) + 'i' + (y - 1),
                (x - 1) + "i" + y,
                (x - 1) + "i" + (y + 1),
                (x - 1) + "i" + (y - 1)
            );
        }
    }

    //clears the path of spots the pieces can't actually go to (only applies to bishop tower and queen)
    function clearpath() {
        if (path[0] === 'tower' || path[0] === 'bishop') {
            var arr0 = [];
            var arr1 = [];
            var arr2 = [];
            var arr3 = [];
            var walls = [];
            for (var i = 0; i < path.length; i++) {
                var j = i % 4;
                eval('arr' + j).push(path[i]);
            }

            for (var i = 0; i < 8; i++) {
                for (var j = 0; j < 8; j++) {
                    if (field[i][j] !== 0) {
                        walls.push(i + 'i' + j);
                    }
                }
            }

            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < walls.length; j++) {
                    if (eval('arr' + i).indexOf(walls[j]) !== -1) {
                        eval('arr' + i).splice(eval('arr' + i).indexOf(walls[j]) + 1);
                    }
                }
            }
            path = arr0.concat(arr1, arr2, arr3);
        }

        else if (path[0] === 'queen') {
            arr0 = [];
            arr1 = [];
            arr2 = [];
            arr3 = [];
            var arr4 = [];
            var arr5 = [];
            var arr6 = [];
            var arr7 = [];
            walls = [];

            for (var i = 0; i < path.length; i++) {
                var j = i % 8;
                eval('arr' + j).push(path[i]);
            }

            for (var i = 0; i < 8; i++) {
                for (var j = 0; j < 8; j++) {
                    if (field[i][j] !== 0) {
                        walls.push(i + 'i' + j);
                    }
                }
            }

            for (var i = 0; i < 8; i++) {
                for (var j = 0; j < walls.length; j++) {
                    if (eval('arr' + i).indexOf(walls[j]) !== -1) {
                        eval('arr' + i).splice(eval('arr' + i).indexOf(walls[j]) + 1);
                    }
                }
            }
            path = arr0.concat(arr1, arr2, arr3, arr4, arr5, arr6, arr7);
        }
    }

    //displays the current piece's range of movement
    function showpath() {
        for (var i = 0; i < path.length; i++) {
            var c = parseInt(path[i].split('i')[0]);
            var d = parseInt(path[i].split('i')[1]);
            $("#" + c + 'i' + d).addClass('path');
        }
    }

    //move function
    function move(x, y, a, b) {
        destination = x + 'i' + y;
        piece = field[parseInt(a.split('i')[0])][parseInt(a.split('i')[1])];
        field[x][y] = piece;
        field[parseInt(a.split("i")[0])][parseInt(a.split("i")[1])] = 0;
        if (checkCheck(b)) {
            window.alert("Can't make that move!");
            field[x][y] = 0;
            field[parseInt(a.split('i')[0])][parseInt(a.split('i')[1])] = piece;
            $('.field').removeClass('path');
        }
        else {
            $("#" + a).removeClass(piece).addClass("empty");
            $("#" + destination).removeClass("empty").addClass(piece);
            $(".field").removeClass('path');
            selected = '';
            piece = '';
            turn = b === 0 ? 1 : 0;
        }
        selected = '';
        piece = '';
    }

    //slay function
    function slay(x, y, a, b) {
        var destination = x + 'i' + y;
        var slain = field[x][y];
        piece = field[parseInt(a.split('i')[0])][parseInt(a.split('i')[1])];
        field[x][y] = piece;
        field[parseInt(a.split("i")[0])][parseInt(a.split("i")[1])] = 0;
        if (checkCheck(b)) {
            window.alert("Can't make that move!");
            field[x][y] = slain;
            field[parseInt(a.split('i')[0])][parseInt(a.split('i')[1])] = piece;
            $('.field').removeClass('path');
        }
        else {
            $("#" + a).removeClass(piece).addClass("empty");
            $("#" + destination).removeClass(slain).addClass(piece);
            $(".field").removeClass('path');
            selected = '';
            piece = '';
            turn = b === 0 ? 1 : 0;
        }
        selected = '';
        piece = '';
        slain = '';
    }

    //get the king position of a given color
    function getkingpos(a) {
        var color = a === 0 ? 'w' : 'b';
        for (var i = 0; i < 8; i++) {
            if (field[i].indexOf('king' + color) !== -1) {
                return i + 'i' + field[i].indexOf('king' + color);
            }
        }
    }

    //checks if someone is in check (see what i did there?)
    function checkCheck(a) {
        if (a === 0) {
            kingpos = getkingpos(0);
            for (var x = 0; x < 8; x++) {
                for (var y = 0; y < 8; y++) {
                    if (field[x][y][field[x][y].length - 1] === 'b') {
                        createpath(x, y, field[x][y]);
                        if (path.indexOf(kingpos) !== -1) {
                            return true;
                        }
                    }
                }
            }
        } else if (a === 1) {
            kingpos = getkingpos(1);
            for (var x = 0; x < 8; x++) {
                for (var y = 0; y < 8; y++) {
                    if (field[x][y][field[x][y].length - 1] === 'w') {
                        createpath(x, y, field[x][y]);
                        if (path.indexOf(kingpos) !== -1) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    //checks if someone is in checkmate and wins the game
    function checkCheckM8(a) {
        var lett = a === 0 ? 'w' : 'b';
        var arr = [];
        var io = [];
        var count = 0;
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                if (field[x][y][field[x][y].length - 1] === lett) {
                    arr.push([field[x][y], x + 'i' + y]);
                }
            }
        }

        for (var i = 0; i < arr.length; i++) {
            var x = parseInt(arr[i][1].split('i')[0]);
            var y = parseInt(arr[i][1].split('i')[1]);
            createpath(x, y, arr[i][0]);
            for (var j = 1; j < path.length; j++) {
                var p = parseInt(path[j].split('i')[0]);
                var z = parseInt(path[j].split('i')[1]);
                if (field[p] !== undefined && field[p][z] !== undefined) {
                    if (field[p][z][field[p][z].length - 1] !== lett) {
                        var placeholder = field[p][z];
                        field[p][z] = arr[i][0];
                        field[x][y] = 0;
                        if (checkCheck(a) === true) {
                            io.push(true);
                            field[p][z] = placeholder;
                            field[x][y] = arr[i][0];
                        } else {
                            field[p][z] = placeholder;
                            field[x][y] = arr[i][0];
                            return false;
                        }
                    }
                }
            }
        }

        for (var i = 0; i < io.length; i++) {
            if (io[i] === true) {
                count++;
            }
        }
        if (io.length === count) {
            return true;
        }
    }

    //allows pieces to move and slay and assigns turns (i know it's a clusterfuck)
    $('.field').on("click", function () {
        var x = parseInt($(this).attr("id").split('i')[0]);
        var y = parseInt($(this).attr("id").split('i')[1]);

        if (turn === 0 && field[x][y][field[x][y].length - 1] === 'w') {
            piece = field[x][y];
            $(".field").removeClass('path');
            selected = $(this).attr('id');
            createpath(x, y, piece);
            showpath();
        } else if (turn === 0 && selected !== '' && path.indexOf(x + 'i' + y) !== -1) {
            if (field[x][y][field[x][y].length - 1] === 'b') {
                slay(x, y, selected, 0);
                if (checkCheck(1) && !checkCheckM8(1)) {
                    window.alert('Black is in check!')
                }
                if (checkCheckM8(1)) {
                    window.alert('Black is in checkmate, white wins!')
                }
            } else {
                move(x, y, selected, 0);
                if (checkCheck(1) && !checkCheckM8(1)) {
                    window.alert('Black is in check!')
                }
                if (checkCheckM8(1)) {
                    window.alert('Black is in checkmate, white wins!')
                }
            }
        } else if (turn === 1 && field[x][y][field[x][y].length - 1] === 'b') {
            piece = field[x][y];
            $(".field").removeClass('path');
            selected = $(this).attr('id');
            createpath(x, y, piece);
            showpath();
        } else if (turn === 1 && selected !== '' && path.indexOf(x + 'i' + y) !== -1) {
            if (field[x][y][field[x][y].length - 1] === 'w') {
                slay(x, y, selected, 1);
                if (checkCheck(0) && !checkCheckM8(0)) {
                    window.alert('White is in check!')
                }
                if (checkCheckM8(0)) {
                    window.alert('White is in checkmate, black wins!')
                }
            } else {
                move(x, y, selected, 1);
                if (checkCheck(0) && !checkCheckM8(0)) {
                    window.alert('White is in check!')
                }
                if (checkCheckM8(0)) {
                    window.alert('White is in checkmate, black wins!')
                }
            }
        } else if ((turn === 1 && field[x][y][field[x][y].length - 1] !== 'b' || turn === 0 && field[x][y][field[x][y].length - 1] !== 'w') && field[x][y] !== 0) {
            window.alert("Not your turn!");
        }
    });

    $('#reset').on('click', function(){
        turn = 0;
        placePieces();
        console.log(field);
    });
});