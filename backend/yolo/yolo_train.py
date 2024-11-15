from ultralytics import YOLO

model = YOLO("yolo11l.pt")

results = model.train(data="backend/yolo/datasets.yml", epochs=200)

metrics = model.val()
