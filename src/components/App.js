import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Main from './Common/Main';

export const App = withRouter(connect()(Main));

export default App;
