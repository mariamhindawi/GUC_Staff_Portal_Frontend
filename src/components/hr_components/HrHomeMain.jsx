import React from "react";

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ligula nulla, auctor nec risus in, rutrum ornare nisi. Nullam urna orci, vulputate vestibulum mollis eget, maximus eu massa. Pellentesque semper laoreet convallis. Integer vel tortor eget metus vestibulum aliquet id ut est. Ut maximus vulputate diam, vel dictum massa eleifend eu. Quisque sed nisl non nunc sagittis mattis non a tellus. Donec risus quam, varius a venenatis non, blandit sed velit. Etiam ultrices enim velit, ut dapibus enim pharetra eu. Nam viverra nulla tortor. Sed ligula dui, vulputate sodales urna nec, congue consequat arcu. In venenatis neque ut orci venenatis volutpat. Vivamus ullamcorper turpis vitae dignissim vulputate.

Morbi imperdiet, quam sit amet tincidunt dignissim, ante mi pulvinar ante, at facilisis enim lorem ut erat. Proin turpis sem, vestibulum dictum justo vel, lacinia lobortis libero. Etiam dolor ante, cursus in iaculis id, varius at est. Fusce a nunc nulla. Praesent quis venenatis leo. Pellentesque feugiat vulputate ante sed efficitur. Etiam aliquam leo justo, quis elementum elit congue et. Quisque sed viverra dui. Maecenas in convallis mi. Mauris rutrum magna consequat urna volutpat, in facilisis orci tincidunt. Proin tempor ipsum in bibendum malesuada. Cras in tellus vitae lorem dapibus sodales.

Aliquam lorem odio, lacinia in dui quis, placerat euismod erat. Quisque nec dapibus velit. Curabitur non rhoncus mauris. Donec in erat a ligula ornare tempor id eu felis. Proin at ultrices erat. Sed dapibus velit a magna aliquam facilisis. Fusce ultricies diam ex, eget tempor eros feugiat ut. Proin quis ullamcorper lectus, non maximus nunc. Mauris ut dolor sit amet mi tincidunt ornare. Donec eget fermentum orci.

Sed sit amet ultricies odio. Etiam nec sem varius, viverra ante eu, molestie mauris. Morbi non cursus nisl. Nulla faucibus pellentesque sodales. In iaculis lacus sollicitudin eros tincidunt, id placerat justo pulvinar. Proin euismod rutrum dolor vitae ullamcorper. Quisque orci dui, ultrices a fringilla in, ultricies nec ex. Pellentesque pellentesque sed magna quis dictum. Aenean viverra eleifend ante, et mollis velit. Nunc posuere nisl nisl, quis tincidunt metus lobortis vitae.

Ut tincidunt dignissim urna ut blandit. In eu purus commodo, euismod velit malesuada, dictum lectus. Proin in facilisis sapien, nec elementum eros. Donec nec nibh dui. Mauris commodo quam mi, id porttitor arcu egestas nec. Fusce ornare velit lorem, vel interdum tortor faucibus eu. Curabitur fringilla fermentum ullamcorper. Curabitur ut maximus erat. Nulla dolor risus, semper ac nisi id, volutpat tempus nibh. Suspendisse ac dui augue. Duis ut sem ornare, accumsan risus a, laoreet turpis. Maecenas semper gravida suscipit. Donec porta arcu non lorem commodo, a convallis lectus pretium.`;

function HrHomeMain() {
  return (
    <div className="homepage-container">
      <h1>Welcome</h1>
      <div className="widgets-container">
        <div className="widget-group">
          <div className="widget"><div>{lorem}</div></div>
          <div className="widget"><div>{lorem}</div></div>
          <div className="widget"><div>{lorem}</div></div>
        </div>
      </div>
      <div className="widgets-container">
        <div className="widget-group">
          <div className="widget"><div>{lorem}</div></div>
          <div className="widget"><div>{lorem}</div></div>
        </div>
      </div>
      <div className="widgets-container">
        <div className="widget-group">
          <div className="widget"><div>{lorem}</div></div>
        </div>
      </div>
    </div>
  );
}

export default HrHomeMain;
