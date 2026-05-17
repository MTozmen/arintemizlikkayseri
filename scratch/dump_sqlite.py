import sqlite3
import json

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

conn = sqlite3.connect('dev.db')
conn.row_factory = dict_factory
cursor = conn.cursor()

tables = ['Admin', 'Service', 'BlogPost', 'SiteContent']
db_dump = {}

for table in tables:
    try:
        cursor.execute(f"SELECT * FROM {table}")
        db_dump[table] = cursor.fetchall()
    except Exception as e:
        print(f"Error on {table}: {e}")

with open('scratch/data.json', 'w', encoding='utf-8') as f:
    json.dump(db_dump, f, ensure_ascii=False)

print("Dumped successfully.")
