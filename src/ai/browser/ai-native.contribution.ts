import { Autowired } from '@opensumi/di';
import {
  AIBackSerivcePath,
  ChatServiceToken,
  getDebugLogger,
  IChatContent,
  IChatProgress,
  IAIBackService,
  CancellationToken,
  ChatResponse,
  ECodeEditsSourceTyping,
} from '@opensumi/ide-core-common';
import { ClientAppContribution, Domain, getIcon } from '@opensumi/ide-core-browser';
import { ComponentContribution, ComponentRegistry } from '@opensumi/ide-core-browser/lib/layout';
import { AINativeCoreContribution, ERunStrategy, IChatFeatureRegistry, IInlineChatFeatureRegistry, IIntelligentCompletionsRegistry, IProblemFixContext, IProblemFixProviderRegistry, IRenameCandidatesProviderRegistry, ITerminalProviderRegistry, TChatSlashCommandSend, TerminalSuggestionReadableStream } from '@opensumi/ide-ai-native/lib/browser/types';
import { ICodeEditor, MarkdownString, NewSymbolNameTag, Range } from '@opensumi/ide-monaco';
import { MessageService } from '@opensumi/ide-overlay/lib/browser/message.service';
import { BaseTerminalDetectionLineMatcher, JavaMatcher, MatcherType, NodeMatcher, NPMMatcher, ShellMatcher, TSCMatcher } from '@opensumi/ide-ai-native/lib/browser/contrib/terminal/matcher';
import { ChatService } from '@opensumi/ide-ai-native/lib/browser/chat/chat.api.service';
import { InlineChatController } from '@opensumi/ide-ai-native/lib/browser/widget/inline-chat/inline-chat-controller';
import { ITerminalCommandSuggestionDesc } from '@opensumi/ide-ai-native/lib/common';
import { listenReadable } from '@opensumi/ide-utils/lib/stream';

import { AI_MENU_BAR_LEFT_ACTION, EInlineOperation } from './constants'
import { LeftToolbar } from './components/left-toolbar'
import { polishPrompt, translatePrompt, summarizePrompt, expandPrompt, detectIntentPrompt, RenamePromptManager, terminalCommandSuggestionPrompt, codeEditsLintErrorPrompt } from './prompt'
import { CommandRender } from './command/command-render'
import { AITerminalDebugService } from './ai-terminal-debug.service'
import { InlineChatOperationModel } from './inline-chat-operation'
import { AICommandService } from './command/command.service'
import YYDZPng from './assets/YYDZ.png'
import { ILinterErrorData } from '@opensumi/ide-ai-native/lib/browser/contrib/intelligent-completions/source/lint-error.source';

@Domain(ComponentContribution, AINativeCoreContribution)
export class AINativeContribution implements ComponentContribution, AINativeCoreContribution {
  @Autowired(MessageService)
  protected readonly messageService: MessageService;

  @Autowired(AITerminalDebugService)
  protected readonly terminalDebugService: AITerminalDebugService;

  @Autowired(ChatServiceToken)
  private readonly chatService: ChatService;

  @Autowired(InlineChatOperationModel)
  inlineChatOperationModel: InlineChatOperationModel;

  @Autowired(AIBackSerivcePath)
  private aiBackService: IAIBackService;

  @Autowired(AICommandService)
  aiCommandService: AICommandService;

  logger = getDebugLogger();

  registerComponent(registry: ComponentRegistry): void {
    registry.register(AI_MENU_BAR_LEFT_ACTION, {
      id: AI_MENU_BAR_LEFT_ACTION,
      component: LeftToolbar,
    });
  }

