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

  public async [EInlineOperation.Polish](editor: ICodeEditor, token: CancellationToken): Promise<InlineChatController> {
    const text = this.getCrossCode(editor);
    const prompt = polishPrompt(text);
  
    const controller = new InlineChatController({ 
      enableTextRender: true
    } as InlineChatControllerOptions);
    const stream = await this.aiBackService.requestStream(prompt, {}, token);
    controller.mountReadable(stream);
  
    return controller;
  }
  
  public async [EInlineOperation.Translate](editor: ICodeEditor, token: CancellationToken): Promise<InlineChatController> {
    const text = this.getCrossCode(editor);
    const prompt = translatePrompt(text);
  
    const controller = new InlineChatController({ 
      enableTextRender: true
    } as InlineChatControllerOptions);
    const stream = await this.aiBackService.requestStream(prompt, {}, token);
    controller.mountReadable(stream);
  
    return controller;
  }
  
  public async [EInlineOperation.Summarize](editor: ICodeEditor, token: CancellationToken): Promise<InlineChatController> {
    const text = this.getCrossCode(editor);
    const prompt = summarizePrompt(text);
  
    const controller = new InlineChatController({ 
      enableTextRender: true
    } as InlineChatControllerOptions);
    const stream = await this.aiBackService.requestStream(prompt, {}, token);
    controller.mountReadable(stream);
  
    return controller;
  }
  
  public async [EInlineOperation.Expand](editor: ICodeEditor, token: CancellationToken): Promise<InlineChatController> {
    const text = this.getCrossCode(editor);
    const prompt = expandPrompt(text);
  
    const controller = new InlineChatController({ 
      enableTextRender: true
    } as InlineChatControllerOptions);
    const stream = await this.aiBackService.requestStream(prompt, {}, token);
    controller.mountReadable(stream);
  
    return controller;
  }

}