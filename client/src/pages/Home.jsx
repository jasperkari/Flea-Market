import '../styles/App.css';
import React from 'react';
import TopNav from '../components/TopNav';
import Card from '../components/Card';

function App() {
  return (
    <div className="App">
      <TopNav />
      <h1>Welcome to our Online Flea Market!!</h1>
      <p>
        Here you can find a variety of items for sale from different vendors.
      </p>
      <h2>Items for Sale:</h2>
      <Card
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.x3UPLV8z4igtFLYzIr0IqgHaKv%26pid%3DApi&f=1&ipt=ab48cb684d5f8cd87c85f0a19470320c12540b0287d12ccd32412205d2a8e59e&ipo=images"
        name="Item 1"
        price="$10"
        description="Description of Item 1"
      />
      <Card
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shainblumphoto.com%2Fwp-content%2Fuploads%2F2015%2F11%2Fsanfranfogwide1200.jpg&f=1&nofb=1&ipt=14b36d55e3cab615ce63686ac0e76f6ab7cfc3ad3d569cd2188d910559743234&ipo=images"
        name="Item 2"
        price="$20"
        description="Description of Item 2"
      />
      <Card
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.exoticca.travel%2Fblog%2Fwp-content%2Fuploads%2F2019%2F09%2FThese-are-the-most-beautiful-lakes-in-the-world-you-must-visit.jpg&f=1&nofb=1&ipt=f2bf819f38e1d8265da52fa169ce6a5653e5c6e61674b1f715d0d6e4a2f1d82d&ipo=images"
        name="Item 3"
        price="$30"
        description="Description of Item 3"
      />
    </div>
  );
}

export default App;