  // 注册聊天功能
  registerChatFeature(registry: IChatFeatureRegistry): void {
    // 注册欢迎信息
    registry.registerWelcome(
      // 创建Markdown字符串，包含欢迎信息和图片
      new MarkdownString(`<img src="${YYDZPng}" />
      你好，我是丁真，我来辅助你写作</br>芝士雪豹`),
      [
        {
          // 设置图标
          icon: getIcon('send-hollow'),
          // 设置标题
          title: '写一篇有关雪豹的文章',
          // 设置消息内容
          message: '写一篇有关雪豹的文章',
        },
      ],
    );

    const interceptExecute = (value: string, slash: string, editor?: ICodeEditor): string => {
      if (!editor) {
        return '';
      }
      const model = editor.getModel();

      const selection = editor.getSelection();
      let selectCode: string | undefined;
      if (selection) {
        selectCode = model!.getValueInRange(selection);
      }

      const parseValue = value.replace(slash, '');

      if (!parseValue.trim()) {
        if (!selectCode) {
          this.messageService.info('很抱歉，您并未选中或输入任何代码，请先选中或输入代码');
          return '';
        }

        return value + `\n\`\`\`${model?.getLanguageId()}\n${selectCode}\n\`\`\``;
      }

      return value;
    };

    registry.registerSlashCommand(
      {
        name: 'Polish',
        description: '润色',
        isShortcut: true,
        tooltip: '润色',
      },
      {
        providerInputPlaceholder(_value, _editor) {
          return '请输入文字';
        },
        providerPrompt(value: string, editor?: ICodeEditor) {
          if (!editor) {
            return value;
          }
          const parseValue = value.replace('/Polish', '');
          const model = editor.getModel();
          return polishPrompt(parseValue);
        },
        execute: (value: string, send: TChatSlashCommandSend, editor?: ICodeEditor) => {
          const parseValue = interceptExecute(value, '/Polish', editor);

          if (!parseValue) {
            return;
          }

          send(parseValue);
        },
      },
    );

    registry.registerSlashCommand(
      {
        name: 'Summarize',
        description: '总结',
        isShortcut: true,
        tooltip: '总结'
      },
      {
        providerInputPlaceholder(_value, _editor) {
          return '请输入文字';
        },
        providerPrompt(value: string, editor?: ICodeEditor) {
          if (!editor) {
            return value;
          }
          const parseValue = value.replace('/Summarize', '');
          return summarizePrompt(parseValue);
        },
        execute: (value: string, send: TChatSlashCommandSend, editor?: ICodeEditor) => {
          const parseValue = interceptExecute(value, '/Summarize', editor);

          if (!parseValue) {
            return;
          }

          send(parseValue);
        },
      },
    );

    registry.registerSlashCommand(
      {
        name: 'Expand',
        description: '扩写',
        isShortcut: true,
        tooltip: '扩写'
      },
      {
        providerInputPlaceholder(_value, _editor) {
          return '请输入文字';
        },
        providerPrompt(value: string, editor?: ICodeEditor) {
          if (!editor) {
            return value;
          }
          const parseValue = value.replace('/Expand', '');
          return expandPrompt(parseValue);
        },
        execute: (value: string, send: TChatSlashCommandSend, editor?: ICodeEditor) => {
          const parseValue = interceptExecute(value, '/Expand', editor);

          if (!parseValue) {
            return;
          }

          send(parseValue);
        },
      },
    );

    registry.registerSlashCommand(
      {
        name: 'IDE',
        description: '执行 IDE 相关命令',
      },
      {
        providerInputPlaceholder(_value, _editor) {
          return '可以问我任何问题，或键入主题 \"/\"';
        },
        providerRender: CommandRender,
        execute: (value: string, send: TChatSlashCommandSend) => {
          const parseValue = value.replace('/IDE', '');

          if (!parseValue) {
            this.messageService.warning('请输入要执行的 IDE 命令');
            return;
          }

          send(parseValue);
        },
      },
    );
  }

