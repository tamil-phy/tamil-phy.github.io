## ML Series - 5: Polynomial Regression

In our last discussion, we built powerful models based on one fundamental assumption: the relationship between our features and our output is **linear**. We were fitting *lines* and *planes*.

But what happens when that assumption is just... wrong?

Let's anchor this in a new, practical problem. Imagine we have a dataset of company salaries. It's simple: `Position`, `Level` (from 1 to 10), and `Salary`.

If we plot `Level` vs. `Salary`, we will see something that is *not* a straight line. The jump in salary from a Level 1 Analyst to a Level 2 Junior is small. But the jump from a Level 8 C-level to a Level 9 CEO is *massive*.

This is a **non-linear relationship**.

If we try to fit our `LinearRegression` model to this data, it will fail, badly. It will draw a "best-fit" straight line right through the middle of a curve.

Its predictions for low-level *and* high-level employees will be completely wrong. Our tool is broken.

This forces us to ask: **"But what if... we could keep using our simple linear model, but bend the line?"**

This is the "so what" of **Polynomial Regression**. We don't invent a new, complex model. We just get clever with our *features*.

## 1. The Math First: Feature Engineering

Let's look at our simple model again:

$$y \;=\; \beta_0 \;+\; \beta_1 x_1$$

The problem is that this equation can *only* draw straight lines.

But what if we *engineered a new feature*? What if we just... created a new column in our data called $x_2$ that is just our first feature, $x_1$, *squared*?

- $x_1 = \text{Level}$
- $x_2 = (\text{Level})^2$

Now, we feed both of these features into our exact same LinearRegression model:

$$y \;=\; \beta_0 \;+\; \beta_1 x_1 \;+\; \beta_2 x_2$$

Let's plug our feature names back in:

$$Salary \;=\; \beta_0 \;+\; \beta_1 (\text{Level}) \;+\; \beta_2 (\text{Level})^2$$

This is the equation for a **parabola** (a simple curve).

We've done it. We've "bent the line."



### The "Aha!" Moment: It's Still Linear

This is the most important concept to grasp. From the *model's* perspective, this is **still a linear regression problem**.

Why? Because the model's job is to find the coefficients $\beta_0, \beta_1, \beta_2$. The equation is still perfectly *linear in its coefficients*. It doesn't *know* that $x_2$ is just $x_1$ squared. It just sees two features, $x_1$ and $x_2$, and it finds the best $\beta$'s to solve the "Normal Equation" we learned about in Part 4.

We can add as many "degrees" as we want to capture more complex curves:

$$\text{Salary} \;=\; \beta_0 \;+\; \beta_1(\text{Level}) \;+\; \beta_2(\text{Level})^2 \;+\; \beta_3(\text{Level})^3 \;+\; \cdots$$

What started as a "non-linear problem" was solved by "linear feature engineering." We didn't change the engine; we just gave it a new kind of "fuel."

##### The Code Next: The Position Salaries Journey

Let's build this. First, here is our new dataset, `Position_Salaries.csv`. You can see the relationship is not linear.

```python
Position,Level,Salary
Analyst,1,45000
Junior Consultant,2,50000
Senior Consultant,3,60000
Manager,4,80000
Senior Manager,5,110000
Partner,6,150000
Senior Partner,7,200000
C-level,8,300000
CEO,9,500000
Chairman,10,1000000
```



##### Step 1: The "Fuel"

First, let's load this data (I willl put it in a string to make this runnable). We'll use `Level` as our $X$ and `Salary` as our $y$.

```python
# 0) Imports
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import io # Used to load data from a string

from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import r2_score

# 1) Load data from string
# In a real project: df = pd.read_csv('Position_Salaries.csv')
csv_data = """Position,Level,Salary
Analyst,1,45000
Junior Consultant,2,50000
Senior Consultant,3,60000
Manager,4,80000
Senior Manager,5,110000
Partner,6,150000
Senior Partner,7,200000
C-level,8,300000
CEO,9,500000
Chairman,10,1000000
"""
df = pd.read_csv(io.StringIO(csv_data))

# 2) Split features/target
# We use .values to get NumPy arrays.
# X must be a 2D array (matrix) for sklearn, so we use [:, 1:2]
X = df.iloc[:, 1:2].values
y = df.iloc[:, 2].values
```



##### Step 2: The "Reality Check" (Linear Fails)

Let's *prove* our old tool is broken. We'll fit a simple `LinearRegression` model to it.

```python
# 3) Fit Simple Linear Regression
lin_reg = LinearRegression()
lin_reg.fit(X, y)

# 4) Visualize the "Gotcha"
plt.figure(figsize=(8, 5))
plt.scatter(X, y, color='red', label='Actual Salaries')
plt.plot(X, lin_reg.predict(X), color='blue', label='Linear Fit')
plt.title('The "Gotcha": Linear Regression Fails on a Curve')
plt.xlabel('Position Level')
plt.ylabel('Salary')
plt.legend()
plt.grid(True)
plt.show()
```

The resulting plot clearly shows the line is a terrible fit.



##### Step 3: The "Bridge" (`PolynomialFeatures`)

Now, we build our "new fuel." We'll use a tool from scikit-learn that does our feature engineering *for* us. We will ask it to create a new matrix with $x$, $x^2$, $x^3$, and $x^4$ (degree 4).



```python
# 5) Create the "new fuel" (Polynomial Features)
# We'll try a 4th-degree polynomial
poly_features = PolynomialFeatures(degree=4)
X_poly = poly_features.fit_transform(X)

# Let's look at X_poly.
# The first column is x^0 (the intercept), then x^1, x^2, x^3, x^4
print("--- Transformed Features (Degree 4) ---")
print(X_poly[:3]) # Show the first 3 rows
```

This `X_poly` matrix is our *new* set of features, which includes our original `Level` plus $(\text{Level})^2$, $(\text{Level})^3$, and $(\text{Level})^4$.

##### Step 4: The "Fit" (On the New Fuel)

Now, we just fit a *new* `LinearRegression` model, but we feed it our *engineered* `X_poly` features instead of $X$.

```python
# 6) Fit a *new* Linear model on the *polynomial* features
poly_reg = LinearRegression()
poly_reg.fit(X_poly, y)
```



##### Step 5: The "So What?" (The Curve Fits)

This `poly_reg` model has now learned the $\beta$'s for our big equation. Let's plot its predictions.

```python
# 7) Visualize the "So What?"
plt.figure(figsize=(8, 5))
plt.scatter(X, y, color='red', label='Actual Salaries')
# We plot the *new* model's predictions
plt.plot(X, poly_reg.predict(X_poly), color='green', label='Polynomial Fit (Deg 4)')
plt.title('Problem Solved: Polynomial Regression Fits the Curve')
plt.xlabel('Position Level')
plt.ylabel('Salary')
plt.legend()
plt.grid(True)
plt.show()

# 8) Evaluate
r2_linear = r2_score(y, lin_reg.predict(X))
r2_poly = r2_score(y, poly_reg.predict(X_poly))

print(f"R-squared (Linear): {r2_linear:.4f}")   # Will be poor
print(f"R-squared (Polynomial): {r2_poly:.4f}") # Will be excellent
```

The new plot will show a "bent line" cutting perfectly through the data points. That's it we have successfully modeled a non-linear relationship without ever leaving the world of linear regression.