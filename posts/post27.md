#  ML Series – Part 4: Multiple Linear Regression

In our last session, we built a powerful tool. We anchored ourselves in a simple, practical problem: finding the relationship between one input, $x$, and one output, $y$. We found the single, perfect *line* that best described that relationship. We solved $y = mx + b$.

But as researchers, we know that's not the *whole story*. That model was powerful, but it was also naive. If we used it to predict a house's price based *only* on its square footage, we'd be ignoring other obvious, critical factors. What about the number of bedrooms? The age of the house? The neighborhood?

Our simple line was useful, but it was *incomplete*.

Let's pivot to a new, practical problem. Many of us are fascinated by the world of startups. Imagine we have a dataset of 50 startups and we want to find the "secret sauce" to high `Profit`.

Using our old tool, our first instinct would be to make a simple model: `Profit vs. R&D Spend`. But we'd immediately hit a wall. A startup's success isn't *just* about R&D. It's a complex recipe of `R&D Spend`, `Marketing Spend`, `Administration Costs`, and maybe even the `State` it's based in.

Our old one-to-one tool can't handle this. This forces us to ask the next big question:

**"But what if... we could build a model that looks at \*all\* these factors at the same time?"**

What if we could find the *single equation* that balances all of them and tells us which ones *really* matter?

This is the "so what" of **Multiple Linear Regression**.

