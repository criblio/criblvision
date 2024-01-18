'use strict';

const app_name = './criblvision';

require.config({
    paths: {
        myApp: `../app/${app_name}/javascript/views/app`,
        react: `../app/${app_name}/javascript/vendor/react.production.min`,
        ReactDOM: `../app/${app_name}/javascript/vendor/react-dom.production.min`,
    },
    scriptType: 'module',
});

require(
  [
    'react',
    'ReactDOM',
    'myApp',
  ],
  function(react, ReactDOM, myApp){
    ReactDOM.render(myApp, document.getElementById('criblvision_setup_container'));
  }
);