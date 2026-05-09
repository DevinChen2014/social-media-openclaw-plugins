const PLUGIN_ID = "douyin-insights-openclaw";
const PLUGIN_NAME = "Douyin Insights MCP for OpenClaw";
const PLUGIN_VERSION = "0.1.1";
const DEFAULT_ENDPOINT_URL = "https://mcp.52choujiang.com/douyin/mcp";
const DEFAULT_API_KEY_ENV = "SOCIAL_MEDIA_MCP_API_KEY";
const DEFAULT_CONNECTION_TIMEOUT_MS = 30000;

const CONFIG_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    apiKeyEnv: {
      type: "string",
      default: DEFAULT_API_KEY_ENV,
      description: "Environment variable that contains the API Key used as a Bearer token.",
    },
    endpointUrl: {
      type: "string",
      format: "uri",
      default: DEFAULT_ENDPOINT_URL,
      description: "Remote streamable-http MCP endpoint URL.",
    },
    connectionTimeoutMs: {
      type: "integer",
      default: DEFAULT_CONNECTION_TIMEOUT_MS,
      minimum: 1000,
      maximum: 120000,
      description: "Timeout in milliseconds for remote MCP HTTP requests.",
    },
  },
};

const PAGE_TOKEN_PROPERTY = {
  anyOf: [
    { type: "string" },
    { type: "null" },
  ],
  default: "",
  description: "Pagination token. Leave empty for the first page; pass the previous next_page_token to continue.",
};

