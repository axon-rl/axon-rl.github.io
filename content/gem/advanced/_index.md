---
title: "🧱 Advanced"
# description: "Advanced GEM features, custom environments, and training"
type: "gem"
layout: "single"
---

## Overview

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
from gem.core import Env
from gem.envs.registration import register

class ReverseStringEnv(Env):
    def __init__(self, str_len: int = 5):
        super().__init__()
        self.str_len = str_len

    def _get_instructions(self) -> str:
        return (
            "You are tasked to reverse a given string.\n"
            "You may provide your response in any manner. Only the content wrapped inside \\boxed{} will be considered as your final answer.\n"
            f"Please reverse the string: {self.gt_str}.\n"
        )

    def reset(self, seed=None):
        super().reset(seed)
        characters = string.ascii_letters + string.digits  # A-Z, a-z, 0-9
        self.gt_str = "".join(random.choices(characters, k=self.str_len))
        return self._get_instructions(), {}

    def step(self, action):
        clean_action = extract_last_boxed_answer(action)
        if clean_action is None:
            reward = 0
        else:
            reward = float(clean_action[::-1] == self.gt_str)
        return TERMINAL_STATE, reward, True, True, {}


# Register your environment
register("custom:ReverseString", ReverseStringEnv)
```

### Best Practices

- **Clear Instructions**: Provide clear, unambiguous instructions in your observations
- **Consistent Rewards**: Design a reward structure that encourages desired behavior
- **Proper Termination**: Clearly define when episodes should end
- **Informative Output**: Use the info dictionary to provide debugging information
- **Documentation**: Document your environment's behavior and expected usage
