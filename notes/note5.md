# Brainfuck

It’s around 12:30 AM and I am wide awake, worried over why I haven’t picked up any new skills. To be honest, this worry has been with me for the last fifteen years. I have worked at it every single day, yet I never feel truly content. Then while listening to ilayaraja my search engine led me straight to Brainfuck. Ah—that was it: something fresh to learn and suddenly a little bulb lit up inside my head.

Brainfuck was born in 1993, the brainchild of Swiss programmer Urban Müller. He wasn’t out to solve real-world problems—he wanted to make a point about minimalism. With just eight commands and a single, linear memory tape, he demonstrated that you could express any computation, however convoluted, using almost nothing. 

At its core, Brainfuck remains a perfect little gem of computational theory: eight simple operations dancing together to prove that complexity can emerge from the most basic rules.

##### The Eight Commands

Every Brainfuck program is just a sequence of these symbols. Any other character is ignored.

| **Symbol** | **Action**                                                   | **Analogy**                                   |
| ---------- | ------------------------------------------------------------ | --------------------------------------------- |
| >          | Move the data pointer **right** to the next cell.            | “Step one box to the right.”                  |
| <          | Move the data pointer **left** to the previous cell.         | “Step one box to the left.”                   |
| +          | **Add 1** to the current cell’s value (wraps 255→0).         | “Increment counter in this box.”              |
| -          | **Subtract 1** from the current cell’s value (wraps 0→255).  | “Decrement counter in this box.”              |
| .          | **Output** the current cell’s value as an ASCII character.   | “Speak the letter whose code is in this box.” |
| ,          | **Input** one byte (0–255) from the user and store it here.  | “Listen for a number and put it in this box.” |
| [          | If the current cell’s value is **zero**, **jump forward** to the matching ]. Otherwise, continue. | “Start loop: if zero, skip ahead.”            |
| ]          | If the current cell’s value is **nonzero**, **jump back** to the matching [. Otherwise, continue. | “End loop: if nonzero, repeat.”               |



Imagine a long row of little boxes (cells), each holding a number from 0 to 255:

```
[c_0] [c_1] [c_2] [c_3] [c_4] … 
    ↑
 data pointer
```



Let’s make the machine print the letter A. ASCII code for A is **65**.

```python
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.
```

Here \+ repeated 65 times and it adds 1 each time to initial cell (c_0), so it becomes 65

the final "."  outputs cell0’s value (65) as the character A.

**Execution trace** :

| **Step** | **Command** | **cell0 before → after** | **Output** |
| -------- | ----------- | ------------------------ | ---------- |
| 1        | +           | 0 → 1                    | (none)     |
| 2        | +           | 1 → 2                    | (none)     |
| …        | …           | …                        | …          |
| 65       | +           | 64 → 65                  | (none)     |
| 66       | .           | (no change)              | A          |



##### **Making a Simple Loop**

Loops are how you avoid writing + 65 of times right. In BF a loop looks like this:

```python
[  …body…  ]
```

It means “while **current cell ≠ 0**, run the body; when it becomes 0, exit the loop.”

In the following example we are going to set cell_0 to 10 using a loop

```python
++++++++++   Initialize cell0 to 10
[            Start loop (cell0 ≠ 0?)
  -          Decrement cell0
]            End loop (go back if cell0 ≠ 0)
```

After those five commands, cell_0 goes from 10 → 9 → 8 … → 0, then the loop stops. 

## **“Hello” in Under 20 Commands**

Compact way to print **HELLO (ASCII 72, 69, 76, 76, 79)** on one line:

```python
++++++++        cell0 = 8
[>+++++++<-]    multiply: cell1 = 8×7 = 56, cell0 → 0
>++++.          cell1 = 60, output `=`, but we want `H` (72)… so on
```

1. **++++++++**

   - You start with a cell (call it **cell_0**) that’s initially 0.
   - Each + adds 1. So ++++++++ makes **cell_0 = 8**.

2. **[ >+++++++\<- ]**

   - The [...] is a loop: “while **cell_0** ≠ 0, do the body, then repeat.”
   - Inside the loop:
     1. \> moves the data pointer **right** to **cell_1**.
     2. +++++++ adds 7 to **cell_1**.
     3. < moves back **left** to **cell_0**.
     4. \- subtracts 1 from **cell_0**.
   - Since **cell_0** started as 8, you run the body 8 times, each time adding 7 to **cell1**.
   - **Result:** after the loop, **cell0 = 0**, **cell1 = 8 × 7 = 56**.

   

3. **>++++.**

   - \> moves to **cell_1**.
   - ++++ bumps **cell_1** from 56 → 60.
   - . prints the ASCII character for code 60 (that’s <, not “H” – so you’d need to tweak the number of +s to actually reach 72 for “H”).

   ---------

   Here’s one straightforward way. We’ll use **cell0** as a counter to build up **72** in **cell1**, then tweak and print each letter in turn:

```python
+++++++++        set cell_0 = 9
[>++++++++<-]    multiply: cell_1 = 9×8 = 72, cell0 → 0
>                move to cell_1
.                print 'H' (72)
---              cell_1 = 72−3 = 69
.                print 'E' (69)
+++++++          cell_1 = 69+7 = 76
.                print 'L' (76)
.                print 'L' again
+++              cell_1 = 76+3 = 79
.                print 'O' (79)
```

You can collapse that into a single line too:

```python
+++++++++[>++++++++<-]>.---.+++++++..+++.
```

**What it does, in order:**

1. Build **72** in cell_1 via the loop.
2. . print **H**
3. ---. subtract 3 → print **E**
4. +++++++.. add 7 → print **L** twice
5. +++. add 3 → print **O**

Run that in any Brainfuck interpreter and you will see:

```python
HELLO
```



