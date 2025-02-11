import { IMarkerErrorData } from '@opensumi/ide-ai-native/lib/browser/contrib/intelligent-completions/source/lint-error.source';
import { EInlineOperation } from './constants';


export const polishPrompt = (content: string) => {
  return `
  请按照以下步骤润色以下文本，使其语言表达更加流畅自然，并符合特定要求：

  1. 阅读全文，理解整体语境和核心信息。
  2. 优化句式结构，避免冗长或重复。
  3. 确保语言表达简洁明了，适合目标读者。
  4. 遵循以下约束条件：
    - 保持原文的核心内容和语义不变。
    - 不使用生僻词或复杂句式。
    - 避免任何主观情感或倾向性表达。
    - 输出字数不超过原文的110%。

  请根据以上要求开始润色文本:
  ${content}
  `;
};

export const translatePrompt = (article: string) => {
  return `
  请按照以下步骤将以下文本翻译成英文，并确保翻译结果符合特定要求：

  工作流程：
  1. 阅读与理解：通读全文，准确理解文本的核心信息和语境。
  2. 初步翻译：逐句翻译文本，确保语言表达通顺并传达原文意义。
  3. 优化与调整：检查翻译的语法、用词和句式结构，确保符合英语语言习惯。
  4. 校对与验证：对比原文，确认翻译内容完整无遗漏。

  约束条件：
  1. 忠实原意：翻译内容需准确传达原文的核心信息，避免误解或曲解。
  2. 语言规范：使用标准英文，避免使用俚语或不常见表达。
  3. 目标读者适配：确保翻译结果符合目标读者的文化背景和阅读习惯。
  4. 简洁优雅：翻译应避免冗长，保持语言简洁流畅。
  5. 字数控制：在不影响语义的前提下，尽量保持与原文字数相近。

  请根据以上要求完成翻译任务:
  ${article}
  `;
};

export const summarizePrompt = (article: string) => {
  return `
  请按照以下步骤总结以下文本的主要内容，确保提炼的信息准确、简洁并符合要求：

  工作流：
  1. 阅读与理解：通读全文，理解文本的核心主题和主要信息。
  2. 提取要点：识别文本中的关键事实、观点或事件，忽略次要或重复的信息。
  3. 组织内容：将提取的要点按逻辑顺序排列，确保总结内容结构清晰。
  4. 语言优化：使用简洁明了的语言表达，避免冗长或复杂的句式。
  约束：
  1. 保留核心信息：确保总结包含文本的主要观点和关键信息，不遗漏重要内容。
  2. 避免主观评价：仅陈述客观事实，不加入个人观点或推测。
  3. 字数限制：总结内容的长度不超过原文本的30%。
  4. 语法准确：确保语言表达无语法错误，且通顺流畅。
  请根据以上步骤和约束条件总结文本的主要内容:
  ${article}
  `;
};

export const expandPrompt = (article: string) => {
  return `
  请基于以下文本进行扩写，使内容更加丰富详实，并遵循以下步骤和约束条件：

  工作流
  1. 理解原文：通读全文，确保准确理解文本的核心主题和主要信息。
  2. 补充细节：围绕原文核心内容，添加背景信息、相关实例或数据支持，使内容更加详实。
  3. 扩展逻辑：分析原文的逻辑结构，适当补充论据或说明，使论述更加全面和有说服力。
  4. 检查连贯性：确保扩写后的文本在内容和语言上逻辑清晰、衔接流畅。
  约束条件
  1. 保持核心内容一致：原文的主要观点和信息不可偏离或改变。
  2. 语言风格一致：扩写部分需与原文语言风格保持一致，避免风格突兀。
  3. 避免重复：扩写时避免重复原文已有的表达，确保新增内容具有独特性和价值。
  4. 字数限制：扩写后的内容应在原文基础上增加50%-100%的字数。
  5. 适合目标读者：扩写内容应符合目标读者的知识水平和阅读习惯。
  请按照上述要求对以下文本进行扩写。
  ${article}
  `;
};

export const structurePrompt = (text: string) => {
  return `
  你是一位善于引导用户用 AI 写作的超级助手，能引导用户写出各种需求的文章。你能够给用户反馈提示词的不足，并持续帮助用户优化提示词，直到满足客户的需求。收到客户的合适提示词之后，你能够生产优质内容，不受篇幅的限制。
  请对一下文字做结构化写作：
  ${text}
  
  写作流程如下：

  1. 引导用户填写简化的模板，包含以下元素：
    - 主题和目的：简单地告诉我您要写什么,为什么要写。
    - 目标读者：简述您的预期读者是谁。
    - 风格和长度：用几个词描述您想要的写作风格,以及大致的文章长度。
    - 关键点：列出2-3个您认为最重要的内容点。
    - 特殊要求：如果有任何必须包含或必须避免的内容,请简单说明。

  2. 根据用户提供的信息，自动生成：
    - H2级别的大纲
    - 多个优化后的标题选项（包括对原标题的评分对比）

  3. 一次性呈现大纲和标题选项给用户，请求确认或调整。

  4. 用户确认后，开始创作文章。

  5. 呈现文章内容给用户。

  特别注意事项：

  - 文章格式：
    - 主标题使用 Markdown 的 H1 格式（# 标题）。
    - 每个主要段落的标题都使用 Markdown 的 H3 格式（### 标题）。

  - 如果用户要求创作深度内容或长篇文章，或者提纲复杂，你将采用分段式回复：
    - 在每次回复的结尾，标明内容未完成，并提示用户回复"继续"以生成后续内容。
    - 收到用户的"继续"指令后，seamlessly衔接上文，继续生成余下的内容。
    - 确保多次回复之间的内容连贯一致，如同一篇完整的文章。

  - 无论文章长度如何，始终保持高质量和高信息密度：
    - 避免不必要的重复内容。
    - 每个段落都应该提供有价值的信息或见解。
    - 只在必要时进行内容的重申或强调。

  - 在整个过程中，如果发现信息不足，用温和的语气提醒用户补充必要信息。

  - 根据用户的反馈灵活调整，确保最终产出满足用户需求的高质量内容。`;
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


  ${text}

  
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
