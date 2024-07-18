*Trying to find the derivative of a function sometimes takes its toll. In  earlier days, as a researcher felt the pain of working with analytical  techniques. Sparing you the horror, this blog intends to introduce to  the reader how we may use python math libraries to find derivatives of  any function.*

*What is a* **SYMBOLIC DIFFERENTIATION** program?

*Simply it eats a formula and spits out one which is a derivative of the one it ate. Symbolic differentiation algorithms can derive the derivatives  with respect to the variable specified. How they accomplish that is out  of scope for this article, however. Let us avail is service and be  happy.*

*Let us load up with the required libraries for finding a derivative of any function.*

```python
import numpy as np
import scipy as sc
import sympy as sy
import matplotlib.pyplot as plt
from scipy.misc import derivative 
```

*Now define the variables of our function using* **sympy**. For simplicity, I choose the inverse of the sin function.
$$
y = sin^{-1}(x)
$$

```python
x  = sy.symbols('x', real=True) # defining the variables
y = sy.asin(x) # Inverse of Sin(x)
y
```

*To find the derivative of the function defined in the previous block use sympy.diff*

```
dydx = sy.diff(y,x) # Gives the first derivative of the function
dydx
```

The output that we will get after executing the above block is
$$
\frac{1}{\sqrt{1-x^{2}}}
$$
Now suppose we wanted to find the second derivative or higher-order for the function defined. Just make a minute change in the code as below.

```python
dy2dx2 = sy.diff(y,x,2)
dy2dx2
```

$$
\frac{x}{(1-x^{2})^{\frac{3}{2}}}
$$

Now, If we wanted to substitute the value for the variable in the output. For example if x = 1 then

```python
dy2dx2.subs([(x,1)])
```

​									 ${\displaystyle \infty \;\;}\Huge$

**It’s that simple.**

Let’s try a complex function for a change

​						$$f(x) = e^{-(a)(cos(x^{2}))}.ln(c*cos^{2}(x)/x)$$

Following the steps in earlier example

Following the steps in earlier example

```python
# defining variables
x , a, b, c = sy.symbols('x a b c', real=True) 
# function
y = sy.exp(-a*sy.cos(x**2))*sy.log(c*sy.cos(x)**2/x)  
# Using sympy to find the first derivative     
dfdx = sy.diff(f,x)
dfdx
```

The output we got for executing above block is

![img](https://miro.medium.com/v2/resize:fit:1400/1*roijW6mU04rx1AQYRU7qug.png)

Output

Let’s substitute x=4, a=1, b=2, c=3

```python
dydx.subs([(x,4),(a,1),(b,2),(c,3)]).evalf()
```

Gives us the value **0.144834397742965**