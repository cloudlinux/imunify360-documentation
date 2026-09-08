# Under Attack Mode (UAM)

[[TOC]]

## Overview

**Under Attack Mode (UAM)** is a WebShield feature that lets a server administrator put one or more **domains** (optionally scoped to specific URL paths) "under attack". While a domain is under attack, every matching HTTP request is first served a lightweight **JavaScript splash challenge** instead of being passed straight to the site:

- Regular browsers solve the challenge transparently and receive a clearance cookie (its lifetime is configurable per rule); subsequent requests carrying a valid cookie flow through normally.
- Simple bots that cannot run the challenge never reach the application.

UAM is distinct from the per-IP GreyList / Anti-bot Challenge: UAM decisions are keyed on the request's `(domain, path)` and are configured explicitly, rather than being driven by the state of an IP list.

The server administrator turns the feature on and manages rules for any domain. If the administrator also allows it, site owners can manage rules for their own domains. Rules are managed either from the control panel — see <span class="notranslate">[WebShield](/dashboard/#under-attack-mode)</span> for the administrator interface and <span class="notranslate">[WebShield](/user_interface/#under-attack-mode)</span> for the end user one — or with the <span class="notranslate">`imunify360-wsctl uam`</span> commands described below.

:::tip When to use it
Turn UAM on for a specific domain when it is the target of an automated flood (for example scripted checkout or login abuse during a sale) and you want to gate **all** visitors of that domain behind a challenge, regardless of their IP reputation.
:::

:::warning Availability depends on the environment
UAM is not available on every environment WebShield supports. Before relying on it, check whether the current server supports UAM by running <span class="notranslate">`imunify360-wsctl filters`</span> and confirming the <span class="notranslate">`uam`</span> filter is listed as available — see [WebShield feature availability](/command_line_interface/#webshield-feature-availability). Where UAM is unavailable, only the GreyList / Anti-bot Challenge applies.
:::

:::warning Compatibility: Supported Setup 
cPanel + Apache or Nginx (module loaded) only.
:::

## How it works

- A domain is placed under attack by creating a **UAM rule**. A rule pairs a `domain` (optionally narrowed to a path-set) with the clearance-cookie lifetime to grant once a visitor solves the challenge.
- When a request matches an **active** rule, WebShield returns the JS splash challenge and does not forward the request to the backend until the visitor passes.
- UAM is **fail-open**: if the feature is disabled, the request has no `Host`, the rule store cannot be read, or no active rule matches, the request simply proceeds through the normal WebShield flow. UAM never blocks a request outright — it only inserts a challenge.
- Whitelisted IP addresses are **never** challenged: the whitelist is consulted before the application-level checks, so an IP on the <span class="notranslate">[White List](/command_line_interface/#whitelist)</span> reaches the site directly. Whitelist any legitimate automation that cannot solve a JavaScript challenge — search-engine crawlers, monitoring, server-side integrations, or <span class="notranslate">`wp-cron`</span> invoked over HTTP.
- The feature is gated behind a single on/off toggle that is **off by default**, and all UAM state is stored on the server itself.

## Prerequisites

- WebShield version >= 1.45.0 installed and running in an environment where UAM is available (see the note above). The core rule commands and the service toggle have been available since 1.44.2; the per-rule challenge-cookie lifetime and the <span class="notranslate">`uam test`</span> command described below were added in 1.45.0.
- Root access to the server. The <span class="notranslate">`imunify360-wsctl uam`</span> command described below must be run as `root`. Site owners manage their own rules from the control panel instead.

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

A second, independent switch controls whether site owners may manage rules for their own domains in the control panel. It is off by default, so UAM starts out administrator-only:

<div class="notranslate">

```
imunify360-wsctl uam settings visibility            # show the current {allowed_for_users} state
imunify360-wsctl uam settings visibility enable     # let site owners manage their own rules
imunify360-wsctl uam settings visibility disable    # administrator-only again
```

</div>

:::tip Note
<span class="notranslate">`Enable WebShield`</span> in <span class="notranslate">Settings</span> does not control UAM. It turns off the GreyList and the Anti-bot Challenge; UAM keeps its own on/off state.
:::

## Managing rules

A rule is created from a small JSON payload. The fields are:

| Field | Required | Description |
|-|-|-|
|<span class="notranslate">`domain`</span>|yes|Hostname to put under attack (up to 253 characters). A leading wildcard is accepted: <span class="notranslate">`*.example.com`</span> matches the subdomains of <span class="notranslate">`example.com`</span> but not <span class="notranslate">`example.com`</span> itself, while <span class="notranslate">`.example.com`</span> matches both. Hostnames are compared verbatim, so write the domain in lower case.|
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

List the current rules (a table by default, `--json` for raw output, `--domain` and `--owner` to filter by exact domain or by rule owner):

<div class="notranslate">

```
imunify360-wsctl uam list
imunify360-wsctl uam list --domain shop.example.com --json
imunify360-wsctl uam list --owner alice
```

</div>

The table shows `ID  OWNER  ACTIVE  DOMAIN  COOKIE_TTL  LABEL`. The `ID` is a positive integer assigned by WebShield when the rule is created; you use it to edit or delete the rule. `OWNER` is `admin` for rules created by the server administrator, or the user name for a rule a site owner created for their own domain.

<div class="notranslate">

```
imunify360-wsctl uam list
ID  OWNER  ACTIVE  DOMAIN            COOKIE_TTL  LABEL
7   admin  true    shop.example.com  1h          Black Friday
8   alice  true    blog.example.com  30m         Comment spam
```

</div>

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

Each matcher is `{"value": "...", "condition": "..."}`. A rule may hold between 1 and 32 matchers, and a request matches the block if it satisfies **any** of them. The available conditions are:

| Condition | Matches when the request URI |
|-|-|
|<span class="notranslate">`equals`</span>|is exactly the value|
|<span class="notranslate">`prefix`</span>|begins with the value|
|<span class="notranslate">`suffix`</span>|ends with the value|
|<span class="notranslate">`contains`</span>|contains the value anywhere|
|<span class="notranslate">`wildcard`</span>|matches the value as a wildcard pattern, where <span class="notranslate">`*`</span> stands for any number of characters, including <span class="notranslate">`/`</span>|
|<span class="notranslate">`query_contains`</span>|has a query string containing the value|
|<span class="notranslate">`query_regex`</span>|has a query string matching the value as a regular expression|

:::warning The query string is part of what is matched
Matchers are applied to the whole request URI, query string included. An <span class="notranslate">`equals`</span> matcher for <span class="notranslate">`/wp-login.php`</span> therefore does **not** match <span class="notranslate">`/wp-login.php?redirect_to=/wp-admin/`</span> — use <span class="notranslate">`prefix`</span> when the URL may carry a query string. Matching is case-sensitive. Verify the result with <span class="notranslate">[`uam test`](#testing-which-rule-matches-a-url)</span>.
:::

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
imunify360-wsctl uam counters shop.example.com      # filter by exact domain
imunify360-wsctl uam counters 7                      # filter by rule id
imunify360-wsctl uam counters --owner alice          # filter by rule owner
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
