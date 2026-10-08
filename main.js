"use strict";

const { MarkdownView, Notice, Plugin } = require("obsidian");

function mark(mask, start, end) {
  mask.fill(1, start, end);
}

function runLength(text, start, character) {
  let end = start;
  while (end < text.length && text[end] === character) end++;
  return end - start;
}

function isEscaped(text, index) {
  let slashes = 0;
  for (let i = index - 1; i >= 0 && text[i] === "\\"; i--) slashes++;
  return slashes % 2 === 1;
}

function maskCodeBlocks(text, mask) {
  let position = 0;
  let fence = null;

  while (position < text.length) {
    const newline = text.indexOf("\n", position);
    const end = newline === -1 ? text.length : newline + 1;
    const line = text.slice(position, newline === -1 ? end : newline).replace(/\r$/, "");
    const candidate = /^( {0,3})(`{3,}|~{3,})(.*)$/.exec(line);

    if (fence) {
      mark(mask, position, end);
      if (candidate && candidate[2][0] === fence.character &&
          candidate[2].length >= fence.length && /^\s*$/.test(candidate[3])) {
        fence = null;
      }
    } else if (candidate) {
      fence = { character: candidate[2][0], length: candidate[2].length };
      mark(mask, position, end);
    } else if (/^( {4}|\t)/.test(line)) {
      mark(mask, position, end);
    }

    position = end;
  }
}

function maskInlineCode(text, mask) {
  for (let i = 0; i < text.length;) {
    if (mask[i] || text[i] !== "`") { i++; continue; }
    const length = runLength(text, i, "`");
    let close = i + length;
    let found = false;
    while (close < text.length) {
      if (mask[close]) break;
      if (text[close] !== "`") { close++; continue; }
      const closingLength = runLength(text, close, "`");
      if (closingLength === length && !mask.subarray(close, close + length).includes(1)) {
        found = true;
        break;
      }
      close += closingLength;
    }
    if (found) {
      mark(mask, i, close + length);
      i = close + length;
    } else {
      i += length;
    }
  }
}

function maskExistingMath(text, mask) {
  for (let i = 0; i < text.length;) {
    if (mask[i] || text[i] !== "$" || isEscaped(text, i)) { i++; continue; }
    const length = runLength(text, i, "$");
    if (length > 2 || mask.subarray(i, i + length).includes(1) ||
        (length === 1 && (!text[i + 1] || /\s/.test(text[i + 1])))) {
      i += length;
      continue;
    }
    let close = i + length;
    let found = false;
    while (close < text.length) {
      if (mask[close]) break;
      if (text[close] !== "$" || isEscaped(text, close)) { close++; continue; }
      const closingLength = runLength(text, close, "$");
      if (closingLength === length && !mask.subarray(close, close + length).includes(1) &&
          (length === 2 || (close > i + length && !/\s/.test(text[close - 1])))) {
        found = true;
        break;
      }
      close += closingLength;
    }
    if (found) {
      mark(mask, i, close + length);
      i = close + length;
    } else {
      i += length;
    }
  }
}

function findClosingDelimiter(text, mask, start, closing, opening) {
  for (let i = start; i < text.length - 1; i++) {
    if (mask[i]) return -1;
    if (text[i] !== "\\" || mask[i + 1] || isEscaped(text, i)) continue;
    if (text[i + 1] === opening) return -1;
    if (text[i + 1] === closing) return i;
  }
  return -1;
}

function convert(text, start = 0, end = text.length) {
  const mask = new Uint8Array(text.length);
  maskCodeBlocks(text, mask);
  maskInlineCode(text, mask);
  maskExistingMath(text, mask);

  const edits = [];
  let count = 0;
  for (let i = start; i < end - 1;) {
    if (mask[i] || text[i] !== "\\" || isEscaped(text, i) ||
        (text[i + 1] !== "(" && text[i + 1] !== "[")) { i++; continue; }

    const opening = text[i + 1];
    const closing = opening === "(" ? ")" : "]";
    const close = findClosingDelimiter(text, mask, i + 2, closing, opening);
    if (close < 0 || close + 2 > end) { i += 2; continue; }

    const replacement = opening === "(" ? "$" : "$$";
    edits.push({ start: i, end: i + 2, replacement });
    edits.push({ start: close, end: close + 2, replacement });
    count++;
    i = close + 2;
  }

  const pieces = [];
  let position = start;
  for (const edit of edits) {
    pieces.push(text.slice(position, edit.start), edit.replacement);
    position = edit.end;
  }
  pieces.push(text.slice(position, end));
  return { text: pieces.join(""), count };
}

function positionToOffset(text, position) {
  let offset = 0;
  for (let line = 0; line < position.line; line++) {
    const newline = text.indexOf("\n", offset);
    if (newline < 0) return text.length;
    offset = newline + 1;
  }
  return Math.min(offset + position.ch, text.length);
}

function convertEditor(editor) {
  const source = editor.getValue();
  const selection = editor.getSelection();
  const hasSelection = selection.length > 0;
  const start = hasSelection ? positionToOffset(source, editor.getCursor("from")) : 0;
  const end = hasSelection ? positionToOffset(source, editor.getCursor("to")) : source.length;
  const result = convert(source, start, end);

  if (result.count > 0) {
    if (hasSelection) {
      editor.replaceSelection(result.text);
    } else {
      const lastLine = editor.lastLine();
      editor.replaceRange(result.text, { line: 0, ch: 0 },
        { line: lastLine, ch: editor.getLine(lastLine).length });
    }
  }

  new Notice(result.count > 0
    ? `已转换 ${result.count} 处公式分隔符`
    : "没有找到可转换的公式分隔符");
}

module.exports = class CodexMathConverter extends Plugin {
  onload() {
    this.addCommand({
      id: "convert-math-delimiters",
      name: "转换 Codex 公式分隔符（选区或当前笔记）",
      editorCallback: (editor) => convertEditor(editor),
    });

    this.addRibbonIcon("sigma", "转换 Codex 公式分隔符", () => {
      const view = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (view) convertEditor(view.editor);
      else new Notice("请先打开一篇 Markdown 笔记");
    });
  }
};
