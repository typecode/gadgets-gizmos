import button from './components/button';
import gadget from './components/gadget';
import menu from './components/menu';
import dropdown from './components/dropdown';
import taglistConsole from './components/taglistConsole';
import modal from './components/modal';


export default function () {
  var components;

  function initComponents () {
    components = {
      button1: button({
        selector: '#demo-button-1',
        action () {
          console.log('Button #1 pressed');
        }
      }),
      button2: button({
        selector: '#demo-button-2'
      }),
      button3: button({
        selector: '#demo-button-3'
      }),
      gadget1: gadget({
        selector: '#demo-gadget-1'
      }),
      gadget2: gadget({
        selector: '#demo-gadget-2',
        closedInitially: true
      }),
      gadget3: gadget({
        selector: '#demo-gadget-3',
        closedInitially: true
      }),
      standaloneMenu: menu({
        selector: '#demo-standalone-menu',
        isStandalone: true
      }),
      dropdown: dropdown({
        selector: '#demo-dropdown',
        initialValue: 'alpha',
        input (value) {
          console.log(`Selected: ${value}`);
        }
      }),
      taglistConsole: taglistConsole({
        selector: '#demo-taglist-console'
      }),
      modal: modal({
        selector: '#demo-modal'
      })
    };
  }

  function wireButtons () {
    const gadgets = [
      components.gadget1,
      components.gadget2,
      components.gadget3
    ];

    components.button1.on('action', function () {
      gadgets.forEach((g) => g.open());
    });

    components.button2.on('action', function () {
      gadgets.forEach((g) => g.close());
    });

    components.button3.on('action', function () {
      components.modal.open();
    });
  }

  function wireStandaloneMenu () {
    const menu = components.standaloneMenu;

    menu.on('input', function () {
      console.log(`Selected menu item ${menu.getSelected().label}`);
    });
  }

  initComponents();
  wireButtons();
  wireStandaloneMenu();

  return {
    components
  };
};
