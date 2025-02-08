### Backward Propagation

**Mistakes are the portals of discovery —** James Joyce

### Backward Propagation: Learning from Mistakes to Improve Neural Networks

Just like humans, neural networks learn and improve by reflecting on their mistakes. This process of fine-tuning decisions, based on what went wrong, is known as **backward propagation**.

#### Learning from a Bad Move

Have you ever played chess and realized, a few moves later, that you made a mistake? Maybe you moved your queen too early or overlooked your opponents strategy, and before you knew it, your game was in trouble. But every game, whether won or lost, teaches you something. **You reflect on your mistakes, adjust your approach, and play smarter next time.**

Neural networks work the same way. When they make a wrong prediction, they don’t quit. Instead, they reflect on the error and fine-tune their decisions through a process called **backward propagation**. In simple terms, this is how a neural network adjusts its internal settings — like **weights and biases** — to reduce errors and improve over time.

Just as chess players sharpen their strategies with each game, neural networks become more accurate with every adjustment. With every mistake, they learn a bit more, becoming smarter and more reliable over time. Whether it is on the chessboard or in the digital world, **learning from errors is key to success**.

### How Backpropagation Works: Step-by-Step Process

#### Step 1: Error Calculation — Figuring Out What Went Wrong

Imagine you just finished a game of chess, and things didn’t go your way. You lost because you made a risky move — bringing out your queen too early — and your opponent took advantage. Now, you reflect on where it all went wrong. This reflection is similar to how a neural network calculates **error** after making a prediction — it looks at the difference between what it predicted and the correct outcome.

In chess, the “error” is the moment you realize your queens early move was not the right strategy. In a neural network, this error is quantified using a **loss function**, a mathematical formula that measures how far off the prediction was from the actual target.

Some commonly used **loss functions** include:

- **Mean Squared Error (MSE):** This function works well for predictions involving numbers. It measures the average squared difference between the predicted and actual values.

$$
E = \frac{1}{2} \sum \left( y_{\text{pred}} - y_{\text{actual}} \right)^2
$$

- It is like asking, “How badly did my move backfire?” The bigger the gap between your intended outcome and the actual result, the higher the error.
- **Cross-Entropy Loss:** This loss function is useful for classification tasks, like deciding the best move from several possibilities. It measures the difference between the predicted probabilities and the actual correct move. If your predicted best move was wrong, the cross-entropy loss shows how much your decision deviated from the optimal move.

By calculating the **loss**, the network gains insight into how far off its prediction was — just like how you analyze your wrong move after losing a chess match. This understanding sets the stage for the next step: **identifying the factors that caused the error** so adjustments can be made for better future decisions.

#### Step 2: Gradient Calculation — Pinpointing the Problem Moves

After calculating the error, the next step is figuring out **which moves led to the loss** — just like how, after losing a chess game, you might ask yourself, “Was it the early queen move that cost me, or did I underestimate my opponent’s knight?” Similarly, in a neural network, we need to determine **how much each weight and bias contributed to the error**.

The neural network uses **gradients** to figure this out. A **gradient** measures how sensitive the error is to a particular weight or bias. Think of it as asking: “If I had moved my knight instead of the queen, would the outcome have been different?”

**How Gradients Work: Tracing the Cause**

The neural network applies **partial derivatives** through the **chain rule of calculus** to understand how changing each weight affects the overall error. In other words, it calculates the impact of each parameter on the prediction.

Here’s a simplified example:

$$
\frac{\partial E}{\partial w} = \text{Gradient of Error with respect to Weight}
$$
**If the gradient is large**, it means the parameter (weight) played a significant role in causing the error. It is like realizing that the early queen move had a huge impact on your loss.

**If the gradient is small**, it means the parameter didn’t have much influence on the error. It is like noticing that a pawn move in the middle of the game didn’t really affect the outcome.

By calculating these gradients, the network can identify which parts of the decision-making process need the most adjustment. **This insight guides the network** in the next step: tweaking its parameters to reduce errors and make better predictions, just as you adjust your strategy for future games.

#### Step 3: Backpropagating the Error — Retracing Your Moves

