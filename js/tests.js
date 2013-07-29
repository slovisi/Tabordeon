test( "Tabify Test", function() {
  ok($('.tab-wrapper').tabordeon(),'exist');
  ok($('.tab-wrapper').tabordeon({namespace: 'tab'}),'exist');
});