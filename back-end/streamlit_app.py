import streamlit as st
import cv2
import numpy as np
import time
import PoseModule as pm
from curls import processCurls
from dips import processDips
from jumpingjacks import processJumpingJacks
# from lunges import processLunges
# from plank import processPlank
# from pullups import processPullups
# from pushups import processPushups
# from situps import processSitups
# from squats import processSquats

detector = pm.poseDetector()
st.title("Webcam Live Feed")
run = st.checkbox('Run')
FRAME_WINDOW = st.image([])
option = st.selectbox(
     'Exercise',
     ('Curls', 'Dips', 'Jumping Jacks', 'Lunges', 'Planks', 'Pull-ups', 'Push-ups', 'Sit-ups', 'Squats'))
st.write('You selected:', option)

cap = cv2.VideoCapture(1)

global curlsCount
global curlsDir
global curlsAcc
curlsCount = 0
curlsDir = "up"
curlsAcc = 0

global dipsCount
global dipsDir
global dipsAcc
dipsCount = 0
dipsDir = "up"
dipsAcc = 0

global jumpingJacksCount
global jumpingJacksDir
global jumpingJacksAcc
jumpingJacksCount = 0
jumpingJacksDir = "up"
jumpingJacksAcc = 0

while run:
    ret, frame = cap.read()
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    frame = detector.findPose(frame, False)
    landmarks = detector.findPosition(frame, False)

    if len(landmarks) != 0:
        if option == 'Curls':
            frame, curlsCount, curlsDir, curlsAcc = processCurls(cap, frame, curlsCount, curlsDir, curlsAcc)
        elif option == 'Dips':
            frame, dipsCount, dipsDir, dipsAcc = processDips(cap, frame, dipsCount, dipsDir, dipsAcc)
        elif option == 'Jumping Jacks':
            frame, jumpingJacksCount, jumpingJacksDir, jumpingJacksAcc = processJumpingJacks(cap, frame, jumpingJacksCount, jumpingJacksDir, jumpingJacksAcc)
        # elif option == 'Lunges':
        #     processLunges()
        # elif option == 'Planks':
        #     processPlank()
        # elif option == 'Pull-ups':
        #     processPullups()
        # elif option == 'Push-ups':
        #     processPushups()
        # elif option == 'Sit-ups':
        #     processSitups()
        # elif option == 'Squats':
        #     processSquats()

    FRAME_WINDOW.image(frame)

else:
    st.write('Stopped')