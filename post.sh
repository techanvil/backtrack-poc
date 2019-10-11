#!/bin/sh

curl -d @event.json -H "Content-Type: application/json" -X POST http://localhost:8000/event
