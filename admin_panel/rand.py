import random

# 緯度と経度をランダムに生成するスクリプト

# 新宿と渋谷の緯度経度の範囲
lat_min, lat_max = 35.6895, 35.7138  # 緯度の範囲
lon_min, lon_max = 139.6917, 139.7611  # 経度の範囲

# ランダムな緯度経度を生成
random_lat = round(random.uniform(lat_min, lat_max), 6)
random_lon = round(random.uniform(lon_min, lon_max), 6)

print(f"{random_lat},{random_lon}")
