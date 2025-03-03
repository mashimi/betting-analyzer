# Betting Analyzer

This project is a betting analyzer that allows users to upload match data and analyze it.

## Setup

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```
2.  Install dependencies:

    ```bash
    npm install
    ```
3.  Run the development server:

    ```bash
    npm start
    ```

## MCP Server Setup

1.  Clone the MCP servers repository:

    ```bash
    git clone https://github.com/modelcontextprotocol/servers.git C:\\Users\\Lenovo\\Documents\\Cline\\MCP\\servers
    ```
2.  Install the SQLite MCP server dependencies:

    ```bash
    cd C:\\Users\\Lenovo\\Documents\\Cline\\MCP\\servers\\src\\sqlite
    uv pip install -e .
    ```
3.  Add the SQLite MCP server configuration to the `cline_mcp_settings.json` file:

    ```json
    {
      "mcpServers": {
        "github.com/modelcontextprotocol/servers/tree/main/src/sqlite": {
          "command": "uv",
          "args": [
            "--directory",
            "C:/Users/Lenovo/Documents/Cline/MCP/servers/src/sqlite",
            "run",
            "mcp-server-sqlite",
            "--db-path",
            "C:/Users/Lenovo/test.db"
          ],
          "disabled": false,
          "autoApprove": [".*"]
        }
      }
    }
