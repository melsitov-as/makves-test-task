import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './components/Sidebar';
import './index.scss';

library.add(fas);

export default class App extends React.Component {
  render() {
    const { theme } = this.props;
    return <Sidebar color={theme} />;
  }
}
