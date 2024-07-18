# All about Neural Networks:

#### *Quick History:*

*The first computational model of a neuron was proposed by Warren McCulloch  and Walter Pitts in 1943. Inspired by McCulloch and Pitts, Rosenblatt  built the first neural network, a single layer, linear binary classifier in 1957. These linear models are severely limited by the family of  functions that they can approximate. Minsky (1966) pointed out the  limitations of the linear family of models, such as their inability to  learn the XOR function. This revelation led to a backlash against the  neural networks approach.*

*Ivakhnenko (1971) introduced the first Multi-layer Perceptron (8 layers), which  could learn nonlinear functions. The idea of using the chain rule for  training neural networks was independently discovered by Lecun, Parker,  and Rumelhart in the 1980s. Rumelhart and Hinton (1986) presented the  first successful experiments with backpropagation in their book,  Parallel Distributed Processing. Neural Networks gained ascendancy  following the success of backpropagation.*

*Hochreiter (1991) addressed the vanishing and exploding gradient problems in  backpropagation. Hochreiter and Schmidhuber (1997) introduced the  Long-short Term Memory networks (LSTMs), which could remember relevant  information for a longer number of time steps. This prevented the decay  of the error signal between the layers. LeCun (1998) used LeNet-5, a  7-layered convolutional neural network for classifying handwritten  numbers. The network was trained by combining Stochastic Gradient  Descent (SGD) with backpropagation. Hinton (2006) introduced the first  Deep Neural Network called the Deep Belief Network trained using greedy  layer-wise pretraining. This work is widely considered to have ushered  in the modern era of Deep Learning*. *The Deep  Learning method has equipped both systems of abstract forms of  intelligence (Chess, Go) and application-oriented systems(Speech  Recognition, Computer Vision) with super-human ability.*



# What is a Neural Network?

**Artificial Neural Network** is an umbrella term that encompasses a variety of learning systems  grouped under the Connectionism category. The neural networks can be  classified into different types based on their architecture, nature of  inputs and outputs, operating mechanisms and training algorithms, etc.  Integrate-and-fire networks map inputs to outputs through several  non-linear transformations without any regard to timing, whereas in the  Spiking neural networks, timing plays a crucial role. In most neural  network types, the architecture is fixed, only the weights of the edges  connecting the neurons are adjusted, whereas, in Neuro-evolution methods like NEAT, both the architecture and weights can be changed. Depending  on the nature of the target, variable neural networks can be classified  into two major categories such as regressors (real number output) and  classifiers (categorical output). Hopfield neural networks use the  Hebbian learning rule for training, whereas the network we are  discussing in this blog namely, Deep Neural Networks, uses the  backpropagation algorithm for training.

They all have one thing in common, a collection of simple **neuron-like units** connected to each other that cooperate to model the relationship between input  and output. The neuron is the building block of a Neural Network. There  are different models of neurons with varying closeness to the biological counterpart. The most famous model is the integrate-and-fire neuron.  They have input and output edges connecting to other neurons. An  integrate-and-fire neuron collects input from all its input edges, and  after reaching a threshold, it lights up all its output edges.


$$
y_i^{(1)} = \sigma(\sum_{j=0}^{n} w_{ij}^{1}x_{j}+b_{j}^{(1)})
$$
As shown in the above Equation, i<sup>th</sup> neuron calculates the weighted sum  of all its inputs, x<sub>{j=0...n}</sub>  weighted by the edges w<sub>{ij}</sub> of weight  matrix w<sub>{mn}</sub> (usually there is also a bias term b<sub>{i}</sub> added to the  result) and fires when the sum reaches a threshold (determined in this  case by sigmoid function). Weights of the edges signify the  strength of the connections between neurons and these weights and biases are the learnable parameters of the network. The Network of  interconnected neurons constitutes the Neural Network.

# **Understanding Neural Networks: How They Work**

Ever found yourself scratching your head over what neural networks are or  how they work? You are not alone! As a researcher, I get asked these  questions all the time, and explaining it without diving into a sea of  beautiful math has been quite the adventure. So, I decided to sketch out a few examples in my mind and use them to introduce the concepts. Think of this blog as my personal notebook, where I break down these brainy  concepts in a way that is simple and easy to grasp. Whether you are just curious or looking to get a handle on the basics, you will find  everything you need right here. Let’s embark on this exciting journey  into the fascinating world of neural networks together, with a dash of  fun along the way!

If you want to understand how this black box works, take a moment to understand what hyperparameters are!

Wow, hyperparameters!

Think you are trying to listen to your favorite music on the radio! (Yeah,  let’s go back to the ‘90s). When tuning a radio, you adjust the  frequency to find the right station. Done? Nope! You also change the  volume for the desired loudness and sometimes adjust the antenna for  better reception. These adjustments help you get clear and enjoyable  sound.

