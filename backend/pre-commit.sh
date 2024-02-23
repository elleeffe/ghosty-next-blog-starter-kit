#!/bin/bash

# Check if any .md files are added, deleted, or edited
if git diff --cached --name-only | grep -e '\.md$'; then
  # If .md files are touched, run the scripts to generate paths and sitemap
  ./backend/generate-paths.sh && node backend/generate-sitemap.js
  
  # Add the sitemap.xml to the commit
  git add public/sitemap.xml

  echo "public/sitemap.xml added to commit"
fi