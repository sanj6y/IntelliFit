import cv2
import numpy as np
import PoseModule
import tensorflow as tf


# json_file_path = 'model.json'
# with open(json_file_path, "r") as json_file:
#     json_savedModel= json_file.read()
# model_json = tf.keras.models.model_from_json(json_savedModel)
# model_json = tf.keras.models.load_weight
# model_json.save("model.h5", save_format="hf")

cap = cv2.VideoCapture('Videos/curls.mov')

detector = PoseModule.poseDetector(1)
repCount = 0
direction = "up"
model = tf.keras.models.load_model('model.json')

while True:
    ret, frame = cap.read()
    frame = cv2.flip(frame, 1)
    frame = detector.findPose(frame, False)
    landmarks = detector.findPosition(frame, False)

    if len(landmarks) != 0:
        RarmAngle = detector.findAngle(frame, 12, 14, 16)
        LarmAngle = detector.findAngle(frame, 11, 13, 15)

        if direction == "up" and (LarmAngle < 50 or RarmAngle < 50):
            repCount += 0.5
            direction = "down"
        if direction == "down" and (LarmAngle > 130 or RarmAngle > 130):
            repCount += 0.5
            direction = "up"

        print(repCount)

    cv2.imshow("Squats Detector", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()