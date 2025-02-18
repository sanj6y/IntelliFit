# 🏋️ IntelliFit  
**A Personalized AI-Powered Fitness Assistant**  

## 🚀 Inspiration  
With so many unhealthy choices in daily life, we wanted to create a **dedicated fitness platform** that provides **personalized workouts**, making it easier for people to stay healthy and active.  

## 🎯 What It Does  
IntelliFit helps users **track their fitness progress** and **improve workout form** through AI-driven pose estimation. Features include:  
✅ **User Accounts** – Track fitness progress over time.  
✅ **Workout Selection** – Choose from predefined workouts or **create custom workouts** to fit personal goals.  
✅ **AI-Powered Pose Estimation** – Uses computer vision to overlay **real-time posture corrections** on the user's figure.  
✅ **Repetition Counter & Form Accuracy Score** – Automatically detects and counts reps while assessing exercise form.  

## 🛠️ Technologies Used  

### **Frontend (React.js & Firebase)**  
- **React.js** – A JavaScript framework for building dynamic web applications.  
- **Firebase** – Used for **user authentication** and **storing workout data**.  
- **CSS (Styled Components / Tailwind CSS)** – Enhances the UI with a modern, responsive design.  

### **Backend (Python & Mediapipe)**  
- **Python** – Powers the backend logic for AI-driven pose estimation.  
- **MediaPipe** – A **Google library for real-time pose estimation**, enabling workout tracking and posture correction.  
- **Flask** – Handles API communication between the frontend and backend.  

### **Computer Vision & AI**  
- **OpenCV** – Used for processing real-time images and enhancing pose tracking.  
- **Custom AI Model Training** – Each exercise is individually calibrated for accurate posture correction.  

## ⚡ Challenges We Faced  
- **Integrating Frontend & Backend** – Handling **image transmission** between React and Python while ensuring real-time feedback.  
- **Calibrating the AI Model** – Each exercise required separate **fine-tuning** for accurate **pose estimation** and rep counting.  

## 🎯 Accomplishments We're Proud Of  
- Successfully **implemented AI-powered pose estimation** to assist with real-time form correction.  
- Built a **fully functional fitness tracking platform** with **personalized workout creation**.  
- Overcame technical difficulties in **frontend-backend communication** to enable smooth user interactions.  

## 📚 What We Learned  
- The **complexity of real-time image processing** and **computer vision-based pose estimation**.  
- How challenging **frontend-backend integration** can be, especially when dealing with **real-time data transmission**.  
- Fine-tuning AI models for **different exercise types** is more complex than expected but essential for accuracy.  

## 🔮 Future Improvements  
- **Enhancing Pose Estimation** – Improve AI accuracy for better **form correction** and **more reliable rep counting**.  
- **Adding More Exercises** – Expand the exercise library to cover **more complex workout routines**.  
- **Optimizing API Communication** – Improve efficiency in **sending workout images** between the frontend and backend.  

## 🏁 Getting Started  

### Prerequisites  
- **Node.js** and **npm** installed for frontend development.  
- **Python 3.x** installed for backend development.  
- **Firebase Account** for managing user authentication and workout data.  

### Installation  

1. Clone the repository:  
   ```sh
   git clone https://github.com/sanj6y/IntelliFit.git
   cd IntelliFit
