import React, { Component } from 'react';

import Layout from './layout';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHackerNews, faGoogle, faGitlab, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faExternalLinkAlt, faAngleUp, faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faHackerNews, faGoogle, faGitlab, faExternalLinkAlt,
    faAngleUp, faAngleDown, faPlus, faGithub);

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
