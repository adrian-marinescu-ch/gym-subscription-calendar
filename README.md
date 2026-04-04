# Gym Subscription Calculator PWA

Static GitHub Pages-ready bundle for a gym subscription calculator with:

- fixed annual total = monthly price x 12
- variable cost per session from real eligible sessions
- editable weekday selection
- editable excluded date ranges
- cumulative payment thresholds and due dates
- CSV export
- ICS export
- local storage persistence
- shareable URL state
- installable PWA shell with offline support
- service worker update prompt

## Notes

- Relative asset paths are used so the bundle works on GitHub Pages project sites.
- URL sharing excludes language on purpose. Language stays local per browser.
- The default excluded ranges are prefilled for 2026 and remain editable.
- The app works as a static site. No backend is required.
