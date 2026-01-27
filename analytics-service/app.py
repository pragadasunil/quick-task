from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId
import os
from collections import defaultdict

load_dotenv()

app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_default_database()
tasks_collection = db["tasks"]


@app.route("/")
def home():
    return jsonify({"message": "Analytics service running"})


@app.route("/analytics/user-stats")
def user_stats():
    user_id = request.args.get("userId")
    if not user_id:
        return jsonify({"error": "userId required"}), 400

    user_object_id = ObjectId(user_id)

    tasks = list(tasks_collection.find({"userId": user_object_id}))

    total = len(tasks)
    completed = len([t for t in tasks if t.get("status") == "Completed"])
    pending = total - completed

    priority_breakdown = {"Low": 0, "Medium": 0, "High": 0}
    for task in tasks:
        if task.get("priority") in priority_breakdown:
            priority_breakdown[task["priority"]] += 1

    completion_rate = int((completed / total) * 100) if total > 0 else 0

    return jsonify({
        "total": total,
        "completed": completed,
        "pending": pending,
        "completionRate": completion_rate,
        "priorityBreakdown": priority_breakdown
    })


@app.route("/analytics/productivity")
def productivity():
    user_id = request.args.get("userId")
    if not user_id:
        return jsonify({"error": "userId required"}), 400

    user_object_id = ObjectId(user_id)

    tasks = list(tasks_collection.find({
        "userId": user_object_id,
        "status": "Completed"
    }))

    trend = defaultdict(int)

    for task in tasks:
        completed_at = task.get("updatedAt") or task.get("createdAt")
        if completed_at:
            date_key = completed_at.strftime("%Y-%m-%d")
            trend[date_key] += 1

    return jsonify(dict(trend))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5001)))
