import cv2
import numpy as np
import PoseModule

cap = cv2.VideoCapture(1)

detector = PoseModule.poseDetector()

repCount = 0
direction = "up"
accuracy = 0

def processJumpingJacks(cap, frame, repCount, direction, accuracy):
    ret, frame = cap.read()
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

        # percentage = np.interp(LarmAngle, (60, 130), (0, 100))

        if direction == "up" and LarmAngle < 110 and RarmAngle > 235:
            repCount += 0.5
            direction = "down"
            accuracy = (1 - abs(LarmAngle - 100) / 100)
        elif direction == "down" and LarmAngle > 170 and RarmAngle < 190:
            repCount += 0.5
            direction = "up"

        font = cv2.FONT_HERSHEY_SIMPLEX
        rep_count_text = f'Rep Count: {repCount}'
        accuracy_text = f'Accuracy: {accuracy}'
        cv2.putText(frame, rep_count_text, (10, 50), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, accuracy_text, (10, 100), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)

        return frame, repCount, direction, accuracy

        # print(repCount)
        # print(accuracy)

        # cv2.imshow("Jumping Jacks Detector", frame)

        # if cv2.waitKey(1) & 0xFF == ord('q'):
        #     break

# while True:
#     ret, frame = cap.read()
#     # frame = cv2.resize(frame, (1280, 720))
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

#         # percentage = np.interp(LarmAngle, (60, 130), (0, 100))

#         if direction == "up" and LarmAngle < 110 and RarmAngle > 235:
#             repCount += 0.5
#             direction = "down"
#             accuracy = (1 - abs(LarmAngle - 100) / 100)
#         elif direction == "down" and LarmAngle > 170 and RarmAngle < 190:
#             repCount += 0.5
#             direction = "up"

#         font = cv2.FONT_HERSHEY_SIMPLEX
#         rep_count_text = f'Rep Count: {repCount}'
#         accuracy_text = f'Accuracy: {round(accuracy, 2)}'
#         cv2.putText(frame, rep_count_text, (10, 50), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)
#         cv2.putText(frame, accuracy_text, (10, 100), font, 1.5, (0, 255, 0), 2, cv2.LINE_AA)

#         print(repCount)
#         print(accuracy)

#         cv2.imshow("Jumping Jacks Detector", frame)

#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break
