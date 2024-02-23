#!/bin/bash

# Get the directory of the current script.
script_dir=$(cd "$(dirname "$0")" && pwd)

# Define base directory and output file
base_dir="$script_dir/_posts"
output_file="$script_dir/paths.txt"

# Clean up previous output file
rm -f "$output_file"

# Function to format and output paths
output_paths() {
    local base_path=$1
    local output=$2
    local prev_lang=""

    # Use find to get all directories and markdown files, sort them to maintain structure
    find "$base_path" \( -type d -or -name "*.md" \) | sort | while read -r path; do
        # Format path by removing base directory and trimming trailing slashes
        local formatted_path=${path#$base_path}
        formatted_path=${formatted_path#/} # Remove leading slash for consistency

        # Skip the root '/' path
        if [ -z "$formatted_path" ]; then
            continue
        fi

        # Extract language from path for section spacing
        local lang=${formatted_path%%/*}

        # If we're at a new language, output a blank line for readability (if not the first)
        if [[ "$lang" != "$prev_lang" && "$prev_lang" != "" ]]; then
            echo >> "$output"
        fi

        # Update previous language tracker
        prev_lang=$lang

        # Check if it's a Markdown file and remove the .md extension
        if [[ "$formatted_path" == *.md ]]; then
            formatted_path=${formatted_path%.md}
        fi

        # Output the formatted path
        echo "/$formatted_path" >> "$output"
    done
}

# Call the function with the base directory and output file
output_paths "$base_dir" "$output_file"

# Confirm the file has been created/updated.
echo "File created/updated at: $output_file"
