var framer = require('../index')

console.log('In framer test');

var config = {
  'source': './test/screenshots/*{.png,.jpg,.PNG,*.JPG,*.JPEG,*.jpg}',
  'sourceONE': './test/screenshots/choose-plan.png',
  'dest': './framed/',
  'configFile': 'framer.json',
  destPrefix: 'framed_'
};

framer.frame(config);

