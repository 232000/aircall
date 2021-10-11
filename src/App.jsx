import React from 'react';
import ReactDOM from 'react-dom';
import FixedBottomNavigation from './Tabs/tabs.js';

import Header from './Header.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <div className="container-view">
      <FixedBottomNavigation></FixedBottomNavigation>
      </div>


    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
