import cv2
import numpy as np
import tensorflow as tf
import PoseModule

cap = cv2.VideoCapture('Videos/squats.mp4')

detector = PoseModule.poseDetector()
repCount = 0
direction = "down"

while True:
    ret, frame = cap.read()

    frame = detector.findPose(frame, False)
    landmarks = detector.findPosition(frame, False)
    
    if len(landmarks) != 0:
        RarmAngle = detector.findAngle(frame, 12, 14, 16)
        body = detector.findAngle(frame, 12, 24, 26)
        body = detector.findAngle(frame, 11, 23, 25)
        body = detector.findAngle(frame, 11, 12, 24)
        body = detector.findAngle(frame, 23, 24, 26)
        LarmAngle = detector.findAngle(frame, 11, 13, 15)
        LlegAngle = detector.findAngle(frame, 24, 26, 28)
        RlegAngle = detector.findAngle(frame, 23, 25, 27)

        if direction == "up" and (LlegAngle > 170 or RlegAngle > 170):
            repCount += 0.5
            direction = "down"
        if direction == "down" and (LlegAngle < 82 or RlegAngle < 60):
            repCount += 0.5
            direction = "up"
        
        print(repCount)
        
    
    cv2.imshow("Squats Detector", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()