#!/opt/alt/python38/bin/python3

"""
Docstring for each handle method describes json schema that the passed
'data' conforms to.
"""

import json
import sys
from pathlib import Path

def handle_scan_started(data):
    """
    {"scan_id": string}
    """
    pass


def handle_custom_scan_finished(data):
    """
    {
        "event_id": "string",
        "scan_id": "string",
        "malicious_files": "[filepath:string]",
        "total_malicious": "int",
        "total_files": "int",
        "type": "string",
        "path": "string",
        "error": "string",
        "started": "int(unix time)",
        "completed": "int(unix time)"
    }
    """
    pass


def handle_user_scan_finished(data):
    """
    {
        "event_id": "string",
        "scan_id": "string",
        "malicious_files": "[filepath:string]",
        "total_malicious": "int",
        "total_files": "int",
        "type": "string",
        "path": "string",
        "error": "string",
        "started": "int(unix time)",
        "completed": "int(unix time)"
    }

    Unblock user sites which were scanned as clean
    """

    def unblock_site(path):
        pass

    if not data["malicious_files"]:
        unblock_site(data["path"])


def handle_realtime_malware_found(data):
    """
    {
        "event_id": "string",
        "period_started": "int(unix seconds)",
        "period_finished": "int(unix seconds)",
        "malicious_total": "int",
        "malicious_files": "map[username][filepath]"
    }

    Here we want to block sites for all users, that were detected as
    infected by realtime scan.
    """

    def block_user(user):
        pass

    users = data["malicious_files"].keys()

    for user in users:
        block_user(user)


def handle_malware_found(data):
    """
    {
        "event_id": "string",
        "scan_id": "string",
        "malicious_files": "[filepath:string]",
        "total_malicious": "int",
        "total_files": "int",
        "type": "string",
        "path": "string",
        "error": "string",
        "started": "int(unix time)",
        "completed": "int(unix time)"
    }
    """
    pass


def handle_script_blocked(data):
    """
    {
        "event_id": "string",
        "period_started": "int(unix seconds)",
        "period_finished": "int(unix seconds)",
        "events_total": "int",
        "blocked_scripts": [
            {
                "user": "string",
                "domain": "string",
                "path": "string",
                "rule_id": "int"
            }
        ]
    }
    """
    pass


def test_handler(data):
    destination = Path("/tmp/imunify-script-files")
    destination.mkdir(exist_ok=True)
    file = destination / data["event_id"]
    file.touch()
    file.write_text(json.dumps(data, indent=4))


if __name__ == "__main__":

    # Get json from stdin and create a dict
    data = json.loads(sys.stdin.read())

    if data["event_id"] == "USER_SCAN_FINISHED":
        handle_user_scan_finished(data)

    elif data["event_id"] == "CUSTOM_SCAN_FINISHED":
        handle_custom_scan_finished(data)

    elif data["event_id"] == "REALTIME_MALWARE_FOUND":
        handle_realtime_malware_found(data)

    elif data["event_id"] == "SCRIPT_BLOCKED":
        handle_script_blocked(data)

    elif data["event_id"] in ["CUSTOM_SCAN_STARTED", "USER_SCAN_STARTED"]:
        handle_scan_started(data)

    elif data["event_id"] in ["CUSTOM_SCAN_MALWARE_FOUND", "USER_SCAN_MALWARE_FOUND"]:
        handle_malware_found(data)

    test_handler(data)
