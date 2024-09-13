import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import doc from './doc.md';

const ReactMarkdown = ({ md }: { md: string }) => (
  <Markdown
    children={md}
    options={{
      enforceAtxHeadings: true,
      overrides: {
        code: {
          component: (props) => {
            const {children, className} = props;
            const match = /lang-(\w+)/.exec(className || '');

            return match ? (
              <SyntaxHighlighter
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={dark}
              />
            ) : (
              <code className={className}>
                {children}
              </code>
            )
          }
        }
      }
    }}
  />
);

function App() {

  return (
    <ReactMarkdown md={doc} />
  )
}

export default App