Once the network knows the **error** and which weights contributed most, it needs to pass this information back through the network to make adjustments. This process is called **backpropagation**. Think of it like **replaying a chess game in reverse**, step by step, to understand where things went wrong.

Just like you retrace your steps from the checkmate to see if moving your queen too early was the mistake, the neural network **works backward from the final error** at the output layer. It passes the error back through the hidden layers, **distributing responsibility** among all the parameters (weights and biases). This way, each parameter learns how much it contributed to the error.

#### How Backpropagation Works: Retracing the Game

In backpropagation, the network calculates how the error at the **output layer** relates to the parameters in the hidden layers. It does this by applying the **chain rule of calculus**, which allows it to trace how changes in earlier parameters impact the final outcome.

#### Mathematical Insight with the Chain Rule

For a neuron (z) in a hidden layer that connects to the predicted output (y_pred), the total gradient is given by:

$$
\frac{\partial E}{\partial w} = \frac{\partial E}{\partial y_{\text{pred}}} \cdot \frac{\partial y_{\text{pred}}}{\partial z} \cdot \frac{\partial z}{\partial w}
$$
This formula tells us that the gradient — the amount the weight (w) contributed to the error — depends on three factors:

$$
\frac{\partial E}{\partial y_{\text{pred}}}
$$
How much the **error changes** with respect to the predicted output.

**Chess analogy:** This is like asking, “How big was my loss because of my final move?”

$$
\frac{\partial y_{\text{pred}}}{\partial z}
$$
How much the **predicted output changes** with respect to the hidden layer neuron (z).

**Chess analogy:** This reflects how much your earlier moves (like moving a rook) influenced your final position.

$$
\frac{\partial z}{\partial w}
$$
How much the **hidden neuron’s value changes** with respect to the weight (w).

**Chess analogy:** This is like figuring out how much an individual decision (like deploying a knight instead of a bishop) affected the overall game.

Just like you go back through each move to figure out what led to your loss, the network works through **each layer backward** to identify the role of every weight and bias. The goal is to **distribute blame correctly** so that each parameter knows how much to adjust. This leads us to the final step: making those adjustments to improve future predictions.

For a neuron (z) in the hidden layer connected to an output (y_pred), the total gradient is:



$$
\frac{\partial E}{\partial w} = \frac{\partial E}{\partial y_{\text{pred}}} \cdot \frac{\partial y_{\text{pred}}}{\partial z} \cdot \frac{\partial z}{\partial w}
$$
This shows that the total gradient depends on **how the output changes with respect to the weight.**

#### Step 4: Adjusting Weights and Biases — Fine-Tuning Your Strategy with Gradient Descent

Let us break down how **weights are adjusted mathematically** using chess as an example to make it easier to grasp. Think of each **weight** in the neural network as a key part of your chess strategy — for instance, **how much trust you place in bringing out your queen early in the game**. If that decision backfires (like losing the queen early), you will want to **rethink the importance of such moves** for future games.

This is exactly what **gradient descent** does: it makes small adjustments to weights and biases to reduce future errors, helping the network learn from its mistakes.

#### How Weight Adjustment Works: Mathematical Insight with Gradient Descent

When the network calculates the **gradient** (the slope of the error with respect to a weight), it uses that information to adjust the weight. Specifically, it adjusts the weight in the **opposite direction of the gradient** to reduce the error.

The formula for updating weights is:

$$
w_{\text{new}} = w_{\text{old}} - \eta \cdot \frac{\partial E}{\partial w}
$$

Where:
- $$( w_{\text{new}})$$ is the updated weight.
- $$( w_{\text{old}})$$ is the current weight value.
- $$( \eta )$$ is the **learning rate**, which controls how big of a step the adjustment will take.
- $$( \frac{\partial E}{\partial w})$$ is the **gradient**, which measures how sensitive the error is to changes in that weight.

Let us say your chess strategy assigns **a weight of 0.8** to moving your queen early (you have a lot of confidence in this strategy). After losing the game, you analyze your moves and find that the **gradient of the error with respect to this weight** is 0.3.

