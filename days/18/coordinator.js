module.exports = class Coordinator {
  constructor(program0, program1) {
    this.programs = [program0, program1];

    this.activeProgramIndex = 0;
    this.activeProgram = this.programs[0];
    this.inactiveProgram = this.programs[1];
  }

  execute(instructions) {
    this.activeProgram.isRunning = true;

    while (this.activeProgram && this.activeProgram.isRunning) {
      this.activeProgram.isCompleted = instructions.length <= this.activeProgram.index;

      if (this.activeProgram.isCompleted) {
        this.activeProgram.isCompleted = true;

        if (this.inactiveProgram.isCompleted) {
          console.log('both programs completed', this.programs.map(p => p.sendCount));
          break;
        }

        this.switch();
      } else {
        const instruction = instructions[this.activeProgram.index];

        this.activeProgram = instruction(this.activeProgram, this.inactiveProgram.queue);
        this.programs[this.activeProgramIndex] = this.activeProgram; // update reference

        if (!this.activeProgram.isRunning) {
          if (this.inactiveProgram.queue.length === 0) {
            console.log('both programs completed', this.programs.map(p => p.sendCount));
            break;
          }

          this.switch();
        }
      }
    }
  }

  switch() {
    if (this.activeProgram) {
      this.activeProgram.isRunning = false;
      this.inactiveProgram = this.activeProgram;
    }

    this.activeProgramIndex = this.activeProgramIndex ? 0 : 1;
    this.activeProgram = this.programs[this.activeProgramIndex];
    this.activeProgram.isRunning = true;
    console.log(`switch to program ${this.activeProgramIndex}`);
  }
};
