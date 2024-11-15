import pandas as pd
import db.db as db

df_garbages = pd.read_csv("db/test/garbages.csv")

for i in range(len(df_garbages)):
    json = df_garbages.iloc[i].to_dict()
    db.insert_garbage(0, json["latitude"], json["longitude"], json["is_discarded"])

df_garbage_cans = pd.read_csv("db/test/garbage_cans.csv")

for i in range(len(df_garbage_cans)):
    json = df_garbage_cans.iloc[i].to_dict()
    db.insert_garbage_can(
        json["latitude"],
        json["longitude"],
        "",
        json["burnable"],
        json["non_burnable"],
        json["bottles_cans"],
        json["ashtray"],
    )
