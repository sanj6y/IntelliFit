import cv2
import numpy as np
import PoseModule
import time

cap = cv2.VideoCapture('Videos/curls.mov')

detector = PoseModule.poseDetector()
repCount = 0
direction = "up"
accuracy = "N/A"

def processCurls(frame):
    global repCount
    global direction
    global accuracy
    
    # frame = detector.findPose(frame, False)
    landmarks = detector.findPosition(frame, False)

    if len(landmarks) != 0:
        RarmAngle = detector.findAngle(frame, 12, 14, 16)
        LarmAngle = detector.findAngle(frame, 11, 13, 15)

        if direction == "up" and (LarmAngle < 50 or RarmAngle < 50):
            repCount += 0.5
            direction = "down"
            accuracy = (1 - abs(RarmAngle - 41) / 100)
        if direction == "down" and (LarmAngle > 130 or RarmAngle > 130):
            repCount += 0.5
            direction = "up"
        
        font = cv2.FONT_HERSHEY_SIMPLEX
        rep_count_text = f'Rep Count: {repCount}'
        accuracy_text = f'Accuracy: {round(accuracy, 2)}'
        cv2.putText(frame, rep_count_text, (10, 50), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, accuracy_text, (10, 100), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)  

        print(repCount)
        print(accuracy)

        return frame

        #if cv2.waitKey(1) & 0xFF == ord('q'):
        #    break



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
            accuracy = (1 - abs(RarmAngle - 41) / 100)
        if direction == "down" and (LarmAngle > 130 or RarmAngle > 130):
            repCount += 0.5
            direction = "up"
        
        font = cv2.FONT_HERSHEY_SIMPLEX
        rep_count_text = f'Rep Count: {repCount}'
        accuracy_text = f'Accuracy: {accuracy}'
        cv2.putText(frame, rep_count_text, (10, 50), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, accuracy_text, (10, 100), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)  

        print(repCount)
        print(accuracy)

    cv2.imshow("Curls Detector", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()