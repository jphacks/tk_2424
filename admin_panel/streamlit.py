import pandas as pd
import folium
import streamlit as st
from streamlit_folium import st_folium
import plotly.express as px
from func import load_data, perform_kmeans_clustering

# ページ設定
st.set_page_config(
    page_title="ゴミ＆ゴミ箱 管理パネル",
    page_icon="🗑️",
    layout="wide",
    initial_sidebar_state="expanded",
)

# サイドバーのスタイリング
with st.sidebar:
    st.title("ゴミ＆ゴミ箱 管理パネル📝")
    with st.expander("About", expanded=True):
        st.write(
            """
            - **ゴミ箱の設置場所を最適化するためのデータ分析ツール**
            - :orange[**データ引用元**]: ゴミンゴアプリ上データを想定
            - :orange[**最適位置の計算**]: k-meansクラスタリングを使用
            """
        )

# css styling
st.markdown(
    """
<style>

[data-testid="block-container"] {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1rem;
    padding-bottom: 0rem;
    margin-bottom: -7rem;
}

[data-testid="stVerticalBlock"] {
    padding-left: 0rem;
    padding-right: 0rem;
}

[data-testid="stMetric"] {
    background-color: #393939;
    text-align: center;
    padding: 15px 0;
}

[data-testid="stMetricLabel"] {
    display: flex;
    justify-content: center;
    align-items: center;
}

[data-testid="stMetricDeltaIcon-Up"] {
    position: relative;
    left: 38%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
}

[data-testid="stMetricDeltaIcon-Down"] {
    position: relative;
    left: 38%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
}

</style>
""",
    unsafe_allow_html=True,
)
###

# データのロード
garbage_csv_path = "./sample_garbage.csv"
garbage_cans_csv_path = "./sample_cans.csv"
df_gb, df_gbcans = load_data(garbage_csv_path=garbage_csv_path, garbage_cans_csv_path=garbage_cans_csv_path)

# カラム設定（カラム2を最も太くする）
col1, col2, col3 = st.columns([1, 3, 1])

# カラム1: Donut Chart for discarded vs not discarded garbage
with col1:
    st.markdown("#### ゴミの分析")
    if not df_gb.empty:
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
        st.markdown("###### ゴミ種類分類")

        # 種類ごとのカウントと割合計算
        type_counts = df_gb["type"].value_counts().reset_index()
        type_counts.columns = ["Type", "Count"]
        total_count = type_counts["Count"].sum()
        type_counts["Ratio"] = (type_counts["Count"] / total_count) * 100  # 割合を計算

        # DataFrame を表示
        st.dataframe(
            type_counts,
            column_order=["Type", "Ratio"],
            hide_index=True,
            column_config={
                "Type": st.column_config.TextColumn(
                    "ゴミの種類",
                ),
                "Ratio": st.column_config.ProgressColumn(
                    "割合 (%)",
                    min_value=0,
                    max_value=100,
                    format="%.2f%%",  # 小数点2桁までのフォーマット
                ),
            },
        )

        discarded_counts = df_gb["is_discarded"].value_counts()
        discarded_data = pd.DataFrame(
            {
                "Status": ["Discarded", "Not Discarded"],
                "Count": [discarded_counts.get(1, 0), discarded_counts.get(0, 0)],
            }
        )
        fig = px.pie(
            discarded_data,
            names="Status",
            values="Count",
            hole=0.3,
            title="捨てられたゴミの割合",
        )
        st.plotly_chart(fig)

# カラム2: 地図とKMeansクラスタリング
# 地図を表示する処理
with col2:
    st.markdown("#### マップ")

    # クラスタリングの数を入力
    num_clusters = st.number_input(
        "設置したいゴミ箱の数(クラスタリング数)を入力してください",
        min_value=1,
        max_value=10,
        value=4,
        step=1,
    )

    if not df_gb.empty:
        center_lat = df_gb["latitude"].median()  # 緯度（latitude列を使用）
        center_lon = df_gb["longitude"].median()  # 経度（longitude列を使用）
    else:
        center_lat = 35.6895
        center_lon = 139.6917

    # 地図を作成
    m = folium.Map(location=[center_lat, center_lon], zoom_start=13)

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

    # クラスタリングを実行してクラスタの中心を表示
    if not df_gb.empty:
        centroids = perform_kmeans_clustering(df_gb, num_clusters=num_clusters)
        print(centroids)  # クラスタ中心をデバッグ用に表示
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
    st.markdown("#### ゴミ箱の計画")
    if not df_gb.empty:
        centroids = perform_kmeans_clustering(df_gb, num_clusters=num_clusters)

        # すべての候補地を1つのカードに表示 (改行形式)
        locations_list = "<br>".join(
            f"[候補地 {idx + 1}] ({centroid[0]:.3f}, {centroid[1]:.3f})" for idx, centroid in enumerate(centroids)
        )

        # カードのデザイン
        st.markdown(
            f"""
            <div style="background-color:#f9f9f9; padding:10px; margin-bottom:10px; border-radius:5px; box-shadow:0px 1px 2px rgba(0,0,0,0.1);">
                <h5 style="margin:0;">候補地一覧</h5>
                <p style="margin:0; line-height:1.6;">
                    {locations_list}
                </p>
            </div>
            """,
            unsafe_allow_html=True,
        )
    # ゴミ箱の種類カウント
    type_columns = ["burnable", "non_burnable", "bottles_cans", "ashtray"]
    type_counts = df_gbcans[type_columns].sum()  # ワンホットエンコーディングの合計でカウント
    total_cans = type_counts.sum()  # 全種類の合計

    # 割合計算
    type_ratios = (type_counts / total_cans) * 100

    # データフレーム形式に整形
    type_summary = pd.DataFrame(
        {
            "Type": ["Burnable", "Non-burnable", "Bottles & Cans", "Ashtray"],
            "Count": type_counts.values,
            "Ratio (%)": type_ratios.values,
        }
    )
    # 棒グラフで表示
    fig = px.bar(
        type_summary,
        x="Type",
        y="Ratio (%)",
        text="Ratio (%)",
        title="ゴミ箱の種別割合",
        labels={"Ratio (%)": "割合 (%)"},
        color="Type",
        color_discrete_sequence=px.colors.qualitative.Set2,
    )
    fig.update_traces(texttemplate="%{text:.2f}%", textposition="outside")

    st.plotly_chart(fig)
