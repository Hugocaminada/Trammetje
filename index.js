import { Navigation } from 'react-native-navigation'
import App from './App'

Navigation.registerComponent('com.Trammetje.HomeScreen', () => App)
Navigation.setDefaultOptions({
    topBar: {
        visible: false,
        drawBehind: true,
    },
})
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'com.Trammetje.HomeScreen',
                        },
                    },
                ],
            },
        },
    })
})
