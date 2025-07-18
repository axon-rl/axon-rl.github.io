---
title: "🛠️ Tools & Features"
# description: "GEM's integrated tools and advanced features"
type: "gem"
layout: "single"
---

## Overview

GEM provides a comprehensive set of tools and features to enhance agent capabilities and enable sophisticated problem-solving approaches. GEM currently supports `python` and `search` tools to enhance agent capabilities and enable more sophisticated problem-solving approaches.

## Python Tool

Allows agents to write and execute Python code, enabling computational problem-solving and data manipulation capabilities.

GEM's python code tool allows the agent to learn to write code. The python tool parses code blocks, runs them, and returns the result.

### API Reference

#### `class gem.tools.python_code_tool.PythonCodeTool`

##### `.execute_action(action: str)`

Parses the action to find the first complete code block. If a valid code block is found the code is run and the output is returned.

**Parameters:**
- `action` (str) – The response from the LLM agent.

**Returns:**
- `is_valid` (bool) - Whether a valid code block is found.
- `has_error` (bool) - Whether the code gave an error.
- `observation` (str) - The output of running the code if a valid code block is found, otherwise an empty string.
- `parsed_action` (str) - The action truncated at the end of the first valid code block. If no code block is found then parsed_action is set to the input action.

##### `.instruction_string()`

A string for adding to the prompt to instruct the agent that the python code tool is available.

**Returns:**
- Instruction string for the agent


## Search Tool

GEM includes a search tool, enabling the agent to learn to call search engines for information retrieval and knowledge enhancement.

### API Reference

#### `gem.tools.search_tool.SearchTool`

##### `.execute_action(action: str)`

Parses the action to find the first complete extract the `<search>` content. Returns the result of the search if a valid search call is found.

**Parameters:**
- `action` (str) – The response from the LLM agent.

**Returns:**
- `is_valid` (bool) - Whether a valid `<search></search>` call is found.
- `has_error` (bool) - Whether the search engine gave an error.
- `observation` (str) - The output of running the search if a valid search call is found, otherwise an empty string.
- `parsed_action` (str) - The action truncated at the end of the first valid search call. If no search call is found then parsed_action is set to the input action.


##### `.instruction_string()`

A string for adding to the prompt to instruct the agent that the search tool is available.

**Returns:**
- Instruction string for the agent.

### Usage

Agents can use the search tool by including search queries in their responses using the `<search></search>` tags. The tool will:

1. Parse the search query from the agent's response
2. Execute the search using the configured search engine
3. Return the search results to the agent
4. Allow the agent to use this information for better responses

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

#### `gem.tools.tool_env_wrapper.ToolEnvWrapper`

**Attributes:**
- `env` - The wrapped environment.
- `tools` (List[BaseTool]) – A list of tools.
- `tool_reward` (float = 0.05) - Reward if a tool is called.
- `tool_success_reward` (float = 0.05) - Additional reward if the tool call is executed without errors.
- `max_tool_uses` (int = 10)

##### `ToolEnvWrapper.reset()`

**Returns:**
- `obs` (str) - The ToolEnvWrapper.env.reset() output (ie. the environment question), with a list of the available tools and instructions concatenated onto the end.
- `info` (dict) - Extra info about the episode state.

##### `ToolEnvWrapper.step(action: str)`

**Parameters:**
- `action` (str) – The response from the LLM agent.

**Returns:**
- `observation` (str) - The output of the tool call if a tool call is found, otherwise the observation from ToolEnvWrapper.env.step().
- `reward` (float) - tool_reward if a tool call is found (+ tool_success_reward if the tool call is executed without errors), otherwise the reward from ToolEnvWrapper.env.step()
- `terminated` (bool) - Whether the episode is terminated.
- `truncated` (bool) - Whether the episode is truncated.
- `info` (dict) - Extra info about the episode state.

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
vec_env = gem.make_vec("ta:GuessTheNumber-v0", num_envs=8)

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