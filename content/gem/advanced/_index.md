---
title: "🧱 Advanced"
# description: "Advanced GEM features, custom environments, and training"
type: "gem"
layout: "single"
---

# Overview

Advanced GEM features, custom environments, and training. 

## Custom Environments

GEM makes it simple to create custom environments. To create a new environment, simply add `.reset()` and `.step()` methods, and then register the environment [here](https://github.com/axon-rl/gem/blob/main/gem/envs/__init__.py). See examples for more information.

### `gem.core.Env.reset()`

**Returns:**
- `obs` (str) - Initial question/observation from the environment.
- `info` (dict) - Any extra info e.g. for logging or to aid debugging.

### `gem.core.Env.step(action)`

**Returns:**
- `obs` (str) - Next observation/output from the environment.
- `reward` (float) - Environment reward.
- `terminated` (bool) - Whether the episode is terminated.
- `truncated` (bool) - Following Gym environments but currently unused.
- `info` (dict) - Any extra info.

### Creating a Custom Environment

1. **Inherit from `gem.core.Env`**: Your environment should extend the base environment class
2. **Implement Required Methods**: Add your custom `.reset()` and `.step()` logic
3. **Register the Environment**: Add your environment to the registry for easy access
4. **Test and Validate**: Ensure your environment works correctly with GEM's ecosystem

### Example Structure

```python
import gem

class MyCustomEnvironment(gem.core.Env):
    def reset(self):
        # Initialize your environment
        observation = "Initial state description"
        info = {}
        return observation, info
    
    def step(self, action):
        # Process the action and update environment state
        observation = "Next state description"
        reward = 1.0 if success else 0.0
        terminated = check_if_done()
        truncated = False
        info = {}
        return observation, reward, terminated, truncated, info

# Register your environment
gem.register("custom:MyEnv", MyCustomEnvironment)
```

### Best Practices

- **Clear Instructions**: Provide clear, unambiguous instructions in your observations
- **Consistent Rewards**: Design a reward structure that encourages desired behavior
- **Proper Termination**: Clearly define when episodes should end
- **Informative Output**: Use the info dictionary to provide debugging information
- **Documentation**: Document your environment's behavior and expected usage

## Training Agents

GEM includes single file examples for training an LLM agent through both the `oat` and `verl` frameworks.


### Training Framework Options

#### OAT Framework
The [OAT](https://github.com/sail-sg/oat) framework provides a comprehensive solution for training language model agents in reinforcement learning environments.

<div class="gem-callout success">
    <strong><a href="https://github.com/axon-rl/gem/blob/main/examples/train_oat.py">train with OAT</a></strong>
</div>

#### VERL Framework
The [VERL](https://github.com/volcengine/verl) framework offers another approach to training agents with different optimization strategies and capabilities.

<div class="gem-callout">
    <strong><a href="https://github.com/axon-rl/gem/tree/main/examples/train_verl">train with verl</a></strong>
</div>