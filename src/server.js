#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

const server = new Server(
  {
    name: 'b12-website-generator',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
)

const WEBSITE_GENERATION_TOOL = {
  name: 'generate_website',
  // Make sure the description is in sync with tool description in manifest.json
  description: 'Generates a website from a business/project name and short description, then presents a link (in markdown format) to sign up and see the website.',
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
    title: 'Generate Website',
  },
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the business.'
      },
      description: {
        type: 'string',
        description: 'The short description of the business in less than 1000 characters.'
      },
    },
    required: ['name', 'description']
  }
}

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [WEBSITE_GENERATION_TOOL],
}))

server.setRequestHandler(CallToolRequestSchema, request => {
  try {
    const { name: toolName, arguments: args } = request.params

    if (!args) {
      throw new Error('Business name and description are not provided')
    }

    if (toolName === 'generate_website') {
      const { name, description } = args
      return {
        content: [{
          type: 'text',
          text: `https://b12.io/signup/?utm_medium=chat&utm_source=mcp-server&intent=ai-websites&utm_content=website-generator&business_name=${encodeURIComponent(String(name))}&business_description=${encodeURIComponent(String(description))}`
        }],
        isError: false,
      }
    }
    return {
      content: [{ type: 'text', text: `Unknown tool: ${toolName}` }],
      isError: true,
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    }
  }
})

async function runServer() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('B12 Website generator MCP Server running on stdio')
}

runServer().catch((error) => {
  console.error('Fatal error running server:', error)
  process.exit(1)
})
