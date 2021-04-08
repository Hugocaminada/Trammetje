import { Navigation } from 'react-native-navigation'
import App from './App'
import Homescreen from './src/components/Homescreen'

Navigation.registerComponent('com.Trammetje.HomeScreen', () => App)
Navigation.registerComponent('Homescreen', () => Homescreen)
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
                            name: 'Homescreen',
                        },
                    },
                ],
            },
        },
    })
})
