#!/bin/bash

file_to_process="${1}"

# Get the directory of this script
script_directory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

sed -e "s/date\>/string\>/g" -e "s/data\>/string\>/g" "${file_to_process}" \
    | plutil -convert json -r -o - - \
    | jq -S -f "${script_directory}/normalize.jq" \
    > "${file_to_process}".json
