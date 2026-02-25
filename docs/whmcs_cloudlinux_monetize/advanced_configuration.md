# Advanced Configuration

## Overview

The Advanced Configuration section in the CloudLinux Monetize module dashboard allows administrators to configure product-level settings for Imunify Patch.

## Accessing Advanced Configuration

1. Navigate to **Addons > CloudLinux Monetize** in the WHMCS admin area
2. Locate the **Imunify Patch** product
3. Click the **Advanced Configuration** toggle below the product to expand the settings

## Settings

### Enable Notifications

Controls whether Imunify sends promotional notifications to customers in the hosting panel. When enabled, customers with patchable vulnerabilities receive notifications with a direct link to subscribe and enable protection.

### Webhooks

Webhooks allow you to receive real-time HTTP POST notifications about Imunify Patch security events on your own endpoints.

| Field | Description |
|-------|-------------|
| **URL** | The endpoint that will receive webhook notifications (e.g., `https://ops.example.com/imunify/webhook`) |
| **Secret** | A shared secret used to sign requests. If set, each request includes an `X-Imunify-Signature` header for verification |
| **Events** | A comma-separated list of event types to subscribe to. If omitted, all supported event types are delivered |

**Supported events:**

| Event | Description |
|-------|-------------|
| `vulnerability_found` | Triggered when a new vulnerability is detected on a customer's website |
| `vulnerabilities_patched_digest` | Triggered when a digest of patched vulnerabilities is available |

To manage webhooks, click **Add Webhook** to create a new entry, fill in the fields, and click **Save Configuration**. Use the trash icon to remove a webhook.

### Optional Parameters

A JSON field for specifying additional configuration parameters. The `optional_parameters` object is designed to be extensible.

**Limiting rollout to specific servers:**

You can limit the initial rollout of Imunify Patch to a subset of servers by specifying their IP addresses:

```
{
  "enabled_for_ids": ["192.0.2.1", "192.0.2.2"]
}
```

- If `enabled_for_ids` is present, Imunify Patch UI, detection, and reporting are only enabled for the listed server IPs.
- If `enabled_for_ids` is omitted, the product applies to the entire server fleet.

## Saving Configuration

Click **Save Configuration** at the bottom of the settings. A success message confirms the settings have been saved and synchronized with the CloudLinux API.

