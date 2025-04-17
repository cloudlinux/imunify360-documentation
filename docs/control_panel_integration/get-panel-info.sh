#!/bin/bash
# Raw link:
# wget https://raw.githubusercontent.com/cloudlinux/imunify360-documentation/master/docs/control_panel_integration/get-panel-info.sh -O /etc/sysconfig/imunify360/get-panel-info.sh
#

# Check if a port is open, suppressing output from nc
check_port() {
    # Ensure nc exists
    if ! command -v nc > /dev/null; then
        # nc is not available, this script cannot succeed.
        return 1 # Return failure
    fi
    # Run nc, redirect both stdout and stderr to /dev/null
    nc -z -w1 "$1" "$2" > /dev/null 2>&1
    return $? # Return nc's exit status (0 for open, non-zero for closed/timeout)
}

# Main script execution
main() {
    # State variables
    local result_status="unknown" # Possible values: unknown, ok, not_found, error
    local error_message=""
    local name=""
    local version="unknown"
    local host="localhost"
    local nc_present=true # Assume nc is present

    # --- Check for 'nc' command ---
    if ! command -v nc > /dev/null; then
        nc_present=false
        result_status="error"
        error_message="Required 'nc' (netcat) not found."
    fi
    # --- End check ---

    # --- Perform port checks, paths and infer panel name ---
    if $nc_present; then
        # Webmin
        if check_port "$host" 10000; then
            name="Webmin"
        # Cockpit
        elif check_port "$host" 9090; then
            name="Cockpit"
        # ISPConfig
        elif check_port "$host" 8080; then
            name="ISPConfig"
        # Ajenti
        elif check_port "$host" 8000; then
            name="Ajenti"
        # Froxlor
        elif check_port "$host" 4430; then
            name="Froxlor"
        # VestaCP / HestiaCP Conflict Check
        elif check_port "$host" 8083; then
            if [ -d "/usr/local/hestia/" ]; then
                name="HestiaCP"
            elif [ -d "/usr/local/vesta/" ]; then
                name="VestaCP"
            else
                name="VestaCP / HestiaCP (Port 8083)"
            fi
        # CentOS Web Panel (CWP)
        elif check_port "$host" 2031 || check_port "$host" 2030; then
            name="CentOS Web Panel"
        # BlueOnyx
        elif check_port "$host" 444 || check_port "$host" 81 ; then
            name="BlueOnyx"
        # WebCP
        elif check_port "$host" 24522; then
            name="WebCP"
        # InterWorx
        elif check_port "$host" 2443 || check_port "$host" 2080; then
            name="InterWorx"
        else
            # Custom port scan (only if no standard panel found yet)
            for port in $(seq 8000 9000); do
                if [[ "$port" == "8000" || "$port" == "8080" || "$port" == "8083" || "$port" == "9090" ]]; then
                    continue
                fi
                if check_port "$host" "$port"; then
                    name="Unknown Panel (custom port $port)"
                    break
                fi
            done
        fi

        # Determine final output status
        if [ -n "$name" ]; then
            result_status="ok"
        else
            result_status="not_found"
        fi
    fi # End of "if nc_present"

    # --- Construct and print JSON output ---
    if [ "$result_status" == "ok" ]; then
        # Using printf for JSON value construction
        printf '{\n'
        printf '    "data": {\n'
        printf '        "name": "%s",\n' "$name"
        printf '        "version": "%s"\n' "$version"
        printf '    },\n'
        printf '    "metadata": {\n'
        printf '        "result": "ok"\n'
        printf '    }\n'
        printf '}\n'
    elif [ "$result_status" == "not_found" ]; then
        printf '{\n'
        printf '    "metadata": {\n'
        printf '        "result": "not_found"\n'
        printf '    }\n'
        printf '}\n'
    elif [ "$result_status" == "error" ]; then
        # Basic escaping for the error message
        escaped_error_message=$(printf '%s' "$error_message" | sed 's/\\/\\\\/g; s/"/\\"/g')
        printf '{\n'
        printf '    "metadata": {\n'
        printf '        "result": "error",\n'
        printf '        "error_message": "%s"\n' "$escaped_error_message"
        printf '    }\n'
        printf '}\n'
    else
        # A fallback JSON
        printf '{\n'
        printf '    "metadata": {\n'
        printf '        "result": "internal_script_error",\n'
        printf '        "error_message": "Script reached unexpected state."\n'
        printf '    }\n'
        printf '}\n'
    fi

    # The script implicitly exits with 0 after the last command unless an error occurred *running* printf/sed
}

# Run the main function
main
