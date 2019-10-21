import $ from 'jquery';
import component from '../component';


export default component({
  defaults: {
    action () {
      console.log('Default button action callback');
    }
  },
  data () {
    return {
      label: undefined
    };
  },
  fn: {
    _init () {
      this.$e.on('click', this.handlers.click);
    },
    action () {
      this.opt.action();
      this.emit('action');
    },
    setLabel (label) {
      this.setData({
        label
      });
    }
  },
  handlers: {
    click () {
      this.fn.action();
    }
  },
  render () {
    const label = this.data.label;
    if (label) {
      this.$e.text(label);
    }
  }
});
