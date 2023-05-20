import cv2
import numpy as np
import PoseModule

cap = cv2.VideoCapture('Videos/plank.mp4')
print(cap.isOpened())

detector = PoseModule.poseDetector()

direction = "up"
accuracy = 0

def processPlank():
    global direction
    global accuracy
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        # frame = cv2.resize(frame, (1280, 720))
        frame = detector.findPose(frame, False)
        landmarks = detector.findPosition(frame, False)

        if len(landmarks) != 0:
            # Right Arm
            RarmAngle = detector.findAngle(frame, 12, 14, 16)
            # Left Arm
            LarmAngle = detector.findAngle(frame, 11, 13, 15)

            midAngle = detector.findAngle(frame, 12, 24, 26)
            body = detector.findAngle(frame, 11, 23, 25)
            body = detector.findAngle(frame, 11, 12, 24)
            body = detector.findAngle(frame, 23, 24, 26)

            # Right Leg
            RlegAngle = detector.findAngle(frame, 24, 26, 28)
            # Left Leg
            LlegAngle = detector.findAngle(frame, 23, 25, 27)
            
            accuracy = (1 - abs(midAngle - 190) / 100)

            font = cv2.FONT_HERSHEY_SIMPLEX
            accuracy_text = f'Accuracy: {accuracy}'
            cv2.putText(frame, accuracy_text, (10, 50), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)

            print(accuracy)

            cv2.imshow("Plank Detector", frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break


while True:
    ret, frame = cap.read()
    # frame = cv2.resize(frame, (1280, 720))
    frame = detector.findPose(frame, False)
    landmarks = detector.findPosition(frame, False)

    if len(landmarks) != 0:
        # Right Arm
        RarmAngle = detector.findAngle(frame, 12, 14, 16)
        # Left Arm
        LarmAngle = detector.findAngle(frame, 11, 13, 15)

        midAngle = detector.findAngle(frame, 12, 24, 26)
        body = detector.findAngle(frame, 11, 23, 25)
        body = detector.findAngle(frame, 11, 12, 24)
        body = detector.findAngle(frame, 23, 24, 26)

        # Right Leg
        RlegAngle = detector.findAngle(frame, 24, 26, 28)
        # Left Leg
        LlegAngle = detector.findAngle(frame, 23, 25, 27)
        
        accuracy = (1 - abs(midAngle - 190) / 100)

        font = cv2.FONT_HERSHEY_SIMPLEX
        accuracy_text = f'Accuracy: {round(accuracy, 2)}'
        cv2.putText(frame, accuracy_text, (10, 50), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)

        print(accuracy)

        cv2.imshow("Plank Detector", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break