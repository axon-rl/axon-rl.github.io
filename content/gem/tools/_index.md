---
title: "🛠️ Tools"
# description: "GEM's integrated tools and advanced features"
type: "gem"
layout: "single"
---

## Overview

GEM provides a comprehensive set of tools to enhance agent capabilities and enable sophisticated problem-solving approaches. GEM currently supports `python` and `search` tools to enhance agent capabilities and enable more sophisticated problem-solving approaches.

## Python Tool

Allows agents to write and execute Python code, enabling computational problem-solving and data manipulation capabilities.

GEM's python code tool allows the agent to learn to write code. The python tool parses code blocks, runs them, and returns the result.

### API Reference

<div class="api-box">
    <div class="api-header">
        <h4 class="api-class">gem.tools.python_code_tool.PythonCodeTool</h4>
    </div>
    <div class="api-content">
        <div class="api-method">.execute_action(action: str)</div>
        <div class="api-description">
            Parses the action to find the first complete code block. If a valid code block is found the code is run and the output is returned.
        </div>
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
                    <span class="api-return-name">is_valid</span> <span class="api-return-type">(bool)</span>
                    <div class="api-return-desc">Whether a valid code block is found.</div>
                </li>
                <li class="api-return-item">
                    <span class="api-return-name">has_error</span> <span class="api-return-type">(bool)</span>
                    <div class="api-return-desc">Whether the code gave an error.</div>
                </li>
                <li class="api-return-item">
                    <span class="api-return-name">observation</span> <span class="api-return-type">(str)</span>
                    <div class="api-return-desc">The output of running the code if a valid code block is found, otherwise an empty string.</div>
                </li>
                <li class="api-return-item">
                    <span class="api-return-name">parsed_action</span> <span class="api-return-type">(str)</span>
                    <div class="api-return-desc">The action truncated at the end of the first valid code block. If no code block is found then parsed_action is set to the input action.</div>
                </li>
            </ul>
        </div>
        <div class="api-method">.instruction_string()</div>
        <div class="api-description">
            A string for adding to the prompt to instruct the agent that the python code tool is available.
        </div>
        <div class="api-returns">
            <h4>Returns</h4>
            <ul class="api-return-list">
                <li class="api-return-item">
                    <span class="api-return-name">str</span>
                    <div class="api-return-desc">Instruction string for the agent</div>
                </li>
            </ul>
        </div>
    </div>
</div>


## Search Tool

GEM includes a search tool, enabling the agent to learn to call search engines for information retrieval and knowledge enhancement.

### API Reference

<div class="api-box">
    <div class="api-header">
        <h4 class="api-class">gem.tools.search_tool.SearchTool</h4>
    </div>
    <div class="api-content">
        <div class="api-method">.execute_action(action: str)</div>
        <div class="api-description">
            Parses the action to find the first complete extract the <code>&lt;search&gt;</code> content. Returns the result of the search if a valid search call is found.
        </div>
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
                    <span class="api-return-name">is_valid</span> <span class="api-return-type">(bool)</span>
                    <div class="api-return-desc">Whether a valid <code>&lt;search&gt;&lt;/search&gt;</code> call is found.</div>
                </li>
                <li class="api-return-item">
                    <span class="api-return-name">has_error</span> <span class="api-return-type">(bool)</span>
                    <div class="api-return-desc">Whether the search engine gave an error.</div>
                </li>
                <li class="api-return-item">
                    <span class="api-return-name">observation</span> <span class="api-return-type">(str)</span>
                    <div class="api-return-desc">The output of running the search if a valid search call is found, otherwise an empty string.</div>
                </li>
                <li class="api-return-item">
                    <span class="api-return-name">parsed_action</span> <span class="api-return-type">(str)</span>
                    <div class="api-return-desc">The action truncated at the end of the first valid search call. If no search call is found then parsed_action is set to the input action.</div>
                </li>
            </ul>
        </div>
        <div class="api-method">.instruction_string()</div>
        <div class="api-description">
            A string for adding to the prompt to instruct the agent that the search tool is available.
        </div>
        <div class="api-returns">
            <h4>Returns</h4>
            <ul class="api-return-list">
                <li class="api-return-item">
                    <span class="api-return-name">str</span>
                    <div class="api-return-desc">Instruction string for the agent</div>
                </li>
            </ul>
        </div>
    </div>
</div>

### Usage

Agents can use the search tool by including search queries in their responses using the `<search></search>` tags. The tool will:

1. Parse the search query from the agent's response
2. Execute the search using the configured search engine
3. Return the search results to the agent
4. Allow the agent to use this information for better responses
