🎀 HOW TO ADD YOUR OWN PHOTOS:

1. Drop your girlfriend's photos into this folder: `public/images/`
   For example:
   - `public/images/date.jpg`
   - `public/images/trip.jpg`
   - `public/images/smile.jpg`
   - `public/images/mascot.png` (optional custom mascot)

2. Open `src/config/birthdayConfig.js` and set the image paths:
   ```javascript
   PHOTOS: [
     {
       id: 1,
       title: "Our Very First Date ☕",
       image: "/images/date.jpg",
       ...
     }
   ]
   ```

3. If you leave `image: ""` or an image fails to load, the app automatically displays a cute Hello Kitty kawaii illustration so the website always looks flawless!
