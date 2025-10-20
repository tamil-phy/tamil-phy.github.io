# ML Series : Part 1
I have decided to write this series as some of my colleagues want to learn machine learning. But the problem with materials out there is they had to spend at least six months to understand what is behind real machine learning and how deep learning works. The way Generative AI is accelerating makes it tough to spare huge time on learning something.

So I decided to bypass some items that can be tricky. If you are a newbie and if someone says, “hey, if you learn machine learning you should know this topic,” my apologies. At least I have spent a decade in this, and every time something new surprises me. So spare me for the concepts I miss and, above all, I will be genuine. I am a copy cat; whatever I learnt all these years, I am going to use that material and knowledge to sketch up this content. So if I resemble some author’s content, that’s not plagiarism I intended to do, but rather inspiration.

Above all, I am going to try avoiding any LLM in writing this material. I will try my best to be as humane as possible.

Most of you might be experienced people in software, and all these years you have likely spent long hours cracking a problem — using the inputs you are given, you sketch out a way to attain an output. That is, you must have an input and a “rule scheme” which will give an output.

But as the Internet era has been around for a while, the data accumulated in these years speaks volumes. Ah! Now here’s the interesting story: we now have both inputs and outputs. We want to figure out what made the connection, so we are going to use machine learning.

This is the exact opposite of traditional programming, which takes inputs and rules to produce outputs. But in the case of machine learning, it takes inputs and outputs to *infer* the rules.

Yeah! I hear you all saying, “I know this, what is the next step? Can you fast-forward?”

Right away, let’s take some data and understand the preprocessing steps.

The first thing is data, because it’s the fuel for any task we’re gonna work on. Without that, having a sophisticated algorithm is like having a Ferrari without fuel. (To be frank, I would love to have it in my garage).

So what data shall we use?

Now, you’re gonna role-play as a sales analyst. You have data with two columns: the first one is “Country Name,” and the second is whether or not that person bought your product. Your task is to predict if he or she will purchase your product.

Now, as an SME (Subject Matter Expert), you ask your team to collect some more data on these individuals. You have them collect their info about age and salary. Now, the data looks as below:

```text
Country,Age,Salary,Purchased
USA,38,68000,No
Brazil,29,,Yes
Japan,45,75000,Yes
India,22,35000,N
USA,51,82000,Yes
Brazil,33,54000,No
Japan,60,95000,Yes
U.S.A.,41,71000,No
India,35,58000,Y
Brazil,,62000,Yes
Japan,28,48000,No
USA,120,90000,Yes
Brazil,47,79000,No
India,31,?,Yes
Japan,39,66000,No
USA,25,45000,Y
Brazil,37,61000,No
India,42,1200000,Yes
```

Ah, we have four countries in our data: India, USA, Japan, and Brazil. As an analyst, you wanna predict which customers based on their country, age, and salary will buy your product.

Now, you are gonna do the data preprocessing, for which we will need the NumPy and Pandas packages. Let's load the dependencies using the imports below.

Here is how we will load that data and split it into our "features" (the things we know) and our "target" (the thing we want to predict).

We will use **pandas** to read the CSV file. Then, we will create two variables:

- `X`: This will hold our "features" or "independent variables." It is the data we will use to make a prediction (Country, Age, Salary).
- `y`: This will hold our "target" or "dependent variable." It is the final answer we are trying to predict (Purchased).

Here is the code to do it. We will use `.iloc` (integer-location based indexing) to select the columns.

```python
import numpy as np
import pandas as pd
import io

# We will put the CSV data from before into a string
# to make this example runnable.
# In a real project, you'd just use pd.read_csv('your_file_name.csv')
csv_data = """Country,Age,Salary,Purchased
USA,38,68000,No
Brazil,29,,Yes
Japan,45,75000,Yes
India,22,35000,N
USA,51,82000,Yes
Brazil,33,54000,No
Japan,60,95000,Yes
U.S.A.,41,71000,No
India,35,58000,Y
Brazil,,62000,Yes
Japan,28,48000,No
USA,120,90000,Yes
Brazil,47,79000,No
India,31,?,Yes
Japan,39,66000,No
USA,25,45000,Y
Brazil,37,61000,No
India,42,1200000,Yes
"""

# Read the data from the string
# In your code, you would just do: 
# dataset = pd.read_csv('Data.csv')
dataset = pd.read_csv(io.StringIO(csv_data))

# X = All rows, all columns EXCEPT the last one
# [:, :-1] means [all_rows, all_columns_except_the_last_one]
X = dataset.iloc[:, :-1].values

# y = All rows, ONLY the last column
# [:, -1] means [all_rows, the_last_column]
y = dataset.iloc[:, -1].values
```

```python
print(X)
```

