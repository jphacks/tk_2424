from ultralytics import YOLO
import torch

model = YOLO("backend/model/output/yolo11l.pt")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model.to(device)


def detect_bottle(image_binary):
    image_tensor = torch.from_numpy(image_binary).to(device)
    results = model(image_tensor)
    for result in results:
        for box in result.boxes:
            label = model.names[int(box.cls)]
            if label == "bottle":
                print("Bottle detected!")
                return True
    return False


results = model("/home/dai/tk_2424/backend/model/test.jpg")

for result in results:
    for box in result.boxes:
        label = model.names[int(box.cls)]
        if label == "bottle":
            print("Bottle detected!")

