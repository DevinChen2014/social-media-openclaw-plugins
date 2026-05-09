# Social Media OpenClaw Plugins

Public source listings for OpenClaw native plugins that connect to hosted, read-only social media insights MCP services.

## Packages

| ClawHub package | Source path | Version |
| --- | --- | --- |
| `xhs-insights-openclaw-plugin` | `xhs-insights-openclaw` | `0.1.8` |
| `douyin-insights-openclaw-plugin` | `douyin-insights-openclaw` | `0.1.3` |

Both plugins require `SOCIAL_MEDIA_MCP_API_KEY` at runtime and forward tool calls to the hosted MCP endpoints documented in each package directory.

## Scope

These plugins provide read-only research workflows. They do not provide account login, posting, editing, liking, commenting, or other account actions.
