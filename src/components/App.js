import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Main from './Main';

export const App = withRouter(connect()(Main));

export default App;