This gradient indicates that adjusting the importance of this move **could reduce the error** — meaning you need to **slightly decrease the trust you place in early queen moves**.

Now, let’s say the **learning rate** is \eta = 0.1, meaning you want to make small adjustments rather than drastic changes.

#### Calculating the New Weight

Using the weight update formula:

$$
w_{\text{new}} = w_{\text{old}} - \eta \cdot \frac{\partial E}{\partial w}
$$

Substitute the values:

$$
w_{\text{new}} = 0.8 - (0.1 \cdot 0.3)
$$

$$
w_{\text{new}} = 0.8 - 0.03 = 0.77
$$

So, the new weight for **moving your queen early** becomes **0.77**. This means you slightly reduce the importance of that move, but you’re not abandoning it entirely — you’re just adjusting your approach to avoid repeating the same mistake.

#### The Power of Small Adjustments

In chess, it is important to **make gradual improvements** over time. If you completely stop using your queen early, you might miss out on beneficial opportunities. Similarly, if the **learning rate** is too high, the network could **overshoot the optimal weight** and end up making worse predictions. On the other hand, **if the learning rate is too small**, progress will be painfully slow.

### Step 5: Iterative Learning — Refining Over Time

Just as you become a better chess player by **reflecting on your past games**, a neural network improves with every **epoch** — one complete pass over the training data. In chess, each game teaches you something new: maybe you learn to delay your queen’s movement or prioritize developing your minor pieces early. Similarly, in a neural network, **every iteration contributes to gradual improvement** by reducing the error step by step.

#### How Iterative Learning Works in Chess

In chess, you won’t master openings, tactics, or strategies after just one game. But **through practice**, you start recognizing patterns — like knowing when to castle or when to hold off on moving the queen. Each game refines your understanding, making your decisions smarter in future matches.

A neural network works the same way: **with every epoch**, it processes the entire dataset, learns from its mistakes (errors), adjusts its weights and biases, and then tries again.

#### Activation Functions: Adding Non-Linearity to Make Smarter Decisions

In chess, not every move follows a simple, linear pattern — sometimes, the best strategy is unexpected, like sacrificing a piece to gain an advantage later. Similarly, neural networks need **non-linearity** to solve complex problems. This is where **activation functions** come in. They allow the network to learn patterns that aren’t just straight lines but **rich, complex relationships** between inputs and outputs.

Each neuron in a neural network uses an **activation function** to determine if it should “fire” (activate) based on the inputs it receives. These functions are critical for backpropagation because their **derivatives** help determine how much each neuron’s activation contributes to the final output, guiding the network’s learning process.

#### Common Activation Functions:

![img](https://cdn-images-1.medium.com/max/1600/1*ExCiN5HtxmNL15ILHKMUiA.png)

![img](https://cdn-images-1.medium.com/max/1600/1*XNjFUqlz3AMKb42jITHorw.png)

![img](https://cdn-images-1.medium.com/max/1600/1*_TSyNn73yMdRpARz6wEyKg.png)

#### Why Activation Functions Matter in Backpropagation

When the network is training, **the derivative of the activation function** helps determine how much each neuron’s output contributed to the final result. This information flows backward during **backpropagation**, guiding the network in **adjusting its weights**.

- **Example:** If a neuron with ReLU outputs 0, its contribution to the error is 0, and it won’t receive any adjustments during backpropagation.
- If a move doesn’t affect the outcome (like moving a pawn in an irrelevant part of the board), there is no need to rethink it.

Just as humans grow wiser by reflecting on their mistakes, **neural networks improve through backpropagation** — tweaking their **weights and biases** to reduce errors and refine their predictions. With every iteration, the network learns a little more, becoming increasingly accurate over time. This continuous cycle of **learning, adjusting, and improving** mirrors how experience shapes human decision-making.

In our next blog, we will dive into **Stochastic Gradient Descent (SGD)**, a powerful optimization technique that accelerates the learning process by making weight updates more efficiently. Stay tuned to discover how SGD helps neural networks reach better solutions faster, just like playing quick, focused chess games sharpens your strategy for the long haul.