The core idea is exactly the same. We are still finding the "best fit" by finding the coefficients ($\beta$'s) that minimize the total error. But our equation is no longer a simple line. We're just *adding more terms*.

Simple Model (one feature):

Profit = $\beta_0$ + $\beta_1$ * (R&D Spend)

Multiple Model (many features):

Profit = $\beta_0$ + $\beta_1$(R&D Spend) + $\beta_2$(Marketing Spend) + $\beta_3$*(Admin Cost) + ...

The shape of our model has evolved.

- With one feature, we were fitting a 2D **line**.
- With two features (like `R&D` and `Marketing`), our model becomes a 3D **plane**, like a sheet of paper floating through a 3D cloud of data points.
- With three or more features, we can't visualize it, but the math just keeps going. We are fitting what's called a **hyperplane**.

The concept is the same. Only the dimensions have expanded.

The real magic here is that this new, more powerful model can *finally* tell us the individual impact of *each* feature, while holding all the others constant. We can finally start to answer the *real* questions.

Here is the continuation of our journey into Multiple Linear Regression, picking up right after the introduction.

## 1. The Math First: From a Line to a Hyperplane

Let's start by looking at the math. It's not "harder" math, it's just "wider."

### The Model Definition

Our simple model's equation was:

$$y_i \;=\; \beta_0 \;+\; \beta_1 x_i \;+\; \varepsilon_i$$

Our new model's equation for our startup problem is just an expansion of that line:

$$y_i \;=\; \beta_0 \;+\; \beta_1 x_{i1} \;+\; \beta_2 x_{i2} \;+\; \beta_3 x_{i3} \;+\; \varepsilon_i$$

Let's translate this back into our practical terms:

- **$y_i$** is the `Profit` for the *i*-th startup.
- **$x_{i1}$** is the `R&D Spend` for that startup.
- **$x_{i2}$** is the `Marketing Spend` for that startup.
- **$x_{i3}$** is the `Administration Cost` for that startup.
- **$\beta_0$** is the **intercept**. It's our theoretical baseline profit if a startup somehow spent $0 on everything.
- **$\varepsilon_i$** is the **error** (or "residual"). It's the slice of reality that our model can't explain—the random luck or the unmeasured factors.

### The "So What?": The Meaning of the $\beta$'s

This is the entire reason we use this model. The meaning of our $\beta$ coefficients has become incredibly powerful.

In our simple $y = mx + b$ model, $\beta_1$ was just "the slope."

In our new model:

$\beta_1$ is the effect of $x_1$ on $y$, holding all other features ($x_2, x_3...$) constant.

This is the breakthrough. We can *finally* isolate the impact of one single factor. We can now sit in a strategy meeting and answer the practical question, "What is the *specific* dollar-for-dollar impact of our `R&D Spend` on `Profit`, *even after* we account for what we're spending on `Marketing`?"

We've moved from simple correlation to sophisticated, "ceteris paribus" (all else being equal) analysis.

### The "Exotic" Bridge: The Normal Equation

So how do we *find* all these $\beta$'s at once?

This new equation, with its many terms, looks messy. But we can bundle all our $x$ inputs into one big matrix, **$X$**, all our $\beta$'s into one vector, **$\beta$**, and all our $y$ answers into another vector, **$y$**.

This allows us to compress our entire system into a single, elegant line of linear algebra:

$$y \;=\; X\beta \;+\; \varepsilon$$

This is the same equation, just viewed from a higher level. Our goal is identical to before: find the $\beta$ vector that **minimizes the Sum of Squared Errors (SSE)**.

We are still finding the hyperplane that is "closest" to all of our data points.

$$min \; (y - X\beta)^\top (y - X\beta)$$

What started as a complex problem of finding $n$ different coefficients is now a single, solvable optimization problem. By using calculus to find where the derivative is zero, we can derive a "closed-form" solution.

**The "Normal Equation": $\hat{\beta} = (X^\top X)^{-1} X^\top y$**

This equation is the "so what" of the math. It is the *answer*. It's the key that unlocks the $\hat{\beta}$ vector that best fits our data.

(A practical note: A library like scikit-learn doesn't *literally* invert $X^\top X$, which can be numerically unstable. It uses more robust methods like SVD or QR decomposition to find the same $\hat{\beta}$ this equation defines.)

## 2. The "Rules of the Road": Assumptions & Traps

This powerful tool is not a magic black box. It relies on a set of rules (the Gauss-Markov assumptions) to be trustworthy.

The most important of these, from a practical standpoint, is **Full Rank**. This means none of our input features can be perfectly predicted by the others. Violating this leads to two major "gotchas" we have to solve *before* we can even run the model.

1. **The Dummy Variable Trap:** This happens when we encode categorical data. Our `State` column has text ("California", "New York"). The model's math can't handle this, so our first instinct is to create "on/off" switch columns: `Is_CA`, `Is_NY`, `Is_FL`.

   But this breaks the model. Why? Because the columns are *perfectly* multicollinear: `Is_NY = 1 - Is_CA - Is_FL`. The model can't solve this. 
   **The fix:** We *must* always drop one category. That dropped category (e.g., "New York") becomes our hidden "reference," and the $\beta$'s for `Is_CA` and `Is_FL` are interpreted *relative* to it.

2. **Multicollinearity:** This is the more subtle, non-perfect version of the same trap. What if `R&D Spend` and `Marketing Spend` are very highly correlated? The model can't reliably tell which one is *truly* responsible for the change in `Profit`. The math becomes unstable, and our $\beta$ coefficients (our core insights!) become untrustworthy.

Now, let's take this theory and apply it.

## 3. The Code Next: The 50 Startups Journey

Let's apply this theory. We have the `50_Startups.csv` dataset.

- **Target:** `Profit`
- **Features:** `R&D Spend`, `Administration`, `Marketing Spend`, `State`

### Step 1: The First Hurdle (Categorical Data)

Our equation $X\beta$ requires numbers, but our `State` column contains text. We must encode this before we can do any math.

```python

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score


df = pd.read_csv("50_Startups.csv")


# We know 'State' is a feature we have to engineer.
X = df[['State', 'R&D Spend', 'Administration', 'Marketing Spend']]
y = df['Profit']
```

### Step 2: The "Bridge" (`ColumnTransformer`)

This is our precise tool for fixing *only* the `State` column. This is a critical step in our data preprocessing pipeline. Notice two key details:

1. `OneHotEncoder(drop='first')`: This is our explicit, practical fix for the **Dummy Variable Trap**.
2. `remainder='passthrough'`: This tells the transformer: "Leave all my other perfectly good numeric columns alone."

```python
# 3) One-hot encode 'State' and drop one category
categorical_cols = ['State']
numeric_cols = ['R&D Spend', 'Administration', 'Marketing Spend']

ct = ColumnTransformer(
    transformers=[
        ('state_ohe', OneHotEncoder(drop='first'), categorical_cols)
    ],
    remainder='passthrough'
)

# We fit the transformer and create our final, purely numerical X matrix
X_enc = ct.fit_transform(X)
```



### Step 3: The "Split" (Our "Final Exam")

This step is fundamental. We must hold back a portion of our data as a "test set." This is the only way to know if our model has *generalized* a true pattern or just *memorized* the training data.

```python
# 4) Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X_enc, y, test_size=0.2, random_state=0
)
```



### Step 4: The "Fit" (The Moment of Learning)

This single line of code is where all that "exotic" math happens. When we call `.fit()`, the `LinearRegression` object is solving for the optimal $\hat{\beta}$ vector that minimizes the squared error on our `X_train` and `y_train`.

```python
# 5) Fit OLS
reg = LinearRegression()
reg.fit(X_train, y_train)

# We use our trained model to make predictions on the "unseen" test data
y_pred = reg.predict(X_test)
```

### Step 5: The "So What?" (Interpreting the Results)

This is the payoff. This is why we built the model. We can now print the coefficients and understand the "story" the data is telling us.

```python
# 6) Inspect coefficients
# (Get feature_names back from ColumnTransformer)
ohe_feature_names = ct.named_transformers_['state_ohe'].get_feature_names_out(categorical_cols)
feature_names = list(ohe_feature_names) + numeric_cols

coef_table = pd.DataFrame({
    'feature': ['Intercept'] + feature_names,
    'coefficient': [reg.intercept_] + list(reg.coef_)
})
print(coef_table)
```

When we read this table, we are seeing our insights:

- **Intercept ($\beta_0$):** The baseline `Profit` if all other features were 0.
- **State_Florida ($\beta_1$):** "Holding all spends constant, a startup in Florida makes $\beta_1$ *more/less* profit than a startup in our *reference state* (the one we dropped)."
- **R&D Spend ($\beta_2$):** "For every 1 increase in R&D Spend, we predict a $\beta_2$ increase in `Profit`, *holding all other features constant*."

This ability to isolate a single factor is the power of multiple regression.



### Step 6: The "Reality Check" (Evaluation)

We built a model. Is it *good*?

First, we check $R^2$. This tells us what percentage of the variance in `Profit` our model was able to explain.

Python

```python
# 7) Evaluate: R^2 and Adjusted R^2
r2 = r2_score(y_test, y_pred)

m = len(y_test)
p = X_test.shape[1]
adj_r2 = 1 - (1 - r2) * (m - 1) / (m - p - 1)

print(f"R^2: {r2:.4f}")
print(f"Adjusted R^2: {adj_r2:.4f}")
```

A high $R^2$ (e.g., 0.93) is a good sign. But our *most important* diagnostic is the **Residual Plot**.

Python

```python
# 8) Quick residual check
residuals = y_test - y_pred

plt.figure(figsize=(6,4))
plt.scatter(y_pred, residuals)
plt.axhline(0, linestyle='--')
plt.xlabel("Fitted values (y_pred)")
plt.ylabel("Residuals (y_test - y_pred)")
plt.title("Residuals vs Fitted")
plt.show()
```

We are looking for *random, un-patterned, cloud-like* scatter. This is the "all-clear" signal. It means our model's errors are just random noise ($\varepsilon$), which is what we want.

If we see a curve or a fan shape, it's a "tell." It means our simple linear model is *missing* something (like a non-linear effect), and our journey to find the true pattern is not yet over.

### Colab Code: [Multiple Linear Regression](https://colab.research.google.com/drive/16LIK9aVMz-k3l5T1IXpJtV2L3lrHuQnb?usp=sharing)

Proceed to below after executing the above code !!!!!!!!!

After looking into the code you might be suspicious. It looks like we just made a huge jump, but the journey is actually very logical. It comes from a "journey of refining the error."

Let's start with our simple, one-variable model from Part 3:

$$y_i \;=\; \beta_0 \;+\; \beta_1 x_{i1} \;+\; \varepsilon_i$$

Let's anchor this:

- $y_i$ is our `Profit`.
- $x_{i1}$ is our `R&D Spend`.
- $\varepsilon_i$ is our "error" term.

### The "Aha!" Moment: What *Is* the Error Term?

In our simple model, we made a huge, brave, (and almost certainly wrong) assumption. We assumed that the *only* thing that systematically explains `Profit` is `R&D Spend`.

This means our error term, $\varepsilon_i$, had to be a giant "trash bin" that contained *everything else* in the universe that could possibly affect profit:

1. The effect of `Marketing Spend`.
2. The effect of `Administration Cost`.
3. The effect of the `State`.
4. The effect of a competitor's move.
5. Pure, unexplainable, random luck.

As we look at that "trash bin" $\varepsilon_i$ and feel deeply unsatisfied. We know it's not *just* random luck. We have a hypothesis that the `Marketing Spend` ($x_2$) is a real, measurable factor that's currently hiding in there.

### How the Equation "Grows"

So, we decide to "rescue" `Marketing Spend` from the error term.

We "promote" it from being "unexplained noise" to being a "first-class citizen" in our model. We do this by *giving it its own term* in the equation, with its *own coefficient* ($\beta_2$) that the model must solve for.

Our equation literally *grows*:

**Original Model:**

$$y_i \;=\; \beta_0 \;+\; \beta_1 x_{i1} \;+\; (\text{all other factors hiding in } \varepsilon_i)$$

**New, Better Model (Step 1):**

$$y_i \;=\; \beta_0 \;+\; \beta_1 x_{i1} \;+\; \beta_2 x_{i2} \;+\; (\text{a new, smaller } \varepsilon_i)$$

Our "trash bin" $\varepsilon_i$ just got smaller, because we've explained *more* of the variance.

Then, we do it again. We look at our new, smaller error term and say, "I bet the `Administration Cost` ($x_3$) is *still* hiding in there!"

So, we "promote" $x_3$ out of the error term and give *it* its own coefficient, $\beta_3$.

**Final Model (Step 2):**

$$y_i \;=\; \beta_0 \;+\; \beta_1 x_{i1} \;+\; \beta_2 x_{i2} \;+\; \beta_3 x_{i3} \;+\; (\text{an even smaller, purer } \varepsilon_i)$$

That is *how* the equation "comes here." It's not a new invention. It's an *expansion* of our simple model, built by researchers who kept asking, "What else is hiding in our error?"

The "so what" is that we are trying to make our $\varepsilon_i$ term as small and as close to *true, unexplainable, random noise* as possible. Everything that *is* explainable should be "promoted" into the model as its own $x$ term.