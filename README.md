# Enemy Language

## Intro

Enemy is a low-level, minimal, experimental, esoteric programming language.

It has two unique features: It is dual-pointer (meaning that there are two cursors pointing to memory slots at all times) and it is written entirely with en and em dashes.

Enemy's name is derived from its constitution of entirely en and em dashes, as well as the fact that it is not your friend.

## Raison D'être

In the tradition of esoteric languages, Enemy not intended to have practical purpose. Rather, it is intended to push the idea behind the esoteric language BF to its logical extreme: BF might be incredibly difficult to read, but Enemy is literally impossible, as Enemy programs displayed in monospace font are simply continuous lines.

As such, it functions primarily as commentary. Sometimes those outside computer science and software engineering professions will remark that they just can't understand computer programming and markup languages, similar to the confusion a native English speaker might experience looking at Japanese for the first time.

This misses the point: Software languages (at least, the ones intended for practial use) are specifically designed to be read by humans as non-native languages, while also being interpretable by computers. Enemy demonstrates this point by showing what a truly illegible language would look like. Programmers and non-programmers alike can gain a better appreciation of their favorite (and least favorite) languages after attempting to program in (or even just read) Enemy.

## Data Structures

The following details are the core aspects of data management:

- The data structure is an array of addressable slots.

- The slots are indexed, starting with 1 at the far left, and increasing to the right.

- Each slot holds an integer.

- Each slot is initialized with a value of 1.

- There are two pointers, the Left pointer and the Right pointer.

- The Right pointer must always be either at the same slot as the Left Pointer, or to the right of it.

- There is an underline, which starts at the Left pointer and continues to the Right pointer.

- If both pointers are at the same location, attempting to make the underline shorter in either direction will result in the underline moving.

- The Left pointer initializes at the first slot, and the Right pointer initializes at the second slot.

## Commands

There are eight commands total:

- Left-left: Moves the Left pointer to the left.

- Left-right: Moves the Left pointer to the right.

- Right-left: Moves the Right pointer to the left.

- Right-right: Moves the Right pointer to the right.

- Open: If the Left and Right pointers’ values are equal, jumps ahead to the command after the matching Close.

- Close: If the Left and Right pointers’ values are not equal, jumps back to the the matching Open.

- Give: If the Left and Right pointers are at different positions, adds the Right pointer’s value to the Left pointer’s value, leaving the Right pointer’s value unchanged. If the Left and Right pointers are at the same position, prints that value.

- Take: If the Left and Right pointers are at different positions, subtracts the right pointer’s value from the left pointer’s value, leaving the right pointer’s value unchanged. If the Left and Right pointers are at the same position, takes user input for that position.

## Implementation Details

The below details apply to this particular implementation of Enemy. Other implementations of Enemy can modify these details as they see fit. 

- There are 9 registers.

- Each slot can have a maximum value of 999 and a minimum value of -999.

- The underline does not wrap around when its limits are reached.

- Register values do not wrap around when their limits are reached.

- The output section has an option to either interpret values as numbers or as ASCII.

## Notations

Enemy has four interchangeable notations: Command, Shorthand, Legible, and Proper. All finished Enemy programs should be in Proper form. The other notations can be used for development purposes.

| Command     | Shorthand | Legible | Proper |
|-------------|-----------|---------|--------|
| Left-left   | LL        | mmn     | ——–    |
| Left-right  | LR        | nmm     | –——    |
| Right-left  | RL        | mnn     | —––    |
| Right-right | RR        | nnm     | ––—    |
| Open        | OP        | mnm     | —–—    |
| Close       | CL        | nmn     | –—–    |
| Give        | GV        | mmm     | ———    |
| Take        | TK        | nnn     | –––    |

## Turing Completeness

To my knowledge, Enemy should in theory be Turing Complete, assuming some of the limitations in the Implementation Details section are lifted. However, I do not have formal proof.