"""Pull daily GoatCounter visitor counts for www.duncan-webb.com to visitors_daily.csv.

Key: secretctl get goatcounter.api-key (read-only statistics scope).
"""
import csv, datetime, json, pathlib, subprocess, urllib.request

key = subprocess.run(["secretctl", "get", "goatcounter.api-key"], capture_output=True, text=True, check=True).stdout
# end is exclusive, so ask for tomorrow to include today
end = (datetime.date.today() + datetime.timedelta(days=1)).isoformat()
req = urllib.request.Request(
    f"https://dmbwebb.goatcounter.com/api/v0/stats/total?start=2020-01-01&end={end}",
    headers={"Authorization": f"Bearer {key}"})
data = json.load(urllib.request.urlopen(req))
rows = [(d["day"], d["daily"]) for d in data["stats"] if d["day"] <= datetime.date.today().isoformat()]
first = next(i for i, (_, n) in enumerate(rows) if n > 0)
out = pathlib.Path(__file__).with_name("visitors_daily.csv")
with out.open("w", newline="") as f:
    w = csv.writer(f); w.writerow(["day", "visitors"]); w.writerows(rows[first:])
print(f"total={data['total']} events={data['total_events']} days={len(rows)-first} first={rows[first][0]}")
