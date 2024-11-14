import pandas as pd
import folium
from streamlit_folium import st_folium
import streamlit as st
from sklearn.cluster import KMeans

garbage_csv_path = "../backend/db/garbage.csv"
garbage_cans_csv_path = "../backend/db/garbage_cans.csv"


def load_data(garbage_csv_path, garbage_cans_csv_path):
    """CSVファイルからデータをロードする関数"""
    try:
        df_gb = pd.read_csv(garbage_csv_path, encoding="utf-8")
        df_gbcans = pd.read_csv(garbage_cans_csv_path, encoding="utf-8")
    except FileNotFoundError:
        return pd.DataFrame()
    return df_gb, df_gbcans


def perform_kmeans_clustering(df, num_clusters=3):
    """KMeansクラスタリングを実行し、各クラスタの中心を返す関数"""
    kmeans = KMeans(n_clusters=num_clusters, random_state=0)
    coordinates = df[["latitude", "longitude"]].dropna()  # NaNの行は除外
    kmeans.fit(coordinates)
    centroids = kmeans.cluster_centers_
    return centroids


st.title("ゴミ＆ゴミ箱マップ")

df_gb, df_gbcans = load_data(garbage_csv_path=garbage_csv_path, garbage_cans_csv_path=garbage_cans_csv_path)

# 地図の中心座標（データの平均位置を使う）
if not df_gb.empty:
    center_lat = df_gb["latitude"].mean()  # 緯度（latitude列を使用）
    center_lon = df_gb["longitude"].mean()  # 経度（longitude列を使用）
else:
    center_lat = 35.6895
    center_lon = 139.6917

# 最初の地図を作成
m = folium.Map(location=[center_lat, center_lon], zoom_start=12)

# ゴミ箱の位置を地図に表示
if not df_gbcans.empty:
    for idx, row in df_gbcans.iterrows():
        types = []
        if row["burnable"] == 1:
            types.append("Burnable")
        if row["non_burnable"] == 1:
            types.append("Non-burnable")
        if row["bottles_cans"] == 1:
            types.append("Bottles & Cans")
        if row["ashtray"] == 1:
            types.append("Ashtray")
        types_str = ", ".join(types) if types else "No Type"

        folium.Marker(
            location=[row["latitude"], row["longitude"]],
            popup=f"Garbage Can - Type: {types_str}",
            icon=folium.Icon(color="green", icon="trash"),
        ).add_to(m)

# ゴミの位置を地図に表示
if not df_gb.empty:
    for idx, row in df_gb.iterrows():
        folium.Marker(
            location=[row["latitude"], row["longitude"]],
            popup=f"Garbage - Type: {row['type']}",
            icon=folium.Icon(color="blue", icon="arrow-down"),
        ).add_to(m)

# KMeansクラスタリング実行ボタン
if st.button("クラスタリング実行"):
    if not df_gb.empty:
        # クラスタリング結果を取得
        centroids = perform_kmeans_clustering(df_gb, num_clusters=3)

        # クラスタの中心を地図に表示
        for idx, centroid in enumerate(centroids):
            folium.Marker(
                location=[centroid[0], centroid[1]],
                popup=f"Cluster {idx + 1} Center",
                icon=folium.Icon(color="red", icon="info-sign"),
            ).add_to(m)
    else:
        st.write("ゴミデータがありません。")

# Streamlitに地図を表示
st_folium(m, width=700, height=500)
