# AI Toolkit 中文汉化版

本仓库是 [ostris/ai-toolkit](https://github.com/ostris/ai-toolkit) 的中文汉化 fork，对 Web UI 进行了全量**双语汉化**，其余功能与原版完全一致。

- 官方原版：https://github.com/ostris/ai-toolkit
- 基于版本：**v0.13.4**（commit `9d6a9a0`）
- 汉化提交：`a634a8e`（51 个文件，全部位于 `ui/src/`）

## 汉化说明

- **双语格式**：`中文 (English)`，中文为主、保留英文原文，方便对照英文文档/源码。
- **术语规范**：严格使用官方术语，专有名词与技术名词保留英文（如 LoRA、FLUX、GPU、VRAM、Checkpoint、Caption、Trigger Word、EMA、Optimizer 等），不强行翻译。
- **汉化范围**：
  - 全部页面：Dashboard / Datasets / Jobs / Settings 等
  - 全部组件：训练配置表单、数据集管理、LoRA 合并、字幕（Caption）、采样图预览、监控面板等
  - 帮助文档（27 条 `?` 弹窗）与提示信息
  - aria-label、placeholder、弹窗消息等无障碍与交互文案
- **不影响**：训练、推理、CLI、后端等任何功能代码，仅改动前端显示文案。

## 如何获得汉化

### 方式一：直接使用本仓库（推荐）

```bash
git clone https://github.com/haoranwnag/ai-toolkit.git
cd ai-toolkit
python -m manager install      # 首次环境安装
python -m manager launch       # 启动 Web UI，浏览器访问 http://localhost:8675
```

### 方式二：给已有官方仓库打补丁

如果你已克隆官方仓库（版本需为 v0.13.4）：

1. 从本仓库导出汉化补丁：

   ```bash
   git format-patch -1 a634a8e --stdout > ai-toolkit-l10n.patch
   ```

2. 在官方仓库应用：

   ```bash
   cd ai-toolkit
   git apply ai-toolkit-l10n.patch
   cd ui && npm install && npm run build
   ```

> 也可直接使用分享包中的 `ai-toolkit-l10n-v0.13.4.patch` 或覆盖版 zip。

## 重新构建（汉化生效前提）

汉化修改的是前端源码，需重新构建后才能看到效果：

```bash
cd ui
npm install
npm run build
cd ..
python -m manager launch
```

## 与上游保持同步

本仓库 fork 自官方，可随时通过 GitHub 的 **Sync fork** 按钮，或以下命令同步上游更新：

```bash
git fetch upstream
git merge upstream/main        # 如与汉化文件冲突需手动解决
```

## 注意事项

- 汉化基于 v0.13.4 源码上下文；上游更新后汉化文件可能产生冲突，同步前建议备份。
- 本 fork 仅做 UI 汉化，功能与官方一致；如遇训练问题请先对照官方仓库排查。
