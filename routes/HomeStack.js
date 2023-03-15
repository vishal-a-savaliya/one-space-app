import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
import Collection from '../screens/Collection';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'One Space',
        }
    },
    Collection: {
        screen: Collection,
        navigationOptions: {
            title: 'Collection',
        }
    },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});

export default HomeStack;


