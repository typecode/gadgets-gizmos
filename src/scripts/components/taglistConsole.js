import $ from 'jquery';
import component from '../component';
import consoleForm from './consoleForm';
import taglist from './taglist';


export default component({
  selectors: {
    consoleForm: '.console-form',
    taglist: '.taglist',
  },
  fn: {
    _init () {
      const elements = this.elements;
      const components = this.components;

      components.consoleForm = consoleForm({
        $e: elements.consoleForm
      });

      components.taglist = taglist({
        $e: elements.taglist
      });

      components.consoleForm.on('exec', this.handlers.exec);
    },
    _addTags (query) {
      const taglist = this.components.taglist;
      query.split(',').forEach((q) => {
        q = q.trim();
        if (!q) {
          return;
        }
        taglist.pushTag({
          label: q,
          value: q.toLowerCase()
        });
      });
    }
  },
  handlers: {
    exec (e, query) {
      this.fn._addTags(query);
    }
  }
});
