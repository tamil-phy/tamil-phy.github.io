# ML Series - 3 : Simple Linear Regression

Before we write a single line of code, let's build the intuition. What are we *actually* trying to do?

Imagine you have your new dataset: `SquareFeet` and `Price`. 

```python
SquareFeet,Price
1100,195000
1250,220000
1300,230000
1400,248000
1550,280000
```

The first thing you would do as a human is plot it on a graph. You would put `SquareFeet` on the bottom (the x-axis) and `Price` on the side (the y-axis).

You'd end up with a "scatter plot" of dots.

Even without a computer, your brain would instantly see a pattern. You'd see that, in general, as the square footage goes up, the price goes up. You could even take a ruler and draw a single straight line that you feel "best" represents that upward trend.

That's it. You have just performed Simple Linear Regression in your head.

**Simple Linear Regression** is just the formal, mathematical process for finding the *one, single, perfect* straight line that best "fits" or "describes" the relationship between two variables.

- It's **"Simple"** because we're only using *one* variable (`SquareFeet`) to predict the other (`Price`).
- It's **"Linear"** because we're assuming the relationship is a *straight line*.



##### Back to High School

You have seen this line before. In algebra class, it was your old friend:

$$y = mx + b$$

Let's translate this into our new "researcher" language. This is our *model*.

- **$y$** is the **Dependent Variable** — the thing we want to predict (`Price`). Its value *depends* on the other variable.
- **$x$** is the **Independent Variable** — the thing we know (`SquareFeet`). We use it to make our prediction.
- **$m$** is the **Coefficient** (or "slope") — this is the most important number! It answers the question, "For every *one* extra square foot of space, how many dollars does the `Price` go up?"
- **$b$** is the **Intercept** (or "constant") — this is our starting point. It's the theoretical `Price` of a house with *zero* square feet.

So, our entire "quest" is to find the perfect values for **$m$** and **$b$**. If we find them, we have a powerful predictive tool.

##### How Do We Find the "Best" Line?

This is the real question. What does "best" even mean?

Imagine we just draw a random line through our data points.

1. Pick any *real* data point (one of our red dots).
2. Look at the `Price` our line *predicts* for that *same* `SquareFeet`.
3. That vertical distance between the *real dot* and our *predicted line* is our **error**. In statistics, we call this the **residual**.

Now, some of our errors will be positive (our line was too low) and some will be negative (our line was too high). If we just add them up, they'd cancel each other out, which is useless.

So, the brilliant solution is to **square every error** first. This makes every error a positive number (`-10` squared is `100`, and `10` squared is `100`).

Now, we can add up *all* of those squared errors. This gives us one single number called the Sum of Squared Errors (SSE).

This is the key: The "best" line is the one, single, unique line that makes this Sum of Squared Errors as small as it can possibly be.

##### The Bridge: From Concept to Algorithm

This method of finding the line with the *least* total *squared* error has a formal name: **Ordinary Least Squares (OLS)**.

When we call that `regressor.fit()` function in the code, this is exactly what the computer is doing. It's not "thinking" or "understanding" housing. It is using calculus to test all possible values for $m$ and $b$ until it finds the *one* combination that results in the lowest possible Sum of Squared Errors.

What started as... a simple scatter plot of dots...

...became a quest... to find the "best" m and b...

...by defining "best"... as the line that minimizes the "Sum of Squared Errors."

Once the computer runs this OLS process, it hands us back the final, "learned" values. For example, it might tell us:

- $b$ (intercept) = 50,000
- $m$ (coefficient) = 200

We are now armed with a powerful model:
$$
Price = 200 * SquareFeet + 50,000
$$
Now, when a *new* house (one not in our data) comes on the market, and we're told it's 1,500 sq ft, we don't have to guess. We can *predict*:
$$
Price = 200 * (1500) + 50,000 = $350,000
$$
And *that* is the "so what." We've used past data to find a mathematical rule that lets us forecast the future. 

Now let's delve into coding what we learnt so far. 