In a neural network, hyperparameters are adjusted to find the optimal  settings for the model to learn effectively and make accurate  predictions. There is a big list of hyperparameters. Let’s explore them  one by one.

In general neural networks has

### **Input Layers →Hidden Layers →Output Layers**

![img](https://miro.medium.com/v2/resize:fit:1400/1*h4dDibzxn475d8g78xZS8Q.png)

# Input Layers

Each input layer has input nodes. How do you choose the number of nodes in  the input layer? Don’t worry, it’s simple. Think of your input as an  image of 16 x 16 pixels: **16 x 16 = 256**

Ah! That’s it — you have 256 input nodes in your input layer. Some call  them nodes, some features, and they can also be mentioned as dimensions.

# Hidden Layers

You know the term Deep Learning, right? That name comes from the number of hidden layers (Yes, those layers with hidden nodes!).

For the input layer, it was straightforward right! If you have a 16 x 16 pixel image, you get 256 input nodes. Easy peasy!

How do you choose the number of hidden layers and neurons?

Here’s where the fun begins. Simple problems might just need one hidden layer, but for trickier tasks like recognizing objects in images, more layers  help the network learn better.

When it comes to neurons in each hidden layer, consider these rules of thumb:

- **Between the size of the input and output layers.**
- **About two-thirds the size of the input layer plus the output layer.**
- **Less than twice the input size.**

Remember, it’s all about experimenting and tweaking — test, validate, and fine-tune until you hit that sweet spot!

For deeper insights, check out [Geoffrey Hinton’s lecture](https://videolectures.net/jul09_hinton_deeplearn/) on deep learning and follow this [Heaton Research blog](https://www.heatonresearch.com/2017/06/01/hidden-layers.html).

# Output Layer

Alright, let’s dive into the output layer — the grand finale of your neural  network! This is where all the learning and processing come together to  give you the final answers. Deciding the number of output nodes is a  breeze. It’s all about what you want your network to do.

- **Classification Tasks**: If you are identifying different types of fruits, the number of output  nodes matches the number of fruit types. For apples, bananas, and  cherries, you will need 3 output nodes, one for each fruit.
- **Regression Tasks**: If you are predicting something like house prices, you typically just  need one output node to give you that single predicted value.

Think of the output layer as the part of the network that translates all the  magic happening inside into actual results. For classifying handwritten  digits (0–9), you will have 10 output nodes. If you are predicting a  single continuous value, like stock prices, it’s just one node.

The output layer is your neural network’s way of saying, “Here’s what I  think!” Whether you are classifying, predicting, or something else, this part is all about clarity and simplicity. And remember, just like with  hidden layers, you might need to experiment and tweak to get everything  just right. Have fun with it!

Now it’s time to explore Weights, Bias, Learning Rate & Momentum.



![img](https://miro.medium.com/v2/resize:fit:1400/1*KfUV6wN6xHKroo261ETtGA.png)

# Weights

When you feed input data into the network, it travels through the layers. At every connection between nodes, there’s a weight that determines how  much influence one node has on the next.

Imagine you are a botanist trying to identify flowers. Initially, you might  give equal importance to petal length, petal width, sepal length, and  sepal width. But as you observe more flowers and learn, you realize that petal length and width are more important for distinguishing certain  species. So, you start paying more attention to these features and less  to the others.

In the neural network, this “paying more attention” is done through  adjusting the weights. The network learns which features (inputs) are  more important for making accurate predictions by adjusting the weights  accordingly.

So, in essence, weights are like the attention and importance you give to  different features based on what you learn. By continually adjusting  these weights, the network improves its ability to identify flower  species accurately, just like you would as you gain more experience in  botany!

Weights are crucial — they’re what allow your network to learn from data and  make accurate predictions. They’re constantly being adjusted to improve  performance, and without them, your neural network would be just a fancy graph with no real function. Keep those weights in check, and you’re on your way to building an awesome, high-performing neural network!

# Bias

As a botanist you found a flower that doesn’t clearly fit into one species based solely on its visible features. As a seasoned botanist, you have a hunch — a baseline knowledge — that certain flowers are more likely to  belong to a particular species even if the features aren’t definitive.  This hunch is your bias. Over time, as you observe more flowers and  learn from mistakes, you refine this hunch. Similarly, in a neural  network, the bias starts with an initial guess and gets refined through  training.

In the neural network, the bias allows each hidden node to make an  educated guess, helping the network to learn better. It ensures that the neurons can still activate and contribute to the decision-making  process even when the input features are zero or not strong enough.

Let’s say the initial bias for a hidden node starts at a value of 0.5. During training, if the network realizes that this bias needs to be adjusted  to better fit the data, it might change it to 0.7 or -0.3 based on the  learning process. The key point is that the bias is a learnable  parameter, dynamically adjusted to improve the network’s performance.

# Learning Rate

The learning rate is a crucial hyperparameter in training neural networks.  It determines how much the model’s weights are adjusted in response to  the estimated error each time the model weights are updated. In simpler  terms, it’s the speed at which your neural network learns.

Consider training a neural network to classify flowers based on features like  petal length and width. If your learning rate is too high, the model  might oscillate between predictions, failing to converge on an accurate  classification rule. If the learning rate is too low, the model might  learn too slowly, making the training process inefficient and possibly  never reaching the best solution. Imagine the learning rate is like the  stride length in your journey to the valley (the minimum loss). Finding  the right balance ensures that your neural network learns efficiently,  avoiding both the pitfalls of overshooting and the delays of tiny steps.

# Momentum

Momentum in neural networks helps the training process by adding some of the  previous steps’ direction to the current step. This results in smoother  and faster learning, making it easier for the network to find the best  solution. It’s like having a trusty push that helps you keep going  steadily, even when the path gets rough.

Think of training a neural network like hiking down a mountain to reach a  beautiful valley. The path can be rocky and uneven, just like the loss  landscape in training a model.

Now imagine hiking down a mountain without momentum. You are relying solely on the immediate path in front of you. Every little rock or bump can  throw you off, causing you to slow down, speed up, or even take a few  steps back. This makes your descent slow and a bit all over the place.

Now, picture hiking with an experienced guide who knows the trail like the  back of their hand. This guide isn’t just walking with you; they’re  helping you navigate every twist and turn. They help you maintain a  steady rhythm, guiding you smoothly down the path even when the trail  gets rough. It’s like they remember the last few steps you took and use  that memory to keep you moving steadily, avoiding those annoying little  slowdowns and speed-ups.

Momentum in neural networks is like having this savvy guide. They help your  model keep moving smoothly towards the goal, learning faster and more  effectively, even when the learning path is full of ups and downs.

# Batch Size

Batch size is the number of training examples utilized in one iteration of updating the model’s parameters.

Picture yourself hiking through a dense forest, trying to reach a beautiful  hidden lake. You have a map, and you need to check it periodically to  ensure you’re on the right track. It’s like deciding how many steps you  want to take before checking your map again to see if you’re still on  the right path.

When training a neural network to recognize handwritten digits, choosing the right batch size is crucial:

- **Small Batch Size**: More precise updates but slower training. Good for noisy data where frequent corrections are beneficial.
- **Large Batch Size**: Faster training but can miss small details. Works well when you have lots of data and the learning path is relatively smooth.
- **Medium Batch Size**: Offers a good trade-off between the two, providing stable and reasonably fast training.



# What is Forward Propagation?

Forward propagation is the process by which a neural network processes and  combines information to make predictions or decisions.

Understanding this flow allows you to better appreciate the intricate work happening inside these powerful models.

Now it’s time for the details.

**“Now you have decided to watch a movie with the genre ‘Action,’ the lead actor is ‘Actor X,’ and an IMDB review score of 7.”**

How did you decide? It is because you may love the action genre, or you  might be a great fan of the actor, and mostly you go for movies that  have a review score of more than 5. That’s simple, right?

Now let’s think of the step by step process happening inside the neural network:

**Input Layer: Collecting Information**

This is where the neural network takes in the input. In my previous blog, I  mentioned that the input layer has nodes known as input nodes.
“**Think of the input layer as the initial stage where you gather all your movie criteria. Each piece of information (genre, actor, review score) is an  input node.”**

**Hidden Layers: Processing Information**

**Hidden Nodes**: These are like intermediate experts who analyze the information. Each hidden layer adds its own insights based on the input.

**“One hidden layer might focus on the genre’s importance, another might weigh the actor’s popularity, and a third might consider the review score.”**

**Weights: Importance of Information**

**Weights**: Think of weights as how much importance each expert gives to different  pieces of information. For instance, you might decide that the actor’s  popularity is very important, so you give it a high weight.

“**If you really like “Actor X,” you might weigh their involvement more heavily in your decision-making process.”**

**Bias: Personal Preferences**

**Bias**: This is like a baseline preference you have regardless of the specific  criteria. Maybe you generally prefer action movies, so you start with a  positive bias towards them.

**“Even if all other factors are neutral, you might still lean towards watching an action movie because you usually enjoy them.”**

**Activation Function: Making Decisions**

**Activation**: After weighing all the information and adding your bias, you decide  whether each piece of information is significant enough to affect your  final decision. This is like an expert deciding if their insight is  worth sharing.

**“If the combined importance of genre, actor, and reviews reaches a certain threshold, you decide it’s a movie worth watching.”**

**Output Layer: Final Decision
Output Node**: Finally, all the processed information leads to a decision. This is the output layer of the neural network.

**“Based on the combined input from all hidden layers, you decide to watch the movie.”**

By understanding each step of forward propagation, you can better  appreciate how neural networks process information and make decisions,  much like how you would decide which movie to watch based on various  criteria.

