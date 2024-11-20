import CodeBlockv2 from '@/components/CodeBlockv2';

const SyntaxHighlighterBlock = () => {
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
