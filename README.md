# NHAI SecureID

> Verify Anywhere. Trust Everywhere.

NHAI SecureID is an offline-first workforce identity verification platform built using React Native. The project was originally developed for NHAI Hackathon 7.0 and is being enhanced into a production-grade biometric authentication system designed for deployment in remote, low-connectivity environments.

---

## Overview

Field personnel working on highway construction and infrastructure projects often operate in areas where internet connectivity is unreliable or unavailable. Traditional cloud-dependent authentication systems become ineffective in such environments, leading to operational delays and identity verification challenges.

NHAI SecureID addresses this problem by providing a mobile-based offline verification workflow that enables workforce enrollment, identity validation, local record management, and synchronization once connectivity is restored.

---

## Key Features

### Offline-First Architecture

* Operates without active internet connectivity
* Designed for remote and zero-network zones
* Local-first verification workflow

### Workforce Enrollment

* Camera-based worker enrollment
* Unique worker ID generation
* Local registry management

### Identity Verification

* Camera-assisted verification workflow
* Verification logging and audit trail support
* Designed for future biometric matching integration

### Synchronization Center

* Offline queue management
* Sync status dashboard
* Designed for AWS Datalake integration

### Cross-Platform Deployment

* Android support
* iOS-ready architecture
* React Native codebase

---

## Current Implementation

The current prototype includes:

✅ React Native application architecture

✅ Android deployment pipeline

✅ Camera integration using Vision Camera

✅ Workforce enrollment workflow

✅ Worker registry management

✅ Verification workflow

✅ Synchronization dashboard

✅ Offline state management

✅ Navigation and multi-screen application structure

---

## System Architecture

```text
Camera
   │
   ▼
Workforce Enrollment
   │
   ▼
Local Identity Registry
   │
   ▼
Identity Verification
   │
   ▼
Pending Sync Queue
   │
   ▼
Synchronization Layer
   │
   ▼
NHAI Datalake Integration
```

---

## Technology Stack

### Mobile Application

* React Native
* TypeScript
* React Navigation
* React Native Vision Camera

### State Management

* React Context API
* Local application state

### Development Environment

* Android Studio
* Gradle
* Java 17
* React Native CLI

---

## In Progress

The following enhancements are currently being developed:

* Real-time face detection
* Facial embedding generation
* Liveness detection pipeline
* Secure biometric storage
* Performance optimization for mid-range devices

---

## Planned Enhancements

### Computer Vision

* BlazeFace face detection
* MobileFaceNet face recognition
* MediaPipe Face Mesh liveness verification

### Security

* AES-256 encrypted local storage
* Device-bound identity vault
* Secure synchronization workflow

### Cloud Integration

* AWS synchronization services
* Datalake 3.0 integration
* Sync-and-purge architecture

---

## Project Goals

* Enable workforce authentication in remote locations
* Reduce proxy attendance and identity fraud
* Support low-connectivity infrastructure projects
* Maintain privacy and security of workforce records
* Deliver a lightweight mobile-first solution

---

## Repository Structure

```text
android/
ios/
src/
 ├── screens/
 ├── navigation/
 ├── state/
 ├── ai/
 ├── native/
 ├── components/
 └── utils/

App.tsx
package.json
README.md
```

---

## Project Status

🚧 Active Development

NHAI SecureID currently provides a functional offline-first mobile workflow for enrollment, verification, and synchronization management. Advanced computer vision and biometric authentication modules are under active development.

---

## Author

**Rachna Mohapatra**

Built as part of NHAI Hackathon 7.0 and continued as an independent engineering project.

---

## License

This project is intended for educational, research, and portfolio purposes.
