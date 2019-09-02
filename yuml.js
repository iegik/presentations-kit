const connect = require('connect');
const YUML = require('yuml-diagram');

/**
 * Simple service to for generating UML scheme
 * from yUML syntax like

// {type:class}
[A]->[B]

 */
connect().use(function(req, res) {
  const YUML_COMMENT_REGEX = /(\/\/[^,]+),/gim;
  const yumlText = decodeURIComponent(req.url)
    .substring(1)
    .replace(YUML_COMMENT_REGEX, '$1\n')
    .replace(/,/gim, '\n')
  ;
  const yuml  = new YUML();
  const svg = yuml.processYumlDocument(yumlText);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.end(svg);
}).listen(process.env.PORT, function(){
    console.log(`Server running on ${process.env.PORT}...`);
});