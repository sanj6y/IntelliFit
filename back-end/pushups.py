import cv2
import numpy as np
import PoseModule
from PIL import Image

cap = cv2.VideoCapture('Videos/pushups.mp4')

detector = PoseModule.poseDetector()

repCount = 0
# direction = "up"
accuracy = "N/A"

def predict(filepath, direction):
    frame = cv2.imread(filepath)
    frame = detector.findPose(frame, False)
    landmarks = detector.findPosition(frame, False)

    if len(landmarks) != 0:
        # Right Arm
        RarmAngle = detector.findAngle(frame, 12, 14, 16)
        # Left Arm
        LarmAngle = detector.findAngle(frame, 11, 13, 15)

        body = detector.findAngle(frame, 12, 24, 26)
        body = detector.findAngle(frame, 11, 23, 25)
        body = detector.findAngle(frame, 11, 12, 24)
        body = detector.findAngle(frame, 23, 24, 26)

        # Right Leg
        RlegAngle = detector.findAngle(frame, 24, 26, 28)
        # Left Leg
        LlegAngle = detector.findAngle(frame, 23, 25, 27)

        if direction == "up" and LarmAngle > 275:
            repCount += 0.5
            direction = "down"
        elif direction == "down" and LarmAngle < 208:
            repCount += 0.5
            direction = "up"
            accuracy = (1 - abs(body - 50) / 100)

        return [frame, repCount, accuracy, direction]

# while True:
#     ret, frame = cap.read()
#     frame = detector.findPose(frame, False)
#     landmarks = detector.findPosition(frame, False)

#     if len(landmarks) != 0:
#         # Right Arm
#         RarmAngle = detector.findAngle(frame, 12, 14, 16)
#         # Left Arm
#         LarmAngle = detector.findAngle(frame, 11, 13, 15)

#         body = detector.findAngle(frame, 12, 24, 26)
#         body = detector.findAngle(frame, 11, 23, 25)
#         body = detector.findAngle(frame, 11, 12, 24)
#         body = detector.findAngle(frame, 23, 24, 26)

#         # Right Leg
#         RlegAngle = detector.findAngle(frame, 24, 26, 28)
#         # Left Leg
#         LlegAngle = detector.findAngle(frame, 23, 25, 27)

#         if direction == "up" and LarmAngle > 275:
#             repCount += 0.5
#             direction = "down"
#         elif direction == "down" and LarmAngle < 208:
#             repCount += 0.5
#             direction = "up"
#             accuracy = (1 - abs(body - 50) / 100)
        
#         print(repCount)
#         print(accuracy)

#         cv2.imshow("Pushups Detector", frame)

#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break