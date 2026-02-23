#!/usr/bin/env python3
"""Check Task Manager API health."""
import sys, argparse, requests
parser = argparse.ArgumentParser()
parser.add_argument("--host", default="http://localhost:8080")
parser.add_argument("--timeout", type=int, default=5)
args = parser.parse_args()
BASE = args.host.rstrip("/")
CHECKS = [("GET /api/tasks", f"{BASE}/api/tasks"), ("GET /api/categories", f"{BASE}/api/categories")]
ok = True
print(f"Health check → {BASE}\n{'─'*45}")
for name, url in CHECKS:
    try:
        r = requests.get(url, timeout=args.timeout)
        icon = "✓" if r.status_code==200 else "✗"
        print(f"  {icon}  {name:<35} {r.status_code}")
        if r.status_code != 200: ok = False
    except requests.ConnectionError: print(f"  ✗  {name:<35} CONNECTION REFUSED"); ok = False
    except requests.Timeout:         print(f"  ✗  {name:<35} TIMEOUT"); ok = False
print(f"{'─'*45}\n{'All checks passed.' if ok else 'FAILED.'}")
sys.exit(0 if ok else 1)
