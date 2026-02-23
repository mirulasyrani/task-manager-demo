#!/usr/bin/env python3
"""Export tasks to CSV."""
import csv, argparse, requests
from datetime import datetime
parser = argparse.ArgumentParser()
parser.add_argument("--host", default="http://localhost:8080")
parser.add_argument("--output", default="tasks_export.csv")
args = parser.parse_args()
r = requests.get(f"{args.host.rstrip('/')}/api/tasks", timeout=10); r.raise_for_status()
tasks = r.json()
with open(args.output, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["id","title","description","status","priority","category","createdAt","updatedAt"], extrasaction="ignore")
    w.writeheader()
    for t in tasks:
        t["category"] = (t.get("category") or {}).get("name","")
        w.writerow(t)
print(f"[export] {len(tasks)} tasks → {args.output}  ({datetime.now().isoformat()})")
