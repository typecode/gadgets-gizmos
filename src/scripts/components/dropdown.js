import $ from 'jquery';
import component from '../component';
import menu from './menu';


export default component({
  defaults: {
    initialValue: undefined,
    input: $.noop
  },
  selectors: {
    controlbar: '.dropdown__controlbar',
    display: '.dropdown__display',
    menu: '.dropdown__menu'
  },
  data () {
    return {
      isFocussed: false
    };
  },
  fn: {
    _init () {
      const { $e, handlers, elements, components } = this;

      $e.on('focusin', handlers.focusin);
      $e.on('focusout', handlers.focusout);
      $e.on('keydown', handlers.keydown);

      elements.controlbar.on('click', handlers.controlbarClick);

      components.menu = menu({
        $e: elements.menu
      });
      components.menu.on('input', handlers.menuInput);
      components.menu.on('render', handlers.menuRender);

      const initialValue = this.opt.initialValue;
      if (initialValue) {
        this.fn.setValue(initialValue);
      }
    },
    getValue () {
      const selected = this.components.menu.getSelected();
      return selected ? selected.value : undefined;
    },
    setValue (value) {
      this.components.menu.select(value);
    }
  },
  handlers: {
    focusin () {
      this.setData({
        isFocussed: true
      });
    },
    focusout () {
      this.setData({
        isFocussed: false
      });
      this.components.menu.close();
    },
    keydown (e) {
      this.components.menu.handleKeyInput(e);
    },
    controlbarClick () {
      this.components.menu.toggle();
    },
    menuInput (e, value) {
      this.opt.input(value);
      this.emit('input', value);
      this.components.menu.close();
    },
    menuRender () {
      this.render();
    }
  },
  render () {
    const { $e, components, data, elements } = this;
    const menu = components.menu;
    const selected = menu.getSelected();

    $e.toggleClass('dropdown--focussed', data.isFocussed);
    $e.toggleClass('dropdown--open', menu.isOpen());

    elements.display.text(selected ? selected.label : '[select something]');
  }
});