  // 注册内联聊天功能
  registerInlineChatFeature(registry: IInlineChatFeatureRegistry) {
    // 注册终端内联聊天功能，提供解释选中内容的功能
    registry.registerTerminalInlineChat(
      {
        id: 'terminal-explain', // 唯一标识符
        name: 'Explain', // 功能名称
        title: '解释选中的内容' // 功能标题
      },
      {
        triggerRules: 'selection', // 触发规则为选中内容
        execute: async (stdout: string) => { // 执行函数，接收终端输出
          // 生成解释提示，调用 terminalDebugService 的 generatePrompt 方法
          const { message, prompt } = await this.terminalDebugService.generatePrompt({
            type: MatcherType.base, // 匹配器类型
            errorText: stdout, // 传入的终端输出
            operate: 'explain' // 操作类型为解释
          });

          // 发送消息到聊天服务
          this.chatService.sendMessage({
            message, // 消息内容
            prompt, // 提示内容
            reportType: 'terminal-selection-explain' as any // 报告类型
          });
        },
      },
    );

    registry.registerTerminalInlineChat(
      {
        id: 'terminal-debug',
        name: 'debug',
        title: '分析选中内容'
      },
      {
        triggerRules: [
          NodeMatcher,
          TSCMatcher,
          NPMMatcher,
          ShellMatcher,
          JavaMatcher,
        ],
        execute: async (stdout: string, _stdin: string, rule?: BaseTerminalDetectionLineMatcher) => {
          const { message, prompt } = await this.terminalDebugService.generatePrompt({
            type: rule!.type,
            errorText: stdout,
            operate: 'debug'
          });

          this.chatService.sendMessage({
            message,
            prompt,
            reportType: 'terminal-explain' as any
          });
        },
      },
    );

    registry.registerEditorInlineChat(
      {
        id: `ai-${EInlineOperation.Polish}`,
        name: EInlineOperation.Polish,
        title: '润色',
        renderType: 'button',
        codeAction: {
          isPreferred: true,
        },
      },
      {
        execute: (editor: ICodeEditor) => {
          // 直接调用 InlineChatOperationModel 中的润色方法，不需要等待返回值
          this.inlineChatOperationModel[EInlineOperation.Polish](editor);
        }
      },
    );

    // 翻译按钮
    registry.registerEditorInlineChat(
      {
        id: `ai-${EInlineOperation.Translate}`,
        name: EInlineOperation.Translate,
        title: '翻译',
        renderType: 'button',
        codeAction: {
          isPreferred: true,
          kind: 'refactor.rewrite',
        },
      },
      {
        execute: (editor: ICodeEditor) => {
          // 直接调用 InlineChatOperationModel 中的润色方法，不需要等待返回值
          this.inlineChatOperationModel[EInlineOperation.Translate](editor);
        }
      },
    );

    // 总结按钮
    registry.registerEditorInlineChat(
      {
        id: `ai-${EInlineOperation.Summarize}`,
        name: EInlineOperation.Summarize,
        title: '总结',
        renderType: 'button',
        codeAction: {
          isPreferred: true,
        },
      },
      {
        execute: (editor: ICodeEditor) => {
          // 直接调用 InlineChatOperationModel 中的润色方法，不需要等待返回值
          this.inlineChatOperationModel[EInlineOperation.Summarize](editor);
        }
      },
    );

    // 扩写按钮
    registry.registerEditorInlineChat(
      {
        id: `ai-${EInlineOperation.Expand}`,
        name: EInlineOperation.Expand,
        title: '扩写',
        renderType: 'dropdown',
        codeAction: {
          isPreferred: true,
          kind: 'refactor.rewrite',
        },
      },
      {
        execute: (editor: ICodeEditor) => {
          // 直接调用 InlineChatOperationModel 中的润色方法，不需要等待返回值
          this.inlineChatOperationModel[EInlineOperation.Expand](editor);
        }
      },
    );

    /**
     * 注册 inlinchat 输入框
     */
    registry.registerInteractiveInput(
      {
        handleStrategy: async (_editor, value) => {
          const result = await this.aiBackService.request(detectIntentPrompt(value), {});

          let operation: string = result.data as EInlineOperation;

          // 如果模型因为报错没返回字段，则默认选择 preview 模式
          if (!operation) {
            return ERunStrategy.PREVIEW;
          }

          if (operation[0] === '[' && operation[operation.length - 1] === ']') {
            operation = operation.slice(1, -1)
          }

          if (
            operation.startsWith(EInlineOperation.Polish) ||
            operation.startsWith(EInlineOperation.Translate)
          ) {
            return ERunStrategy.EXECUTE;
          }

          return ERunStrategy.PREVIEW;
        },
      },
      {
        execute: (editor, value) => {
          const model = editor.getModel();
          if (!model) {
            return;
          }

          const crossCode = this.getCrossCode(editor);
          const prompt = `${value}：\n\`\`\`${model.getLanguageId()}\n${crossCode}\n\`\`\``;

          this.chatService.sendMessage({
            message: prompt,
            prompt,
          });
        },
        providePreviewStrategy: async (editor, value, token) => {
          const model = editor.getModel();
          const crossCode = this.getCrossCode(editor);

          let prompt = `${value}`;
          if (crossCode) {
            prompt += `：\n\`\`\`${model!.getLanguageId()}\n${crossCode}\n\`\`\``;
          }

          const controller = new InlineChatController({ enableTextRender: true });
          const stream = await this.aiBackService.requestStream(prompt, {}, token);
          controller.mountReadable(stream);

          return controller;
        },
      }
    );
  }

