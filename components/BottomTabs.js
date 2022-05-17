import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Details from '../screens/Details';
import Home from '../screens/Home';
import ReportLitter from '../screens/ReportLitter';

const BottomTabs = () => {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Report" component={ReportLitter} />
    </Tab.Navigator>
  );
}

export default BottomTabs;