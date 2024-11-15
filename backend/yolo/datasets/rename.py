import os

# カテゴリごとのカウンタを初期化
count_bottle = 1
count_paper = 1
count_plastic = 1
count_can = 1

# 処理対象の画像ファイル拡張子
image_extensions = [
    ".jpg",
    ".jpeg",
    ".JPG",
    ".JPEG",
    ".jpe",
    ".jfif",
    ".pjpeg",
    ".pjp",
    ".png",
]

# カレントディレクトリ内のすべてのファイルをループ
for filename in os.listdir():
    # 画像ファイルの拡張子をチェック
    if any(filename.endswith(ext) for ext in image_extensions):
        # 対応するアノテーションファイル名を取得
        annotation_file = f"{os.path.splitext(filename)[0]}.txt"

        # アノテーションファイルが存在する場合のみ処理
        if os.path.isfile(annotation_file):
            # アノテーションファイルの最初の文字を取得
            with open(annotation_file, "r") as f:
                first_char = f.read(1)

            # カテゴリに応じてファイル名を決定
            if first_char == "0":
                new_image_name = f"bottle_{count_bottle}{os.path.splitext(filename)[1]}"
                new_annotation_name = f"bottle_{count_bottle}.txt"
                count_bottle += 1
            elif first_char == "1":
                new_image_name = f"paper_{count_paper}{os.path.splitext(filename)[1]}"
                new_annotation_name = f"paper_{count_paper}.txt"
                count_paper += 1
            elif first_char == "2":
                new_image_name = (
                    f"plastic_{count_plastic}{os.path.splitext(filename)[1]}"
                )
                new_annotation_name = f"plastic_{count_plastic}.txt"
                count_plastic += 1
            elif first_char == "3":
                new_image_name = f"can_{count_can}{os.path.splitext(filename)[1]}"
                new_annotation_name = f"can_{count_can}.txt"
                count_can += 1
            else:
                print(f"未知のカテゴリ: {first_char} ({filename})")
                continue

            # ファイルのリネーム
            os.rename(filename, new_image_name)
            os.rename(annotation_file, new_annotation_name)

print("リネームが完了しました。")
