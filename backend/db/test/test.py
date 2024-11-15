import pandas as pd
import db.db as db

df_garbages = pd.read_csv("db/test/garbages.csv")

for i in range(len(df_garbages)):
    json = df_garbages.iloc[i].to_dict()
    db.insert_garbage(
        0, json["latitude"], json["longitude"], json["is_discarded"]
    )
