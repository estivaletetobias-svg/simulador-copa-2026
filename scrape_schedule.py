import pandas as pd
import json

url = "https://en.wikipedia.org/wiki/2026_FIFA_World_Cup"
try:
    tables = pd.read_html(url)
    
    for idx, df in enumerate(tables):
        # The group stage table usually has columns like 'Match', 'Date', 'Time', 'Venue', 'Group', 'Team 1', 'Team 2'
        text = df.to_string()
        if 'Match' in text and 'Group' in text and 'Venue' in text:
            print(f"Found table {idx}")
            print(df.head())
            break
except Exception as e:
    print(e)
