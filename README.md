# Codex Math Converter for Obsidian

Convert LaTeX math delimiters copied from Codex, ChatGPT, and other AI tools into Obsidian-friendly Markdown math with one command.

**将 Codex、ChatGPT 等工具输出的 `\(…\)`、`\[…\]` 公式一键转换为 Obsidian 使用的 `$…$`、`$$…$$`。**支持只转换选中文本，也支持转换整篇笔记。

## What it converts / 转换示例

| Input / 原文 | Output / 转换后 | Math type / 类型 |
| --- | --- | --- |
| `\(E=mc^2\)` | `$E=mc^2$` | Inline math / 行内公式 |
| `\[E=mc^2\]` | `$$E=mc^2$$` | Display math / 块级公式 |

For example, pasting this AI-generated Markdown into a note:

```text
The equation is \(E=mc^2\).

\[
  a^2+b^2=c^2
\]
```

and running the command produces:

```text
The equation is $E=mc^2$.

$$
  a^2+b^2=c^2
$$
```

The formula itself is preserved; only the opening and closing delimiters change.

## Features / 功能

- Convert `\(…\)` to `$…$` and `\[…\]` to `$$…$$` in the active Markdown note.
- If text is selected, convert only complete delimiter pairs inside that selection. With no selection, convert the whole note.
- Run from the command palette or click the **Σ** ribbon icon. Assign your own keyboard shortcut in Obsidian's Hotkeys settings.
- Skip fenced code blocks, indented code lines, inline code, and formulas already wrapped in `$` or `$$`.
- Leave unmatched delimiters unchanged. Use Obsidian's Undo command to reverse a conversion.
- Work locally on the current note; no account or network service is required.

## Install / 安装

This is a **manual-install plugin**. It is not listed in Obsidian's Community Plugins directory.

1. Download the repository ZIP from GitHub and extract it.
2. Create `.obsidian/plugins/codex-math-converter/` inside your vault, then copy `main.js` and `manifest.json` from the extracted repository into that folder.
3. Restart Obsidian, then open **Settings → Community plugins** and enable **Codex Math Converter**. You may need to turn on community plugins first.

中文：下载并解压仓库，在笔记库中新建 `.obsidian/plugins/codex-math-converter/` 文件夹，将仓库根目录的 `main.js` 和 `manifest.json` 复制进去。重启 Obsidian 后，在「设置 → 第三方插件」中启用 **Codex Math Converter**。

## Use / 使用

1. Open a Markdown note. Optionally select the text you want to convert.
2. Run **转换 Codex 公式分隔符（选区或当前笔记）** from the command palette, or click the **Σ** icon on the left ribbon.
3. To trigger it with one keystroke, find the command under **Settings → Hotkeys** and assign a shortcut.

在中文界面中，命令名称为「转换 Codex 公式分隔符（选区或当前笔记）」。有选区时只转换选区内完整配对的公式；没有选区时转换当前笔记。

## Scope / 适用范围

This plugin changes delimiter syntax only. It does not rewrite LaTeX commands, process every file in a vault, or convert math inside code blocks. A selected fragment that contains only one side of a pair is left unchanged.

本插件适合把 AI 回答、论文摘录或 Markdown 文本中的 `\(`、`\)`、`\[`、`\]` 批量整理为 Obsidian 公式格式。它只修改当前笔记或选区中的完整分隔符配对，不改写公式内容。

## Search terms / 相关搜索词

Obsidian math converter, Obsidian LaTeX delimiter converter, Codex math to Obsidian, ChatGPT math to Obsidian, `\(` to `$`, `\[` to `$$`, Obsidian 公式转换, Obsidian LaTeX 分隔符转换, Codex 公式格式转换。
