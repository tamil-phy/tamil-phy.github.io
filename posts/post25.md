# ML Series : Part 2

Our "fuel" is refined and ready. It's time to put it to work.

But now we face a new, crucial question. We could feed all our data (our entire `X` and `y`) into an algorithm and tell it to "learn." And it would! It would find a pattern and if we asked it to predict the answers for the same data we gave it, it would probably get 100% correct.

But what would that prove?

This is like giving a student an exam, letting them take it home to "study" (memorize) and then being shocked when they get a perfect score on the *exact same test* the next day. They didn't *learn* the subject; they just memorized the answers.

We have to ask a more profound question: **"But what if... we could hold back some of our data to use as a surprise quiz?"**

This is the only way we can truly know if our model has generalized the patterns, or if it just overfitted by memorizing the data we showed it.

#####  `train_test_split`

This is a fundamental step in all of machine learning. We must split our dataset into two parts:

1. **The Training Set:** This is the majority of our data (usually 70-80%). It's the "textbook" we give our model to learn from.
2. **The Test Set:** This is the smaller portion (20-30%) that we hold back. It's the "final exam" the model has *never* seen before.

We will use a standard, powerful function from scikit-learn to do this for us.

```python
from sklearn.model_selection import train_test_split

# test_size=0.2 means we're holding back 20% of the data for our "test"
# random_state=1 is just a number to ensure that if we run this again,
# we get the exact same "random" split. It makes our work reproducible.
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 1)
```

##### Explaining the "So What?"

When we run this one line of code, we've created four new variables:

- `X_train`: The features (Country, Age, Salary) for the 80% of our customers we'll use for training.
- `y_train`: The *answers* (Purchased: 0 or 1) for that same 80%.
- `X_test`: The features for the 20% of customers the model has *never seen*.
- `y_test`: The *true answers* for that 20%, which we'll keep hidden until the very end.

This is the most critical checkpoint in our entire process.

**Our journey is now clear:**

1. **We will feed `X_train` and `y_train` to our algorithm.**
2. **The algorithm will learn the patterns and build a model.**
3. **Then, we will give that trained model our `X_test` data and ask it to predict the answers.**
4. **Finally, we'll compare its predictions to the *real* answers (`y_test`) that we've had hidden all along.**

This is our moment of truth. This is how we move from building a *program* to building a *predictor*. We are not just checking if it can memorize; we are checking if it can *think*.

Even though we have split our data, and we are just one step away from feeding it into our algorithm. But there's a final, subtle "gotcha" lurking in our `X_train` data.

Let's look at a sample row of our `X_train` after we one-hot encoded it:

**[0.0, 0.0, 0.0, 1.0, 38.0, 68000.0]**

**[(One-hot Country), (Age), (Salary)]**

Notice the *scale* of those last two numbers. `Age` is around `38`, but `Salary` is `68000`.

Most machine learning algorithms are just complex geometry under the hood. They work by calculating distances between data points in a high-dimensional space.

Think about it: to an algorithm, the "distance" between a salary of $70,000$ and $80,000$ is *enormous*. The "distance" between an age of 30 and 40 is... tiny.

The algorithm, in its purely mathematical world, will become completely dominated by the `Salary` column. It will learn to ignore `Age` and even `Country`, not because they're bad predictors, but simply because their numerical values are so small they look like static noise. We have accidentally *biased* our model to think salary is the only thing that matters.

##### Anchoring in Fact: `StandardScaler`

We need to fix this. We must put all our features on a level playing field, so the algorithm treats them all with equal importance (at least to start). This process is called **Feature Scaling**.

We will use one of the most common methods: **Standardization**. It will transform all our features so they are centered around a mean of 0 and have a standard deviation of 1.

But now, look at your code:

```python
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train[:, 5:] = sc.fit_transform(X_train[:, 5:])
X_test[:, 5:] = sc.transform(X_test[:, 5:])
```

##### Explaining the "So What?"

This code contains two of the most important concepts in a data pipeline.

**1. The `[:, 3:]` Slice:**

**The "Why":** We are telling the scaler to *only* touch the columns *starting from* index 3. Why? Because our first few columns are our `[0.0, 0.0, 0.0, 1.0, ...]` one-hot encoded countries. Those are *already* on a perfect, consistent scale. Trying to "standardize" them would destroy their meaning.

The fit_transform vs. transform:

This is the most critical part of the whole operation.

- `sc.fit_transform(X_train[:, 3:])`

  - **`fit`**: We first show the `StandardScaler` our **training data** (`X_train`). It scans the `Age` and `Salary` columns and "learns" their `mean` (average) and `standard deviation`.
  - **`transform`**: *Then*, it goes back and applies the transformation to `X_train`, rebuilding those columns. Our new `Age` and `Salary` values will now be small numbers, like `0.45`, `-1.2`, etc.

- `sc.transform(X_test[:, 3:])`

  - Notice we *only* call **`transform`** on the test set.

    **Why?** This is fundamental. Our `X_test` is our "final exam" that the model has never seen. We cannot "learn" (or `fit`) on it. That would be cheating. We must apply the *exact same* transformation (the `mean` and `standard deviation` we learned *only* from `X_train`) to our test set.

    This prevents what we call **data leakage**. We are treating our test set as if it were brand new data arriving in the real world, which is exactly the rigor we need.

With this final step, our data is truly ready. We have handled missing values, encoded text, split our data for validation and now, we have scaled our features to remove all bias.

Our `X_train` and `X_test` are now perfectly prepared numerical matrices. The engine is primed.

# [Code: Data_Preprocessing_blog.ipynb](https://colab.research.google.com/drive/15Sw6JI4rcXD9w941nvtWYgCRM5Uv6cq9?usp=sharing)