```text
[['USA' '38' '68000']
 ['Brazil' '29' nan]
 ['Japan' '45' '75000']
 ['India' '22' '35000']
 ['USA' '51' '82000']
 ['Brazil' '33' '54000']
 ['Japan' '60' '95000']
 ['U.S.A.' '41' '71000']
 ['India' '35' '58000']
 ['Brazil' nan '62000']
 ['Japan' '28' '48000']
 ['USA' '120' '90000']
 ['Brazil' '47' '79000']
 ['India' '31' '?']
 ['Japan' '39' '66000']
 ['USA' '25' '45000']
 ['Brazil' 'Thirty-seven' '61000']
 ['India' '42' '1200000']]
```



```python
print(y)
```

```text
['No' 'Yes' 'Yes' 'N' 'Yes' 'No' 'Yes' 'No' 'Y' 'Yes' 'No' 'Yes' 'No'
 'Yes' 'No' 'Y' 'No' 'Yes']

```

As you can see, `X` is our set of inputs (notice the `nan` where the salary was missing) and `y` is our list of outputs (notice the 'N' that needs cleaning). Now we can start preprocessing this "unclean" data.

Another important aspect is that computers don't understand English or any text strings; they only understand numbers. So, we have to convert this text into a numerical format.

That’s where we are going to use a preprocessing function from `sklearn` (scikit-learn) called OneHotEncoder.

Alright, let's look at our data `X` again.

```
[['USA' 38 68000]
 ['Brazil' 29 nan]
 ['Japan' 45 75000]
 ...
 ['Brazil' 37 61000]
 ...]
```

We have a "hole" in our data: that `nan` (Not a Number) in the Salary column for Brazil. This is a huge problem. An algorithm is just pure mathematics; it can't do math on a blank space. It will crash.

What started as a simple data table now has a practical engineering problem. What do we do?

We *could* just delete that entire row (`['Brazil', 29, nan]`). But what if we do? We lose the valuable information that a 29-year-old from Brazil *did* purchase our product! Deleting data is easy, but it's wasteful. We're throwing away knowledge.

So, the next question we ask is, "But what if... we could just *fill in* that blank with a reasonable guess?"

This is where we move from just being data *collectors* to being data *engineers*. We're going to impute the missing value.

##### Anchoring in Fact: The `SimpleImputer`

We will use a powerful and practical tool from scikit-learn called `SimpleImputer`. It's exactly what it sounds like: a tool to fix these simple (but critical) missing data problems.

Now, let's look at the code you have got.

First, I noticed our "unclean" data also has a `'?'` in the salary column. Our `SimpleImputer` is specifically told to look for `np.nan`. It won't see the `'?'` as missing! This is a classic "gotcha" that trips up new projects. We have to fix this first.

```python
# First, let's replace all string '?' with the 'np.nan' our imputer is looking for
X[X == '?'] = np.nan 
```

Now, all our missing values (blanks, question marks) are all standardized to `np.nan`.

Let's deploy our imputer.

```python
from sklearn.impute import SimpleImputer

# 1. Create the tool and set the strategy
imputer = SimpleImputer(missing_values=np.nan, strategy='mean')

# 2. "Learn" from the data
imputer.fit(X[:, 1:3])

# 3. "Transform" the data
X[:, 1:3] = imputer.transform(X[:, 1:3])
```

Let's break that down.

- SimpleImputer(missing_values=np.nan, strategy='mean')

  This is where we define our plan. We're telling the imputer, "Your mission is to find anything that looks like np.nan. When you find it, your strategy will be to replace it with the mean (the average) of all the other values in that same column."

- imputer.fit(X[:, 1:3])

  This is the "learning" step. We're pointing the imputer only at our numerical columns: column 1 (Age) and column 2 (Salary). (Remember, Python is 0-indexed, so 1:3 means "columns 1 and 2"). The imputer scans those two columns, calculates the average age and the average salary, and just holds onto those two numbers. It hasn't changed anything yet; it has just done its homework.

- imputer.transform(X[:, 1:3])

  This is the "action" step. The imputer goes back to columns 1 and 2, finds every np.nan "hole," and fills it with the average it just learned. That nan in the Salary column for the user from Brazil? It's now filled with the average salary of all the other people in our dataset.

We just fixed our "broken" data without deleting a single row. We preserved all our valuable `X` and `y` information, and our dataset is now 100% complete and numerical. Our algorithm will no longer crash. We have used a simple, statistically-sound "exotic" tool to solve a very common, "practical" problem.

As we have successfully plugged the "holes" in our data, but if we look at `X`, we have still got a problem. The `Age` and `Salary` columns are great they are numbers. But that first column is all text:

**['USA', 38.0, 68000.0]**

**['Brazil', 29.0, 63500.0]**

**['Japan', 45.0, 75000.0]**

An algorithm is just a set of mathematical equations. It simply cannot *do math* on the word "USA".

Our first instinct, as logical problem-solvers, might be to just swap them for numbers: `Brazil = 0`, `India = 1`, `Japan = 2`, `USA = 3`. This seems clever, but it's a classic trap.

We have just *accidentally* told our algorithm that `USA` (3) is mathematically *greater* than `India` (1), and that `Japan` (2) is twice the value of `India`. The algorithm will now waste time trying to find a pattern based on this completely fake ranking, which is total nonsense.

