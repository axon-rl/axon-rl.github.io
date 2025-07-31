---
title: "✨ Features"
# description: "GEM's integrated tools and advanced features"
type: "gem"
layout: "single"
---

## Wrappers

Following the Gym interface, GEM provides wrappers to easily add and change functionality. Wrappers are registered in the [WRAPPER_FACTORY](https://github.com/axon-rl/gem/blob/main/gem/wrappers/wrapper_factory.py).

The main wrapper types are: observation wrappers, tool wrappers, and episode tracking wrappers.

<div class="gem-callout">
    <strong>Note:</strong> Order is important! Wrappers should be added in the following order:<br/>
    tool env wrapper (optional) → observation wrapper (optional) → episode tracking wrapper (optional).
</div>

### Observation Wrappers

Observation wrappers are used to convert the sequence of game states and agent actions into a string which is used as the prompt for the LLM agent at the next step.

#### Observation Wrapper Examples

<table class="gem-table">
    <thead>
        <tr>
            <th>Wrapper name</th>
            <th>Description</th>
            <th>Example (Mastermind)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>no wrapper</td>
            <td>The observation string from the environment.</td>
            <td><code>"At turn 2, you guessed 243. This guess receives 1 black peg(s) and 2 white peg(s)."</code></td>
        </tr>
        <tr>
            <td><code>concat</code></td>
            <td>The sequence of environment observation strings from all previous steps concatenated together.</td>
            <td><code>"You are playing Mastermind. [instructions]... Enter your first guess to start the game.\nAt turn 1, you guessed 123. This guess receives 1 black peg(s) and 1 white peg(s).\nAt turn 2, you guessed 243. This guess receives 1 black peg(s) and 2 white peg(s)."</code></td>
        </tr>
        <tr>
            <td><code>concat_with_action</code></td>
            <td>The sequence of [environment observation string, agent action, environment observation string, etc.] from all previous steps concatenated together.</td>
            <td><code>"You are playing Mastermind. [instructions]... Enter your first guess to start the game.\nOkay, I will guess a random 3 digit number for now. My first guess will be \\boxed{123}.\nAt turn 1, you guessed 123. This guess receives 1 black peg(s) and 1 white peg(s).\nOkay, let's think. One digit is in the correct place. Perhaps this is 3. One digit is completely incorrect. Let's try switching 1 for 4 and moving the 2. My next guess will be \\boxed{243}.\nAt turn 2, you guessed 243. This guess receives 1 black peg(s) and 2 white peg(s)."</code></td>
        </tr>
        <tr>
            <td><code>concat_chat</code> <em>(default)</em></td>
            <td>The sequence of [environment observation string, agent action, environment observation string, etc.] from all previous steps concatenated together with the chat template applied to denote "user" (environment) vs "assistant" (agent) turns.</td>
            <td><code>"&lt;|im_start|&gt;user\nYou are playing Mastermind. [instructions]... Enter your first guess to start the game.&lt;|im_end|&gt;\n&lt;|im_start|&gt;assistant\nOkay, I will guess a random 3 digit number for now. My first guess will be \\boxed{123}&lt;|im_end|&gt; &lt;|im_start|&gt;user\nAt turn 1, you guessed 123. This guess receives 1 black peg(s) and 1 white peg(s).&lt;|im_end|&gt;\n&lt;|im_start|&gt;assistant\nOkay, let's think. One digit is in the correct place. Perhaps this is 3. One digit is completely incorrect. Let's try switching 1 for 4 and moving the 2. My next guess will be \\boxed{243}.&lt;|im_end|&gt;\n&lt;|im_start|&gt;user\nAt turn 2, you guessed 243. This guess receives 1 black peg(s) and 2 white peg(s).&lt;|im_end|&gt;\n&lt;|im_start|&gt;assistant"</code></td>
        </tr>
        <tr>
            <td><code>concat_chat_on_reset</code></td>
            <td>Same as concat_with_action but the chat template tag is applied at the start.</td>
            <td><code>"&lt;|im_start|&gt;user\nYou are playing Mastermind. [instructions]... Enter your first guess to start the game.\nOkay, I will guess a random 3 digit number for now. My first guess will be \\boxed{123}.\nAt turn 1, you guessed 123. This guess receives 1 black peg(s) and 1 white peg(s).\nOkay, let's think. One digit is in the correct place. Perhaps this is 3. One digit is completely incorrect. Let's try switching 1 for 4 and moving the 2. My next guess will be \\boxed{243}.\nAt turn 2, you guessed 243. This guess receives 1 black peg(s) and 2 white peg(s)."</code></td>
        </tr>
    </tbody>
</table>

### Tool Env Wrapper

GEM supports integrating multiple tools to the same agent. Tools are handled by the tool wrapper.

The input to `env.step()` is "action", a string which is typically the response from the LLM. With the tool env wrapper, when `env.step(action)` is called, the tool env wrapper iterates through each tool and attempts to parse and execute the action. If any tool is executed successfully, the observation from that tool is returned. If no tool is executed successfully, the action is passed to the wrapped environment.

<div class="api-box">
    <div class="api-header">
        <h4 class="api-class">gem.tools.tool_env_wrapper.ToolEnvWrapper</h4>
    </div>
    <div class="api-content">
        <div class="api-parameters">
            <h4>Attributes</h4>
            <ul class="api-param-list">
                <li class="api-param-item">
                    <span class="api-param-name">env</span>
                    <div class="api-param-desc">The wrapped environment.</div>
                </li>
                <li class="api-param-item">
                    <span class="api-param-name">tools</span> <span class="api-param-type">(List[BaseTool])</span>
                    <div class="api-param-desc">A list of tools.</div>
                </li>
                <li class="api-param-item">
                    <span class="api-param-name">tool_reward</span> <span class="api-param-type">(float = 0.05)</span>
                    <div class="api-param-desc">Reward if a tool is called.</div>
                </li>
                <li class="api-param-item">
                    <span class="api-param-name">tool_success_reward</span> <span class="api-param-type">(float = 0.05)</span>
                    <div class="api-param-desc">Additional reward if the tool call is executed without errors.</div>
                </li>
                <li class="api-param-item">
                    <span class="api-param-name">max_tool_uses</span> <span class="api-param-type">(int = 10)</span>
                    <div class="api-param-desc">Maximum number of tool uses allowed.</div>
                </li>
            </ul>
        </div>
        <div class="api-method">.reset()</div>
        <div class="api-returns">
            <h4>Returns</h4>
            <ul class="api-return-list">
                <li class="api-return-item">
                    <span class="api-return-name">obs</span> <span class="api-return-type">(str)</span>
                    <div class="api-return-desc">The ToolEnvWrapper.env.reset() output (ie. the environment question), with a list of the available tools and instructions concatenated onto the end.</div>
                </li>
                <li class="api-return-item">
                    <span class="api-return-name">info</span> <span class="api-return-type">(dict)</span>
                    <div class="api-return-desc">Extra info about the episode state.</div>
                </li>
            </ul>
        </div>
        <div class="api-method">.step(action: str)</div>
        <div class="api-parameters">
            <h4>Parameters</h4>
            <ul class="api-param-list">
                <li class="api-param-item">
                    <span class="api-param-name">action</span> <span class="api-param-type">(str)</span>
                    <div class="api-param-desc">The response from the LLM agent.</div>
                </li>
            </ul>
        </div>
        <div class="api-returns">
            <h4>Returns</h4>
            <ul class="api-return-list">
                <li class="api-return-item">
                    <span class="api-return-name">observation</span> <span class="api-return-type">(str)</span>
                    <div class="api-return-desc">The output of the tool call if a tool call is found, otherwise the observation from ToolEnvWrapper.env.step().</div>
                </li>
                <li class="api-return-item">
                    <span class="api-return-name">reward</span> <span class="api-return-type">(float)</span>
                    <div class="api-return-desc">tool_reward if a tool call is found (+ tool_success_reward if the tool call is executed without errors), otherwise the reward from ToolEnvWrapper.env.step()</div>
                </li>
                <li class="api-return-item">
                    <span class="api-return-name">terminated</span> <span class="api-return-type">(bool)</span>
                    <div class="api-return-desc">Whether the episode is terminated.</div>
                </li>
                <li class="api-return-item">
                    <span class="api-return-name">truncated</span> <span class="api-return-type">(bool)</span>
                    <div class="api-return-desc">Whether the episode is truncated.</div>
                </li>
                <li class="api-return-item">
                    <span class="api-return-name">info</span> <span class="api-return-type">(dict)</span>
                    <div class="api-return-desc">Extra info about the episode state.</div>
                </li>
            </ul>
        </div>
    </div>
</div>

### Episode Tracking Wrapper

The tracking wrapper logs statistics over the episode, including cumulative_rewards etc. It is not required but can be useful for debugging.

## Vectorization

GEM supports collecting multiple episodes in parallel, including asynchronously stepping each of the environments (which may include tool calls etc.). VectorEnv environments automatically reset so that when an episode from one of the parallel environments ends, it is automatically resets and begins the next episode.

<div class="gem-callout">
    <strong>Performance tip:</strong> Use vectorization for better throughput when training agents on multiple episodes simultaneously.
</div>

### Benefits

- **Improved Throughput**: Run multiple environments simultaneously for faster data collection
- **Automatic Reset**: Environments automatically reset when episodes end, ensuring continuous operation
- **Asynchronous Execution**: Each environment can step independently, maximizing efficiency
- **Tool Support**: Vectorized environments fully support tool usage across all parallel instances

### Usage

Use `make_vec()` instead of `make()` when creating environments:

```python
import gem

# Create vectorized environment with 8 parallel instances
vec_env = gem.make_vec("game:GuessTheNumber-v0", num_envs=8)

# Reset all environments
observations, infos = vec_env.reset()

# Step all environments
actions = [env.sample_random_action() for _ in range(8)]
observations, rewards, terminated, truncated, infos = vec_env.step(actions)
```

### Key Features

- **Automatic Management**: No need to manually handle environment resets
- **Scalable**: Easily adjust the number of parallel environments based on your computational resources
- **Compatible**: Works with all GEM environments, tools, and wrappers
- **Efficient**: Optimized for minimal overhead in parallel execution

### Use Cases

Vectorization is particularly useful for:

- Training reinforcement learning agents
- Collecting large datasets efficiently
- Running evaluation experiments across multiple episodes
- Testing agent performance with statistical significance