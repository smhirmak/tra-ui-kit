import CodeBlockv2 from '@/components/CodeBlockv2';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark, nightOwl, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SyntaxHighlighterBlock = () => {
  const exampleCode = `
    const greeting = "Hello, world!";
    function greet() {
        console.log(greeting);
    }
    greet();
    `;
  const exampleCode2 = `
    <>
      <div>
        <button className="1">Click me</button>
        <Button className="2">Click me</Button>
        <Button className="2" id="132" id={123}>Click me</Button>
        <Button className="3" id={123} id={deneme} style={{ }}>Click me</Button>
        <Deneme className="4">Click me</Deneme>
        <Denem123123>asdasd</Denem123123>
        <Deneme>
          <deneme />
          <Deneme />
        </Deneme>
      </div>
    </>
    `;
  return (
    <div>
      {/* <SyntaxHighlighter language="jsx" style={coldarkDark}>
        {`
      <>
        <div>
        <button className="1">Click me</button>
        <Button className="2">Click me</Button>
        <Button className="2" id="132" id={123}>Click me</Button>
        <Button className="3" id={123} id={deneme} style={{ }}>Click me</Button>
        <Deneme className="4">Click me</Deneme>
        <Deneme>
          <deneme />
          <Deneme />
        </Deneme>
        </div>
      </>
      `}
      </SyntaxHighlighter>
      <SyntaxHighlighter language="jsx" style={nightOwl}>
        {`
      <>
        <div>
        <button className="1">Click me</button>
        <Button className="2">Click me</Button>
        <Button className="2" id="132" id={123}>Click me</Button>
        <Button className="3" id={123} id={deneme} style={{ }}>Click me</Button>
        <Deneme className="4">Click me</Deneme>
        <Deneme>
          <deneme />
          <Deneme />
        </Deneme>
        </div>
      </>
      `}
      </SyntaxHighlighter>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
        {`
      <>
        <div>
        <button className="1">Click me</button>
        <Button className="2">Click me</Button>
        <Button className="2" id="132" id={123}>Click me</Button>
        <Button className="3" id={123} id={deneme} style={{ }}>Click me</Button>
        <Deneme className="4">Click me</Deneme>
        <Deneme>
          <deneme />
          <Deneme />
        </Deneme>
        </div>
      </>
      `}
      </SyntaxHighlighter> */}

      Code Block V2:
      {/* <CodeBlockv2 code={exampleCode} /> */}
      <CodeBlockv2 code={exampleCode2} />
    </div>
  );
};

export default SyntaxHighlighterBlock;
