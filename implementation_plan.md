# Next Module: QR Code Check-In Scanner (Kiosk Mode)

Since you requested the next module automatically, I have identified a critical missing piece of the physical gym experience: **The actual QR Code Scanner for Staff.**

Previously, we built a manual "Enter Phone Number" fallback for emulator testing. Now, we will implement the full hardware camera integration so Staff can use a physical device (tablet or phone) mounted at the front desk to scan incoming members.

> [!IMPORTANT]
> **User Review Required**: Please review this automated module proposal. Once approved, I will implement the camera integration and feedback mechanisms.

---

## 1. Hardware Integration (Expo Camera)

We will install `expo-camera` to interface with the device's optical sensors.
*   **Permissions**: The app will automatically request Camera permissions on launch of the Kiosk screen.
*   **Barcode Scanning**: We will utilize the camera's native barcode scanning capabilities to instantly read the UUID embedded in the Member's Profile QR code.

## 2. Sensory Feedback (Haptics & Audio)

To provide a premium hardware feel at the front desk, we will install `expo-haptics` and `expo-av`.
*   **Success**: When a valid active member is scanned, the device will play a pleasant "Success Chime" and trigger a light haptic vibration.
*   **Failure/Expired**: If an expired member is scanned, the device will play a "Warning Buzzer" and trigger a heavy haptic vibration, alerting the staff to stop the member.

## 3. UI/UX: `StaffKioskScreen`

I will build a dedicated, full-screen `StaffKioskScreen.tsx` designed to be left open all day at the front desk.
*   **Camera Viewfinder**: A full-screen camera preview with a targeting overlay in the center.
*   **Live Status Banner**: The top of the screen will flash green with the Member's Name if the scan succeeds, or red if the scan fails, then automatically reset after 3 seconds for the next scan.
*   **Mutation Hookup**: It will directly wire into the existing `useLogAttendance` React Query mutation we built previously.

## Open Questions
1.  **Module Approval**: Do you approve of building the Kiosk Scanner module next?

Please review and approve so I can begin execution!