The real solution is to change the *shape* of our data. Instead of one column with a fake ranking, we will create *multiple* columns that just act as "on/off" switches. This is what the **`OneHotEncoder`** is for.

It will take our single "Country" column and expand it into four new columns: `Is_Brazil`, `Is_India`, `Is_Japan`, `Is_USA`.

- A row for "USA" becomes: `[0, 0, 0, 1]`
- A row for "Brazil" becomes: `[1, 0, 0, 0]`

A '1' (or "Hot") goes in the column that applies, and '0's go everywhere else. Now there's no ranking, just facts.

But this creates a new practical problem: How do we apply this "OneHot" magic *only* to the first column, while leaving our perfectly good `Age` and `Salary` columns alone?

This is precisely what the **`ColumnTransformer`** is built for. It's like a traffic cop for our data pipeline, letting us apply specific tools to specific columns.

Let's look at the code:

Python

```python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

# 1. Define the plan
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [0])], 
                       remainder='passthrough')

# 2. Execute the plan and replace X
X = np.array(ct.fit_transform(X))
```

Here’s the breakdown of that `ColumnTransformer` line:

- transformers=[('encoder', OneHotEncoder(), [0])]

  This is our main instruction. We're saying: "Create a transformer named 'encoder'. The tool it will use is OneHotEncoder(). You will apply this tool only to column [0] (the Country column)."

- remainder='passthrough'

  This is the brilliant part. We're telling the ColumnTransformer, "For all the other columns I didn't mention (the 'remainder'), just let them 'passthrough' completely untouched."

When we run `ct.fit_transform(X)`, it does exactly that. It finds column `[0]`, "learns" the four unique countries, and creates the four new 'on/off' columns. It then sees columns `[1]` and `[2]` (Age and Salary) and just tacks them onto the end, unchanged.

**Our original row: ['USA', 38.0, 68000.0]**

(Assuming alphabetical order: Brazil, India, Japan, USA)

**Our new row: [0.0, 0.0, 0.0, 1.0, 38.0, 68000.0]**

And just like that, we have solved our final preprocessing puzzle. We have bridged the gap between human-readable categories and the pure numbers an algorithm demands. Our feature set `X` is now 100% numerical, and *finally* ready for a machine learning model.

We've meticulously engineered our `X` (features) into a perfect numerical matrix. But we have one last piece to deal with: our target variable, `y`.

If we look at y, it's still text:

**['No', 'Yes', 'Yes', 'N', 'Yes', 'No', 'Yes', 'No', 'Y', ...]**

Just like before, the algorithm can't understand 'Yes' or 'No'. Now, the code you've provided suggests using `LabelEncoder`, but this is where we've just run into a classic "in-the-trenches" gotcha.

If we fed `y` directly into `LabelEncoder` as-is, it would scan the array and find *four* unique strings: 'N', 'No', 'Y', and 'Yes'. It would then dutifully assign them four different numbers (e.g., 0, 1, 2, 3).

Our model would then try to predict four different outcomes, when *we* (the Subject Matter Experts) know there are only two: "Purchased" and "Not Purchased".

This is a critical moment. No "exotic" tool can fix a problem of basic logic. We have to clean this *before* we encode it. This is the unglamorous, essential work of data preprocessing.

Let's fix it right now. We will standardize our messy "N"s and "Y"s into our clean "No"s and "Yes"s.

```python
# Our y array currently looks like this:
# ['No', 'Yes', 'Yes', 'N', 'Yes', 'No', 'Yes', 'No', 'Y', ...]

# Let's find all instances of 'N' and replace them with 'No'
y[y == 'N'] = 'No'

# Let's find all instances of 'Y' and replace them with 'Yes'
y[y == 'Y'] = 'Yes'

# Now, if we check the unique values, we will see:
# ['No', 'Yes']
```

*Now* that our `y` variable is clean and consistent, we can use the `LabelEncoder`.

This tool is different from `OneHotEncoder`. We're not worried about a "fake ranking" here because `y` is the *output*. We just need a simple way to tell the model that 'No' is one category and 'Yes' is the other. Using `0` for 'No' and `1` for 'Yes' is exactly what we want.

The `LabelEncoder` is the perfect, simple tool for this specific job.

```python
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(y)
```

Let's break down that `fit_transform` line:

1. **`fit`**: The encoder scans our *cleaned* `y` array. It finds the two unique, consistent values: 'No' and 'Yes'.
2. **`transform`**: It then passes through the entire array and swaps them. By alphabetical default, it will map 'No' to `0` and 'Yes' to `1`.

If we print y now, we won't see any text. We will just see this:

**[0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1]**

And with that, our work is done. What started as a messy, "unclean" CSV file with missing numbers, text categories, and inconsistent labels has been transformed. Both `X` and `y` are now 100% pure, machine-readable numerical arrays.

Our data preprocessing journey is complete. The "fuel" is refined and it's finally ready for the engine.
