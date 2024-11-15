import pandas as pd
import folium
import streamlit as st
from streamlit_folium import st_folium
import plotly.express as px
from sklearn.cluster import KMeans
from func import load_data, perform_kmeans_clustering

# ページ設定
st.set_page_config(page_title="ゴミ＆ゴミ箱ダッシュボード", page_icon="🗑️", layout="wide", initial_sidebar_state="expanded")

# サイドバーのスタイリング
st.sidebar.title("ゴミ＆ゴミ箱ダッシュボード")

# データのロード
garbage_csv_path = "../backend/db/garbage.csv"
garbage_cans_csv_path = "../backend/db/garbage_cans.csv"
df_gb, df_gbcans = load_data(garbage_csv_path=garbage_csv_path, garbage_cans_csv_path=garbage_cans_csv_path)

# カラム設定（カラム2を最も太くする）
col1, col2, col3 = st.columns([1, 3, 1])

# カラム1: Donut Chart for discarded vs not discarded garbage
with col1:
    if not df_gb.empty:
        discarded_counts = df_gb["is_discarded"].value_counts()
        discarded_data = pd.DataFrame(
            {"Status": ["Discarded", "Not Discarded"], "Count": [discarded_counts.get(1, 0), discarded_counts.get(0, 0)]}
        )

        fig = px.pie(discarded_data, names="Status", values="Count", hole=0.3, title="捨てられたゴミの割合")
        st.plotly_chart(fig)

        # Calculate percentage change for discarded garbage (last month vs current month)
        df_gb["month"] = pd.to_datetime(df_gb["created_at"]).dt.to_period("M")
        current_month = df_gb["month"].max()
        last_month = current_month - 1

        current_month_count = df_gb[df_gb["month"] == current_month]["is_discarded"].sum()
        last_month_count = (
            df_gb[df_gb["month"] == last_month]["is_discarded"].sum() if last_month in df_gb["month"].values else 0
        )

        if last_month_count > 0:
            change_percentage = ((current_month_count - last_month_count) / last_month_count) * 100
        else:
            change_percentage = 0

        st.write(f"捨てられたゴミの先月比: {change_percentage:.2f}%")

# カラム2: 地図とKMeansクラスタリング
with col2:
    # 地図の中心座標（データの平均位置を使う）
    if not df_gb.empty:
        center_lat = df_gb["latitude"].mean()  # 緯度（latitude列を使用）
        center_lon = df_gb["longitude"].mean()  # 経度（longitude列を使用）
    else:
        center_lat = 35.6895
        center_lon = 139.6917

    # 地図を作成
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

    # 最初にクラスタリングを実行してクラスタの中心を表示
    if not df_gb.empty:
        centroids = perform_kmeans_clustering(df_gb, num_clusters=5)
        for idx, centroid in enumerate(centroids):
            folium.Marker(
                location=[centroid[0], centroid[1]],
                popup=f"Cluster {idx + 1} Center",
                icon=folium.Icon(color="red", icon="star"),
            ).add_to(m)

    # 地図を表示
    st_folium(m, width=700, height=500)

# カラム3: ランキング表示（捨てられているカテゴリ）
with col3:
    if not df_gb.empty:
        discarded_categories = df_gb[df_gb["is_discarded"] == 1]["type"].value_counts().head(10)
        st.write("捨てられているカテゴリのランキング")
        st.bar_chart(discarded_categories)
