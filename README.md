# @b12/mcp-server
B12's model context protocol server for generating websites with AI

## Usage with Claude Desktop

### Prerequisites

-   NodeJS
-   MCP Client (like Claude Desktop App)

### Installation

To use this server with the Claude Desktop app, add the following configuration to the "mcpServers" section of your `claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "b12": {
            "command": "npx",
            "args": ["-y", "@b12/mcp-server"]
        }
    }
}
```
****
