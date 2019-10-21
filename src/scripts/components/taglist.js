import $ from 'jquery';
import component from '../component';


const TAG_CLASS = 'taglist__tag';
const REMOVE_TAG_CLASS = 'taglist__tag-close';
const TAG_LABEL_CLASS = 'taglist__tag-label';


const makeTagElement = function (tag) {
  return $(
    `<div class='${TAG_CLASS}' data-value='${tag.value}'>
      <span class='${TAG_LABEL_CLASS}'>${tag.label}</span>
      <span class='${REMOVE_TAG_CLASS}'>&times;</span>
    </div>`
  );
};


export default component({
  data () {
    return {
      tags: []
    };
  },
  fn: {
    _init () {
      this.$e.on('click', `.${REMOVE_TAG_CLASS}`, this.handlers.removeTagClick);
    },
    removeValue (value) {
      this.setData({
        tags: this.data.tags.filter(t => t.value !== value)
      });
    },
    pushTag (tag) {
      const tags = this.data.tags;
      if (!tags.find(t => t.value === tag.value)) {
        this.setData({
          tags: tags.concat([tag])
        });
      }
    }
  },
  handlers: {
    removeTagClick (e) {
      const $tag = $(e.target).closest(`.${TAG_CLASS}`);
      this.fn.removeValue($tag.data('value'));
    }
  },
  render () {
    const $temp = $('<div></div>');
    $.each(this.data.tags, function (i, tag) {
      $temp.append(makeTagElement(tag));
    });

    this.$e.html($temp.html());
  }
});
