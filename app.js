var app = new Vue({
    el:"#app",
    data:{
        default:{
            registers:[1,1,1,1,1,1,1,1,1],
            pointerA:1,
            pointerB:2,
            status:"stop",
            output:[],
            currentCommandIndex:-1
        },
        delay: settings.delay,
        max: settings.max,
        min: settings.min,
        defaultProgram: settings.defaultProgram,
        registers:null,
        commands: commands,
        commandMap: commandMap,
        programs: programs,
        pointerA: null,
        pointerB: null,
        currentCommandIndex: null,
        output: null,
        settings: settings,
        status:null,
        inputValue:null,
        edit:"",
        readableCode:false
    },
    watch:{
        status: function(){
            if(app.status == "go"){
                this.nextStep();
            }
        },
    },
    methods:{
        reset: function(){
            this.currentCommandIndex = this.default.currentCommandIndex;
            this.registers = this.default.registers.slice();
            this.pointerA = this.default.pointerA;
            this.pointerB = this.default.pointerB;
            this.status = this.default.status;
            this.output = this.default.output.slice();
        },
        withinRange: function(value){
            if(value >= this.max){
                return false
            }  
            else if(value <= this.min){
                return false
            }
            else{
                return true
            }
        },
        updateRegister: function(index, value){
            this.registers.splice(index, 1, value)
        },
        runProgram: function(){
            this.reset();
            this.status = "go"
        },
        pauseProgram: function(){
            this.status = "pause"
        },
        getInput: function(){
            this.status = "input"
            $("#input-box").focus();
        },
        submitInput: function(){
            var index = (this.pointerA - 1)
            var newValue = Number(this.inputValue)
            if(newValue != NaN){
                this.inputValue = "";
                this.updateRegister(index, newValue);
                this.status = "go";
            }
        },
        nextStep: function(){
            switch(this.currentCommand){
                case "LL":
                    this.commands.LL();
                    break;
                case "LR":
                    this.commands.LR();
                    break;
                case "RL":
                    this.commands.RL();
                    break;
                case "RR":
                    this.commands.RR();
                    break;
                case "OP":
                    this.commands.OP();
                    break;
                case "CL":
                    this.commands.CL();
                    break;
                case "GV":
                    this.commands.GV();
                    break;
                case "TK":
                    this.commands.TK();
                    break;                                    
            }
            this.currentCommandIndex++;
            if(this.status != "input"){
                this.status="delay";
                setTimeout(this.proceed,this.delay);
            }
        },
        proceed: function(){
            if(this.currentCommandIndex >= this.programLength){
                this.status="done"
            }
            else if(this.status == "delay"){
                this.status = "go"
            }
        },
        showUnderline: function(index){
            if (this.pointerRange.indexOf(index) != -1){
                return true;
            }
            else{
                return false;
            }
        },
    },
    computed:{
        parseEditAs: function(){
            var firstChar = this.edit.charAt(0).toLowerCase();
            var notation = ""
            if(firstChar == "–" || firstChar == "—"){
                notation = "proper"
            }
            else if(firstChar == "n" || firstChar == "m"){
                notation = "legible"
            }
            else if(firstChar == "l" || firstChar == "r" || firstChar == "o" || firstChar == "c" || firstChar == "g" || firstChar == "t"){
                notation = "shorthand"
            }
            return notation;
        },
        program: function(){
            if(this.defaultProgram == "edit"){
                if(this.editParsed){
                    return this.editParsed.slice();
                }
                else{
                    return null;
                }
            }
            else{
                return this.programs[this.defaultProgram];
            }
        },
        editParsed: function(){
            var info = this.edit;
            var map = null;
            var chars = null;
            if(this.parseEditAs == "proper"){
                info = info.match(/[–—]+/g).join("");
                info = info.match(/.{3}/g);
                map = this.properToShorthand;
                if(info){
                    info.forEach(function(item,index){
                      info[index] = map[item];  
                    })
                }
            }
            else if(this.parseEditAs == "shorthand"){
                info = info.match(/[LROPCLGVTK]+/g).join("");
                info = info.match(/.{2}/g);
            }
            else if(this.parseEditAs == "legible"){
                info = info.match(/[nm]+/g).join("");
                info = this.edit.match(/.{3}/g)
                map = this.legibleToShorthand;
                if(info){
                    info.forEach(function(item,index){
                      info[index] = map[item];  
                    })
                }
            }
            return info;
        },
        outputFormatted: function(){
            if(this.output){
                return this.output.join("");  
            }
            else{
                return null;
            }
        },
        openCloseMatches: function(){
            var info = this.program.slice();
            var matches = [];
            info.forEach(function(item, index){
                if(item == "OP"){
                    var openIndex = index;
                    var depth = 0
                    var matchFound = false
                    info.forEach(function(subitem, subindex){
                        if(matchFound == false && subindex > openIndex){
                            if(subitem == "CL" && depth == 0){
                                var closeIndex = subindex
                                matches.push([openIndex,closeIndex])
                                matchFound = true;
                            }
                            else if(subitem == "CL"){
                                depth = depth - 1
                            }
                            else if(subitem == "OP"){
                                depth = depth + 1
                            }
                        }
                    })
                }
            })
            return matches;
        },
        openCommands: function(){
            var program = this.program.slice();
            var locations = [];
            program.forEach(function(item, index){
                if (item == "OP"){
                    locations.push(index);
                };                      
            });
            return locations;
        },
        openCount: function(){
            return this.openCommands.length;
        },
        closeCommands: function(){
            var program = this.program.slice();
            var locations = [];
            program.forEach(function(item, index){
                if (item == "CL"){
                    locations.push(index);
                };                      
            });
            return locations;
        },
        closeCount: function(){
            return this.closeCommands.length;
        },
        openCloseMatch: function(){
            if(this.openCount == this.closeCount){
                return true;
            }
            else{
                return false;
            }
        },
        openCloseCount: function(){
            if(this.openCount > this.closeCount){
                return this.openCount
            }
            else{
                return this.closeCount
            }
        },
        openClosePairs: function(){
            var openInfo = {};
            var closeInfo = {};
            var openCloseMatches = this.openCloseMatches.slice();
            var openCount = this.openCount
            openCloseMatches.forEach(function(item, index){
                openInfo[openCloseMatches[index][0]] = openCloseMatches[index][1];
                closeInfo[openCloseMatches[index][1]] = openCloseMatches[index][0];
            });
            return {
                open: openInfo,
                close: closeInfo
            };
        },
        pointersAreEqual: function(){
            if(this.pointerA == this.pointerB){
                return true
            }
            else{
                return false
            }
        },
        pointerAValue: function(){
            return this.registers[(this.pointerA - 1)]  
        },
        pointerBValue: function(){
            return this.registers[(this.pointerB - 1)]
        },
        registryLength: function(){
            var info = this.registers.slice();
            return info.length;  
        },
        programLength: function(){
            var info = this.program.slice();
            return info.length;
        },
        currentCommand: function(){
            return this.program[this.currentCommandIndex];
        },
        pointerRange: function(){
            var info = []
            var pointerA = this.pointerA
            var pointerB = this.pointerB
            while(pointerA <= pointerB){
                info.push(pointerA++);
            }  
            return info;
        },
        verbose: function(){
            var info = this.program.slice();
            var map = this.shorthandToVerbose;
            info.forEach(function(item, index){
                info[index] = map[item]                         
            });
            return info;
        },
        shorthandOutput: function(){
            var info = this.shorthand.slice();
            return info.join(" ");
        },
        shorthand: function(){
            var info = this.program.slice();
            return info;
        },
        shorthandOutput: function(){
            var info = this.shorthand.slice();
            return info.join("");
        },
        legible: function(){
            var info = this.program.slice();
            var map = this.shorthandToLegible;
            info.forEach(function(item, index){
                info[index] = map[item]                         
            });
            return info;
        },
        legibleOutput: function(){
            var info = this.legible.slice();
            return info.join("");
        },
        proper: function(){
            var info = this.program.slice();
            var map = this.shorthandToProper
            info.forEach(function(item, index){
                info[index] = map[item]                         
            });
            return info;
        },
        properOutput: function(){
            var info = this.proper.slice();
            return info.join("");
        },
        shorthandToLegible: function(){
            var map = {};
            $.each(commandMap, function(item, index){
                var shorthand = commandMap[item].shorthand;
                var legible = commandMap[item].legible;
                map[shorthand] = legible;
            })
            return map;
        },
        shorthandToProper: function(){
            var map = {};
            $.each(commandMap, function(item, index){
                var shorthand = commandMap[item].shorthand;
                var proper = commandMap[item].proper;
                map[shorthand] = proper;
            })
            return map;
        },
        shorthandToVerbose: function(){
            var map = {};
            $.each(commandMap, function(item, index){
                var shorthand = commandMap[item].shorthand;
                var verbose = commandMap[item].verbose;
                map[shorthand] = verbose;
            })
            return map;
        },
        properToShorthand: function(){
            var map = {};
            $.each(commandMap, function(item, index){
                var proper = commandMap[item].proper;
                var shorthand = commandMap[item].shorthand;
                map[proper] = shorthand;
            })
            return map;
        },
        legibleToShorthand: function(){
            var map = {};
            $.each(commandMap, function(item, index){
                var legible = commandMap[item].legible;
                var shorthand = commandMap[item].shorthand;
                map[legible] = shorthand;
            })
            return map;
        }
    }
})