  registerRenameProvider(registry: IRenameCandidatesProviderRegistry) {
    registry.registerRenameSuggestionsProvider(async (model, range, token) => {
      const above = model.getValueInRange({
        startColumn: 0,
        startLineNumber: 0,
        endLineNumber: range.startLineNumber,
        endColumn: range.startColumn,
      });
      const varName = model.getValueInRange(range);
      const below = model.getValueInRange({
        startColumn: range.endColumn,
        startLineNumber: range.endLineNumber,
        endLineNumber: model.getLineCount(),
        endColumn: Number.MAX_SAFE_INTEGER,
      });

      const prompt = RenamePromptManager.requestPrompt(model.getLanguageId(), varName, above, below);

      this.logger.info('rename prompt', prompt);

      const result = await this.aiBackService.request(
        prompt,
        {
          type: 'rename',
        },
        token,
      );

      this.logger.info('rename result', result);

      if (result.data) {
        const names = RenamePromptManager.extractResponse(result.data);

        return names.map((name) => ({
          newSymbolName: name,
          tags: [NewSymbolNameTag.AIGenerated],
        }));
      }
    });
  }

  private getCrossCode(monacoEditor: ICodeEditor): string {
    const model = monacoEditor.getModel();
    if (!model) {
      return '';
    }

    const selection = monacoEditor.getSelection();

    if (!selection) {
      return '';
    }

    const crossSelection = selection
      .setStartPosition(selection.startLineNumber, 1)
      .setEndPosition(selection.endLineNumber, Number.MAX_SAFE_INTEGER);
    const crossCode = model.getValueInRange(crossSelection);
    return crossCode;
  }

