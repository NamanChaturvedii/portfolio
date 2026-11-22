import json, os, sys, urllib.request

status = sys.argv[1]
icons = {"success": ":white_check_mark:", "unstable": ":warning:", "failure": ":x:"}
job, build = os.environ["JOB_NAME"], os.environ["BUILD_NUMBER"]
url = os.environ.get("BUILD_URL", "")

text = f"{icons.get(status, '')} *{job} #{build}* {status.upper()}\n<{url}console|Open console log>"
if status == "success":
    text += f"\nImage pushed: `{os.environ['ECR_REGISTRY']}/portfolio:{build}`"

req = urllib.request.Request(
    os.environ["SLACK_WEBHOOK"],
    data=json.dumps({"text": text}).encode(),
    headers={"Content-Type": "application/json"},
)
urllib.request.urlopen(req)
