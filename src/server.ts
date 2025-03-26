#!/usr/bin/env node

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "website-generator",
  version: "1.0.0"
});

// Add website generator tool
server.tool("generate_website",
  "B12 website generator",
  {
    name: z.string().describe('The name of the business.'),
    description: z.string().describe('The short description of the business in less than 1000 characters.')
  },
  ({ name, description }) => ({
    content: [{
      type: "text",
      text: `Your new website for __${name}__ is ready! [Sign up to see the website](https://b12.io/signup/?utm_medium=chat&utm_source=openai-gpt&intent=ai-websites&utm_content=website-generator&business_name=${encodeURIComponent(name)}&business_description=${encodeURIComponent(description)}) and publish it for free.`
    }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
server.connect(transport);

