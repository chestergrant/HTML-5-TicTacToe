onmessage = function (evt) {
   
	      var board = getBoard(evt.data);
              
              var piece = getPiece(evt.data);
              postMessage(minimax(board,piece));
              return;     
};
function getBoard(data){
    var newBoard = new Array(3);
    for(var i=0; i<3;i++){
        newBoard[i] = new Array(3);
        for(var j=0; j<3;j++){
            newBoard[i][j] = data[i][j];
        }
    }
    return newBoard;
}
function getPiece(data){
    return data[3][0];
}
function corrToPos(ix,jy){
                     return (ix*3)+(jy+1);
}

function minimax(board,piece){
    var ans = new Array(2);
    

    if(piece == 1){
             ans = maxMove(board, piece,0);
             
            return ans[0];
    }else{
            ans = minMove(board, piece,0);
            
            return ans[0];
    }
   
}

function gameOver(board){
    if(checkWin(board,1)){
        return true;
    }
    if(checkWin(board,0)){
        return true;
    }
    if((checkDraw(board,1))&&(checkDraw(board,0))){
        return true;
    }

    return false;
}
function checkDraw(board, AI){
    var opp = getOpponent(AI);
        var draw = false;
        for(var i=0; i<board.length;i++){
                if(((board[i][0]!=opp)&&(board[i][1]!=opp)&&(board[i][2]!=opp))&&( (board[i][0]!=opp)||(board[i][1]!=opp)||(board[i][2]!=opp) )){
                        
                        return false;
                }
                if(((board[0][i]!=opp)&&(board[1][i]!=opp)&&(board[2][i]!=opp))&&( (board[0][i]!=opp)||(board[1][i]!=opp)||(board[2][i]!=opp) ) ){
                        
                        return false;
                }

        }
        if(( (board[0][0]!=opp)&&(board[1][1]!=opp)&&(board[2][2]!=opp)) &&( (board[0][0]!=opp)||(board[1][1]!=opp)||(board[2][2]!=opp) ) ){
                
                return false;
        }
        if(((board[0][2]!=opp)&&(board[1][1]!=opp)&&(board[2][0]!=opp))&&((board[0][2]!=opp)||(board[1][1]!=opp)||(board[2][0]!=opp)) ){
                
                return false;
        }

        return true;
}
function checkWin(board, AI){
    for(var i=0; i< board.length;i++){
            if((board[i][0]==AI)&&(board[i][1]==AI)&&(board[i][2]==AI)){
                    
                    return true;
            }
            if((board[0][i]==AI)&&(board[1][i]==AI)&&(board[2][i]==AI)){
                   
                    return true;
            }

    }
    if((board[0][0]==AI)&&(board[1][1]==AI)&&(board[2][2]==AI)){
               
                    return true;
            }
            if((board[0][2]==AI)&&(board[1][1]==AI)&&(board[2][0]==AI)){
                    
                    return true;
            }

    return false;
}



function copyBoard(board){
    var newBoard = new Array(board.length);
    for(var k = 0; k <board.length; k++){
        newBoard[k] = new Array(board.length);
        for(var l = 0; l < board.length; l++){
            newBoard[k][l] = board[k][l];
        }
    }
    return newBoard;
}



function getOpponent(you){
    if(you == 1){
        return 0;
    }
    return 1;
}

function maxEvaluation(board,depth){
    var ans = new Array(2);
    ans[0] = 0;
    ans[1] = 0;

    if(checkWin(board,1)){
            ans[1] = 2*(10-depth);
            return ans;
    }
    if(checkWin(board,0)){
            ans[1] = -2*(10-depth);
            return ans;
    }
    return ans;
}
function maxMove(board, piece, depth){
    
    var bestMove = new Array(2);
    var newBoard = copyBoard(board);
    if(gameOver(board)){
            
            return maxEvaluation(board, depth);
    }
    var first = 0;
    for(var i = 0; i< board.length; i++){
            for(var j=0; j<board.length; j++){
                    if(newBoard[i][j] == -1){
                            newBoard[i][j] = piece;
                            var value = minMove(newBoard, getOpponent(piece),depth+1);
                            if(first==0){
                                    bestMove[0] = corrToPos(i,j);
                                    bestMove[1] = value[1];
                                    first++;
                            }
                            if(bestMove[1] < value[1]){
                                    bestMove[0] = corrToPos(i,j);
                                    bestMove[1] = value[1];
                                    
                            }
                            value= null;
                            newBoard[i][j] = -1;
                    }
            }
    }
    first=null;
    newBoard = null;
    return bestMove;
}
function minMove(board, piece, depth){
    var bestMove = new Array(2);
    var newBoard = copyBoard(board);

    if(gameOver(board)){
            
            return maxEvaluation(board, depth);
    }
    var first = 0;
    for(var i = 0; i< board.length; i++){
            for(var j=0; j<board.length; j++){
                    if(newBoard[i][j] == -1){
                            newBoard[i][j] = piece;
                            var value = maxMove(newBoard, getOpponent(piece),depth+1);
                            
                            if(first==0){
                                    bestMove[0] = corrToPos(i,j);
                                    bestMove[1] = value[1];
                                    first++;
                            }
                            if(bestMove[1] > value[1]){
                                    bestMove[0] = corrToPos(i,j);
                                    bestMove[1] = value[1];
                            }
                            value = null;
                            newBoard[i][j] = -1;
                    }
            }
    }
    first=null;
    newBoard = null;
    return bestMove;
}
