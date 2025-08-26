# What I am Going to Talk About at the PINN Conference

Most people wonder how a physicist ended up working in clinical trials. The truth is, it all began with the habits I picked up in physics. When I once asked Newton how you actually quantify force, the answer was: you need calculus. That got me hooked. After solving every example in the textbook on differential equations, I thought I had cracked the code of how systems behave at least in time, for single variables. But soon I realized the world is rarely that simple. My professor then introduced me to partial differential equations (PDEs), which take the same ideas but extend them to describe how systems evolve across both space and time.

And that was a turning point because PDEs are everywhere. PDEs govern most of the physics we know. Ah! PDE is nothing but a mathematical equation that describes how something changes through space and time. Since nature speaks in the language of mathematics, PDEs are like recipes for the universe. They don’t give you the coordinates of “where” something is, but they do tell you the rules of *how* it moves and evolves.

Let's try to understand what I do mean here. Take the heat equation, for example. It’s the rulebook for how heat sneaks its way through an object. You have probably noticed it yourself: leave a metal spoon in a hot cup of tea and before long the handle bites your fingers. That everyday pain is actually this neat little PDE at work:
$$
u_t(x,t)=u_{xx}(x,t), \text{ where $\epsilon\in\mathbb{R}$ and $t>0$}
$$
What this really says is: *the way temperature changes with time depends on how bendy (curved) the temperature profile is in space.*

Solve this and you can **peek into the future**. Not your personal horoscope — but the future of how heat will spread. Prediction is the superpower that solving PDEs gives us.

Once you see it, you realize PDEs can do more than explain hot spoons. They can model how a drug disperses through the bloodstream, how a skyscraper shakes during an earthquake, or how a quantum system evolves. That ability to foresee dynamics is what hooked me.

During my thesis, I was neck-deep in analytical techniques for nonlinear PDEs, scribbling through four fat 360-page notebooks that my girlfriend had bought for me. I kept hoping for some rare, elegant solution but often ended up in vain. Eventually, I tore those notebooks in half and pivoted, I needed numerical methods. These were about approximations, not exact solutions  but that shift mattered.

​					``Traditional solvers = accurate but heavy.`` (Personal Advice)

For decades, we have used methods like the Finite Difference Method or Finite Element Method. To understand how this works, imagine you want to create a detailed map of the temperature in your room. What can we do is make grids over the entire room. Then calculate each point on the grid by looking at its neighbours. What if you keep on decrease the size of the grid, super fine that is billions of points. For sure you will get a precise map of the temperature. But at one point these grid points will explode and it wont be that easy calculating the temperature of the every single point in the system as it might require immense computational power and memory. 

​	``It's like needing a supercomputer just to figure out if you need a sweater! ``

And that is just a simple system. What if your system is High-dimensional problems? 

That’s when my new friend entered: **Neural Networks**.

At its core, a neural network is a **universal function approximator**. That's a fancy way of saying it's a machine that can learn to imitate almost any function or pattern if you give it enough examples.

Think of it like a master forger. If you show the forger a few examples of a signature, they don't solve a complex equation to understand the handwriting. Instead, they adjust their own writing style until what they produce looks indistinguishable from the original.

<img src="/Users/tamilarasan/Library/Application Support/typora-user-images/image-20250824002959912.png" alt="image-20250824002959912" style="zoom:25%;" />

A neural network does the same. It takes some input (like a position `x` and time `t`), passes it through a series of "neurons" with adjustable settings (weights and biases) and produces an output. By comparing its output to the correct answer and adjusting its settings over and over, it learns the underlying function.

So, instead of calculating the solution at a billion grid points, the idea is to train a single, compact neural network to *be* the solution.

``By using NN that takes x and t as inputs we circumvent the need of a grid altogether. Once the NN is trained on relatively fewer (compared to billions), the network will be able to predict for any real values of (x,t). So we can feed in billions of (x,t) coordinates to the network if we want to, or we can only calculate for the area that we are interested in.``

