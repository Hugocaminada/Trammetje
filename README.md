# Trammetje

Een app om mensen terug het OV in te krijgen na Corona.

# Run the app on a simulator

Most of the info can be found [here](https://reactnative.dev/docs/environment-setup).

In order to run the app on a iOS simulator you'll need to install X-Code, it's developer tools and Cocoapods on a mac. please refer to link above on how to do that. If that's done you can follow these instructions to open the Trammetje app:

in the project directory run `npm install`, in the ios folder run `pod install`. Back in the project directory you can then run `npm start` and then `npm run ios` to build the app on a iPhone 12 simulator, or `npm run ios-se` to build the app on an iPhone SE simulator. (Iphone 12 has no homebutton and the "notch", the SE still has the homebutton and a 'normal' smaller rectangle screen, it's good to test the app on both screen-types).
