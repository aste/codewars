function assemblerInterpreter(program) {
  preprocess(program);
  // Preprocess
  //    remove comments and empty lines
  //    Identify and map labels, to line numbers for jumps and calls
  //    tokenize each instruction into a command + argument
  // Interpret
  //    Initialize registers, output buffer, call stack, etc.
  //    Traverse the program line by line, using an instruction pointer (like ip)
  //    At each line, dispatch the instruction to a helper function
  // Instruction Handlers
  // mov x, y	Store a value (y) into register x. y could be a number or another register.
  // inc x, dec x	Increase or decrease a register’s value by 1.
  // add x, y, sub x, y, etc.	Math operations. y could be a number or a register.
  // label:	Marks a location in the code for jumps or function calls.
  // jmp, je, jne, etc.	Move the instruction pointer to a label based on a condition.
  // cmp x, y	Save a comparison result to use with je, jl, etc.
  // call, ret	Call a subroutine and return back afterward. Like a mini function.
  // msg	Store output made of text and register values.
  // end	Stop the program and return the output string.
  // ;	This is a comment, so skip that line or ignore anything after ;.
}

function preprocess(program) {
  const codeLineByLine = program.split("\n");
  const cleanedLines = [];

  for (let i = 0; i < codeLineByLine.length; i++) {
    codeLineByLine[i] = codeLineByLine[i].trim();
    if (codeLineByLine[i] === "") continue;

    if (codeLineByLine[i].includes(";")) {
      codeLineByLine[i] = codeLineByLine[i].split(";")[0].trim();
    }

    cleanedLines.push(codeLineByLine[i]);
  }

  console.log(cleanedLines);

  return cleanedLines;
}

//Testcases

// Simple function
let program1 = `
; My first program
mov  a, 5
inc  a
call function
msg  '(5+1)/2 = ', a    ; output message
end

function:
    div  a, 2
    ret`;

console.log(assemblerInterpreter(program1));
const assemblerInterpreterOnProgram1Result = "(5+1)/2 = 3";
console.log(assemblerInterpreterOnProgram1Result);

// Factorial
let program2 = `
mov   a, 5
mov   b, a
mov   c, a
call  proc_fact
call  print
end

proc_fact:
    dec   b
    mul   c, b
    cmp   b, 1
    jne   proc_fact
    ret

print:
    msg   a, '! = ', c ; output text
    ret`;

console.log(assemblerInterpreter(program2));
const assemblerInterpreterOnProgram2Result = "5! = 120";
console.log(assemblerInterpreterOnProgram2Result);

// // Fibonacci
// let program3 = `mov   a, 8            ; value
// mov   b, 0            ; next
// mov   c, 0            ; counter
// mov   d, 0            ; first
// mov   e, 1            ; second
// call  proc_fib
// call  print
// end

// proc_fib:
//     cmp   c, 2
//     jl    func_0
//     mov   b, d
//     add   b, e
//     mov   d, e
//     mov   e, b
//     inc   c
//     cmp   c, a
//     jle   proc_fib
//     ret

// func_0:
//     mov   b, c
//     inc   c
//     jmp   proc_fib

// print:
//     msg   'Term ', a, ' of Fibonacci series is: ', b        ; output text
//     ret`;

// console.log(assemblerInterpreter(program3));
// const assemblerInterpreterOnProgram3Result = "Term 8 of Fibonacci series is: 21";
// console.log(assemblerInterpreterOnProgram3Result);

// // Modulo
// let program4 = `mov   a, 11           ; value1
// mov   b, 3            ; value2
// call  mod_func
// msg   'mod(', a, ', ', b, ') = ', d        ; output
// end

// ; Mod function
// mod_func:
//     mov   c, a        ; temp1
//     div   c, b
//     mul   c, b
//     mov   d, a        ; temp2
//     sub   d, c
//     ret`;

// console.log(assemblerInterpreter(program4));
// const assemblerInterpreterOnProgram4Result = "mod(11, 3) = 2";
// console.log(assemblerInterpreterOnProgram4Result);

// // GCD
// let program5 = `mov   a, 81         ; value1
// mov   b, 153        ; value2
// call  init
// call  proc_gcd
// call  print
// end

// proc_gcd:
//     cmp   c, d
//     jne   loop
//     ret

// loop:
//     cmp   c, d
//     jg    a_bigger
//     jmp   b_bigger

// a_bigger:
//     sub   c, d
//     jmp   proc_gcd

// b_bigger:
//     sub   d, c
//     jmp   proc_gcd

// init:
//     cmp   a, 0
//     jl    a_abs
//     cmp   b, 0
//     jl    b_abs
//     mov   c, a            ; temp1
//     mov   d, b            ; temp2
//     ret

// a_abs:
//     mul   a, -1
//     jmp   init

// b_abs:
//     mul   b, -1
//     jmp   init

// print:
//     msg   'gcd(', a, ', ', b, ') = ', c
//     ret`;

// console.log(assemblerInterpreter(program5));
// const assemblerInterpreterOnProgram5Result = "gcd(81, 153) = 9";
// console.log(assemblerInterpreterOnProgram5Result);

// // Invalid program
// let program6 = `call  func1
// call  print
// end

// func1:
//     call  func2
//     ret

// func2:
//     ret

// print:
//     msg 'This program should return -1'`;

// console.log(assemblerInterpreter(program6));
// const assemblerInterpreterOnProgram6Result = -1;
// console.log(assemblerInterpreterOnProgram6Result);

// // Exponentiation
// let program7 = `mov   a, 2            ; value1
// mov   b, 10           ; value2
// mov   c, a            ; temp1
// mov   d, b            ; temp2
// call  proc_func
// call  print
// end

// proc_func:
//     cmp   d, 1
//     je    continue
//     mul   c, a
//     dec   d
//     call  proc_func

// continue:
//     ret

// print:
//     msg a, '^', b, ' = ', c
//     ret`;

// console.log(assemblerInterpreter(program7));
// const assemblerInterpreterOnProgram7Result = "2^10 = 1024";
// console.log(assemblerInterpreterOnProgram7Result);
