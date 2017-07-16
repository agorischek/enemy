Vue.component('debug-section', {
  template: '<div>Parsed input: {{editParsed}}</div>\
                <div>Registers: {{registers}}</div>\
                <div>Program: {{program}}</div>\
                <div>Verbose: {{verbose}}</div>\
                <div>Shorthand: {{shorthand}}</div>\
                <div>Legible: {{legible}}</div>\
                <div>Proper: {{proper}}</div>\
                <div>Pointer Range: {{pointerRange}}</div>\
                <div>Pointer A: {{pointerA}}</div>\
                <div>Pointer A Value: {{pointerAValue}}</div>\
                <div>Pointer B: {{pointerB}}</div>\
                <div>Pointer B Value: {{pointerBValue}}</div>\
                <div>Pointers Are Equal?: {{pointersAreEqual}}</div>\
                <div>Current Command Index: {{currentCommandIndex}}</div>\
                <div>Current Command: {{currentCommand}}</div>\
                <div>Registry Length: {{registryLength}}</div>\
                <div>Program Length: {{programLength}}</div>\
                <div>Open Commands: {{openCommands}}</div>\
                <div>Close Commands: {{closeCommands}}</div>\
                <div>Open Close Match?: {{openCloseMatch}}</div>\
                <div>Open Close Pairs: {{openClosePairs}}</div>\
                <div>Input Value: {{inputValue}}</div>\
                <div>Status: {{status}}</div>\
                <div>Execute a command:\
                    <button v-on:click="LL">LL</button>\
                    <button v-on:click="LR">LR</button>\
                    <button v-on:click="RL">RL</button>\
                    <button v-on:click="RR">RR</button>\
                    <button v-on:click="OP">OP</button>\
                    <button v-on:click="CL">CL</button>\
                    <button v-on:click="GV">GV</button>\
                    <button v-on:click="TK">TK</button>\
                </div>\
                <div>Output: {{output}}</div>'
})