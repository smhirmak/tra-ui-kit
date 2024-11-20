// import React from 'react';

// const escapeHtml = unsafe => unsafe
//   .replace(/&/g, '&amp;')
//   .replace(/</g, '&lt;')
//   .replace(/>/g, '&gt;')
//   .replace(/"/g, '&quot;')
//   .replace(/'/g, '&#039;');

// const keywords = [
//   'className', 'const', 'let', 'var', 'function', 'if', 'else', 'for', 'while',
//   'return', 'switch', 'case', 'break', 'default', 'extends', 'import', 'export',
// ];

// const CodeBlockv2 = ({ code }) => {
//   // HTML özel karakterlerini kaçır
//   const escapedCode = escapeHtml(code);

//   const formattedCode = escapedCode
//     .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="string">$1</span>') // String ifadeleri
//     .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="number">$1</span>') // Sayılar
//     .replace(new RegExp(`\\b(${keywords.join('|')})\\b`, 'g'), '<span class="keyword">$1</span>') // Anahtar kelimeler
//     .replace(/&lt;\/?([A-Za-z][A-Za-z0-9-]*)(\s+[\w-]+\s*=\s*(["']?)[^"'>]*\3?)*\s*\/?&gt;/g, (match, tagName) => {
//       // Tag adı büyük harfle başlıyorsa jsx-tag, küçük harfle başlıyorsa html-tag olarak işaretle
//       const tagClass = tagName[0] === tagName[0].toUpperCase() ? 'jsx-tag' : 'html-tag';
//       return `<span class="${tagClass}">${match}</span>`;
//     })
//     .replace(/(\bclassName\b|\bid\b|\bstyle\b)/g, '<span class="attribute">$1</span>') // JSX nitelikleri (props)
//     .replace(/(<\s*\/?(\w+)\s+[^>]*className\s*=\s*(['"])(.*?)\3[^>]*>)/g, (match, tag, tagName, quote, classValue) => {
//       const tagClass = tagName[0] === tagName[0].toUpperCase() ? 'jsx-tag' : 'html-tag';
//       return `<span class="${tagClass}">${tag.replace(/className/g, '<span class="attribute">className</span>')}</span>`;
//     })
//     .replace(/&lt;\/?([A-Za-z][A-Za-z0-9-]*)\b[^>]*&gt;/g, (match, tagName) => {
//       // Tag adı büyük harfle başlıyorsa jsx-tag, küçük harfle başlıyorsa html-tag olarak işaretle
//       const tagClass = tagName[0] === tagName[0].toUpperCase() ? 'jsx-tag' : 'html-tag';
//       return `<span class="${tagClass}">${match}</span>`;
//     });

//   return (
//     <pre className="code-block">
//       <code dangerouslySetInnerHTML={{ __html: formattedCode }} />
//     </pre>
//   );
// };

// export default CodeBlockv2;
