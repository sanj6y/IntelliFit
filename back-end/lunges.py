import cv2
import numpy as np
import PoseModule

cap = cv2.VideoCapture('Videos/lunges.mp4')

detector = PoseModule.poseDetector()

repCount = 0
direction = "up"
side = "left"

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

        body = detector.findAngle(frame, 12, 24, 26)
        body = detector.findAngle(frame, 11, 23, 25)
        body = detector.findAngle(frame, 11, 12, 24)
        body = detector.findAngle(frame, 23, 24, 26)

        # Right Leg
        RlegAngle = detector.findAngle(frame, 24, 26, 28)
        # Left Leg
        LlegAngle = detector.findAngle(frame, 23, 25, 27)

        # percentage = np.interp(LarmAngle, (60, 130), (0, 100))

        if side == "left" and direction == "down" and LlegAngle > 170 and RlegAngle > 170:
            repCount += 0.5
            direction = "up"
            side = "left"
        elif side == "left" and direction == "up" and LlegAngle < 90 and RlegAngle < 90:
            repCount += 0.5
            direction = "down"
            side = "right"
        elif side == "right" and direction == "down" and LlegAngle > 170 and RlegAngle > 170:
            repCount += 0.5
            direction = "up"
            side = "left"
        elif side == "right" and direction == "up" and LlegAngle < 90 and RlegAngle < 90:
            repCount += 0.5
            direction = "down"
            side = "left"
        
        print(repCount)


        cv2.imshow("Lunges Detector", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break