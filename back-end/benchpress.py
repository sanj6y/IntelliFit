import cv2
import numpy as np
import PoseModule

cap = cv2.VideoCapture('Videos/benchpress.mp4')

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
        disp = detector.findAngle(frame, 11, 12, 14)
        disp = detector.findAngle(frame, 12, 11, 13)

        if direction == "up" and (LarmAngle > 250 or RarmAngle > 250):
            repCount += 0.5
            direction = "down"
        if direction == "down" and (LarmAngle < 50 or RarmAngle < 50):
            repCount += 0.5
            direction = "up"
            accuracy = (1 - abs(RarmAngle - 90) / 100)

        print(repCount)
        print(accuracy)

    cv2.imshow("Bench Press Detector", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()