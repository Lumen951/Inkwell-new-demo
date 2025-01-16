import { Autowired, Injectable } from "@opensumi/di";
import { ChatService } from "@opensumi/ide-ai-native/lib/browser/chat/chat.api.service";
import { InlineChatController, InlineChatControllerOptions } from "@opensumi/ide-ai-native/lib/browser/widget/inline-chat/inline-chat-controller";
import { AIBackSerivcePath, CancellationToken, ChatServiceToken, IAIBackService } from "@opensumi/ide-core-common";
import { ICodeEditor } from "@opensumi/ide-monaco";
import { polishPrompt, translatePrompt, summarizePrompt, expandPrompt } from "./prompt";
import { EInlineOperation } from './constants';

@Injectable()
export class InlineChatOperationModel {
  @Autowired(AIBackSerivcePath)
  private readonly aiBackService: IAIBackService;

  @Autowired(ChatServiceToken)
  private readonly aiChatService: ChatService;

  // 定义一个私有方法 getCrossCode，接受一个 ICodeEditor 类型的参数 monacoEditor，返回一个字符串
  private getCrossCode(monacoEditor: ICodeEditor): string {
    // 获取编辑器的模型
    const model = monacoEditor.getModel();
    // 如果模型不存在，返回空字符串
    if (!model) {
      return '';
    }

    // 获取当前选中的文本范围
    const selection = monacoEditor.getSelection();

    // 如果没有选中内容，返回空字符串
    if (!selection) {
      return '';
    }

    // 创建一个新的选择范围，起始位置为选中行的开始位置，结束位置为选中行的最大列数
    const crossSelection = selection
      .setStartPosition(selection.startLineNumber, 1) // 设置起始行的列为1
      .setEndPosition(selection.endLineNumber, Number.MAX_SAFE_INTEGER); // 设置结束行为选中行的最大列数
    // 获取在新选择范围内的代码
    const crossCode = model.getValueInRange(crossSelection);
    // 返回获取到的代码
    return crossCode;
  }

  // 定义一个异步方法，用于处理润色操作
  public [EInlineOperation.Polish](editor: ICodeEditor): void {
    const text = this.getCrossCode(editor);
    if (!text || text.trim() === '') {
      return;
    }

    const prompt = polishPrompt(text);

    this.aiChatService.sendMessage({
      message: `润色以下文字: \n${text}`,
      prompt: prompt,
    });
  }
  
  public [EInlineOperation.Translate](editor: ICodeEditor): void {
    const text = this.getCrossCode(editor);
    if (!text || text.trim() === '') {
      return;
    }

    const prompt = translatePrompt(text);

    this.aiChatService.sendMessage({
      message: `翻译以下文字: \n${text}`,
      prompt: prompt,
    });
  }
  
  public [EInlineOperation.Summarize](editor: ICodeEditor): void {
    const text = this.getCrossCode(editor);
    if (!text || text.trim() === '') {
      return;
    }

    const prompt = summarizePrompt(text);

    this.aiChatService.sendMessage({
      message: `总结以下文字: \n${text}`,
      prompt: prompt,
    });
  }
  
  public [EInlineOperation.Expand](editor: ICodeEditor): void {
    const text = this.getCrossCode(editor);
    if (!text || text.trim() === '') {
      return;
    }

    const prompt = expandPrompt(text);

    this.aiChatService.sendMessage({
      message: `扩展以下文字: \n${text}`,
      prompt: prompt,
    });
  }

}