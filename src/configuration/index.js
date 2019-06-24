import devConfigs from './dev';
import localConfigs from './local';

let configs = localConfigs;

if (process.env.REACT_APP_ENV === 'dev') {
  configs = devConfigs;
}

export default Object.freeze(Object.assign({}, configs));
