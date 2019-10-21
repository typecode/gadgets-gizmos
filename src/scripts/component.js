import $ from 'jquery';


export default function (conf) {
  return function (options) {
    var context, opt, $e, api;

    function bindToContext (key) {
      if ($.isArray(key)) {
        $.each(key, (i, k) => bindToContext(k));
        return;
      }
      const obj = context[key];
      if ($.isFunction(obj)) {
        context[key] = $.proxy(obj, context);
        return;
      }
      const bound = {};
      $.each(obj, function (name, fn) {
        bound[name] = $.proxy(fn, context);
      });
      context[key] = bound;
    }

    function initContext () {
      context = $.extend(true, {
        defaults: {},
        selectors: {},
        elements: {},
        handlers: {},
        components: {},
        fn: {},
        render: $.noop
      }, conf);

      opt = $.extend(context.defaults, options);
      context.opt = opt;

      $e = opt.$e || (opt.selector ? $(opt.selector) : $({}));
      context.$e = $e;

      $.each(context.selectors, function (name, selector) {
        context.elements[name] = $(selector, $e);
      });

      $.extend(context, {
        data: $.isFunction(conf.data) ? conf.data.apply(context) : conf.data || {},
        emit () {
          return $e.trigger.apply($e, arguments);
        },
        on () {
          return $e.on.apply($e, arguments);
        },
        off () {
          return $e.off.apply($e, arguments);
        },
        render () {
          if (conf.render) {
            conf.render.apply(context);
          }
          context.emit('render');
        },
        setData (data) {
          $.extend(context.data, data);
          context.render();
        }
      });

      bindToContext(['fn', 'handlers', 'render']);
    }

    function initInterface () {
      api = {
        on: context.on,
        off: context.off
      };

      $.each(context.fn, function (name, fn) {
        if (!name.startsWith('_')) {
          api[name] = fn;
        }
      });
    }

    function initComponent () {
      const _init = context.fn._init;
      if (_init) {
        _init();
      }
      context.render();
    }

    initContext();
    initInterface();
    initComponent();

    return api;
  };
};
