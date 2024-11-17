from ultralytics import YOLO
from PIL import Image
import io
import json
import torch

model = YOLO("yolo/model/best.pt")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model.to(device)


def predict_objects(image_binary):
    """this is a function that predicts objects in an image

    Parameters
    ----------
    image_binary : binary
        image binary data

    Returns
    -------
    list[json]
        list of detected objects in the image
    """
    image = Image.open(io.BytesIO(image_binary))
    results = model(image, save=True)
    detections = []
    with open("/app/yolo/classes.txt", "r") as f:
        class_names = f.read().strip().split("\n")
    for result in results:
        for box in result.boxes:
            detections.append(
                {"name": class_names[int(box.cls.item())], "score": box.conf.item()}
            )
    detections.sort(key=lambda x: x["score"], reverse=True)
    return detections
