from flask import Flask, jsonify
from db import get_date_time
import signal
import sys
import os

app = Flask(__name__)

PORT = int(os.getenv("PORT", 4001))

@app.route("/", methods=["GET"])
def home():
    date_time = get_date_time()
    if date_time:
        date_time["api"] = "python"
        return jsonify(date_time)
    else:
        return jsonify({"error": "Failed to fetch date and time"}), 500


def shutdown_server(signum, frame):
    print("SIGTERM signal received: closing HTTP server")
    sys.exit(0)


signal.signal(signal.SIGTERM, shutdown_server)


if __name__ == "__main__":
    print(f"Starting server on port {PORT}")
    app.run(host="0.0.0.0", port=PORT)
