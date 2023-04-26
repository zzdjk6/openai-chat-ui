describe("AssistantMessage", () => {
  it.todo("should render");

  const sampleText = `
Headings

  # h1 Heading 8-)
  ## h2 Heading
  ### h3 Heading
  #### h4 Heading
  ##### h5 Heading
  ###### h6 Heading


Horizontal Rules

  Some text above
  ___

  Some text in the middle

  ---

  Some text below


Emphasis

  **This is bold text**

  __This is bold text__

  *This is italic text*

  _This is italic text_

  ~~Strikethrough~~


Blockquotes

  > Blockquotes can also be nested...
  >> ...by using additional greater-than signs right next to each other...
  > > > ...or with spaces between arrows.


Lists

  Unordered

  + Create a list by starting a line with \`+\`, \`-\`, or \`*\`
  + Sub-lists are made by indenting 2 spaces:
    - Marker character change forces new list start:
      * Ac tristique libero volutpat at
      + Facilisis in pretium nisl aliquet. This is a very long list item that will surely wrap onto the next line.
      - Nulla volutpat aliquam velit
  + Very easy!

  Ordered

  1. Lorem ipsum dolor sit amet
  2. Consectetur adipiscing elit. This is a very long list item that will surely wrap onto the next line.
  3. Integer molestie lorem at massa

  Start numbering with offset:

  57. foo
  58. bar


Code

  Inline \`code\`

  Indented code

      // Some comments
      line 1 of code
      line 2 of code
      line 3 of code


  Block code "fences"

  \`\`\`
  Sample text here...
  \`\`\`

  Syntax highlighting

  \`\`\` js
  var foo = function (bar) {
    return bar++;
  };

  console.log(foo(5));
  \`\`\`

Tables

  | Option | Description |
  | ------ | ----------- |
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |

  Right aligned columns

  | Option | Description |
  | ------:| -----------:|
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |


Links

  [link text](https://www.google.com)

  [link with title](https://www.google.com "title text!")

  Autoconverted link https://www.google.com (enable linkify to see)


Images

  ![Minion](https://octodex.github.com/images/minion.png)
  ![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

  Like links, Images also have a footnote style syntax

  ![Alt text][id]

  With a reference later in the document defining the URL location:

  [id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


Typographic Replacements

  Enable typographer option to see result.

  (c) (C) (r) (R) (tm) (TM) (p) (P) +-

  test.. test... test..... test?..... test!....

  !!!!!! ???? ,,  -- ---

  "Smartypants, double quotes" and 'single quotes'

`.trim();

  const sampleText2 = `
Generate tests:
\`\`\`
describe('sum', () => {
  it('should return the sum of two positive numbers', () => {
    expect(sum(2, 3)).toEqual(5);
  });
  
  it('should return the sum of two negative numbers', () => {
    expect(sum(-2, -3)).toEqual(-5);
  });
  
  it('should return the sum of a positive and a negative number', () => {
    expect(sum(-2, 3)).toEqual(1);
  });
  
  it('should return the sum of a negative and a positive number', () => {
    expect(sum(2, -3)).toEqual(-1);
  });
  
  it('should return the same number if one of the inputs is zero', () => {
    expect(sum(0, 5)).toEqual(5);
    expect(sum(-5, 0)).toEqual(-5);
  });
  
  it('should return NaN if one of the inputs is not a number', () => {
    expect(sum(2, 'hello')).toEqual(NaN);
    expect(sum(undefined, 4)).toEqual(NaN);
    expect(sum(null, 4)).toEqual(NaN);
    expect(sum({}, 4)).toEqual(NaN);
  });
  
  it('should return Infinity if one of the inputs is Infinity or -Infinity', () => {
    expect(sum(2, Infinity)).toEqual(Infinity);
    expect(sum(-2, -Infinity)).toEqual(-Infinity);
    expect(sum(0, -Infinity)).toEqual(-Infinity);
    expect(sum(Infinity, Infinity)).toEqual(Infinity);
    expect(sum(-Infinity, -Infinity)).toEqual(-Infinity);
  });
});
\`\`\`
`.trim();
});
