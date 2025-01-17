// 从'app-builder-bin'模块导入appBuilderPath
import { appBuilderPath } from 'app-builder-bin';
// 从'child_process'模块导入spawnSync函数
import { spawnSync } from 'child_process'
// 从'path'模块导入join函数
import { join } from 'path'

// 遍历要生成的图标格式（icns和ico）
for (const format of ['icns', 'ico']) {
  // 使用spawnSync函数同步调用appBuilderPath，生成图标
  const { error } = spawnSync(appBuilderPath, [
    'icon', // 指定命令为'icon'
    '--format', // 指定格式参数
    format, // 当前格式（icns或ico）
    '--input', // 指定输入文件参数
    join(import.meta.dirname, '../assets/icon/1024.png'), // 输入文件路径
    '--out', // 指定输出文件参数
    join(import.meta.dirname, '../assets/icon'), // 输出文件路径
  ], {
    stdio: 'inherit' // 继承父进程的标准输入输出
  })
  // 如果发生错误，打印错误信息
  if (error) {
    console.error(error)
  }
}
