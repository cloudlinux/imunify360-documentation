# Under Attack Mode (UAM)

[[TOC]]

## Overview

**Under Attack Mode (UAM)** is a WebShield feature that lets a server administrator put one or more **domains** (optionally scoped to specific URL paths) "under attack". While a domain is under attack, every matching HTTP request is first served a lightweight **JavaScript splash challenge** instead of being passed straight to the site:

- Regular browsers solve the challenge transparently and receive a clearance cookie (its lifetime is configurable per rule); subsequent requests carrying a valid cookie flow through normally.
- Simple bots that cannot run the challenge never reach the application.

UAM is a **server-wide administrator feature**. It is distinct from the per-IP GreyList / Anti-bot Challenge: UAM decisions are keyed on the request's `(domain, path)` and are configured explicitly by the administrator, rather than being driven by the state of an IP list.

:::tip When to use it
Turn UAM on for a specific domain when it is the target of an automated flood (for example scripted checkout or login abuse during a sale) and you want to gate **all** visitors of that domain behind a challenge, regardless of their IP reputation.
:::

:::warning Availability depends on the environment
UAM is not available on every environment WebShield supports. Before relying on it, check whether the current server supports UAM by running <span class="notranslate">`imunify360-wsctl filters`</span> and confirming the <span class="notranslate">`uam`</span> filter is listed as available — see [WebShield feature availability](/command_line_interface/#webshield-feature-availability). Where UAM is unavailable, only the GreyList / Anti-bot Challenge applies.
:::

## How it works

- A domain is placed under attack by creating a **UAM rule**. A rule pairs a `domain` (optionally narrowed to a path-set) with the clearance-cookie lifetime to grant once a visitor solves the challenge.
- When a request matches an **active** rule, WebShield returns the JS splash challenge and does not forward the request to the backend until the visitor passes.
- UAM is **fail-open**: if the feature is disabled, the request has no `Host`, the rule store cannot be read, or no active rule matches, the request simply proceeds through the normal WebShield flow. UAM never blocks a request outright — it only inserts a challenge.
- The feature is gated behind a single on/off toggle that is **off by default**, and all UAM state is stored on the server itself.

## Prerequisites

- WebShield version >= 1.45.0 installed and running in an environment where UAM is available (see the note above). The core rule commands and the service toggle have been available since 1.44.2; the per-rule challenge-cookie lifetime, rule ownership, the visibility toggle, and the <span class="notranslate">`uam test`</span> command described below were added in 1.45.0.
- Root access to the server. UAM is managed with the <span class="notranslate">`imunify360-wsctl uam`</span> command, which must be run as `root`.

## Enabling and disabling UAM

UAM is **off by default**. Enable the feature before creating rules — while it is disabled, all rule and counter commands fail with a `service_disabled` error.

<div class="notranslate">

```
imunify360-wsctl uam settings service            # show the current {enabled} state
imunify360-wsctl uam settings service enable      # turn UAM on, server-wide
imunify360-wsctl uam settings service disable     # turn UAM off
```

</div>

Disabling the feature stops all challenges immediately; your rules are preserved and take effect again when you re-enable it.

## Controlling visibility to hosting users

By default UAM is an administrator-only feature. You can optionally expose it to unprivileged (hosting) users so that they can manage UAM rules for their own domains from the Imunify Web UI. This is controlled by a separate **visibility** toggle that is independent of the service on/off toggle above — turning visibility on does not enable UAM, and disabling UAM does not reset it. The visibility toggle is **off by default**.

:::tip Note
The UAM Web UI is available only on **WHM/cPanel** servers.
:::

<div class="notranslate">

```
imunify360-wsctl uam settings visibility            # show the current {allowed_for_users} state
imunify360-wsctl uam settings visibility enable      # let hosting users see and manage UAM in the Web UI
imunify360-wsctl uam settings visibility disable     # hide UAM from hosting users (default)
```

</div>

Only the administrator can change this setting.

## Managing rules

A rule is created from a small JSON payload. The fields are:

| Field | Required | Description |
|-|-|-|
|<span class="notranslate">`domain`</span>|yes|Exact hostname to put under attack (up to 253 characters).|
|<span class="notranslate">`cookie_ttl`</span>|yes|How long a visitor's clearance cookie stays valid after they solve the challenge, before they are challenged again. A Go-style duration string using the units <span class="notranslate">`s`</span>, <span class="notranslate">`m`</span>, <span class="notranslate">`h`</span> (compound values such as <span class="notranslate">`1h30m`</span> are allowed), between **10 seconds and 3 days**.|
|<span class="notranslate">`label`</span>|no|Free-text note (up to 128 characters).|
|<span class="notranslate">`paths`</span>|no|Path-scoping block (see [Path scoping](#path-scoping) below). Omit it to cover the whole domain.|

A new rule is active as soon as it is created.

<div class="notranslate">

```
# Put a whole domain under attack; re-challenge visitors after 1 hour:
imunify360-wsctl uam add '{"domain":"shop.example.com","cookie_ttl":"1h","label":"Black Friday"}'

# Scope the rule to specific paths (see "Path scoping" below):
imunify360-wsctl uam add '{"domain":"shop.example.com","cookie_ttl":"30m","paths":{"mode":"include","matchers":[{"value":"/checkout","condition":"prefix"}]}}'
```

</div>

List the current rules (a table by default, `--json` for raw output, `--domain` to filter by exact domain, `--owner` to filter by rule owner):

<div class="notranslate">

```
imunify360-wsctl uam list
imunify360-wsctl uam list --domain shop.example.com --json
imunify360-wsctl uam list --owner alice           # only rules owned by user "alice"
```

</div>

The table shows `ID  OWNER  ACTIVE  DOMAIN  COOKIE_TTL  LABEL`. The `ID` is a positive integer assigned by WebShield when the rule is created; you use it to edit or delete the rule.

<div class="notranslate">

```
imunify360-wsctl uam list
ID  OWNER  ACTIVE  DOMAIN            COOKIE_TTL  LABEL
7   admin  true    shop.example.com  1h          Black Friday
```

</div>

Each rule has an **owner**. Rules created with the <span class="notranslate">`imunify360-wsctl uam`</span> command (which runs as `root`) are owned by <span class="notranslate">`admin`</span>; hosting users can create rules for the domains they own from the Imunify Web UI, and those rules are owned by that user. The administrator sees and can manage every rule regardless of owner — use <span class="notranslate">`--owner`</span> to narrow the list to a single user.

Edit a rule with a partial JSON payload — only `active`, `cookie_ttl`, `label`, and `paths` can be changed. Temporarily pausing a rule is done by setting `active` to `false`:

<div class="notranslate">

```
imunify360-wsctl uam edit 7 '{"active":false}'       # pause the rule (keep it for later)
imunify360-wsctl uam edit 7 '{"cookie_ttl":"2h"}'    # change the clearance-cookie lifetime
imunify360-wsctl uam edit 7 '{"label":"BF sale"}'    # rename
imunify360-wsctl uam edit 7 '{"paths":null}'         # clear paths -> back to whole-domain
```

</div>

Delete a rule by ID. Delete is idempotent — deleting an ID that no longer exists still succeeds:

<div class="notranslate">

```
imunify360-wsctl uam delete 7
```

</div>

## Path scoping

By default a rule covers the whole domain. Add a `paths` block to challenge only some URLs. The block has a `mode` and a list of `matchers`:

- `mode: "include"` — the matchers list the paths that **are** under attack. A request is challenged only if it matches one of them.
- `mode: "exclude"` — the matchers list **exceptions**. A matching request is let through; everything else on the domain is challenged.

Each matcher is `{"value": "...", "condition": "..."}`, where `condition` is one of `equals`, `prefix`, `suffix`, or `contains`. A rule may hold between 1 and 32 matchers, and a request matches the block if it satisfies **any** of them.

<div class="notranslate">

```
# Only challenge /api and everything under /checkout:
imunify360-wsctl uam add '{"domain":"shop.example.com","paths":{"mode":"include","matchers":[{"value":"/api","condition":"equals"},{"value":"/checkout","condition":"prefix"}]}}'

# Challenge the whole domain EXCEPT the health-check endpoint:
imunify360-wsctl uam add '{"domain":"shop.example.com","paths":{"mode":"exclude","matchers":[{"value":"/healthz","condition":"equals"}]}}'
```

</div>

## Testing which rule matches a URL

<span class="notranslate">`uam test`</span> checks whether a given URL would be challenged, using the **exact same matching as live traffic**. It is the quickest way to verify a rule's path scoping without generating real requests.

<div class="notranslate">

```
imunify360-wsctl uam test example.com/path          # scheme optional; host required
imunify360-wsctl uam test https://shop.example.com/api?x=1
```

</div>

The scheme is optional, the host is required, and both the path and the query string are significant (only a trailing `#fragment` is ignored, and an empty path is treated as `/`). When a rule matches, the command prints that rule as JSON; otherwise it prints <span class="notranslate">`No matching rule`</span>:

<div class="notranslate">

```
imunify360-wsctl uam test shop.example.com/checkout
[
  {
    "id": 7,
    "owner": "admin",
    "active": true,
    "label": "Black Friday",
    "domain": "shop.example.com",
    "cookie_ttl": "1h",
    "paths": {
      "mode": "include",
      "matchers": [
        {
          "value": "/checkout",
          "condition": "prefix"
        }
      ]
    }
  }
]
```

</div>

:::tip Note
<span class="notranslate">`uam test`</span> only reports a match while UAM is enabled; if the service is disabled it returns a <span class="notranslate">`service_disabled`</span> error.
:::

## Monitoring challenges

Each challenge served for a rule is counted. Use `counters` to see which rules are actively challenging traffic, busiest first:

<div class="notranslate">

```
imunify360-wsctl uam counters                       # all rules with hits today, busiest first
imunify360-wsctl uam counters --since 24h           # a rolling window instead of "today"
imunify360-wsctl uam counters --owner alice         # only rules owned by user "alice"
imunify360-wsctl uam counters shop.example.com      # filter by exact domain
imunify360-wsctl uam counters 7                      # filter by rule id
```

</div>

The single optional argument is auto-detected: a positive integer is treated as a rule ID, anything else as an exact domain. The `--since` window is one of `today` (default), `1h`, `4h`, `24h`, `4d`, or `7d`. Output columns are `ID  ACTIVE  DOMAIN  HITS  LABEL`. Only rules with at least one challenge in the window are listed, and challenge counts are retained for 7 days.

<div class="notranslate">

```
imunify360-wsctl uam counters
ID  ACTIVE  DOMAIN            HITS  LABEL
7   true    shop.example.com  1523  Black Friday
```

</div>