```python
SquareFeet,Price
1100,195000
1250,220000
1300,230000
1400,248000
1550,280000
1600,295000
1700,315000
1850,340000
1900,355000
2000,380000
2150,405000
2200,410000
2300,425000
2450,450000
2600,485000
2700,505000
2900,540000
3000,555000
```

Look at our new dataset. It's clean, simple, and intuitive.

- `SquareFeet` (our feature, `X`)
- `Price` (our target, `y`)

The relationship is almost primal. We have a hypothesis that a **house's price is connected to its size (square footage)**. Our task is to find the *exact* mathematical nature of that connection.

We are, in effect, trying to find the "equation of the line" that best describes this relationship. 

We have seen this before  **$y = mx + b$**.

##### From Splitting to Fitting

**1. Splitting the Dataset**

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 1/3, random_state = 0)
```

Just as we discussed, we can't test our model on the same data it studied. So, we split our data. We'll use two-thirds for "training" (the textbook) and hold back one-third for the "final exam" (the test set).

**2. Training the Model**

```python
from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(X_train, y_train)
```

This is the moment of learning.

- `regressor = LinearRegression()`: We create a "blank" instance of the model. Think of it as a new brain, ready to learn, but it doesn't know $m$ or $b$ yet.
- `regressor.fit(X_train, y_train)`: This is the "study" phase. We are telling the `regressor` to look at *all* the data points in our **training set** (`X_train` and `y_train`). It then uses a method (called Ordinary Least Squares) to find the single best $m$ and $b$ that create a line that is as close as possible to *all* of those training data points.

After this one line of code finishes, our `regressor` is no longer blank. It is now a *trained model*. It has "learned" the optimal $m$ and $b$ from the data.

**3. Predicting the Test Results**

```
y_pred = regressor.predict(X_test)
```

This is our "final exam." We take our `X_test` (the square footage from our held-back data) and show it to our `regressor`. The model, which has *never seen this data before*, looks at each new `X_test` value and, using the $m$ and $b$ it learned, *predicts* the price (`y_pred`).

We can now compare `y_pred` (the model's *predictions*) to `y_test` (the *actual* answers) to see how accurate we were.

##### Visualising the "So What?"

This is where we get to *see* what our model learned.

**1. The Training Set Results**

```python
# (Code for the Training set plot)
plt.scatter(X_train, y_train, color = 'red')
plt.plot(X_train, regressor.predict(X_train), color = 'blue')
plt.title('Price vs Square Feet (Training set)')
plt.xlabel('Square Feet')
plt.ylabel('Price')
plt.show()
```

- `plt.scatter(...)`: We first plot the **red dots**. These are our *actual* data points from the training set (real houses, real prices). This is reality.
- `plt.plot(...)`: We then plot the **blue line**. This line represents our model's predictions *for that same training data*. It's no surprise the line cuts through the dots so well; this is the very data it used to learn. This plot confirms our model "learned" correctly from its study material.

**2. The Test Set Results**

```python
# (Code for the Test set plot)
plt.scatter(X_test, y_test, color = 'red')
plt.plot(X_train, regressor.predict(X_train), color = 'blue')
plt.title('Price vs Square Feet (Test set)')
plt.xlabel('Square Feet')
plt.ylabel('Price')
plt.show()
```

This is the most important graph.

- `plt.scatter(...)`: We plot the **red dots** again, but this time, they are the `X_test` and `y_test` values—the "final exam" data the model has *never seen*.
- `plt.plot(...)`: Now, look closely. We are plotting the *exact same blue line* as before (the line is defined by the $m$ and $b$ learned from the *training set*). We are visually placing our "never-before-seen" test data against the model's single rule.

**This is the moment of truth.** Look at how closely the *new* red dots fall to our *original* blue line!

This graph is the "so what." It proves our model wasn't just *memorizing*. It learned the *underlying relationship* between square footage and price so well that it could make accurate predictions about data it had never encountered.

What started as a simple algebra equation ($y = mx + b$) has become a powerful, predictive tool. 

##### [Code: Simple Linear Regression](https://colab.research.google.com/drive/1DkKEIW2Ji8mySx2GcEqEwAhBcr93oDLz?usp=sharing)

