[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/b12io-website-generator-mcp-server-badge.png)](https://mseep.ai/app/b12io-website-generator-mcp-server)

# @b12/website-generator-mcp-server
B12's model context protocol server for generating websites with AI

<a href="https://glama.ai/mcp/servers/@b12io/website-generator-mcp-server">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@b12io/website-generator-mcp-server/badge" alt="Website Generator MCP server" />
</a>

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
            "args": ["-y", "@b12/website-generator-mcp-server"]
        }
    }
}
```
****