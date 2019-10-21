import $ from 'jquery';
import component from '../component';


const OPEN_CLASS = 'menu--open';
const ITEM_SELECTOR = '.menu__item';
const ITEM_HIGHLIGHTED_CLASS = 'menu__item--highlighted';


export default component({
  defaults: {
    isStandalone: false
  },
  data () {
    return {
      isOpen: this.opt.isStandalone ? true : this.$e.hasClass(OPEN_CLASS),
      highlightIndex: undefined,
      selected: undefined
    };
  },
  fn: {
    _init () {
      const { $e, handlers, opt } = this;
      $e.on('click', ITEM_SELECTOR, handlers.itemClick);
      $e.on('mouseenter', ITEM_SELECTOR, handlers.itemMouseenter);
      $e.on('mouseleave', ITEM_SELECTOR, handlers.itemMouseleave);
      if (opt.isStandalone) {
        $e.on('keydown', handlers.standaloneKeydown);
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

      this.fn._clearHighlight();
    },
    toggle () {
      if (this.fn.isOpen()) {
        this.fn.close();
      } else {
        this.fn.open();
      };
    },
    isOpen () {
      return this.data.isOpen;
    },
    getSelected () {
      return this.data.selected;
    },
    select (value) {
      const fn = this.fn;
      const $item = fn._getItems().filter(`[data-value="${value}"]`);
      if ($item.length) {
        fn._selectItem($item);
      }
    },
    handleKeyInput (e) {
      const { fn, data, opt } = this;
      const isOpen = fn.isOpen();

      if (e.key === 'Escape' && !opt.isStandalone && isOpen) {
        fn.close();
      } else if (e.key === 'Enter' && typeof data.highlightIndex === 'number') {
        e.preventDefault();
        fn._selectHighlightedItem();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (isOpen) {
          fn._moveHighlight('down');
        } else {
          fn.open();
        }
      } else if (e.key === 'ArrowUp' && isOpen) {
        e.preventDefault();
        fn._moveHighlight('up');
      }
    },
    _getItems () {
      return this.$e.find(`${ITEM_SELECTOR}`);
    },
    _selectItem ($item) {
      const value = $item.data('value');

      this.setData({
        selected: {
          value,
          label: $item.data('label') || $item.text()
        }
      });
      this.emit('input', value);
    },
    _selectHighlightedItem () {
      const fn = this.fn;
      fn._selectItem(fn._getItems().eq(this.data.highlightIndex));
    },
    _highlightItem ($item) {
      this.fn._setHighlight($item.index());
    },
    _setHighlight (index) {
      this.setData({
        highlightIndex: index
      });
    },
    _clearHighlight () {
      this.setData({
        highlightIndex: null
      });
    },
    _moveHighlight (direction = 'down') {
      var targetIndex;
      const fn = this.fn;
      const nItems = fn._getItems().length;
      const currentIndex = this.data.highlightIndex;
      const hasCurrent = typeof currentIndex === 'number';

      if (direction === 'down') {
        targetIndex = hasCurrent ? currentIndex + 1 : 0;
        if (targetIndex > nItems - 1) {
          targetIndex = 0;
        }
      } else if (direction === 'up') {
        targetIndex = hasCurrent ? currentIndex - 1  : nItems - 1;
        if (targetIndex < 0) {
          targetIndex = nItems - 1;
        }
      }
      fn._setHighlight(targetIndex);
    }
  },
  handlers: {
    itemClick (e) {
      this.fn._selectItem($(e.target));
    },
    itemMouseenter (e) {
      this.fn._highlightItem($(e.target));
    },
    itemMouseleave (e) {
      this.fn._clearHighlight();
    },
    standaloneKeydown (e) {
      this.fn.handleKeyInput(e);
    }
  },
  render () {
    const { $e, fn, data } = this;

    $e.toggleClass(OPEN_CLASS, fn.isOpen());

    const menuItems = fn._getItems();
    menuItems.removeClass(ITEM_HIGHLIGHTED_CLASS);
    if (typeof data.highlightIndex === 'number') {
      menuItems.eq(data.highlightIndex).addClass(ITEM_HIGHLIGHTED_CLASS);
    }
  }
});
