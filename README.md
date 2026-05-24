# SocialDataX OpenClaw Plugins

Public source listings for SocialDataX / 社媒数据助手 OpenClaw native plugins that connect to hosted, read-only MCP services for social media research workflows.

## Packages

| ClawHub package | Source path | Version |
| --- | --- | --- |
| `xhs-insights-openclaw-plugin` | `xhs-insights-openclaw` | `0.1.12` |
| `douyin-insights-openclaw-plugin` | `douyin-insights-openclaw` | `0.2.4` |

Both plugins require `SOCIALDATAX_API_KEY` at runtime and forward tool calls to the hosted MCP endpoints documented in each package directory.

- Product: `SocialDataX` / `社媒数据助手`
- Website: <https://socialdatax.com>
- XHS endpoint: `https://mcp.52choujiang.com/xhs/mcp`
- Douyin endpoint: `https://mcp.52choujiang.com/douyin/mcp`

## Scope

These plugins provide read-only research workflows. They do not provide account login, posting, editing, liking, commenting, or other account actions.
