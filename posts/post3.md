### Numerical methods using Python-Newton Raphson method

**Finding roots for Higher-Degree Equations:**

Higher-degree equations can be **polynomials or equations** that contains radicals sometimes may have transcendental functions, i.e., Logarithmic and trigonometric functions.

For example lets us assume an equation of the form ax²+bx+c=0 for which the roots can be found using the formula
$$
x = \frac{-b \pm \sqrt{b^{2}-4ac}}{2a}
$$
However, if our equation contains higher degrees or transcendental functions, we can use numerical methods to find the roots.

Let us take a look at the simple iteration method to solve the below quadratic equation.
$$
4x^{2}-10x+6 = 0
$$
The first step is to rearrange the variable on the left side. Thus the equation is reduced into
$$
x = \frac{4x^{2}+6}{10}
$$
Now let us use python to find the roots.

1. We make an initial guess for **x**, assuming that 100 iterations are more than enough.
2. By substituting the value of **x** using the guess, we find the new value of **x(x_new)**.
3. If the value of **x_new** is not equal to **x**, consider this value as the new value of **x**.
4. The algorithm repeats the step 2nd and 3rd until the **x_new = x**.

```python
x = 0 # Initial Guess                     
for iteration in range(1,101): # Setting iterations to 100 
    x_new = (4*x**2 + 6)/10      # Finding the new value
    if abs(x_new - x) < 0.000001: # degree of accuracy condition
        break
    x = x_new                    # Assigns the value of x_new to x
print('The root : %0.5f' % x_new) 
print('The number of iterations : %d' % iteration)The root : 1.00000
The number of iterations : 50
```

By using a different initial guess, the second root can be found.

```python
x = 1.5     # Initial Guess        
for iteration in range(1,101):# Setting iterations to 100
    x_new = (4*x**2 + 6)/10   # Finding the new value
    if abs(x_new - x) < 0.000001: # degree of accuracy condition
        break
    x = x_new       # Assigns the value of x_new to x
print('The root : %0.5f' % x_new)
print('The number of iterations : %d' % iteration)The root : 1.50000
The number of iterations : 1
```

### Newton Raphson Method

Newton Raphson method is the easiest of all numerical methods for solving  algebraic equations. Due to its simplicity and efficiency, it is the  most popular method in solving high-degree equations.

It uses the same procedure as that of [**Simple iteration method**](https://medium.com/@tamilarasanjayasri/numerical-methods-using-python-part-i-simple-iteration-method-7629f94b3a4). But here, instead of simple rearrangement of the equation, one has to  formulate a new equation using the given equation and its derivative.

Let x₀ be an approximate root of an equation f(x)=0

If x is the exact root i.e. x₁ = x₀ + h

Now we have f(x₁) = 0

thus expanding f(x₀ + h) by Taylor’s series
$$
f(x_{0})+hf^{'}(x_{0})+\frac{h^{2}}{2}f^{''}(x_{0})+..... = 0
$$
By neglecting higher powers of **h** we get
$$
f(x_{0})+hf^{'}(x_{0}) = 0
$$

$$
h = \frac{-f(x_{0})}{f^{'}(x_{0})}
$$

Now to find the closer approximation to the root can be found by
$$
x_{1} = x_{0} - \frac{f(x_{0})}{f^{'}(x_{0})}
$$


Similarly, starting with x₁ , a still closer approximation is obtained as
$$
x_{2} = x_{1} - \frac{f(x_{1})}{f^{'}(x_{1})}
$$
Thus the general expression is given by
$$
x_{n+1} = x_{n} - \frac{f(x_{n})}{f^{'}(x_{n})}
$$
To implement the above general expression in the python code, we adopt it as
$$
x_{new} = x - \frac{f(x_{n})}{f^{'}(x_{n})}
$$
The first step is to put the given equation in the form of a function and  then to find its first derivative of the given function.

Let’s use the same quadratic equation
$$
4x^{2}-10x+6 = 0
$$
and its derivatives
$$
f^{'}(x) = 8x-10
$$
The required expression for the algorithm is
$$
x_{new} = x - \frac{4x^{2}-10x+6}{8x-10}
$$
Now let’s put everything in python

```python
x = 0 # Initial Guess
for iteration in range(1,101): # Setting iterations to 100
    x_new = x - (4*x**2 - 10*x + 6)/(8*x - 10)# Newton-Raphson's    
    if abs(x_new - x) < 0.000001: # degree of accuracy condition
        break
    x = x_new        # Assigns the value of x_new to x
print('The root : %0.5f' % x_new)
print('The number of iterations : %d' % iteration)The root : 1.00000
The number of iterations : 7
```

By using a different initial guess, the second root can be found.

```python
x = 1.6 # Initial Guess
for iteration in range(1,101):
    x_new = x - (4*x**2 - 10*x + 6)/(8*x - 10) # Newton-Raphson's 
    if abs(x_new - x) < 0.000001:
        break
    x = x_new
print('The root : %0.5f' % x_new)
print('The number of iterations : %d' % iteration)The root : 1.50000
The number of iterations : 4
```