So, now we know *why* we want to use an NN. Your previous question was, "how do we make it obey a law of physics?"

You do it by changing the **rules of the game**. For a normal NN, the rule is "match the data points." For a PINN, we add a new, crucial rule: **"obey the PDE."**

This is done through a custom **loss function**, which is what the NN tries to minimize during training. The PINN loss function has two parts:

1. **Data Loss (Lossdata):** This is the standard part. It measures how far the network's prediction is from the known data (e.g., the initial and boundary conditions of your problem). It asks: *Does your solution match the known anchor points?*
2. **Physics Loss (Lossphys):** This is the magic ingredient. We use a technique called automatic differentiation to plug the neural network's output directly into the governing PDE (like the Schrödinger equation). We then check how close the result is to zero. The PDE itself becomes part of the training target. It asks: *Does your solution obey the laws of physics everywhere else?*

The network's total goal is to minimize Total_Loss = Loss_{data} + Loss_{phys}

By trying to satisfy both goals at once, the network is forced to find a solution that not only fits the data you have but also respects the underlying physics of the system across the entire domain. It learns the solution everywhere, not just on a grid.

To Know him let’s go back to the heat equation. Suppose we want the temperature $T(x, t)$ along a 1-meter rod. The PDE law of physics is:
$$
∂T/∂t = α * ∂²T/∂x²
$$
This says: the rate of change in temperature is proportional to how curved the temperature profile is. In plain words, heat flows from hot regions to cold ones.

Now, the *data* we know is encoded in boundary and initial conditions:

- Ends of the rod stuck in ice baths → $$T(0,t)=0,  T(1,t)=0$$
- Initial heat bump in the middle → $T(x,0)=sin(πx)$

The "Known Data" (Initial & Boundary Conditions)

Instead of just a few random points, our "data" comes from the problem's setup, which is much more realistic.

1. **Boundary Conditions (Data at the ends):** We keep both ends of the 1-meter rod in ice baths, so their temperature is always 0°C.
   - `T(0, t) = 0` (The left end is always 0°C)
   - `T(1, t) = 0` (The right end is always 0°C)
2. **Initial Condition (Data at the start):** At the very beginning (`t=0`), we heat the middle of the rod, creating a temperature profile that looks like a sine wave:
   - `T(x, 0) = sin(πx)` (This is 0 at the ends and 1 in the middle).

These conditions are the "data" we know for a fact.How the PINN Learns Using This Data

The PINN, which we'll call `N(x, t)`, now has two clear jobs, defined by its two loss functions:

1. Data Loss (Loss_data)

This loss function ensures the PINN's solution N(x, t) respects the known factual conditions. The network is penalized if:

- `N(0, t)` is not 0 (Fails to keep the left end cold).
- `N(1, t)` is not 0 (Fails to keep the right end cold).
- `N(x, 0)` is not `sin(πx)` (Fails to start with the correct temperature profile).

This loss **anchors** the solution. The PINN knows how the simulation must **start** and what must happen at the **boundaries**. But it still doesn't know how the heat should spread in the middle of the rod for `t > 0`.

2. Physics Loss (Loss_phys)

This is where the magic happens. We pick thousands of random points in space and time (x_random, t_random) inside the rod. At these points, we don't have data, but we do have the law of physics.

- We check if the PINN's output `N(x,t)` is obeying the Heat Equation at these random points.
- The loss is calculated as `(∂N/∂t - α * ∂²N/∂x²)²`. This value should be zero if the physics is being followed.

By minimizing this loss, the network is forced to learn a solution that correctly shows the initial hot spot `sin(πx)` gradually flattening out and spreading towards the cold ends, precisely according to the physical law of heat diffusion.

So, the **Data Loss** sets the stage (the initial state and the boundary rules), and the **Physics Loss** directs the performance, ensuring everything that happens on stage follows the script of physics.



​	

