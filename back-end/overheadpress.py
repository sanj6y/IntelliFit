import cv2
import numpy as np
import PoseModule
import tensorflow as tf

cap = cv2.VideoCapture('Videos/overhead-press.mp4')

detector = PoseModule.poseDetector()
repCount = 0
direction = "up"

while True:
    ret, frame = cap.read()
    #frame = cv2.flip(frame, 1)
    frame = detector.findPose(frame, False)
    landmarks = detector.findPosition(frame, False)

    if len(landmarks) != 0:
        RarmAngle = detector.findAngle(frame, 12, 14, 16)
        LarmAngle = detector.findAngle(frame, 11, 13, 15)

        if direction == "up" and (LarmAngle > 250 or RarmAngle > 250):
            repCount += 0.5
            direction = "down"
        if direction == "down" and (LarmAngle < 50 or RarmAngle < 50):
            repCount += 0.5
            direction = "up"

        print(repCount)

    cv2.imshow("Squats Detector", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()