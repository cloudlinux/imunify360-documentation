# L7 Rate Limiter

[[TOC]]

## Overview

The **L7 Rate Limiter** is a WebShield feature that lets a server administrator limit how many HTTP requests a single client (IP address) may send within a time window. It counts requests **per client IP** over a **sliding time window** and, once a client exceeds the limit, applies a configurable **action**: let the request pass, allow it past the remaining WebShield checks, deny it outright, or serve a **JavaScript splash challenge**.

The limiter is evaluated **first** on every request WebShield inspects — before [Under Attack Mode](/features/under_attack_mode/), the GreyList / Anti-bot Challenge, and the ModSecurity rules — so it stops request floods before they consume any further processing.

The L7 Rate Limiter is a **server-wide administrator feature**. It is distinct from Under Attack Mode: UAM challenges **every** visitor of a protected domain, while the rate limiter acts only on clients that send **too many** requests, and it can target traffic by source IP as well as by domain.

:::tip When to use it
Use the L7 Rate Limiter to cap abusive request rates without affecting normal visitors — for example to slow down scraping and brute-force attempts against a busy domain, throttle a misbehaving subnet, or put an automatic challenge in front of any client that floods the server.
:::

:::warning Availability depends on the environment
The L7 Rate Limiter is not available on every environment WebShield supports. Before relying on it, check whether the current server supports it by running <span class="notranslate">`imunify360-wsctl filters`</span> and confirming the <span class="notranslate">`l7prot`</span> filter is listed as available — see [WebShield feature availability](/command_line_interface/#webshield-feature-availability).
:::

## How it works

- Traffic is matched against an ordered list of **rules**. A rule pairs a scope — source **IPs** (addresses or CIDR networks) and/or **domains** (exact names or wildcard patterns) — with a **rate** (`limit` per `timeframe`) and an **action** to apply once the rate is exceeded.
- Rules are evaluated in the order shown by <span class="notranslate">`l7prot list`</span>, and the **first matching rule wins**. A client that stays within the matched rule's limit proceeds through the normal WebShield flow.
- Requests from clients that match **no rule** are counted against the **default settings** — a catch-all rate limit that applies server-wide (see [Default settings](#default-settings)).
- Requests are counted **per rule, per client IP**. All domains covered by one rule share a single counter for a given client, so a bot cannot reset its budget by spreading requests across subdomains.
- Counters are **persistent**: editing a rule, toggling the service, or restarting WebShield does not reset a client's request count.
- All management is **live**: every change made with the CLI applies to traffic immediately — no configuration file to edit and no service reload or restart required.
- The feature is gated behind a single on/off toggle that is **off by default**, and all its state is stored on the server itself.

## Prerequisites

- WebShield version >= 1.46.0 installed and running in an environment where the L7 Rate Limiter is available (see the note above).
- Root access to the server. The rate limiter is managed with the <span class="notranslate">`imunify360-wsctl l7prot`</span> command, which must be run as `root`.

## Enabling and disabling the rate limiter

The L7 Rate Limiter is **off by default**. Enable the feature before managing rules — while it is disabled, all other <span class="notranslate">`l7prot`</span> commands fail with a `service_disabled` error (only <span class="notranslate">`l7prot service`</span> always works, so the feature can always be turned back on).

<div class="notranslate">

```
imunify360-wsctl l7prot service            # show the current {"enabled"} state
imunify360-wsctl l7prot service enable     # turn rate limiting on, server-wide
imunify360-wsctl l7prot service disable    # turn rate limiting off
```

</div>

Disabling the feature stops all rate limiting immediately; your rules, default settings, and request counters are preserved and take effect again when you re-enable it.

:::warning Note
Enabling the service immediately puts the [default settings](#default-settings) in effect for **all** traffic: any client that exceeds the default rate — initially 300 requests per minute — is served the JavaScript challenge. Review the defaults before enabling the feature on a production server.
:::

## Default settings

The default settings are the catch-all rate limit applied to every request that matches no rule. They also supply the values for rule fields left empty (see [Managing rules](#managing-rules)). The fields are:

| Field | Description |
|-|-|
|<span class="notranslate">`limit`</span>|Maximum number of requests allowed per client within the timeframe. A plain number as a string; the suffixes <span class="notranslate">`k`</span> (×1,000) and <span class="notranslate">`m`</span> (×1,000,000) are accepted, e.g. <span class="notranslate">`"10k"`</span>. The special value <span class="notranslate">`"0"`</span> triggers the action on **every** request.|
|<span class="notranslate">`timeframe`</span>|The sliding-window length. A Go-style duration string using the units <span class="notranslate">`s`</span>, <span class="notranslate">`m`</span>, <span class="notranslate">`h`</span> (compound values such as <span class="notranslate">`1h30m`</span> are allowed), between **10 seconds and 12 hours**. For the `splash` action this is also how long a solved challenge stays valid.|
|<span class="notranslate">`action`</span>|What happens to a request once the client exceeds the limit — one of <span class="notranslate">`continue`</span>, <span class="notranslate">`allow`</span>, <span class="notranslate">`deny`</span>, <span class="notranslate">`splash`</span> (see [Actions](#actions)).|
|<span class="notranslate">`log_events`</span>|Boolean. When `true`, every limit-exceeded event is written to the WebShield access log <span class="notranslate">`/var/log/imunify360/wafd-access.log`</span>; when `false`, the events only appear in the debug log.|

Show the current defaults, or replace them — the settings are replaced as a whole, so **all four fields are required** (there is no partial update):

<div class="notranslate">

```
imunify360-wsctl l7prot defaults
{
  "limit": "300",
  "timeframe": "1m",
  "action": "splash",
  "log_events": true
}

imunify360-wsctl l7prot defaults '{"limit":"500","timeframe":"1m","action":"splash","log_events":true}'
```

</div>

The initial defaults are 300 requests per minute with the `splash` action and event logging on. Changes take effect immediately.

## Actions

| Action | What it does when the limit is exceeded |
|-|-|
|<span class="notranslate">`continue`</span>|Takes no action — the request proceeds through the normal WebShield flow. Combined with <span class="notranslate">`log_events`</span>, this gives a **monitor-only** mode: exceeded events are logged, nothing is blocked.|
|<span class="notranslate">`allow`</span>|Lets the request through, **skipping** the remaining WebShield checks (Under Attack Mode, the Anti-bot Challenge, and the ModSecurity rules). Use it to exempt trusted high-rate sources, such as your own monitoring.|
|<span class="notranslate">`deny`</span>|Rejects the request with an HTTP 403 error.|
|<span class="notranslate">`splash`</span>|Serves a lightweight **JavaScript splash challenge**. Regular browsers solve it transparently and receive a clearance cookie valid for the rule's <span class="notranslate">`timeframe`</span>; while the cookie is valid their requests flow through normally even above the limit. Simple bots that cannot run the challenge never reach the application.|

## Managing rules

A rule is created from a small JSON payload. Scope fields define **which traffic the rule matches**; the rate and action fields may be omitted (or set to an empty string) to **inherit the current value from the default settings at match time**. The fields are:

| Field | Required | Description |
|-|-|-|
|<span class="notranslate">`ips`</span>|at least one of the two|Array of source IPv4/IPv6 addresses or CIDR networks, e.g. <span class="notranslate">`["203.0.113.7", "10.0.0.0/24"]`</span>.|
|<span class="notranslate">`domains`</span>|at least one of the two|Array of domain patterns (see [Domain patterns](#domain-patterns) below).|
|<span class="notranslate">`limit`</span>|no|As in the [default settings](#default-settings). Omitted or empty — inherit the default.|
|<span class="notranslate">`timeframe`</span>|no|As in the default settings. Omitted or empty — inherit the default.|
|<span class="notranslate">`action`</span>|no|As in the default settings. Omitted or empty — inherit the default.|
|<span class="notranslate">`label`</span>|no|Free-text note (up to 128 characters).|

When a rule sets **both** <span class="notranslate">`ips`</span> and <span class="notranslate">`domains`</span>, a request must match **both** to match the rule (a listed IP requesting a listed domain). A rule with only one of the two matches on that condition alone.

A new rule is active as soon as it is created, and is appended at the end of the evaluation order. The command prints the created rule, including its assigned `id`:

<div class="notranslate">

```
# Throttle API scraping on all example.com subdomains, deny above 60 requests per 30 seconds:
imunify360-wsctl l7prot add '{"label":"api burst","limit":"60","timeframe":"30s","action":"deny","domains":["*.example.com"]}'

# Challenge a suspicious subnet on any domain at the default rate:
imunify360-wsctl l7prot add '{"label":"bad subnet","action":"splash","ips":["198.51.100.0/24"]}'

# Always let the office network through, skipping further WebShield checks:
imunify360-wsctl l7prot add '{"label":"office","limit":"0","action":"allow","ips":["203.0.113.0/24"]}'
```

</div>

List the current rules in evaluation order (a table by default, `--json` for raw output):

<div class="notranslate">

```
imunify360-wsctl l7prot list
+----+--------+------------+-----------+------------------+---------------+-----------+
| ID | Active | Rate       | Action    | IPs              | Domains       | Label     |
+----+--------+------------+-----------+------------------+---------------+-----------+
| 1  | true   | 60 per 30s | deny      |                  | *.example.com | api burst |
+----+--------+------------+-----------+------------------+---------------+-----------+
| 2  | true   | 300 per 1m | splash    | 198.51.100.0/24  |               | bad subnet|
|    |        | (default)  |           |                  |               |           |
+----+--------+------------+-----------+------------------+---------------+-----------+
| 3  | true   | always     | allow     | 203.0.113.0/24   |               | office    |
+----+--------+------------+-----------+------------------+---------------+-----------+
```

</div>

The `Rate` column merges the limit and the timeframe; a limit of `0` is shown as `always`. Values a rule inherits from the default settings are resolved against the current defaults and marked <span class="notranslate">`(default)`</span>. The `ID` is a positive integer assigned by WebShield when the rule is created; you use it to edit or delete the rule.

Edit a rule with a partial JSON payload — only the fields present in the payload change. Setting <span class="notranslate">`limit`</span>, <span class="notranslate">`timeframe`</span>, or <span class="notranslate">`action`</span> to `""` resets the field to inherit from the defaults; <span class="notranslate">`ips`</span> and <span class="notranslate">`domains`</span> are replaced as whole lists (`null` clears one, but a rule must keep at least one of the two non-empty). Temporarily pausing a rule is done by setting `active` to `false`. Editing a rule does not reset its counters:

<div class="notranslate">

```
imunify360-wsctl l7prot edit 1 '{"active":false}'          # pause the rule (keep it for later)
imunify360-wsctl l7prot edit 1 '{"limit":"100"}'           # raise the limit
imunify360-wsctl l7prot edit 1 '{"action":""}'             # reset the action to inherit the default
imunify360-wsctl l7prot edit 1 '{"domains":["*.example.com","example.com"]}'   # replace the domain list
```

</div>

Delete a rule by ID. Delete is idempotent — deleting an ID that no longer exists still succeeds:

<div class="notranslate">

```
imunify360-wsctl l7prot delete 1
```

</div>

## Domain patterns

Each entry of a rule's <span class="notranslate">`domains`</span> list is one of:

| Pattern | Matches |
|-|-|
|<span class="notranslate">`example.com`</span>|Exactly <span class="notranslate">`example.com`</span>.|
|<span class="notranslate">`*.example.com`</span>|Any subdomain — <span class="notranslate">`shop.example.com`</span>, <span class="notranslate">`a.b.example.com`</span> — but **not** <span class="notranslate">`example.com`</span> itself.|
|<span class="notranslate">`.example.com`</span>|<span class="notranslate">`example.com`</span> **and** all its subdomains.|
|<span class="notranslate">`*`</span>|Any domain.|

Matching is case-insensitive. Remember that all domains covered by one rule share a single per-client counter: with <span class="notranslate">`"domains":["*.example.com"]`</span>, a client's requests to <span class="notranslate">`a.example.com`</span> and <span class="notranslate">`b.example.com`</span> add up against the same limit.

## Testing which rule matches

<span class="notranslate">`l7prot test`</span> checks what the rate limiter would decide for traffic from a given source IP to a given URL, using the **exact same matching as live traffic**. The probe is free of side effects — it never adds to any client's request count. It is the quickest way to verify a rule's scope without generating real requests.

Both arguments are required: the source `IP` (an IPv4/IPv6 address, or a network, which is probed by its first address) and the `URL` carrying the target domain. The scheme is optional, and the path and query string are ignored — rules match on the source IP and the domain only.

<div class="notranslate">

```
imunify360-wsctl l7prot test 203.0.113.7 example.com
imunify360-wsctl l7prot test 10.0.0.0/8 https://shop.example.com/cart?id=1
```

</div>

When a rule matches, the command prints that rule as JSON; otherwise it reports that the default settings apply:

<div class="notranslate">

```
imunify360-wsctl l7prot test 198.51.100.20 shop.example.com
{
  "id": 2,
  "active": true,
  "label": "bad subnet",
  "limit": "",
  "timeframe": "",
  "action": "splash",
  "ips": [
    "198.51.100.0/24"
  ],
  "domains": null
}

imunify360-wsctl l7prot test 192.0.2.1 other.example.org
No matching rule, default settings will be applied
```

</div>

:::tip Note
<span class="notranslate">`l7prot test`</span> only works while the rate limiter is enabled; if the service is disabled it returns a <span class="notranslate">`service_disabled`</span> error.
:::

## Monitoring

With <span class="notranslate">`log_events`</span> set to `true` in the [default settings](#default-settings), every limit-exceeded event — for a rule or for the defaults — is written to the WebShield access log <span class="notranslate">`/var/log/imunify360/wafd-access.log`</span>. Each entry names the matched rule by its `id` and label (or `defaults`) and the action taken:

<div class="notranslate">

```
grep 'l7prot' /var/log/imunify360/wafd-access.log
... l7prot: matched rule 1 ("api burst"), rate limit exceeded, action: deny
... l7prot: matched defaults, rate limit exceeded, action: splash
```

</div>

Set <span class="notranslate">`log_events`</span> to `false` to route these events to the debug log instead — for example when a monitor-only `continue` policy on a busy server would flood the access log.
