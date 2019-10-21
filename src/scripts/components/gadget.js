import $ from 'jquery';
import component from '../component';
import button from './button';


export default component({
  defaults: {
    closedInitially: false
  },
  selectors: {
    toggleButton: '.gadget__toggle'
  },
  data () {
    return {
      isOpen: this.opt.closedInitially ? false : true
    };
  },
  fn: {
    _init () {
      const toggleButton = button({
        $e: this.elements.toggleButton,
        action: () => this.fn.toggle()
      });

      toggleButton.on('keydown', this.handlers.toggleButtonKeydown);
      this.components.toggleButton = toggleButton;
    },
    toggle () {
      const fn = this.fn;
      if (this.data.isOpen) {
        fn.close();
      } else {
        fn.open();
      }
    },
    open () {
      this.setData({
        isOpen: true
      });
    },
    close () {
      this.setData({
        isOpen: false
      });
    }
  },
  handlers: {
    toggleButtonKeydown (e) {
      if (e.key === 'Escape') {
        this.fn.close();
      }
    }
  },
  render () {
    const isOpen = this.data.isOpen;
    this.components.toggleButton.setLabel(isOpen ? 'Close' : 'Open');
    this.$e.toggleClass('gadget--open', isOpen);
  }
});
