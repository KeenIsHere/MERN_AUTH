# JournalGuardian

JournalGuardian is a desktop-first .NET MAUI Blazor Hybrid application that guides a single user through mindful, secure journaling. Each calendar day allows one Markdown entry enriched with moods, tags, categories, analytics, and export options.

## Feature Highlights
- Single-entry-per-day enforcement with Markdown editor, preview, and custom tag creation.
- Rich metadata: primary + secondary moods, categories, and reusable tags.
- Timeline filters for keyword, date range, moods, and tags with pagination.
- Calendar drill-in navigation and dashboard analytics (streaks, mood split, tags, sparkline word trend).
- PIN-gated lock screen backed by SecureStorage and salted hashing.
- Theme persistence (light/dark), QuestPDF export, and settings for security + backups.

## Architecture Snapshot
- **Blazor UI**: Razor pages/components under `Components/` drive dashboard, calendar, entries, editor, settings, and lock screen.
- **State**: `State/SessionState` locks the shell, while `State/ThemeState` keeps theme toggles in sync.
- **Services**: `Services/` contains database abstractions (entries, metadata, analytics, security, preferences, export) accessed via dependency injection configured in `MauiProgram.cs`.
- **Data Layer**: `Data/AppDatabase` wires SQLite tables (seeded moods/tags/categories) using `sqlite-net-pcl`.
- **Models**: `Models/` houses entities, DTOs, analytics records, and filter helpers shared across services and UI.

## Getting Started
### Prerequisites
1. .NET 8.0 SDK + MAUI workloads:
   ```bash
   dotnet workload install maui
   ```
2. Android SDK + emulator images (for `net10.0-android`). Set `AndroidSdkDirectory` if installed outside default path.
3. Xcode 15.3+ with iOS/MacCatalyst tooling (current .NET bundles require Xcode 15.3+ per build logs).
4. QuestPDF Community license acceptance (already configured via `QuestPDF.Settings.License = LicenseType.Community`).

### Restore & Build
```bash
cd /path/to/Final
dotnet workload restore
dotnet build
```
> **Note:** Current build logs on this machine report missing Android SDKs and an outdated Xcode (26.0.1). Install the required workloads/SDKs or target a platform available on your machine before rebuilding.

## Running & Debugging
1. Decide on target (`net10.0-android`, `net10.0-ios`, `net10.0-maccatalyst`, or `net10.0-windows10.0.19041.0`).
2. From VS Code, choose **Run > Start Debugging**, pick the MAUI target, and confirm when prompted (per `.github/copilot-instructions`).
3. Alternatively, use CLI: `dotnet build -t:Run -f net10.0-maccatalyst` (requires matching Xcode) or `dotnet build -t:Run -f net10.0-android` once the Android SDK is installed.
4. Unlock the app with an existing PIN or create one on first launch, then explore dashboard, calendar, timeline, editor, and settings.

## Manual Test Matrix
- **Security Gate**: Lock screen denies incorrect PINs, resets input, and unlocks on success.
- **Journal CRUD**: Editor enforces single entry per day, validates title/content/mood, calculates word count, and updates timeline + calendar markers.
- **Metadata Chips**: Tag/mood chips toggle selection with secondary mood cap at two entries.
- **Timeline Filters**: Verify keyword search, mood/tag filters, pagination, and navigation to editor via "Open".
- **Dashboard Analytics**: Confirm stat cards, mood distribution bars, streak chip list, and sparkline update after new entries.
- **Export**: Settings page exports a PDF for a valid date range using QuestPDF (file saved to `FileSystem.AppDataDirectory`).
- **Theme Preference**: Light/dark selection persists across sessions using `IPreferenceService`.

## Additional Notes
- Project guidance and planning artifacts live under `docs/ProjectPlan.md`.
- To regenerate seeded moods/tags/categories, delete the SQLite DB under `FileSystem.AppDataDirectory` and relaunch.
- For PDF exports on desktop, open the resulting file via Finder/Explorer after the success toast.
- Report build blockers such as missing Android SDKs or mismatched Xcode versions in your environment summary when requesting help.