const TOOL_DEFINITIONS = [
  {
    name: "douyin-insights__douyin_search_videos",
    remoteName: "douyin_search_videos",
    label: "Search Douyin Videos",
    description: "Search Douyin videos by keyword with optional sort, publish-time, duration, and content-type filters.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["keyword"],
      properties: {
        keyword: {
          type: "string",
          description: "Douyin search keyword.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
        sort_type: {
          anyOf: [
            { type: "integer" },
            { type: "null" },
          ],
          default: 0,
          description: "Sort order: 0 general, 2 latest, 1 most liked.",
        },
        publish_time: {
          anyOf: [
            { type: "integer" },
            { type: "null" },
          ],
          default: 0,
          description: "Publish-time filter: 0 all, 1 within a day, 7 within a week, 180 within half a year.",
        },
        filter_duration: {
          anyOf: [
            { type: "string" },
            { type: "null" },
          ],
          default: "0",
          description: "Video duration filter: 0 all, 0-1 under 1 minute, 1-5 between 1 and 5 minutes, 5-10000 over 5 minutes.",
        },
        content_type: {
          anyOf: [
            { type: "integer" },
            { type: "null" },
          ],
          default: 0,
          description: "Content type filter: 0 all, 1 video, 2 image post.",
        },
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_video_detail_by_aweme_id",
    remoteName: "douyin_get_video_detail_by_aweme_id",
    label: "Get Douyin Video Detail By ID",
    description: "Fetch structured video details when the caller already has an aweme ID.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["aweme_id"],
      properties: {
        aweme_id: {
          type: "string",
          description: "Douyin aweme ID.",
        },
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_video_detail_by_url",
    remoteName: "douyin_get_video_detail_by_url",
    label: "Get Douyin Video Detail By URL",
    description: "Resolve a Douyin video link, short link, or share text into structured video details.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["url"],
      properties: {
        url: {
          type: "string",
          description: "Douyin video URL, short link, or share text.",
        },
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_video_comments_by_aweme_id",
    remoteName: "douyin_get_video_comments_by_aweme_id",
    label: "Get Douyin Video Comments By ID",
    description: "Fetch paginated first-level comments when the caller already has an aweme ID.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["aweme_id"],
      properties: {
        aweme_id: {
          type: "string",
          description: "Douyin aweme ID.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_video_comments_by_url",
    remoteName: "douyin_get_video_comments_by_url",
    label: "Get Douyin Video Comments By URL",
    description: "Fetch paginated first-level comments from a Douyin video URL, short link, or share text.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["url"],
      properties: {
        url: {
          type: "string",
          description: "Douyin video URL, short link, or share text.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_user_info_by_sec_user_id",
    remoteName: "douyin_get_user_info_by_sec_user_id",
    label: "Get Douyin User Info By ID",
    description: "Fetch creator profile data when the caller already has a sec_user_id.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["sec_user_id"],
      properties: {
        sec_user_id: {
          type: "string",
          description: "Douyin sec_user_id.",
        },
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_user_info_by_url",
    remoteName: "douyin_get_user_info_by_url",
    label: "Get Douyin User Info By URL",
    description: "Resolve a Douyin profile link, short link, or share text into creator profile data.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["url"],
      properties: {
        url: {
          type: "string",
          description: "Douyin profile URL, short link, or share text.",
        },
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_user_posted_videos_by_sec_user_id",
    remoteName: "douyin_get_user_posted_videos_by_sec_user_id",
    label: "Get Douyin Creator Videos By ID",
    description: "Fetch a paginated list of videos published by a creator when the caller already has a sec_user_id.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["sec_user_id"],
      properties: {
        sec_user_id: {
          type: "string",
          description: "Douyin sec_user_id.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_user_posted_videos_by_url",
    remoteName: "douyin_get_user_posted_videos_by_url",
    label: "Get Douyin Creator Videos By URL",
    description: "Fetch a paginated list of videos published by a creator from a profile link, short link, or share text.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["url"],
      properties: {
        url: {
          type: "string",
          description: "Douyin profile URL, short link, or share text.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
];

let mcpSdkModules;

export const id = PLUGIN_ID;

export function register(api = {}) {
  for (const definition of TOOL_DEFINITIONS) {
    api.registerTool(
      (context) => createForwardingTool({ api, context, definition }),
      { name: definition.name },
    );
  }
  api.logger?.debug?.(`[${PLUGIN_ID}] registered ${TOOL_DEFINITIONS.length} remote MCP forwarding tools.`);
}

function createForwardingTool({ api, context, definition }) {
  return {
    name: definition.name,
    label: definition.label,
    description: definition.description,
    parameters: definition.parameters,
    execute: async (_toolCallId, rawParams = {}) => {
      return callRemoteMcpTool({
        api,
        context,
        remoteName: definition.remoteName,
        publicName: definition.name,
        args: rawParams && typeof rawParams === "object" ? rawParams : {},
      });
    },
  };
}

async function callRemoteMcpTool({ api, remoteName, publicName, args }) {
  const config = resolvePluginConfig(api);
  const apiKey = process.env[config.apiKeyEnv];
  if (!apiKey) {
    throw new Error(`Missing API Key. Set ${config.apiKeyEnv} before using ${PLUGIN_NAME}.`);
  }

  const { Client, StreamableHTTPClientTransport } = await loadMcpSdkModules();
  const client = new Client(
    { name: PLUGIN_ID, version: PLUGIN_VERSION },
    { capabilities: {} },
  );
  const requestInit = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const signal = createTimeoutSignal(config.connectionTimeoutMs);
  if (signal) {
    requestInit.signal = signal;
  }
  const transport = new StreamableHTTPClientTransport(new URL(config.endpointUrl), {
    requestInit,
  });

  try {
    await client.connect(transport, { timeout: config.connectionTimeoutMs });
    const result = await client.callTool({
      name: remoteName,
      arguments: args,
    }, undefined, { timeout: config.connectionTimeoutMs });
    if (result.isError) {
      throw new Error(extractMcpErrorMessage(result, remoteName));
    }
    return buildOpenClawToolResult(result, publicName);
  } finally {
    await client.close().catch(() => {});
  }
}

async function loadMcpSdkModules() {
  if (!mcpSdkModules) {
    const [{ Client }, { StreamableHTTPClientTransport }] = await Promise.all([
      import("@modelcontextprotocol/sdk/client/index.js"),
      import("@modelcontextprotocol/sdk/client/streamableHttp.js"),
    ]);
    mcpSdkModules = { Client, StreamableHTTPClientTransport };
  }
  return mcpSdkModules;
}

function resolvePluginConfig(api) {
  const liveConfig = api.runtime?.config?.current?.();
  const configured =
    liveConfig?.plugins?.entries?.[PLUGIN_ID]?.config ??
    api.pluginConfig ??
    {};
  return {
    apiKeyEnv: normalizeNonEmptyString(configured.apiKeyEnv, DEFAULT_API_KEY_ENV),
    endpointUrl: normalizeNonEmptyString(configured.endpointUrl, DEFAULT_ENDPOINT_URL),
    connectionTimeoutMs: normalizeTimeout(configured.connectionTimeoutMs),
  };
}

function normalizeNonEmptyString(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeTimeout(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return DEFAULT_CONNECTION_TIMEOUT_MS;
  }
  return Math.min(120000, Math.max(1000, Math.trunc(numeric)));
}

function createTimeoutSignal(timeoutMs) {
  if (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function") {
    return AbortSignal.timeout(timeoutMs);
  }
  return undefined;
}

function buildOpenClawToolResult(result, publicName) {
  const text = extractTextContent(result.content);
  return {
    content: [
      {
        type: "text",
        text: text || `${publicName} completed.`,
      },
    ],
    details: result.structuredContent ?? {
      content: Array.isArray(result.content) ? result.content : [],
    },
  };
}

function extractMcpErrorMessage(result, remoteName) {
  return (
    result.structuredContent?.message ||
    extractTextContent(result.content) ||
    `Remote MCP tool ${remoteName} returned an error.`
  );
}

function extractTextContent(content) {
  if (!Array.isArray(content)) {
    return "";
  }
  return content
    .filter((item) => item?.type === "text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("\n")
    .trim();
}

export default {
  id: PLUGIN_ID,
  name: PLUGIN_NAME,
  description: "OpenClaw native plugin shim for the hosted read-only Douyin Insights MCP service.",
  configSchema: CONFIG_SCHEMA,
  register,
};
