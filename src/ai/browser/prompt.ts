import { IMarkerErrorData } from '@opensumi/ide-ai-native/lib/browser/contrib/intelligent-completions/source/lint-error.source';
import { EInlineOperation } from './constants';


export const polishPrompt = (content: string) => {
  return `请润色优化以下文本，使其更加流畅自然：\n\`\`\`${content}\n\`\`\``;
};

export const translatePrompt = (article: string) => {
  return `请将以下文本翻译成英文：\n\`\`\`\n ${article}\n\`\`\``;
};

export const summarizePrompt = (article: string) => {
  return `请总结以下文本的主要内容：\n\`\`\`\n ${article}\`\`\``;
};

export const expandPrompt = (article: string) => {
  return `请基于以下文本进行扩写，使内容更加丰富详实：\n\`\`\`\n${article}\`\`\``;
};

export const detectIntentPrompt = (input: string) => {
  return `
  在我的编辑器中，存在一些指令，这些指令可以被分成几组，下面给出全部的分组及分组简介，请针对用户给出的提问，找到对应的分组。

  指令分组：
  * [解释]: 解释文章内容，简明扼要地概述文章要点
  * [评论]: 添加评论，提供文章的反馈和建议
  * [检查]: 检查文章内容，提出改进的建议
  * [优化]: 优化文章，提升结构、风格和流畅度
  * [创意激发]: 帮助作者产生创意灵感，拓展写作思路
  * [大纲]: 规划文章大纲，帮助构建文章框架
  * [摘要生成]: 自动生成文章摘要
  * [审阅]: 审阅文章内容，提供全面评审
  * [纠错]: 检查并修正文章中的错误
  * [风格优化]: 提升文章风格，使其更具吸引力
  * [格式调整]: 改进文章格式，确保规范统一
  * [无适用]: 如果提问不适合以上任何分组，请返回无适用分组
  
  提问: ${input}
  回答: [分组名称]，请返回上述的指令分组名称，不要包含其它内容
  `;
};

export const terminalCommandSuggestionPrompt = (message: string) => {
  return `
  你是一位创意写作专家，现在我需要通过自然语言描述生成写作提示或文章命令，只需生成 1 到 5 个写作提示。
  提示：使用 . 来表示当前文本内容
  下面是自然语言描述和其对应的写作提示：
  提问: 描述某一场景的细节
  回答:
  #提示#: 用生动的描写展现场景的氛围和细节
  #描述#: 描述场景中人物的表情、环境和氛围
  提问: ${message}`;
};

export class RenamePromptManager {
  static requestPrompt(content: string, wordChoice: string, before: string, after: string) {
    const prompt = `
    请帮我推荐 5 个更符合文章上下文、更有意义的词汇或短语替换 "${wordChoice}"。
我将分段提供文章内容，第一段是词汇或短语的上下文，第二段是目标词汇或短语，第三段是接下来的上下文。

---
${before.slice(-500)}
---

---
${wordChoice}
---

---
${after.slice(0, 500)}
---

你的任务是：
根据上下文和文章的风格，帮我推荐一些替代词汇或短语，仅需输出建议替代的词汇或短语，不需要输出所有的文章内容。将结果放在代码块中（用 \`\`\` 包裹），每行一个，不用带序号。`;
    return prompt;
  }

  static extractResponse(data: string) {
    const codeBlock = /```([\s\S]*?)```/g;
    const result = data.match(codeBlock);

    if (!result) {
      return [];
    }

    const lines = result[0].replace(/```/g, '').trim().split('\n');
    return lines;
  }
}


export const codeEditsLintErrorPrompt = (text: string, errors: IMarkerErrorData[]) => {
  return `
  # Role: 写作辅导专家

  ## Description:
  写作辅导专家帮助用户解决写作中的各种问题，从结构安排到语言表达，提供即时建议和指导。

  ### 经历：
  - 写作技巧
  - 文学分析
  - 教育辅导经验

  ### 信念：
  - 用户为中心
  - 实用与简洁
  - 持续优化

  ### 技能：
  - 文本结构优化
  - 语言表达建议
  - 语法与风格纠正

  ### 表达：
  - 简洁明了
  - 实用性强

  ## Constraints：
  - 提供简洁有效的写作建议
  - 无需过度复杂化表达
  - 保证建议符合用户风格

  ## Goals：
  - 提供即时写作辅导，帮助用户解决写作中的障碍

  ## Skills List：
  - **文本分析**：快速分析用户文本，识别问题
  - **写作建议**：提供结构、语法和风格方面的优化建议
  - **风格适应**：根据用户的写作风格提供个性化建议

  ## Workflow：
  - *识别问题**：识别用户文本中的问题
  - *提供建议**：根据问题提供简明的改进建议
  - *反馈优化**：根据用户反馈调整建议方向

  ## WritingSnippet：
  - 以下是有问题的文章片段

\`\`\`
${text}
\`\`\`
  
  ##LintErrors:
  ${JSON.stringify(errors.map(e => ({ message: e.message })))}

  请根据上述错误信息，直接提供修复后的文章，不需要解释
`;
};

// 写作工具相关提示词
export const writingPrompts = {
  creativity: (context: WritingToolContext) => `
    作为一个创意写作助手，请帮助激发写作灵感。
    当前写作上下文:
    标题: ${context.documentMetadata.title}
    已选内容: ${context.selectedText}
    完整内容: ${context.fullText}

    请从以下几个方面提供创意建议:
    1. 情节发展可能性
    2. 人物塑造建议
    3. 场景描写灵感
    4. 写作技巧提示
  `,

  outline: (context: WritingToolContext) => `
    作为写作大纲助手，请分析当前文本并提供大纲建议。
    当前文本:
    ${context.fullText}

    请提供:
    1. 现有结构分析
    2. 大纲调整建议
    3. 逻辑优化方案
  `,

  summary: (context: WritingToolContext) => `
    请对以下文本生成摘要:
    ${context.fullText}

    要求:
    1. 提炼核心观点
    2. 保留关键信息
    3. 突出文章特色
    4. 控制在300字以内
  `,

  review: (context: WritingToolContext) => `
    请对以下文本进行全面审阅:
    ${context.fullText}

    审阅维度:
    1. 内容完整性
    2. 逻辑连贯性
    3. 语言表达
    4. 格式规范
    5. 创新亮点
  `,

  correction: (context: WritingToolContext) => `
    请对以下文本进行纠错:
    ${context.fullText}

    检查内容:
    1. 错别字
    2. 语法错误
    3. 标点符号
    4. 格式问题
    5. 表达不当

    请按以下格式返回:
    错误类型: [类型]
    原文: [原文]
    建议: [修改建议]
    原因: [修改原因]
  `,

  style: (context: WritingToolContext) => `
    请对以下文本进行风格优化:
    ${context.fullText}

    优化目标:
    1. 提升文学性
    2. 增强表现力
    3. 统一写作风格
    4. 突出个人特色

    请按以下格式返回:
    优化方面: [方面]
    原文: [原文]
    改进: [改进建议]
    说明: [改进说明]
  `
};
