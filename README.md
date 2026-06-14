# NHAI SecureID
Offline Workforce Identity Verification Platform for NHAI Hackathon 7.0🚀

> Verify Anywhere. Trust Everywhere.

NHAI SecureID is a mobile-first offline workforce identity verification platform built using React Native. The project was originally developed for NHAI Hackathon 7.0 and is being evolved into a production-grade biometric authentication system capable of operating in remote, zero-network environments.

---

## Problem Statement

Field personnel working on highway construction and infrastructure projects often operate in locations with unreliable or no internet connectivity.

Traditional attendance and identity verification systems rely on cloud connectivity, making them unsuitable for remote deployment. This creates challenges such as:

* Proxy attendance
* Identity fraud
* Delayed verification
* Lack of auditability
* Dependence on continuous internet access

NHAI SecureID aims to provide secure, offline-first identity verification while maintaining privacy, scalability, and ease of deployment.

---

## Current Prototype Features

### Implemented

* React Native cross-platform architecture
* Android deployment pipeline
* Camera integration using Vision Camera
* Workforce enrollment workflow
* Worker ID generation
* Local worker registry
* Identity verification workflow
* Sync dashboard
* Offline-first application flow
* State-managed worker records and verification logs

### Screens

* Home Dashboard
* Workforce Enrollment
* Identity Verification
* Synchronization Center

---

## Planned AI Pipeline

The long-term architecture is designed around lightweight edge AI models.

### Face Detection

**BlazeFace**

* Fast mobile face detection
* Optimized for low-power devices
* Small model footprint

### Face Recognition

**MobileFaceNet**

* Lightweight facial embedding generation
* Suitable for on-device inference
* Designed for real-time recognition

### Liveness Detection

**MediaPipe Face Mesh**

* Blink detection
* Head movement analysis
* Basic anti-spoofing protection

---

## System Architecture

```text
Camera
   │
   ▼
Enrollment
   │
   ▼
Local Identity Registry
   │
   ▼
Offline Verification
   │
   ▼
Pending Sync Queue
   │
   ▼
AWS Synchronization Layer
   │
   ▼
Datalake 3.0 Integration
```

---

## Technology Stack

### Mobile

* React Native
* TypeScript
* React Navigation
* React Native Vision Camera

### Planned AI Stack

* TensorFlow Lite
* BlazeFace
* MobileFaceNet
* MediaPipe Face Mesh

### Backend (Planned)

* AWS API Gateway
* AWS Lambda
* DynamoDB
* Amazon S3

### Storage

* Local State Management
* SQLite (planned)
* SQLCipher (planned)

---

## Security Roadmap

The production version is planned to include:

* AES-256 encrypted local storage
* Secure key management
* Device-bound authentication
* Offline identity vault
* Sync-and-purge architecture
* Zero-knowledge biometric design

---

## Development Roadmap

### In Progress

- BlazeFace integration
- MobileFaceNet embedding generation
- MediaPipe liveness detection

### Planned

- AWS synchronization
- SQLCipher encrypted storage
- Device-bound identity vault
- Production deployment optimization

---

## Project Status

🚧 Active Development

Current repository represents a working offline-first prototype with enrollment, verification, and synchronization workflows. Advanced biometric recognition and liveness detection modules are under development.

---

## Author

**Rachna Mohapatra**

React Native • AI/ML • Computer Vision

---

## License

This project is currently released for educational and research purposes.
