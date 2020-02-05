// <<< adding new grid elements with unique IDs >>>

//adding home cells
var var1 = '', var2 = '', var3 = '', var4 = '';
for(var i = 0; i < 4; i++){
    var1 += `<div class="cell" id="g${i}"><div class="token" id="tg${i}" style="background-color:green;"></div></div>`;
    var2 += `<div class="cell" id="r${i}"><div class="token" id="tr${i}" style="background-color:red;"></div></div>`;
    var3 += `<div class="cell" id="y${i}"><div class="token" id="ty${i}" style="background-color:yellow;"></div></div>`;
    var4 += `<div class="cell" id="b${i}"><div class="token" id="tb${i}" style="background-color:blue;"></div></div>`;
}
document.getElementById('g').innerHTML = var1;
document.getElementById('r').innerHTML = var2;
document.getElementById('y').innerHTML = var3;
document.getElementById('b').innerHTML = var4;
//adding path cells
var1 = '';
var2 = '';
var3 = '';
var4 = '';
for(i = 0; i < 18; i++){
    var1 += `<div class="cell" id="v1${i}"></div>`;
    var2 += `<div class="cell" id="h1${i}"></div>`;
    var3 += `<div class="cell" id="h2${i}"></div>`;
    var4 += `<div class="cell" id="v2${i}"></div>`;
}
document.getElementById('v1').innerHTML = var1;
document.getElementById('h1').innerHTML = var2;
document.getElementById('h2').innerHTML = var3;
document.getElementById('v2').innerHTML = var4;
// style for start points
document.getElementById('v15').style.backgroundColor = 'tomato';
document.getElementById('h11').style.backgroundColor = 'lightGreen';
document.getElementById('h216').style.backgroundColor = 'lightBlue';
document.getElementById('v212').style.backgroundColor = 'lightYellow';



// <<< main code for game operation >>>

// token class
class token{
    constructor(color, token_1_position, token_2_position, token_3_position, token_4_position){
        this.color = color;
        this.token_1_position = token_1_position;
        this.token_2_position = token_2_position;
        this.token_3_position = token_3_position;
        this.token_4_position = token_4_position;
    }
}
// defining objects for all tokens
const token_green = new token('green', 'g0', 'g1', 'g2', 'g3');
const token_red = new token('red', 'r0', 'r1', 'r2', 'r3');
const token_yellow = new token('yellow', 'y0', 'y1', 'y2', 'y3');
const token_blue = new token('blue', 'b0', 'b1', 'b2', 'b3');
const token_list = [token_green, token_red, token_yellow, token_blue];



// To be taken as input from user
const number_of_players = 2;
const players_name = ['Bear Grills', 'Micheal Faraday'];
const players_color = ['green', 'blue'];

function user_messenger(message){
    //let temp = document.getElementById('user_message').innerHTML;
    document.getElementById('user_message').innerHTML = message;
};

// player class
class player{
    constructor(){
        this.name = '';
        this.color = '';
    }
}
const player_0 = new player();
const player_1 = new player();
const player_2 = new player();
const player_3 = new player();
const player_list = [player_0, player_1, player_2, player_3];

for(let i = 0; i < number_of_players; i++){
    player_list[i].name = players_name[i];
    player_list[i].color = players_color[i];
};


// control functions for gameplay

var player_turn = 0;
var token_no = 1;
function set_token_1(){
    token_no = 1;
    document.getElementById('token_status').innerHTML = 'Token set to move - ' + token_no;
};
function set_token_2(){
    token_no = 2;
    document.getElementById('token_status').innerHTML = 'Token set to move - ' + token_no;
};
function set_token_3(){
    token_no = 3;
    document.getElementById('token_status').innerHTML = 'Token set to move - ' + token_no;
};
function set_token_4(){
    token_no = 4;
    document.getElementById('token_status').innerHTML = 'Token set to move - ' + token_no;
};








var dice = '';
count = 0;
document.getElementById('button_play').style.visibility= 'hidden';
document.getElementById('token_button').style.visibility= 'hidden';
var open = {'green':0, 'red':0, 'yellow':0, 'blue':0};
function playerchange(){
    dice = roll_score();
    if(dice != 6){player_turn = count % number_of_players;}
    document.getElementById('player').style.visibility = 'visible';
    document.getElementById('player').innerHTML = 'Player ' + String(player_turn+1) + " Turn";
    count++;
};
playerchange();
function control(){
    document.getElementById('dice').innerHTML = 'Dice Value - ' + String(dice);
    if ((open[players_color[player_turn]] == 0) || (open[players_color[player_turn]] == 1)){
        play();
    }
    else{
    document.getElementById('start_button').style.visibility= 'hidden';
    document.getElementById('button_play').style.visibility= 'visible';
    document.getElementById('token_button').style.visibility= 'visible';
    }
};



