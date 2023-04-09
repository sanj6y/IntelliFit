import cv2
import numpy as np
import PoseModule

cap = cv2.VideoCapture(0)

detector = PoseModule.poseDetector()
repCount = 0
direction = "down"
accuracy = "N/A"

def processSquats():
    global direction
    global repCount
    global accuracy
    cap = cv2.VideoCapture(0)
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
                accuracy = (1 - abs(RlegAngle - 90) / 100)

            font = cv2.FONT_HERSHEY_SIMPLEX
            rep_count_text = f'Rep Count: {repCount}'
            accuracy_text = f'Accuracy: {accuracy}'
            cv2.putText(frame, rep_count_text, (10, 50), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)
            cv2.putText(frame, accuracy_text, (10, 100), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)
            
            print(repCount)
            print(accuracy)
            
        cv2.imshow("Squats Detector", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

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
            accuracy = (1 - abs(RlegAngle - 90) / 100)

        font = cv2.FONT_HERSHEY_SIMPLEX
        rep_count_text = f'Rep Count: {repCount}'
        accuracy_text = f'Accuracy: {round(accuracy, 2)}'
        cv2.putText(frame, rep_count_text, (10, 50), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, accuracy_text, (10, 100), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)
        
        print(repCount)
        print(accuracy)
        
    
    cv2.imshow("Squats Detector", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
