import cv2
import numpy as np
import PoseModule

cap = cv2.VideoCapture(1)

detector = PoseModule.poseDetector()
repCount = 0
direction = "down"

while True:
    ret, frame = cap.read()

    frame = detector.findPose(frame, False)
    landmarks = detector.findPosition(frame, False)
    
    if len(landmarks) != 0:
        LlegAngle = detector.findAngle(frame, 24, 26, 28)
        RlegAngle = detector.findAngle(frame, 23, 25, 27)

        #print(LlegAngle)

        # if direction == "up" and LlegAngle == 0:
        #     repCount += 0.5
        #     direction = "down"
        # if direction == "down" and LlegAngle == 0:
        #     repCount += 0.5
        #     direction = "up"
        
        # print(repCount)
        
    
    cv2.imshow("Squats Detector", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()