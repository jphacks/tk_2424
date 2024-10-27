import os

import torch
import torch.nn as nn
import torchvision.models as models
from torchvision import transforms
from torchvision.models import ResNet50_Weights


model_path = os.path.join(os.path.dirname(__file__), "./output/model.pth")
classes_list = [
    "battery",
    "biological",
    "cardboard",
    "clothes",
    "glass",
    "metal",
    "not-garbage",
    "paper",
    "plastic",
    "plasticbottle",
    "shoes",
    "trash",
]
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# ResNetモデルの定義
class ResNet(nn.Module):
    def __init__(self, num_classes):
        super(ResNet, self).__init__()
        self.network = models.resnet50(weights=ResNet50_Weights.DEFAULT)
        num_ftrs = self.network.fc.in_features
        self.network.fc = nn.Linear(num_ftrs, num_classes)

    def forward(self, xb):
        return torch.sigmoid(self.network(xb))


# モデルを読み込む関数
def load_model(model_path, num_classes, device):
    model = ResNet(num_classes)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()  # 評価モードに設定
    print(f"Model loaded from {model_path}")
    return model


# 画像を分類する関数
def predict_image(img_pil, model, classes, device):
    # 画像の前処理
    transformations = transforms.Compose(
        [
            transforms.Resize((256, 256)),
            transforms.ToTensor(),
        ]
    )

    # img = Image.open(img_path).convert("RGB")
    img_tensor = transformations(img_pil).unsqueeze(0).to(device)

    model.eval()
    with torch.no_grad():
        preds = model(img_tensor)
        _, predicted_class = torch.max(preds, dim=1)

    return classes[predicted_class.item()]


if __name__ == "__main__":
    # 予測する画像のパス
    model = load_model(model_path, num_classes=12, device=device)
    img_path = "test.jpg"

    predicted_class = predict_image(img_path, model, classes_list, device)
    print(f"Predicted class: {predicted_class}")
