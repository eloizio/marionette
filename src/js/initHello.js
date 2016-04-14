define(['myApp', 'layouts/myAppMainLayout'], function(MyApp, MyLayout) {

  var app = new MyApp(),
    layout = new MyLayout();

  app.start({
    optionA: 'This',
    optionB: 'is',
    optionC: 'a',
    optionD: 'hello',
    optionE: 'world'
  });

  // app.mainRegion.show(layout);
});