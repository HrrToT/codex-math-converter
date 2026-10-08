# Codex 公式转换器（Codex Math Converter for Obsidian）

把 Codex、ChatGPT 等 AI 工具输出的 LaTeX 公式分隔符，一键转换为 Obsidian 常用的 Markdown 公式格式。适合将 AI 回答或 Markdown 内容粘贴到笔记后，快速整理行内公式和块级公式。

| 原格式 | 转换后 | 类型 |
| --- | --- | --- |
| `\(E=mc^2\)` | `$E=mc^2$` | 行内公式 |
| `\[E=mc^2\]` | `$$E=mc^2$$` | 块级公式 |

## 功能

- 有选区时，只转换选区内完整配对的公式；没有选区时，转换当前整篇笔记。
- 可以通过命令面板或左侧栏 **Σ** 图标运行，也可以自行设置快捷键。
- 跳过围栏代码块、缩进代码行、行内代码，以及已经使用 `$` 或 `$$` 包裹的公式。
- 未配对的 `\(`、`\)`、`\[`、`\]` 保持原样；转换后可以用 Obsidian 的撤销操作恢复。
- 只处理当前笔记，不需要账号或网络服务。

## 转换示例

转换前：

```text
质能方程是 \(E=mc^2\)。

\[
  a^2+b^2=c^2
\]
```

转换后：

```text
质能方程是 $E=mc^2$。

$$
  a^2+b^2=c^2
$$
```

插件只替换公式两侧的分隔符，不改写公式内容。

## 安装

目前需要手动安装，尚未上架 Obsidian 第三方插件目录。

1. 在本仓库页面点击 **Code → Download ZIP**，然后解压。
2. 在你的 Obsidian 笔记库中创建 `.obsidian/plugins/codex-math-converter/` 文件夹。
3. 将解压后仓库根目录中的 `main.js` 和 `manifest.json` 复制到该文件夹。
4. 重启 Obsidian，在「设置 → 第三方插件」中启用 **Codex Math Converter**。若尚未开启第三方插件，请先开启。

## 使用

1. 打开一篇 Markdown 笔记。如只想转换其中一部分，先选中那段文字。
2. 在命令面板运行「**转换 Codex 公式分隔符（选区或当前笔记）**」，或点击左侧栏的 **Σ** 图标。
3. 如需一键用键盘触发，在「设置 → 快捷键」中搜索该命令并分配快捷键。

## 处理范围

插件只转换当前笔记或选区中的完整分隔符配对，不会批量修改整个笔记库。选区如果只包含公式的一侧分隔符，该公式不会被转换。代码区域中的内容也不会被修改。

## English

**Codex Math Converter** is an Obsidian plugin that converts LaTeX math delimiters copied from Codex, ChatGPT, and other AI tools: `\(…\)` → `$…$` and `\[…\]` → `$$…$$`. Convert a selection or the active note with one command. Code blocks and existing dollar-delimited math are skipped.
