import $ from 'jquery';
import Header from '../blocks/header/header';


$(() => {
  Header.init();

  // $.get('/assets/img/icons/symbol-defs.svg', (svg) => {
  // $.get('assets/img/icons/symbol-defs.svg', (svg) => {
  //   const div = document.createElement('div');
  //   div.innerHTML = new XMLSerializer().serializeToString(svg.documentElement);
  //   document.body.insertBefore(div, document.body.childNodes[0]);
  // });

  /* eslint-disable */
  // (function(w,doc) {
  // if (!w.__utlWdgt ) {
  //   w.__utlWdgt = true;
  //   var d = doc, s = d.createElement('script'), g = 'getElementsByTagName';
  //   s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
  //   s.src = ('https:' == w.location.protocol ? 'https' : 'http')  + '://w.uptolike.com/widgets/v1/uptolike.js';
  //   var h=d[g]('body')[0];
  //   h.appendChild(s);
  // }})(window,document);
  /* eslint-enable */
});
