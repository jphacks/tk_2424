from sklearn.cluster import KMeans
import pandas as pd
from pyclustering.cluster.xmeans import xmeans
from pyclustering.cluster.center_initializer import kmeans_plusplus_initializer
import warnings


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


def perform_xmeans_clustering(df, num_clusters=3):
    """XMeansクラスタリングを実行し、各クラスタの中心を返す関数"""
    coordinates = df[["latitude", "longitude"]].dropna().values  # NaNの行は除外
    print(coordinates)

    initial_centers = kmeans_plusplus_initializer(coordinates, 2).initialize()

    xmeans_instance = xmeans(coordinates, initial_centers)

    # warningsを一時的に無効化
    with warnings.catch_warnings():
        warnings.filterwarnings("ignore", message="All-NaN (slice|axis) encountered")
        xmeans_instance.process()

    clusters = xmeans_instance.get_clusters()
    centroids = [coordinates[cluster].mean(axis=0) for cluster in clusters]

    return centroids
