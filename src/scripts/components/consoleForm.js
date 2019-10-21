import $ from 'jquery';
import component from '../component';


export default component({
  selectors: {
    input: '.console-form__input'
  },
  data () {
    return {
      query: this.elements.input.val()
    };
  },
  fn: {
    _init () {
      this.$e.on('submit', this.handlers.submit);
      this.elements.input.on('keydown change', this.handlers.inputKeydownOrChange);
    },
    setQuery (q) {
      this.setData({
        query: q
      });
    },
    clearQuery () {
      this.fn.setQuery('');
    },
    execQuery () {
      this.emit('exec', this.data.query);
      this.fn.clearQuery();
    }
  },
  handlers: {
    submit (e) {
      e.preventDefault();
      this.fn.execQuery();
    },
    inputKeydownOrChange (e) {
      this.fn.setQuery($(e.target).val());
    }
  },
  render () {
    this.elements.input.val(this.data.query);
  }
});
