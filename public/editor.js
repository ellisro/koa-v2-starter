'use strict';

const { Component, h, render } = window.preact;

/** Instead of JSX, use: h(type, props, ...children) */
class Editor extends Component {
  render(props, state) {

    const blocks = props.blocks.reduce((p,c,i) => {
      p.push(h('textarea', c, 'Item '+i))
      p.push(h(BlockMenu, { index: i }))
      return p;
    },[h(BlockMenu, { index: 0 })]);

    return (
      h('main', null,
        h('div', null, blocks)
      )
    );
  }
}

/** Example classful component */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [ { type: 'markup', val: 'fdadf' }]
    }
    this.insertBlock = (type, val, index) => {
      this.setState(prevState => {
        return {
          blocks: [
            ...prevState.blocks.slice(0,index),
            { type, val },
            ...prevState.blocks.slice(index, prevState.blocks.length)
          ]
        }
      })
    }
  }
  
  componentDidMount() {
    this.setState({  });
  }
  render(props, state) {
    return (
      h('div', null,
        h(Header, { message: state.message }),
        h(Main, state)
      )
    );
  }
}




/** Instead of JSX, use: h(type, props, ...children) */
class BlockMenu extends Component {

  render(props) {
    return (
      h('div', { class: 'block-menu' },'…')
    );
  }
}

/** Components can just be pure functions */
const Header = (props) => {
  return h('header', null,
    h('h1', null, 'App'),
    props.message && h('h2', null, props.message)
  );
};


/** Instead of JSX, use: h(type, props, ...children) */
class Main extends Component {
  render(props) {
    console.log(props)
    const items = [1,2,3,4,5].map( (item) => (
      h('li', {id:item}, 'Item '+item)
    ));
    return h(Editor, props, items);
  }
}


render(h(App), document.getElementById('app'));