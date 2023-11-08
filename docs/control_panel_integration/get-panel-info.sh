#!/bin/bash

# Function to check if a port is open
check_port() {
    nc -z -w1 $1 $2
    return $?
}

# Main script execution
main() {
    local host="localhost"
    local name=""
    local version="unknown"  # This script does not fetch versions, it is static for now

    # Webmin
    if check_port $host 10000; then
        name="Webmin"
    # Cockpit
    elif check_port $host 9090; then
        name="Cockpit"
    # ISPConfig
    elif check_port $host 8080; then
        name="ISPConfig"
    # Ajenti
    elif check_port $host 8000; then
        name="Ajenti"
    # Froxlor
    elif check_port $host 4430; then
        name="Froxlor"
    # Vestacp
    elif check_port $host 8083; then
        name="VestaCP"
    # CentOS Web Panel (CWP)
    elif check_port $host 2030 || check_port $host 2031; then
        name="CentOS Web Panel"
    # HestiaCP
    elif check_port $host 8083; then
        name="HestiaCP"
    # BlueOnyx
    elif check_port $host 444; then
        name="BlueOnyx"
    # WebCP
    elif check_port $host 24522; then
        name="WebCP"
    # InterWorx
    elif check_port $host 2443 || check_port $host 2080; then
        name="InterWorx"
    else
        # If no known panel port is open, check for custom port (example range: 8000-9000)
        # Note: This can be slow and may lead to false positives.
        for port in $(seq 8000 9000); do
            if check_port $host $port; then
                name="Unknown Panel (custom port $port)"
                break
            fi
        done

        if [ -z "$name" ]; then
            echo '{"metadata": {"result": "no web panel found"}}'
            exit 1
        fi
    fi

    echo "{
        \"data\": {
            \"name\": \"$name\",
            \"version\": \"$version\"
        },
        \"metadata\": {
            \"result\": \"ok\"
        }
    }"
}

main