  registerTerminalProvider(register: ITerminalProviderRegistry): void {
    let aiCommandSuggestions: ITerminalCommandSuggestionDesc[] = [];
    let currentObj = {} as ITerminalCommandSuggestionDesc;

    const processLine = (lineBuffer: string, stream: TerminalSuggestionReadableStream) => {
      const firstCommandIndex = lineBuffer.indexOf('#Command#:');
      let line = lineBuffer;

      if (firstCommandIndex !== -1) {
        // 找到了第一个#Command#:，截取它及之后的内容
        line = lineBuffer.substring(firstCommandIndex);
      }

      // 解析命令和描述
      if (line.startsWith('#Command#:')) {
        if (currentObj.command) {
          // 如果currentObj中已有命令，则将其添加到结果数组中，并开始新的对象
          currentObj = {} as ITerminalCommandSuggestionDesc;
        }
        currentObj.command = line.substring('#Command#:'.length).trim();
      } else if (line.startsWith('#Description#:')) {
        currentObj.description = line.substring('#Description#:'.length).trim();
        aiCommandSuggestions.push(currentObj);
        if (aiCommandSuggestions.length > 4) {
          // 如果 AI 返回的命令超过 5 个，就停止 AI 生成 (这种情况下往往是模型不稳定或者出现了幻觉)
          stream.end();
        }
        stream.emitData(currentObj);// 每拿到一个结果就回调一次，优化用户体感
      }
    };

    register.registerCommandSuggestionsProvider(async (message, token) => {
      const prompt = terminalCommandSuggestionPrompt(message);

      aiCommandSuggestions = [];
      const backStream = await this.aiBackService.requestStream(prompt, {}, token);
      const stream = TerminalSuggestionReadableStream.create();

      let buffer = '';

      listenReadable<IChatProgress>(backStream, {
        onData: (data) => {
          const { content } = data as IChatContent;

          buffer += content;
          let newlineIndex = buffer.indexOf('\n');
          while (newlineIndex !== -1) {
            const line = buffer.substring(0, newlineIndex).trim();
            buffer = buffer.substring(newlineIndex + 1);
            processLine(line, stream);
            newlineIndex = buffer.indexOf('\n');
          }
        },
        onEnd: () => {
          buffer += '\n';
          let newlineIndex = buffer.indexOf('\n');
          while (newlineIndex !== -1) {
            const line = buffer.substring(0, newlineIndex).trim();
            buffer = buffer.substring(newlineIndex + 1);
            processLine(line, stream);
            newlineIndex = buffer.indexOf('\n');
          }
          stream.end();
        },
      });

      return stream;
    });
  }


  // 注册问题修复功能
  registerProblemFixFeature(registry: IProblemFixProviderRegistry): void {
    // 注册悬停修复提供者
    registry.registerHoverFixProvider({
      // 提供修复的方法
      provideFix: async (
        editor: ICodeEditor, // 编辑器实例
        context: IProblemFixContext, // 上下文，包含问题信息
        token: CancellationToken, // 取消令牌
      ): Promise<ChatResponse | InlineChatController> => {
        const { marker, editRange } = context; // 从上下文中解构出标记和编辑范围

        // 构建提示信息，包含原始代码和 lint 错误信息
        const prompt = `原始代码内容:
\`\`\`
${editor.getModel()!.getValueInRange(editRange)} // 获取编辑范围内的代码
\`\`\`

        lint error 信息:
        
        ${marker.message}. // 获取 lint 错误信息

        请根据 lint error 信息修复代码！ // 请求修复代码的指示
        不需要任何解释，只要返回修复后的代码块内容`;

        // 创建一个新的 InlineChatController 实例，用于处理聊天交互
        const controller = new InlineChatController({ enableTextRender: true });
        // 请求 AI 服务流，传入提示信息
        const stream = await this.aiBackService.requestStream(prompt, {}, token);
        // 将可读流挂载到控制器上
        controller.mountReadable(stream);

        return controller; // 返回控制器
      },
    });
  }

  registerIntelligentCompletionFeature(registry: IIntelligentCompletionsRegistry): void {
    registry.registerCodeEditsProvider(async (editor, _position, bean, token) => {
      const model = editor.getModel();
      if (!model) {
        return;
      }

      if (bean.typing === ECodeEditsSourceTyping.LinterErrors) {
        const errors = (bean.data as ILinterErrorData).errors;

        if (errors.length === 0) {
          return;
        }

        const lastItem = errors[errors.length - 1];
        const lastRange = lastItem.range;

        const waringRange = Range.fromPositions(
          { lineNumber: errors[0].range.startPosition.lineNumber, column: 1 },
          { lineNumber: lastRange.endPosition.lineNumber, column: model!.getLineMaxColumn(lastRange.endPosition.lineNumber) }
        );

        const prompt = codeEditsLintErrorPrompt(model.getValueInRange(waringRange), errors);
        const response = await this.aiBackService.request(prompt, {}, token);

        if (response.data) {
          // const controller = new InlineChatController({ enableCodeblockRender: true });
          const controller = new InlineChatController({ enableTextRender: true });
          const codeData = controller['calculateCodeBlocks'](response.data);

          return {
            items: [
              {
                insertText: codeData,
                range: waringRange
              }
            ]
          };
        }
      }
      return undefined;
    });
  }
}
