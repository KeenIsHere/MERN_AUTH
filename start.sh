#!/bin/bash

# GHUMMGHAMM Travel Agency - Quick Start Script
# This script starts both backend and frontend servers

echo "🚀 Starting GHUMMGHAMM Travel Agency..."
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if MongoDB is running
echo "📊 Checking MongoDB connection..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  Warning: MongoDB doesn't appear to be running."
    echo "   Please start MongoDB first: mongod --dbpath /path/to/data"
    echo ""
fi

# Start Backend Server
echo "${BLUE}🔧 Starting Backend Server...${NC}"
cd "$SCRIPT_DIR/server"
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi
node server.js &
BACKEND_PID=$!
echo "${GREEN}✅ Backend started on http://localhost:4000 (PID: $BACKEND_PID)${NC}"
echo ""

# Wait a moment for backend to initialize
sleep 2

# Start Frontend Server
echo "${BLUE}🎨 Starting Frontend Server...${NC}"
cd "$SCRIPT_DIR/client/client"
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi
npm run dev &
FRONTEND_PID=$!
echo "${GREEN}✅ Frontend started on http://localhost:5173 (PID: $FRONTEND_PID)${NC}"
echo ""

# Success message
echo "=================================="
echo "${GREEN}🎉 GHUMMGHAMM Travel Agency is running!${NC}"
echo ""
echo "📍 Backend:  http://localhost:4000"
echo "📍 Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "=================================="

# Save PIDs to file for cleanup
echo "$BACKEND_PID" > "$SCRIPT_DIR/.pids"
echo "$FRONTEND_PID" >> "$SCRIPT_DIR/.pids"

# Wait for Ctrl+C
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; rm -f '$SCRIPT_DIR/.pids'; echo '✅ Servers stopped'; exit 0" INT

# Keep script running
wait
