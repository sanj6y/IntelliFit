import cv2
import numpy as np
import PoseModule

cap = cv2.VideoCapture('jumping-jacks.mp4')

detector = PoseModule.poseDetector()

repCount = 0
direction = "up"

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

        # Right Leg
        RlegAngle = detector.findAngle(frame, 24, 26, 28)
        # Left Leg
        LlegAngle = detector.findAngle(frame, 23, 25, 27)

        # percentage = np.interp(LarmAngle, (60, 130), (0, 100))

        if direction == "up" and LarmAngle < 110 and RarmAngle > 235 and LlegAngle < 182.5 and RlegAngle > 190.5:
            repCount += 0.5
            direction = "down"
        elif direction == "down" and LarmAngle > 170 and RarmAngle < 190 and LlegAngle > 171.5 and RlegAngle < 179.5:
            repCount += 0.5
            direction = "up"
        
        print(repCount)


        cv2.imshow("Jumping Jacks Detector", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break