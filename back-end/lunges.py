import cv2
import numpy as np
import PoseModule

cap = cv2.VideoCapture('Videos/lunges.mp4')

detector = PoseModule.poseDetector()

repCount = 0
side = "left"
accuracy = "N/A"

def processLunges():
    global repCount
    global side
    global accuracy
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        frame = cv2.flip(frame, 1)
        
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

            if side == "left" and LlegAngle < 55 and RlegAngle < 130:
                repCount += 1
                side = "right"
                accuracy = (1 - abs(LlegAngle - 60) / 100)
            elif side == "right" and LlegAngle < 130 and RlegAngle < 110:
                repCount += 1
                side = "left"
                accuracy = (1 - abs(RlegAngle - 90) / 100)

            font = cv2.FONT_HERSHEY_SIMPLEX
            rep_count_text = f'Rep Count: {repCount}'
            accuracy_text = f'Accuracy: {round(accuracy, 2)}'
            cv2.putText(frame, rep_count_text, (10, 50), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)
            cv2.putText(frame, accuracy_text, (10, 100), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)
            
            print(repCount)
            print(accuracy)

            cv2.imshow("Lunges Detector", frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

# while True:
#     ret, frame = cap.read()
#     frame = cv2.flip(frame, 1)
    
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

#         if side == "left" and LlegAngle < 55 and RlegAngle < 130:
#             repCount += 1
#             side = "right"
#             accuracy = (1 - abs(LlegAngle - 60) / 100)
#         elif side == "right" and LlegAngle < 130 and RlegAngle < 110:
#             repCount += 1
#             side = "left"
#             accuracy = (1 - abs(RlegAngle - 90) / 100)

#         font = cv2.FONT_HERSHEY_SIMPLEX
#         rep_count_text = f'Rep Count: {repCount}'
#         accuracy_text = f'Accuracy: {accuracy}'
#         cv2.putText(frame, rep_count_text, (10, 50), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)
#         cv2.putText(frame, accuracy_text, (10, 100), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)
        
#         print(repCount)
#         print(accuracy)

#         cv2.imshow("Lunges Detector", frame)

#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break