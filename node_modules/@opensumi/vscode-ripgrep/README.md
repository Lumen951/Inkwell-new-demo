# @opensumi/vscode-ripgrep

`vscode-ripgrep` 对应的预编译包，因 `ripgrep` 通过 `github` 在国内下载有很大失败率，所以发布预编译包，并通过国内 cdn 下载。

## 注意

* 同版本号的 `vscode-ripgrep` 下载安装的 `ripgrep` 版本号必须一致

## 实现原理

1. 运行 `./scripts/generatePreBuiltPkg.js` 生成 `@opensumi/vscode-ripgrep-prebuilt` 包。
    在这一步会自动下载 <https://github.com/microsoft/ripgrep-prebuilt/releases> 中的编译好的 `ripgrep` 文件下载到 `./prebuilt/build/` 目录。
2. 在 `postinstall` 时下载 CDN 上的 `@opensumi/vscode-ripgrep-prebuilt` 对应平台的 `ripgrep` 并解压缩到 `./bin/` 目录
3. 通过 `rgPath` 拿到 `ripgrep` 即可执行

## 发包步骤

1. 执行 `npm install`。
2. 修改 `package.json` 的 `rgVersion` 字段为 <https://github.com/microsoft/ripgrep-prebuilt/releases> 的 tag 号。
3. 修改 `package.json` 的 `version` 字段。
4. 首先发布 `@opensumi/vscode-ripgrep-prebuilt`。
   1. 执行 `node ./scripts/generatePreBuiltPkg.js`
   2. 打开到 `prebuilt` 目录，执行 `npm publish`。
5. 再回到当前的 `vscode-ripgrep` 目录，执行 `npm publish`。
