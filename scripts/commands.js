var commands = {
    LL: function(){
        if(app.pointerA <= 1){
            app.pointerA = 1
        }
        else{
            app.pointerA--
        }
    },
    LR: function(){
        if(app.pointerA >= app.registryLength){
            app.pointerA = app.registryLength;
        }
        else{
            if(app.pointerA == app.pointerB){
                app.pointerB++
            }
            app.pointerA++
        }
    },
    RL: function(){
        if(app.pointerB <= 1){
            app.pointerB = 1;
        }
        else{
            if(app.pointerA == app.pointerB){
                app.pointerA--
            }
            app.pointerB--
        } 
    },
    RR: function(){
        if(app.pointerB >= app.registryLength){
            app.pointerB = app.registryLength
        }
        else{
            app.pointerB++
        }                  
    },
    OP: function(){
        var matchingClose = app.openClosePairs.open[app.currentCommandIndex];
        var jumpTo = matchingClose
        if(app.pointersAreEqual){
            app.currentCommandIndex = jumpTo
        }
        else if(app.pointerAValue == app.pointerBValue){
            app.currentCommandIndex = jumpTo
        }
    },
    CL: function(){
        var matchingOpen = app.openClosePairs.close[app.currentCommandIndex];
        var jumpTo = matchingOpen - 1
        if(app.pointerAValue != app.pointerBValue){
            app.currentCommandIndex = jumpTo
        }
    },
    GV: function(){
        if(app.pointersAreEqual){
            app.output.push(app.pointerBValue);
            app.output.push("  ");
        }
        else{
            var index = (app.pointerA - 1);
            var newValue = app.pointerAValue + app.pointerBValue;
            if(newValue <= app.min){
                app.updateRegister(index, app.min);
            }
            else if(newValue >= app.max){
                app.updateRegister(index, app.max)
            }
            else{
                app.updateRegister(index, newValue);
            }
        }
    },
    TK: function(){
        if(app.pointersAreEqual){
            app.getInput();
        }
        else{
            var index = (app.pointerA - 1);
            var newValue = app.pointerAValue - app.pointerBValue;
            if(newValue <= app.min){
                app.updateRegister(index, app.min);
            }
            else if(newValue >= app.max){
                app.updateRegister(index, app.max)
            }
            else{
                app.updateRegister(index, newValue);
            }
        }
    }
}