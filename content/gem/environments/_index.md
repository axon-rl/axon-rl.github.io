---
title: "🌍 Environments"
# description: "Overview of GEM's diverse range of environments"
type: "gem"
layout: "single"
---

## Overview

GEM supports a diverse range of environments and makes it easy to add your own. GEM provides four main categories of environments, each designed for different types of agent training and evaluation.

All GEM environments follow a consistent interface pattern:

- `env.reset()` - Initialize/reset the environment
- `env.step(action)` - Take an action and get the next state
- `env.sample_random_action()` - Get a random valid action

This design closely follows the Gymnasium standard, making it easy to integrate with existing RL frameworks and tools.

## Games

Interactive game environments including Sudoku, Minesweeper, Wordle, and more from the TextArena collection.

We maintain local versions of many of the [TextArena](https://github.com/LeonGuertler/TextArena) games.

### Available Game Environments

<table class="gem-table">
    <thead>
        <tr>
            <th>Environment</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>game:GuessTheNumber</code></td>
            <td>The agent has multiple guesses to guess the hidden number. The agent receives whether the hidden number is higher or lower than its guess.</td>
        </tr>
        <tr>
            <td><code>game:Mastermind</code></td>
            <td>The agent has multiple guesses to guess the hidden code. The agent receives black and white pegs depending on the number of correct digits in the right and wrong places.</td>
        </tr>
        <tr>
            <td><code>game:Minesweeper</code></td>
            <td>The agent must reveal all safe grid squares without revealing a mine. For each revealed square the agent receives the number of adjacent squares that contain mines.</td>
        </tr>
        <tr>
            <td><code>game:Wordle</code></td>
            <td>The agent must guess the hidden word. After each turn the agent receives feedback ("G"=correct letter + correct position, "Y"=correct letter + incorrect position, "X"=incorrect letter).</td>
        </tr>
        <tr>
            <td><code>game:FifteenPuzzle</code></td>
            <td>Arrange tiles on the board into ascending order using the empty space to slide tiles into different positions.</td>
        </tr>
        <tr>
            <td><code>game:Hangman</code></td>
            <td>The objective of the game is to guess the word by providing one letter guesses or the entire word.</td>
        </tr>
        <tr>
            <td><code>game:Sudoku</code></td>
            <td>Classic Sudoku Game. `easy` version renders a 4x4 board.</td>
        </tr>
        <tr>
            <td><code>game:TowerofHanoi</code></td>
            <td>a classic single-player puzzle game where the objective is to move a stack of disks from one tower to another following specific rules.</td>
        </tr>
    </tbody>
</table>

### Difficulty Variants

Each environment additionally has `-easy`, `-hard`, and `-random` variants, where `-random` denotes that the environment is set to a random level of difficulty at each reset.

### Adding New Games

Adding new games is easy. Simply include `.step()`, `.reset()` functions and register the environment with a new name.

## Math

Mathematical reasoning environments with automatic answer parsing and checking, compatible with various math datasets.

GEM's math environment class includes automatic answer parsing and checking and is designed to be compatible with any math dataset. To add a new environment simply register the dataset. A typical use case is combining these with access to the python tool to train the agent to utilize code.

### Available Math Environments

<table class="gem-table">
    <thead>
        <tr>
            <th>Environment</th>
            <th>Dataset</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>math:Math12k</code></td>
            <td><a href="https://huggingface.co/datasets/axon-rl/MATH-12k">MATH-12k</a></td>
        </tr>
        <tr>
            <td><code>math:ASDIV2k</code></td>
            <td><a href="https://huggingface.co/datasets/axon-rl/ASDIV-2k">ASDIV-2k</a></td>
        </tr>
        <tr>
            <td><code>math:GSM8k</code></td>
            <td><a href="https://huggingface.co/datasets/axon-rl/GSM-8k">GSM-8k</a></td>
        </tr>
        <tr>
            <td><code>math:ORZ57k</code></td>
            <td><a href="https://huggingface.co/datasets/axon-rl/ORZ-57k">ORZ-57k</a></td>
        </tr>
    </tbody>
</table>

### Features

- **Automatic Answer Parsing**: Built-in parsing for mathematical expressions and numerical answers
- **Answer Checking**: Automatic validation of agent responses against ground truth
- **Dataset Compatibility**: Works with any math dataset that follows the standard format
- **Tool Integration**: Designed to work seamlessly with Python tool for computational assistance

## Code

Code generation and evaluation environments that automatically test solutions in sandboxed environments.

GEM's code environment class automatically evaluates success by running the test cases in a sandbox. This class can be used with any code dataset consisting of the task and test cases.

### Available Code Environments

<table class="gem-table">
    <thead>
        <tr>
            <th>Environment</th>
            <th>Dataset</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>code:CodeContest</code></td>
            <td><a href="https://huggingface.co/datasets/axon-rl/CodeContest">CodeContest</a></td>
        </tr>
        <tr>
            <td><code>code:Taco8k</code></td>
            <td><a href="https://huggingface.co/datasets/axon-rl/TACO-8k">TACO-8k</a></td>
        </tr>
    </tbody>
</table>

### Features

- **Automatic Code Evaluation**: Runs test cases in a secure sandbox environment
- **Test Case Validation**: Compares agent-generated code against provided test cases
- **Sandbox Security**: Safe execution environment that prevents harmful code execution
- **Dataset Flexibility**: Compatible with any code dataset that includes problems and test cases

## Question-Answering

QA environments designed for integrated search tool usage to train agents in information retrieval and reasoning.

GEM's question-answering environments are designed to allow integrated search tool usage to train the agent to use search functionality. Additional question-answering environments can be added by simply registering the dataset.

### Available QA Environments

<table class="gem-table">
    <thead>
        <tr>
            <th>Environment</th>
            <th>Dataset</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>qa:NaturalQuestions</code></td>
            <td><a href="https://huggingface.co/datasets/axon-rl/NaturalQuestions">NaturalQuestions</a></td>
        </tr>
        <tr>
            <td><code>qa:HotpotQA</code></td>
            <td><a href="https://huggingface.co/datasets/axon-rl/HotpotQA">HotpotQA</a></td>
        </tr>
        <tr>
            <td><code>logic:RuleTaker-d0</code></td>
            <td><a href="https://huggingface.co/datasets/axon-rl/RuleTaker-d0-70k">RuleTaker-d0-70k</a></td>
        </tr>
        <tr>
            <td><code>logic:RuleTaker-d1</code></td>
            <td><a href="https://huggingface.co/datasets/axon-rl/RuleTaker-d1-70k">RuleTaker-d1-70k</a></td>
        </tr>
        <tr>
            <td><code>logic:RuleTaker-d2</code></td>
            <td><a href="https://huggingface.co/datasets/axon-rl/RuleTaker-d2-70k">RuleTaker-d2-70k</a></td>
        </tr>
        <tr>
            <td><code>logic:RuleTaker-d3</code></td>
            <td><a href="https://huggingface.co/datasets/axon-rl/RuleTaker-d3-70k">RuleTaker-d3-70k</a></td>
        </tr>
        <tr>
            <td><code>logic:RuleTaker-d5</code></td>
            <td><a href="https://huggingface.co/datasets/axon-rl/RuleTaker-d5-70k">RuleTaker-d5-70k</a></td>
        </tr>
    </tbody>
</table>

### Environment Types

- **Natural Questions**: Real-world questions that people ask search engines, requiring factual knowledge and reasoning
- **HotpotQA**: Multi-hop reasoning questions that require gathering information from multiple sources
- **RuleTaker**: Logical reasoning environments with varying complexity levels (d0 through d5), where agents must apply rules to derive conclusions