import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { formatGrammarFile } from './formatter';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider('ebnf', {
            provideDocumentFormattingEdits(document) {
                const edits = [];
                const text = document.getText();

                const formattedText = formatGrammarFile(text);
                edits.push(vscode.TextEdit.replace(document.validateRange(new vscode.Range(0, 0, document.lineCount, 0)), formattedText));

                return edits;
            }
        })
    );
    let disposable = vscode.commands.registerCommand('lark-ebnf-fmt.formatEBNF', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();
            const formattedText = formatGrammarFile(text);

            const edit = new vscode.WorkspaceEdit();
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(text.length)
            );
            edit.replace(document.uri, fullRange, formattedText);
            await vscode.workspace.applyEdit(edit);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }
