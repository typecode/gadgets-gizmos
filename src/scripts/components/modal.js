import $ from 'jquery';
import component from '../component';


export default component({
  defaults: {
    globalContainerSelector: 'html'
  },
  selectors: {
    panel: '.modal__panel'
  },
  data () {
    return {
      isOpen: false
    };
  },
  fn: {
    _init () {
      this.elements.globalContainer = $(this.opt.globalContainerSelector);
      const $e = this.$e;
      $e.on('click', this.handlers.click);
      $e.on('keydown', this.handlers.keydown);
    },
    open () {
      this.setData({
        isOpen: true
      });
      this.$e.focus();
    },
    close () {
      this.setData({
        isOpen: false
      });
    }
  },
  handlers: {
    click (e) {
      const panel = this.elements.panel[0];
      if (e.target !== panel && !$.contains(panel, e.target)) {
        this.fn.close();
      }
    },
    keydown (e) {
      if (e.key === 'Escape') {
        this.fn.close();
      }
    }
  },
  render () {
    const isOpen = this.data.isOpen;
    this.$e.toggleClass('modal--open', isOpen);
    this.elements.globalContainer.toggleClass('modal-is-open', isOpen);
  }
});
