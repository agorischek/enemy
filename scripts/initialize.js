//Things to perform on page load after creating Vue instance
app.registers = app.default.registers.slice();
app.pointerA = app.default.pointerA;
app.pointerB = app.default.pointerB;
app.status = app.default.status;
app.output = app.default.output.slice();
app.currentCommandIndex = app.default.currentCommandIndex
app.insertProgram(app.processBuiltInProgram(app.programs[app.defaultProgram].code))