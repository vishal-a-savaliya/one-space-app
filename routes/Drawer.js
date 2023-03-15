import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// stacks
import HomeStack from './HomeStack';


// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
    },
});

export default createAppContainer(RootDrawerNavigator);