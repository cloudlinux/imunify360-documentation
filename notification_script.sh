#!/bin/bash
#
# Simple and generic shell script aiming to be a reference/template to
# create custom scripts to use with imunify-notifier.
#
# https://docs.imunify360.com/features/#notifications
#
# Builtin features:
# - Once an event is triggered a formated mail can be sent to a list of RCPT
# - Upon an event trigger it saves a formated message into a file.
#
# Users can use this script as reference to append customizations, look at
# "append your stuff here" in payload_handler function.
#
# do not forget to set +x bits to this script file, also since imunity-notifier daemon
# drops privileges to _imunify user, make sure of setting group's permission accordingly
# chown root:_imunify imunity-script

MAIL_ENABLE=no                   # default no, change to "yes" for enabling
MAIL_TO="gsoares@cloudlinux.com" # for multiple address can be separated with commas

FILE_ENABLE=yes                 # default yes, change to "no" for disabling
DIR_NAME="imunify-script-files" # /tmp subdirectory

# bring up our variables
init_data() {
	data=$(cat) # data within payload coming from imunify-notifier.

	# parse JSON data with jq
	event_id=$(jq -r '.event_id' <<<${data})
	period_started=$(jq -r '.period_started' <<<${data})
	period_finished=$(jq -r '.period_finished' <<<${data})
	malicious_total=$(jq -r '.malicious_total' <<<${data})
	malicious_files=$(jq -r '.malicious_files[]' <<<${data})
	# handle SCRIPT_BLOCKED event
	if [ "$malicious_total" == "null" ]; then
		malicious_total=$(jq -r '.events_total' <<<${data})
	fi
	if [ -z "$malicious_files" ]; then
		malicious_files=$(jq -r '.blocked_scripts[].path' <<<${data})
	fi
}

# human-readable message
format_msg() {
	echo "During the period from $(date -ud "@"${period_started}) to \
		$(date -ud "@"${period_finished}) on $(hostname) \
		${event_msg} has blocked a total of ${malicious_total}: ${malicious_files}"
}

# handles the script-builtin features
features_handler() {
	if [ "$MAIL_ENABLE" = "yes" ]; then
		send_mail
	fi
	if [ "$FILE_ENABLE" = "yes" ]; then
		file_save
	fi
}

# prepare and send mail, requires set $MAIL_ENABLE to yes
send_mail() {
	msg=$(format_msg)
	cat <<EOF | mail -s "imunify-script: ${event_id}" $MAIL_TO
$msg
EOF
}

# push a formated text into a file located by default in $DIR_NAME
# it is enabled by default by setting $FILE_ENABLE.
file_save() {
	msg=$(format_msg)
	test -d "$DIR_NAME" || mkdir "/tmp/$DIR_NAME"
	savefile=$(mktemp --tmpdir ${DIR_NAME}/imunify-script-${event_id}.XXXXXXXXXXXXXXXXXXXXXXX)
	echo $msg >$savefile
}

# digest the payload gave by imunity-notify handling the supported events
payload_handler() {
	case ${event_id} in
	REALTIME_MALWARE_FOUND)
		event_msg="realtime scan"
		features_handler
		# append your stuff here
		;;
	USER_SCAN_MALWARE_FOUND)
		event_msg="scan"
		features_handler
		# append your stuff here
		;;
	SCRIPT_BLOCKED)
		event_msg="proactive defence"
		features_handler
		# append your stuff here
		;;
	USER_SCAN_STARTED)
		event_msg="scan"
		features_handler
		# append your stuff here
		;;
	CUSTOM_SCAN_STARTED)
		event_msg="scan"
		features_handler
		# append your stuff here
		;;
	USER_SCAN_FINISHED)
		event_msg="scan"
		features_handler
		# append your stuff here
		;;
	CUSTOM_SCAN_FINISHED)
		event_msg="scan"
		features_handler
		# append your stuff here
		;;
	CUSTOM_SCAN_MALWARE_FOUND)
		event_msg="scan"
		features_handler
		# append your stuff here
		;;
	*)
		echo "unhandled" 1>&2
		exit 1
		;;
	esac
}

# starting up
init_data
payload_handler
