# Troubleshooting Report: Expo Start Errors

## 1. What was happening

Initially, when you ran `npx expo start --clear`, the Metro bundler threw an error:
```
Error: UNKNOWN: unknown error, lstat 'L:\AppHBN\node_modules\asap\browser-raw.js'
```
Along with multiple warnings about being unable to read contents of folders inside `node_modules`.

This is a classic **Windows File System Lock** issue. It means that processes (often zombie Node.js processes, Windows Defender, or cloud syncing apps like OneDrive) were actively holding locks on files inside your `node_modules` and global package caches. Because the files were locked, the Metro bundler couldn't read them and crashed.

Later, after some cleanup attempts, you saw a new error:
```
ExpoMetroConfig.loadAsync is not a function
```
This new error occurs because the `node_modules` installation was interrupted or left in a mismatched state between the old global `expo-cli` and the newer local `@expo/cli` packages. It also warned that `expo-media-library` had an incorrect version installed.

## 2. What was done

To attempt an automatic fix during the session, the following actions were taken:
1. **Force-Killed Zombie Processes:** Ran `taskkill` to forcefully shut down several hidden `node.exe` processes that were holding file locks in the background.
2. **Attempted Cache Clearing:** Ran commands to delete `node_modules` and clear both the `npm` and `yarn` global caches.
3. **Attempted Clean Re-install:** Ran `npm ci` and `yarn install` to rebuild the project dependencies cleanly. 

However, both `npm` and `yarn` got stuck or failed with `EBUSY` (resource busy) errors on the *global Windows package cache* (in `AppData\Local`), proving that a system-level process was aggressively locking the files and preventing a successful installation.

## 3. Recommendations & Next Steps

To properly fix the broken `node_modules` state and the `ExpoMetroConfig.loadAsync` error, you need to clear the system file locks and perform a clean installation with fixed dependencies.

**Please follow these steps in order:**

### Step 1: Clear System Locks
The most reliable way to release all hidden file locks on Windows is to **restart your computer**. Alternatively, ensure any cloud syncing tools (OneDrive/Dropbox) are paused or configured to ignore the `L:\AppHBN\node_modules` folder.

### Step 2: Clean Up the Project
Open PowerShell as Administrator in `L:\AppHBN` and run:
```powershell
# Delete node_modules completely
cmd.exe /c "rmdir /S /Q node_modules"

# Clear npm cache
npm cache clean --force
```

### Step 3: Install Correct Dependencies
Since Expo detected mismatched versions (like `expo-media-library`), install the dependencies and let Expo fix any version incompatibilities automatically:
```powershell
npm install
npx expo install --fix
```

### Step 4: Start Expo
Once the installation is completely finished without getting stuck, start your project with a cleared cache:
```powershell
npx expo start --clear
```

> **Note on global expo-cli:** If you still see the `ExpoMetroConfig.loadAsync` error after doing this, it means you have an old deprecated global Expo CLI installed. You can remove it by running `npm uninstall -g expo-cli`.
