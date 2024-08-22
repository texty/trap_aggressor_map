#!/bin/bash

# You need to install imagemagick
max_width=1000

# Directory containing the images
image_dir="static/photo"

# Loop over each image in the directory
for image in "$image_dir"/*.{jpg,jpeg,png,webp}; do
  # Check if the file is an image
  if [[ -f "$image" ]]; then
    # Get the width of the image
    width=$(identify -format "%w" "$image")
    
    # Check if the width is greater than the maximum width
    if [ "$width" -gt "$max_width" ]; then
      echo "Compressing $image..."
      # Resize the image to the maximum width
      mogrify -resize ${max_width}x "$image"
    else
      echo "$image does not need compression."
    fi
  fi
done

echo "Compression complete."
