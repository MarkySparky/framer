var framer = require('../index')

console.log('In framer test');

var config = {
  'source': './test/screenshots/*{.png,.jpg,.PNG,*.JPG,*.JPEG,*.jpg}',
  'dest': './framed1/',
  'configFile': 'framer.json'
};

framer.frame(config);

