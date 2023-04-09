import cv2
import numpy as np
import PoseModule

cap = cv2.VideoCapture('Videos/curls.mov')

detector = PoseModule.poseDetector()
repCount = 0
direction = "up"
accuracy = "N/A"

while True:
    ret, frame = cap.read()
    frame = detector.findPose(frame, False)
    landmarks = detector.findPosition(frame, False)

    if len(landmarks) != 0:
        RarmAngle = detector.findAngle(frame, 12, 14, 16)
        LarmAngle = detector.findAngle(frame, 11, 13, 15)

        if direction == "up" and (LarmAngle < 50 or RarmAngle < 50):
            repCount += 0.5
            direction = "down"
            accuracy = (1 - abs(RarmAngle - 40) / 100)
        if direction == "down" and (LarmAngle > 130 or RarmAngle > 130):
            repCount += 0.5
            direction = "up"
            

        print(repCount)
        print(accuracy)

    cv2.imshow("Curls Detector", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()