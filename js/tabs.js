;(function( $ ){

  var defaults = {
    itemclass: "tab-item",
    titleclass: "tab-title",
    listclass: "tab-list",
    tabbuttonclass: 'tab-button',
    titlehiddenclass: 'tab-hide-title',
    selecteditem: 'tab-button-selected',
    effect: 'slide'
  };

  function Tabordeon(element, options) {
    var widget = this;
    widget.config = $.extend(true, {}, defaults, options);
    widget.element = element;
    widget.tablist = '';
    this.init();
    widget.tablist.find('.' + widget.config.tabbuttonclass).each(function() {
      $(this).click(function() {
        Tabordeon.prototype.toggleTab(widget, this);
      });
    });

    widget.element.find('.' + widget.config.titleclass ).each(function() {
      $(this).click(function() {
        Tabordeon.prototype.toggleAccordeon(widget, this);
      });
    });
  }

  Tabordeon.prototype.init = function() {
    var widget = this;
    widget.tablist = $("<ul/>", {
                  "class":  widget.config.listclass
                }).insertBefore(widget.element);
    widget.element.find('.' + widget.config.itemclass + ' .' + widget.config.titleclass).each(function() {
      var title = $(this).text();
      $("<li/>", {
        "class": widget.config.tabbuttonclass
      }).text(title).appendTo(widget.tablist);
      $(this).addClass(widget.config.titlehiddenclass);
    });

    
    widget.element.find('.' + widget.config.itemclass).addClass(widget.config.effect + '-hide');
    widget.element.find('.' + widget.config.itemclass).first().addClass(widget.config.effect + '-show');
    widget.tablist.find('.' + widget.config.tabbuttonclass).first().addClass(widget.config.selecteditem);

  };

  Tabordeon.prototype.toggleTab = function(widget, li) {
    var index = widget.tablist.find('.' + widget.config.tabbuttonclass).index($(li));
    var item = widget.element.find('.' + widget.config.itemclass).get(index);
    widget.element.find('.' + widget.config.itemclass +
                        '.' + widget.config.effect + '-show')
                  .first()
                  .removeClass(widget.config.effect + '-show')
                  .addClass(widget.config.effect + '-hide');
    $(item).removeClass(widget.config.effect + '-hide')
           .addClass(widget.config.effect + '-show');
    widget.tablist.find('.' + widget.config.tabbuttonclass + 
                        '.' + widget.config.selecteditem).removeClass(widget.config.selecteditem);
    $(li).addClass(widget.config.selecteditem);
  };

  Tabordeon.prototype.toggleAccordeon = function(widget, h2) {
    var index = widget.element.find('.' + widget.config.titleclass).index($(h2));
    widget.element.find('.' + widget.config.itemclass + '.' + widget.config.effect + '-show')
                  .first()
                  .removeClass(widget.config.effect + '-show')
                  .addClass(widget.config.effect + '-hide');
    widget.tablist.find('.' + widget.config.tabbuttonclass + '.' 
                            + widget.config.selecteditem)
                  .removeClass(widget.config.selecteditem);
    var li = widget.tablist.find('.' + widget.config.tabbuttonclass ).get(index);
    $(li).addClass(widget.config.selecteditem);
    var item = widget.element.find('.' + widget.config.itemclass).get(index);
    $(item).removeClass(widget.config.effect + '-hide').addClass(widget.config.effect + '-show');
  };

  $.fn.tabordeon = function(options) {
    new Tabordeon(this, options);
    return this;
  };

}(jQuery));