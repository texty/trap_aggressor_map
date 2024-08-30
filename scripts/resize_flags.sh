#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

# Directory containing the images
DIR=$1

# Loop through all files in the directory
for file in "$DIR"/*; do
    # Get the filename without extension
    filename=$(basename -- "$file")
    extension="${filename##*.}"
    filename="${filename%.*}"

    # Convert the image to JPG with a width of 150px
    convert "$file" -resize 150 "$DIR/$filename.jpg"

    # Optionally remove the original file after conversion
    # rm "$file"
done

echo "Conversion completed."
