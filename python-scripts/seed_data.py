#!/usr/bin/env python3
"""Seed demo data into the Task Manager API."""
import sys, argparse, requests

parser = argparse.ArgumentParser()
parser.add_argument("--host", default="http://localhost:8080")
parser.add_argument("-v","--verbose", action="store_true")
args = parser.parse_args()
BASE = args.host.rstrip("/")
H = {"Content-Type": "application/json"}

def post(path, payload):
    r = requests.post(f"{BASE}{path}", json=payload, headers=H, timeout=10)
    r.raise_for_status()
    return r.json()

CATEGORIES = [
    {"name":"Backend","description":"Java / Spring Boot tasks"},
    {"name":"Frontend","description":"Angular / UI tasks"},
    {"name":"DevOps","description":"CI/CD, Docker tasks"},
    {"name":"Database","description":"SQL / migrations"},
    {"name":"Testing","description":"Unit and E2E tests"},
]
TASKS = {
    "Backend":  [{"title":"Implement JWT auth","status":"TODO","priority":"HIGH"},{"title":"Add pagination","status":"IN_PROGRESS","priority":"MEDIUM"}],
    "Frontend": [{"title":"Build task detail modal","status":"TODO","priority":"MEDIUM"},{"title":"Dark mode toggle","status":"TODO","priority":"LOW"}],
    "DevOps":   [{"title":"Configure Docker health-checks","status":"TODO","priority":"MEDIUM"},{"title":"GitHub Actions release workflow","status":"TODO","priority":"HIGH"}],
    "Database": [{"title":"Add Flyway migrations","status":"TODO","priority":"HIGH"}],
    "Testing":  [{"title":"Write integration tests for TaskController","status":"IN_PROGRESS","priority":"HIGH"}],
}

cat_ids = {}
print(f"[seed] Target: {BASE}")
for c in CATEGORIES:
    try:
        d = post("/api/categories", c); cat_ids[c["name"]] = d["id"]; print(f"  ✓ {c['name']}")
    except requests.HTTPError as e:
        if e.response.status_code == 409: print(f"  ~ {c['name']} exists")
        else: print(f"  ✗ {c['name']} — {e}"); sys.exit(1)

total = 0
for cat, tasks in TASKS.items():
    for t in tasks:
        p = {**t}
        if cat in cat_ids: p["category"] = {"id": cat_ids[cat]}
        try: post("/api/tasks", p); print(f"  ✓ [{cat}] {t['title']}"); total += 1
        except requests.HTTPError as e: print(f"  ✗ {t['title']} — {e}")

print(f"\n[seed] Done! {len(cat_ids)} categories, {total} tasks.")
