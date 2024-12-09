# YTL Digital Banking Interview Project

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Installation Steps

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Start the application:

```bash
npm dev
# or
yarn dev
```

3. Install Expo Go on your mobile device:

   - For iOS: [Download from App Store](https://apps.apple.com/app/expo-go/id982107779)
   - For Android: [Download from Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

4. After starting the application, scan the QR code displayed in your terminal using:
   - iOS: Camera app
   - Android: Expo Go app

### Brief Explanation

#### Design Decisions

1. **State Management**: Implemented Zustand for efficient global state management:

   - Reduces prop drilling
   - Optimizes rendering performance
   - Simplifies state persistence

2. **Form Handling**: Chose React Hook Form for robust form management:

   - Good error handling & validation
   - Efficient form submission(less rerender vs formik)
   - Simpler to implement compared to usestate which will be complex and alot more lines of code
   - Improved developer experience

3. **Navigation**: Utilized Expo Router for navigation:
   - Built-in routing capabilities
   - Seamless integration with Expo
   - Type-safe navigation

#### Challenges Faced

1. **Dark Mode**: Time constraints prevented implementing dark mode text handling

2. **Testing Limitations**:

   - No physical Android device available for testing
   - Limited biometric testing due to non-functional iPhone Face ID

3. **Technical Hurdles**:

   - First implementation of localAuthentication
   - Limited ability to verify biometric authentication flow

## Demo Video

[View Demo Video](https://github.com/mohamedariff/iv-ytl-digital-banking/tree/main/assets/video/demo.mp4)
