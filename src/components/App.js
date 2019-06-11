import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Main from './Main';

const App = withRouter(connect()(Main));

export default App;
