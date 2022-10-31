const DEFAULT = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

// renderer funcion for markup
const renderer = new marked.Renderer()
renderer.link = (href, title, text) => {
  return `<a href=${href} target="_blank">${text}</a>`
}

const Editor = props => {
  return <textarea id="editor" value={props.input} onChange={props.onChange} />;
};

const Previewer = props => {
  return <div id="preview" dangerouslySetInnerHTML={props.input}/>;
};

const Window = props => {
  return (
    <div className="window">
      <header>
        <h1>{props.heading}</h1>
      </header>
      {props.category}
    </div>
  );
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: DEFAULT,
    };
  }

  renderWindow = (heading, category) => {
    return (
      <Window
        heading={heading}
        category={category}
      />
    );
  }

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  }
  
  createMarkUp = () => {
    return {
      __html: marked(this.state.input, {
        breaks: true,
        renderer: renderer,
      })
    }
  }

  render() {
    return (
      <div className="app">
        {this.renderWindow(
          "Editor",
          <Editor onChange={this.handleChange} input={this.state.input} />
        )}
        {this.renderWindow(
          "Previewer", 
          <Previewer input={this.createMarkUp()} />)}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
