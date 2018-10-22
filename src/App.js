import React, { Component } from 'react';

import Layout from './layout';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHackerNews, faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(faHackerNews, faGoogle);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout/>
      </div>
    );
  }
}

export default App;
