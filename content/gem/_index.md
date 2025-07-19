---
title: "🚀 Getting Started"
# description: "Everything you need to get started with GEM"
type: "gem"
layout: "single"
aliases: ["/gem/overview/"]
---

GEM is a diverse collection of environments for training LLM agents in the era of experience. The library includes Math, Code, general reasoning, and question-answering environments, as well as a suite of games (Mastermind, Minesweeper, Hangman, etc). GEM also features fully integrated python and search tool use.

<div class="gem-callout">
    <strong>New to GEM?</strong> Start with our Quick Start guide below to get started and running in minutes.
</div>

## Installation

TO BE ADDED

## Quick Start

Here's a simple example to get you started. The interface closely follows [Gym](https://gymnasium.farama.org/) and other popular RL environment suites.

Environments can be initialized with `make()` (or `make_vec()`  for parallelization) and each environment has `Env.reset()`, `Env.step()` and `Env.sample_random_action()` functions.

```python
import gem

# Initialize the environment
env = make("ta:GuessTheNumber-v0")

# Reset the environment to generate the first observation
observation, info = env.reset()
for _ in range(30):
    action = env.sample_random_action() # insert policy here

    # apply action and receive next observation, reward
    # and whether the episode has ended
    observation, reward, terminated, truncated, info = env.step(action)

    # If the episode has ended then reset to start a new episode
    if terminated or truncated:
        observation, info = env.reset()
```

<div class="gem-callout">
    Please see further documentation for details of <strong>vectorized environments</strong>, <strong>automated resetting</strong>, <strong>different observation/chat templates</strong>, and <strong>integrated tools</strong>.
</div>


## Training Agents

GEM includes __single file__ examples for training an LLM agent through `oat` or `verl` framework.

<div class="gem-callout success">
    <strong><a href="https://github.com/axon-rl/gem/blob/main/examples/train_oat.py">train with OAT</a></strong>
</div>

The [OAT](https://github.com/sail-sg/oat) framework provides a comprehensive solution for training language model agents in reinforcement learning environments.


<div class="gem-callout">
    <strong><a href="https://github.com/axon-rl/gem/tree/main/examples/train_verl">train with verl</a></strong>
</div>

The [VERL](https://github.com/volcengine/verl) framework offers another approach to training agents with different optimization strategies and capabilities.