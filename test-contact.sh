#!/usr/bin/env bash
# Quick test script to POST a contact message to the local server
# Usage: ./test-contact.sh

URL="http://localhost:3000/send-contact"
cat <<EOF | curl -s -X POST "$URL" -H "Content-Type: application/json" -d @-
{
  "name": "Local Tester",
  "email": "tester@example.com",
  "reason": "Quick test",
  "message": "This is a quick test message."
}
EOF

echo
