import React, { Component } from 'react';
import marked from 'marked';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: "Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*"
    };
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      langPrefix: 'language-',
      highlight: function(code, lang) {
        if (lang === 'js') {
          return highlighter.javascript(code);
        }
        return code;
      }
    });
    this.onInputChange = this.onInputChange.bind(this);
    this.convertText = this.convertText.bind(this);
  }

  onInputChange(event) {
    this.setState({ markdown: event.target.value });
  }

  convertText(text) {
    const markup = marked(text);
    return { __html: markup };
  }

  render() {
    const { markdown } = this.state;
    console.log('markdown:', markdown)
    return(
      <div className='container-fluid'>
        <h1 className='title'>MARKDOWN PREVIEWER</h1>
        <div className='content'>'
          <textarea
            value={this.state.markdown}
            className='input'
            rows='20'
            onChange={this.onInputChange}
          />
          <div
            className='output'
            dangerouslySetInnerHTML={this.convertText(markdown)}
          />
        </div>
        <div className='footer'>
          Source code on <a href='https://github.com/drhectapus/markdown-previewer'>Github</a>
        </div>
      </div>
    )
  }
}