function play(){
    document.getElementById('start_button').style.visibility= 'visible';
    document.getElementById('button_play').style.visibility= 'hidden';
    document.getElementById('token_button').style.visibility= 'hidden';
    //document.getElementById('player').style.visibility = 'hidden';
    let token_id = 't'+ player_list[player_turn].color[0] + String(token_no - 1);
    next_position = moves_processor(token_id, dice);
    if (next_position == -1){
        user_messenger("");
        //Move not valid, click another token or skip
    }
    else{
        let current_token = document.getElementById(token_id);
        target = document.getElementById(next_position);
        if (next_position != 'middle'){
            target.appendChild(current_token);}
        let obj = {g:0, r:1, y:2, b:3};
        if (token_no == 1){
            token_list[obj[player_list[player_turn].color[0]]].token_1_position = next_position;
            if(next_position == 'middle'){
                document.getElementById(token_id).remove();}}
        else if(token_no == 2){
            token_list[obj[player_list[player_turn].color[0]]].token_2_position = next_position;
            if(next_position == 'middle'){
                document.getElementById(token_id).remove();}}
        else if(token_no == 3){
            token_list[obj[player_list[player_turn].color[0]]].token_3_position = next_position;
            if(next_position == 'middle'){
                document.getElementById(token_id).remove();}}
        else if(token_no == 4){
            token_list[obj[player_list[player_turn].color[0]]].token_4_position = next_position;
            if(next_position == 'middle'){
                document.getElementById(token_id).remove();}}
        token_pop_check(player_list[player_turn].color, next_position);
    };
    playerchange();
};

function token_pop_check(current_token_color, position){
    objects_to_check = {green:token_green, red:token_red, yellow:token_yellow, blue:token_blue};
    delete objects_to_check[current_token_color];
    let i, j;
    for(i in objects_to_check){
        let obj = objects_to_check[i];
        var ignore_flag = true;
        for(j in obj){
            if (ignore_flag){
                ignore_flag = false
            }
            else{
                if((obj.j == position) && (obj.j != 'middle')){
                    let new_position = obj.color[0] + obj.j[6];
                    obj.j = new_position;
                    let target = document.getElementById(new_position);
                    let token = document.getElementById('t' + new_position);
                    target.appendChild(token);
                }
            }
        }
    }
}




/* function to return new position for a {token in terms of element ids}
 and {number of moves to proceed} */
function moves_processor(token_id , moves){
    let map_token = {
        g:token_green,
        r:token_red,
        y:token_yellow,
        b:token_blue
    };
    
    let color = map_token[token_id[1]].color;
    let temp_obj = ["token_1_position", "token_2_position", "token_3_position", "token_4_position"];
    let position = map_token[token_id[1]][temp_obj[token_no-1]];
    let token_num = token_id[2];
    if(( position[0] != 'v') && (position[0] != 'h')){
        if(moves == 6){
        switch(color){
            case 'green':
                return 'h11';
            case 'red':
                return 'v15';
            case 'yellow':
                return 'v212';
            case 'blue':
                return 'h216';
        };}
        else{
            return -1;
        }
    };
    while((moves > 0) && (position != -1)){
        position = next(color, position);
        moves--;
        if(position == 'middle' && moves > 0){return -1;};
    };
    return position;
};

// function to help above function {returning next position after 1 move}
function next(color, position){
    if ((position == 'v116') || (position == 'h111') || (position == 'h26') || (position == 'v21')){
        return 'middle';
    };
    path = position.slice(0, 2);
    cell_no = Number(position.substr(2,2));
    switch(path){
        case 'v1':
            if(cell_no == 17){return 'h20';}
            else if((color == 'red') && (cell_no-1) % 3 == 0){return 'v1'+String(cell_no+3);} 
            else if((0 == cell_no) || (cell_no == 1)){return 'v1'+String(cell_no +1);}
            else if((cell_no % 3) == 0){return 'v1'+String(cell_no-3);}
            else if(((cell_no-2)%3) == 0){return 'v1'+String(cell_no+3);};
        case 'v2':
            if(cell_no == 0){return 'h117';}
            else if((color == 'yellow') && (cell_no-1) % 3 == 0){return 'v2'+String(cell_no-3);} 
            else if((16 == cell_no) || (cell_no == 17)){return 'v2'+String(cell_no -1);}
            else if((cell_no % 3) == 0){return 'v2'+String(cell_no-3);}
            else if((cell_no-2)%3 == 0){return 'v2'+String(cell_no+3);};
        case 'h1':
            if(cell_no == 5){return 'v115';}
            else if((color == 'green') && ((6 <= cell_no) && (cell_no <= 10))){return 'h1'+String(cell_no+1);}
            else if(cell_no == 6 || cell_no == 12){return 'h1'+String(cell_no-6);}
            else if((0 <= cell_no) && (cell_no <= 4)){return 'h1'+String(cell_no+1);}
            else if((13 <= cell_no) && (cell_no <= 17)){return 'h1'+String(cell_no-1);};
        case 'h2':
            if(cell_no == 12){return 'v22';}
            else if((color == 'blue') && ((7 <= cell_no) && (cell_no <= 11))){return 'h2'+String(cell_no-1);}
            else if(cell_no == 5 || cell_no == 11){return 'h2'+String(cell_no+6);}
            else if((0 <= cell_no) && (cell_no <= 4)){return 'h2'+String(cell_no+1);}
            else if((13 <= cell_no) && (cell_no <= 17)){return 'h2'+String(cell_no-1);};
    };
};

// dice roll score generator function
function roll_score(){
    return Math.floor(Math.random()*6) + 1
};




// test functions


/*
var current_token = document.getElementById('tg0');
var target = document.getElementById('h11');
target.appendChild(current_token);
token_green.token_1_position = target.id;

function test(){
    let current_position = token_green.token_1_position;
    
    next_position = moves_processor('tg0', 1);
    current_token = document.getElementById('tg0');

    target = document.getElementById(next_position);
    console.log(next_position);
    target.appendChild(current_token);
    token_green.token_1_position = next_position;
    
};
*/

/*
function test2(){
    var target = document.getElementById('testToken');
    target.remove();
}
*/


/*        console.log(eval('token_green'));
var token = document.createElement('div');
    var content = document.createTextNode('');*/