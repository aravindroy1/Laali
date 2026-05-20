# Laali Birthday Website

This is a premium cinematic birthday website created for Laali, featuring a dark romantic aesthetic and luxury feminine theme.

## How to Add Your Own Photos, Videos, and Music

To make this website truly yours, you simply need to drop your files into the appropriate folders inside `src\assets\`. **You DO NOT need to rename your files!** The website will automatically find them and display them beautifully.

### 1. Hero Background Image
Place ONE high-quality romantic photo in this folder to be used as the main background:
`src\assets\public_photos\`
*(Make sure the file name contains the word 'hero', e.g. `hero.jpg` or `hero-bg.png`)*

### 2. Public Gallery Photos (Friendly)
Place all the photos you want everyone to see in:
`src\assets\public_photos\`
*(The website will automatically create a beautiful masonry gallery with all photos found here. The public section is designed to look like it is from a best friend, so her parents won't suspect a thing!)*

### 3. Public Videos
Place any friendly/public videos in:
`src\assets\videos\`

### 4. Private Photos (The Secret Vault)
Place your private/secret photos in:
`src\assets\private_photos\`
*(These photos are completely hidden from the main website and can only be accessed using the secret code. This section contains the deeply romantic, lover-oriented message.)*

### 5. Private Videos
Place your private/romantic videos in:
`src\assets\private_videos\`
*(These will also only be visible inside the Secret Vault.)*

### 6. Background Music
Place your music file (e.g., `.mp3`) in:
`src\assets\audio\`

---

## 🤫 How to Access the Secret Vault (Without Parents Knowing)

To ensure her parents never get suspicious, **there are no visible lock icons or password prompts anywhere on the screen!** 

To access the private photos, scroll down to the very bottom of the website to the **Footer**. 
You will see the text: `"Made with ❤️ for Laali"`

1. **Click the Heart icon (❤️) exactly 3 times.**
2. A small, innocent-looking popup will appear asking for an "Access Code".
3. Enter the code: **laali**
4. The Secret Collection section will magically appear above the Footer!

*(If you ever want to change the password, you can edit it in `src/components/PasswordModal.jsx`)*

---

## How to View the Website
Run the following command in the terminal inside your project folder:
```bash
npm run dev
```
Then open `http://localhost:5173` in your web browser.
