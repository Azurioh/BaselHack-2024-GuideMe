from ultralytics import YOLO

model = YOLO('yolov5su.pt')

# Train the model
model.train(data='./data.yaml', epochs=100, imgsz=640, batch=16)
