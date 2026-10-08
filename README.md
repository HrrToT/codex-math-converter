# Codex 公式转换器（Codex Math Converter for Obsidian）

把 Codex、ChatGPT 等 AI 工具输出的 LaTeX 公式分隔符，一键转换为 Obsidian 常用的 Markdown 公式格式。适合将 AI 回答或 Markdown 内容粘贴到笔记后，快速整理行内公式和块级公式。

| 原格式 | 转换后 | 类型 |
| --- | --- | --- |
| `\(E=mc^2\)` | `$E=mc^2$` | 行内公式 |
| `\[E=mc^2\]` | `$$E=mc^2$$` | 块级公式 |

## 功能

- 选中一段文字即可转换其中的公式；不选中文本时，转换当前整篇笔记。
- 可以通过命令面板或左侧栏 **Σ** 图标运行，也可以自行设置快捷键。
- 识别正文中的公式分隔符，保留代码和已有的 `$`、`$$` 公式格式。
- 可使用 Obsidian 的撤销操作恢复转换。
- 在本地运行，无需账号或网络服务。

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

转换保留原有的公式内容。

## 安装

从 GitHub 下载插件文件后，手动安装到笔记库：

1. 在本仓库页面点击 **Code → Download ZIP**，然后解压。
2. 在你的 Obsidian 笔记库中创建 `.obsidian/plugins/codex-math-converter/` 文件夹。
3. 将解压后仓库根目录中的 `main.js` 和 `manifest.json` 复制到该文件夹。
4. 重启 Obsidian，在「设置 → 第三方插件」中开启第三方插件并启用 **Codex Math Converter**。

## 使用

1. 打开一篇 Markdown 笔记。如只想转换其中一部分，先选中那段文字。
2. 在命令面板运行「**转换 Codex 公式分隔符（选区或当前笔记）**」，或点击左侧栏的 **Σ** 图标。
3. 如需一键用键盘触发，在「设置 → 快捷键」中搜索该命令并分配快捷键。

## English

**Codex Math Converter** is an Obsidian plugin that converts LaTeX math delimiters copied from Codex, ChatGPT, and other AI tools: `\(…\)` → `$…$` and `\[…\]` → `$$…$$`. Convert a selection or the active note with one command.
