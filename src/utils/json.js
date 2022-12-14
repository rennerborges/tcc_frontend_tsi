import clarinet from 'clarinet';

export function downloadTextFile(text, name) {
  const a = document.createElement('a');
  const type = name.split('.').pop();
  a.href = URL.createObjectURL(
    new Blob([text], { type: `text/${type === 'txt' ? 'plain' : type}` })
  );
  a.download = name;
  a.click();
}

export function getJSONParseError(json) {
  var parser = clarinet.parser(),
    firstError = undefined;

  // generate a detailed error using the parser's state
  function makeError(e) {
    var currentNL = 0,
      nextNL = json.indexOf('\n'),
      line = 1;
    while (line < parser.line) {
      currentNL = nextNL;
      nextNL = json.indexOf('\n', currentNL + 1);
      ++line;
    }
    return {
      snippet: json.substr(currentNL + 1, nextNL - currentNL - 1),
      message: (e.message || '').split('\n', 1)[0],
      line: parser.line,
      column: parser.column,
    };
  }

  // trigger the parse error
  parser.onerror = function (e) {
    firstError = makeError(e);
    parser.close();
  };
  try {
    parser.write(json).close();
  } catch (e) {
    if (firstError === undefined) {
      return makeError(e);
    } else {
      return firstError;
    }
  }

  return firstError;
}
