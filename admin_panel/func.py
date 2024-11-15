from sklearn.cluster import KMeans
import pandas as pd


def load_data(garbage_csv_path, garbage_cans_csv_path):
    """CSVファイルからデータをロードする関数"""
    try:
        df_gb = pd.read_csv(garbage_csv_path, encoding="utf-8")
        df_gbcans = pd.read_csv(garbage_cans_csv_path, encoding="utf-8")
    except FileNotFoundError:
        return pd.DataFrame()
    return df_gb, df_gbcans


def perform_kmeans_clustering(df, num_clusters):
    """KMeansクラスタリングを実行し、各クラスタの中心を返す関数"""
    kmeans = KMeans(n_clusters=num_clusters, random_state=0)
    coordinates = df[["latitude", "longitude"]].dropna()  # NaNの行は除外
    kmeans.fit(coordinates)
    centroids = kmeans.cluster_centers_
    return centroids
