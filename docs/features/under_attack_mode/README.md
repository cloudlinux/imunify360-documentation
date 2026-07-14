# Under Attack Mode (UAM)

[[TOC]]

## Overview

**Under Attack Mode (UAM)** is a WebShield feature that lets a server administrator put one or more **domains** (optionally scoped to specific URL paths) "under attack". While a domain is under attack, every matching HTTP request is first served a lightweight **JavaScript splash challenge** instead of being passed straight to the site:

- Regular browsers solve the challenge transparently and receive a short-lived cookie; subsequent requests carrying a valid cookie flow through normally.
- Simple bots that cannot run the challenge never reach the application.

UAM is a **server-wide administrator feature**. It is distinct from the per-IP GreyList / Anti-bot Challenge: UAM decisions are keyed on the request's `(domain, path)` and are configured explicitly by the administrator, rather than being driven by the state of an IP list.

:::tip When to use it
Turn UAM on for a specific domain when it is the target of an automated flood (for example scripted checkout or login abuse during a sale) and you want to gate **all** visitors of that domain behind a challenge, regardless of their IP reputation.
:::

:::warning Availability depends on the environment
UAM is not available on every environment WebShield supports. Before relying on it, check whether the current server supports UAM by running <span class="notranslate">`imunify360-wsctl filters`</span> and confirming the <span class="notranslate">`uam`</span> filter is listed as available — see [WebShield feature availability](/command_line_interface/#webshield-feature-availability). Where UAM is unavailable, only the GreyList / Anti-bot Challenge applies.
:::

## How it works

- A domain is placed under attack by creating a **UAM rule**. A rule is a `(domain, optional path-set)` tuple.
- When a request matches an **active** rule, WebShield returns the JS splash challenge and does not forward the request to the backend until the visitor passes.
- UAM is **fail-open**: if the feature is disabled, the request has no `Host`, the rule store cannot be read, or no active rule matches, the request simply proceeds through the normal WebShield flow. UAM never blocks a request outright — it only inserts a challenge.
- The feature is gated behind a single on/off toggle that is **off by default**, and all UAM state is stored on the server itself.

## Prerequisites

- WebShield version >= 1.44.2 installed and running in an environment where UAM is available (see the note above).
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

## Managing rules

A rule is created from a small JSON payload. Only `domain` is required; `label` (a free-text note) and `paths` (path scoping) are optional. A new rule is active as soon as it is created.

<div class="notranslate">

```
# Put a whole domain under attack:
imunify360-wsctl uam add '{"domain":"shop.example.com","label":"Black Friday"}'

# Scope the rule to specific paths (see "Path scoping" below):
imunify360-wsctl uam add '{"domain":"shop.example.com","paths":{"mode":"include","matchers":[{"value":"/checkout","condition":"prefix"}]}}'
```

</div>

List the current rules (a table by default, `--json` for raw output, `--domain` to filter by exact domain):

<div class="notranslate">

```
imunify360-wsctl uam list
imunify360-wsctl uam list --domain shop.example.com --json
```

</div>

The table shows `ID  ACTIVE  DOMAIN  LABEL`. The `ID` is a positive integer assigned by WebShield when the rule is created; you use it to edit or delete the rule.

<div class="notranslate">

```
imunify360-wsctl uam list
ID  ACTIVE  DOMAIN            LABEL
7   yes     shop.example.com  Black Friday
```

</div>

Edit a rule with a partial JSON payload — only `active`, `label`, and `paths` can be changed. Temporarily pausing a rule is done by setting `active` to `false`:

<div class="notranslate">

```
imunify360-wsctl uam edit 7 '{"active":false}'      # pause the rule (keep it for later)
imunify360-wsctl uam edit 7 '{"label":"BF sale"}'   # rename
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

## Monitoring challenges

Each challenge served for a rule is counted. Use `counters` to see which rules are actively challenging traffic, busiest first:

<div class="notranslate">

```
imunify360-wsctl uam counters                       # all rules with hits today, busiest first
imunify360-wsctl uam counters --since 24h           # a rolling window instead of "today"
imunify360-wsctl uam counters shop.example.com      # filter by exact domain
imunify360-wsctl uam counters 7                      # filter by rule id
```

</div>

The single optional argument is auto-detected: a positive integer is treated as a rule ID, anything else as an exact domain. The `--since` window is one of `today` (default), `1h`, `4h`, `24h`, `4d`, or `7d`. Output columns are `ID  ACTIVE  DOMAIN  HITS  LABEL`. Only rules with at least one challenge in the window are listed, and challenge counts are retained for 7 days.

<div class="notranslate">

```
imunify360-wsctl uam counters
ID  ACTIVE  DOMAIN            HITS  LABEL
7   yes     shop.example.com  1523  Black Friday
```

</div>
