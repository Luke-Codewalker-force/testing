# [BUG-01] Main Navigation: "Amenities" link does not scroll to the corresponding section

## Environment

- **URL:** [https://automationintesting.online/](https://automationintesting.online/)
- **Browser:** Chrome 150.0 (64-bit)
- **OS:** macOS Tahoe v26
- **Device:** Macbook Pro

## Description

Clicking the "Amenities" link in the main navigation bar at the top of the page produces no reaction. The page does not scroll to the Amenities section, although the URL change occurs.

## Steps to Reproduce

1. Open the application at [https://automationintesting.online/](https://automationintesting.online/).
2. Locate the main navigation bar at the top of the page.
3. Click on the **Amenities** navigation link.

## Expected Result

The page should scroll down to the **Amenities** section.

## Actual Result

Apart from the URL update, nothing happens. The page remains at the current scroll position, and no action is triggered.

## Additional Info / Evidence

- **Console Errors:** None.
- **Network Tab:** No requests triggered upon click.
- **Element Inspection:** The `href` attribute on the Amenities link points to `#amenities`.

## Severity & Priority

- **Severity:** Low (Functional impact is minor - UI interaction is broken).
- **Priority:** Low (Does not block main user flows like booking or contact submission).
