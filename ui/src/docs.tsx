import React from 'react';
import { ConfigDoc } from '@/types';
import { IoFlaskSharp } from 'react-icons/io5';

const docs: { [key: string]: ConfigDoc } = {
  'config.name': {
    title: '训练名称 (Training Name)',
    description: (
      <>
        训练名称。该名称用于在系统中标识该训练任务，并作为最终模型的文件名。名称必须唯一，且只能包含字母、数字、下划线和短横线，不允许空格或特殊字符。(English: The name of the training job. This name will be used to identify the job in the system and will the the filename)
        of the final model. It must be unique and can only contain alphanumeric characters, underscores, and dashes. No
        spaces or special characters are allowed.
      </>
    ),
  },
  gpuids: {
    title: 'GPU 编号 (GPU ID)',
    description: (
      <>
        用于训练的 GPU 编号。当前 UI 每次任务仅可使用一张 GPU；不过你可以并行启动多个任务，各自使用不同的 GPU。(English: This is the GPU that will be used for training. Only one GPU can be used per job at a time via the UI currently.)
        However, you can start multiple jobs in parallel, each using a different GPU.
      </>
    ),
  },
  'config.process[0].trigger_word': {
    title: '触发词 (Trigger Word)',
    description: (
      <>
        可选：用于触发你的概念或角色的词或标记。使用触发词时，若标注中不含触发词，它会被自动添加到标注开头；若没有任何标注，标注将仅由触发词构成。若希望在标注的不同位置加入触发词，可在标注中使用 [trigger] 占位符，它会自动替换为你的触发词。测试提示词不会自动加入触发词，因此你需要手动添加触发词，或在测试提示词中也使用 [trigger] 占位符。(English: Optional: This will be the word or token used to trigger your concept or character.)
        <br />
        <br />
        When using a trigger word, If your captions do not contain the trigger word, it will be added automatically the
        beginning of the caption. If you do not have captions, the caption will become just the trigger word. If you
        want to have variable trigger words in your captions to put it in different spots, you can use the{' '}
        <code>{'[trigger]'}</code> placeholder in your captions. This will be automatically replaced with your trigger
        word.
        <br />
        <br />
        Trigger words will not automatically be added to your test prompts, so you will need to either add your trigger
        word manually or use the
        <code>{'[trigger]'}</code> placeholder in your test prompts as well.
      </>
    ),
  },
  'config.process[0].model.name_or_path': {
    title: '名称或路径 (Name or Path)',
    description: (
      <>
        名称或路径。Hugging Face 上 diffusers 仓库的名称，或你想基于其训练的基础模型的本地路径。大多数模型要求文件夹为 diffusers 格式；对部分模型（如 SDXL 和 SD1），也可以在此填入一体化 safetensors 检查点的路径。(English: The name of a diffusers repo on Huggingface or the local path to the base model you want to train from.)
        folder needs to be in diffusers format for most models. For some models, such as SDXL and SD1, you can put the
        path to an all in one safetensors checkpoint here.
      </>
    ),
  },
  'datasets.control_path': {
    title: '控制数据集 (Control Dataset)',
    description: (
      <>
        控制数据集需要包含与训练数据集文件名匹配的文件，二者应成对匹配。这些图片在训练时作为控制/输入图片输入。对于多控制数据集，所有控制会按列出顺序依次应用。若模型不要求图片具有相同宽高比（例如 Qwen/Qwen-Image-Edit-2509），控制图片无需匹配目标图片的尺寸或宽高比，会自动缩放到该模型/目标图片的理想分辨率。(English: The control dataset needs to have files that match the filenames of your training dataset. They should be matching file pairs. These images are fed as control/input images during training.)
        For multi control datasets, the controls will all be applied in the order they are listed. The control images will be
        resized to match the training images.
      </>
    ),
  },
  'datasets.multi_control_paths': {
    title: '多控制数据集 (Multi Control Dataset)',
    description: (
      <>
        控制数据集需要包含与训练数据集文件名匹配的文件，二者应成对匹配。这些图片在训练时作为控制/输入图片输入，控制图片会被缩放以匹配训练图片。(English: The control dataset needs to have files that match the filenames of your training dataset.)
        matching file pairs. These images are fed as control/input images during training.
        <br />
        <br />
        For multi control datasets, the controls will all be applied in the order they are listed. If the model does not
        require the images to be the same aspect ratios, such as with Qwen/Qwen-Image-Edit-2509, then the control images
        do not need to match the aspect size or aspect ratio of the target image and they will be automatically resized
        to the ideal resolutions for the model / target images.
      </>
    ),
  },
  'datasets.num_frames': {
    title: '帧数 (Number of Frames)',
    description: (
      <>
        设置视频数据集将视频压缩到的帧数。若数据集为图片，请设为 1 表示单帧；若数据集只有视频，则会从视频中均匀抽取帧。训练前最好将视频裁剪到合适长度：Wan 每秒 16 帧，81 帧即约 5 秒视频，因此建议把所有视频裁剪到约 5 秒以获得最佳效果。示例：设为 81 且数据集中有 2 个视频（一个 2 秒、一个 90 秒），每个视频都会得到 81 个均匀分布的帧，导致 2 秒的视频看起来很慢、90 秒的视频看起来很快。(English: This sets the number of frames to shrink videos to for a video dataset. If this dataset is images, set this to 1.)
        for one frame. If your dataset is only videos, frames will be extracted evenly spaced from the videos in the
        dataset.
        <br />
        <br />
        It is best to trim your videos to the proper length before training. Wan is 16 frames a second. Doing 81 frames
        will result in a 5 second video. So you would want all of your videos trimmed to around 5 seconds for best
        results.
        <br />
        <br />
        Example: Setting this to 81 and having 2 videos in your dataset, one is 2 seconds and one is 90 seconds long,
        will result in 81 evenly spaced frames for each video making the 2 second video appear slow and the 90second
        video appear very fast.
      </>
    ),
  },
  'datasets.do_i2v': {
    title: '启用 I2V (Do I2V)',
    description: (
      <>
        对于同时支持 I2V（图生视频）和 T2V（文生视频）的视频模型，此选项将该数据集设置为按 I2V 数据集训练，即从视频中提取首帧作为视频的起始图。若不设置，数据集将按 T2V 数据集处理。(English: For video models that can handle both I2V (Image to Video) and T2V (Text to Video), this option sets this dataset to be trained as an I2V dataset.)
        dataset to be trained as an I2V dataset. This means that the first frame will be extracted from the video and
        used as the start image for the video. If this option is not set, the dataset will be treated as a T2V dataset.
      </>
    ),
  },
  'datasets.do_audio': {
    title: '启用音频 (Do Audio)',
    description: (
      <>
        对于支持视频伴音的模型，此选项会从视频中加载音频并将其缩放以匹配视频序列。由于视频会被自动缩放，音频的音高可能随视频新速度下降或上升。训练前务必准备合适长度的数据集。(English: For models that support audio with video, this option will load the audio from the video and resize it to match the video sequence.)
        the video sequence. Since the video is automatically resized, the audio may drop or raise in pitch to match the
        new speed of the video. It is important to prep your dataset to have the proper length before training.
      </>
    ),
  },
  'datasets.audio_normalize': {
    title: '音频归一化 (Audio Normalize)',
    description: (
      <>
        加载音频时，将音量归一化到最大峰值。当数据集中音量参差不齐时很有用。警告：若想保留全静音片段，请勿使用，因为它会提高这些片段的音量。(English: When loading audio, this will normalize the audio volume to the max peaks. Useful if your dataset has varying audio volumes.)
        audio volumes. Warning, do not use if you have clips with full silence you want to keep, as it will raise the
        volume of those clips.
      </>
    ),
  },
  'datasets.audio_preserve_pitch': {
    title: '音频保持音高 (Audio Preserve Pitch)',
    description: (
      <>
        当加载音频以匹配请求的帧数时，若长度与训练目标不匹配，此选项将保持音频音高。建议使用与目标长度匹配的数据集，因为此选项可能引入声音失真。(English: When loading audio to match the number of frames requested, this option will preserve the pitch of the audio if the length does not match the training target.)
        the length does not match training target. It is recommended to have a dataset that matches your target length,
        as this option can add sound distortions.
      </>
    ),
  },
  'datasets.flip': {
    title: '翻转 X 与翻转 Y (Flip X and Flip Y)',
    description: (
      <>
        可通过翻转 x（水平）和/或 y（垂直）轴在训练时即时增强数据集。翻转单个轴将使数据集实际翻倍，训练会同时看到正常图片与翻转版本。这可能很有用，但请注意它也可能有破坏性：没有理由把人倒着训练；翻转人脸也可能让模型混淆（人的左右并不对称）；对文字而言，翻转显然不合适。数据集的控制图片也会随之翻转，因此在像素层面始终匹配。(English: You can augment your dataset on the fly by flipping the x (horizontal) and/or y (vertical) axis. Flipping a single axis will effectively double your dataset.)
        single axis will effectively double your dataset. It will result it training on normal images, and the flipped
        versions of the images. This can be very helpful, but keep in mind it can also be destructive. There is no
        reason to train people upside down, and flipping a face can confuse the model as a person's right side does not
        look identical to their left side. For text, obviously flipping text is not a good idea.
        <br />
        <br />
        Control images for a dataset will also be flipped to match the images, so they will always match on the pixel
        level.
      </>
    ),
  },
  'train.unload_text_encoder': {
    title: '卸载文本编码器 (Unload Text Encoder)',
    description: (
      <>
        卸载文本编码器会缓存触发词与采样提示词，并将文本编码器从 GPU 卸载。数据集的标注将被忽略。(English: Unloading text encoder will cache the trigger word and the sample prompts and unload the text encoder from the GPU.)
        GPU. Captions in for the dataset will be ignored
      </>
    ),
  },
  'train.cache_text_embeddings': {
    title: '缓存文本嵌入 (Cache Text Embeddings)',
    description: (
      <>
        <small>(experimental)</small>
        <br />
        缓存文本嵌入会将文本编码器产出的所有文本嵌入处理并缓存到磁盘，文本编码器将从 GPU 卸载。这不适用于会动态改变提示词的情况，如触发词、标注丢弃等。(English: Caching text embeddings will process and cache all the text embeddings from the text encoder to the disk.)
        text encoder will be unloaded from the GPU. This does not work with things that dynamically change the prompt
        such as trigger words, caption dropout, etc.
      </>
    ),
  },
  'model.multistage': {
    title: '训练阶段 (Stages to Train)',
    description: (
      <>
        部分模型具有多阶段网络，在去噪过程中分别训练和使用。最常见的是 2 个阶段：一个用于高噪声，一个用于低噪声。你可以选择同时训练两个阶段或分别训练。若同时训练，训练器会每隔若干步在两个模型间交替，并输出 2 个不同的 LoRA；若只训练一个阶段，则只输出单个 LoRA。(English: Some models have multi stage networks that are trained and used separately in the denoising process.)
        common, is to have 2 stages. One for high noise and one for low noise. You can choose to train both stages at
        once or train them separately. If trained at the same time, The trainer will alternate between training each
        model every so many steps and will output 2 different LoRAs. If you choose to train only one stage, the trainer
        will only train that stage and output a single LoRA.
      </>
    ),
  },
  'train.switch_boundary_every': {
    title: '切换间隔 (Switch Boundary Every)',
    description: (
      <>
        训练多阶段模型时，此设置控制训练器在多长时间间隔切换训练每个阶段。低显存设置下，未训练的模型会从 GPU 卸载以节省内存，这需要一些时间，因此低显存时建议减少交替频率（如 10 或 20）。切换发生在批量层面，即在梯度累积步骤之间切换。若要在单步中训练两个阶段，可设为每 1 步切换，并将梯度累积设为 2。(English: When training a model with multiple stages, this setting controls how often the trainer will switch between training each stage.)
        training each stage.
        <br />
        <br />
        For low vram settings, the model not being trained will be unloaded from the gpu to save memory. This takes some
        time to do, so it is recommended to alternate less often when using low vram. A setting like 10 or 20 is
        recommended for low vram settings.
        <br />
        <br />
        The swap happens at the batch level, meaning it will swap between a gradient accumulation steps. To train both
        stages in a single step, set them to switch every 1 step and set gradient accumulation to 2.
      </>
    ),
  },
  'train.force_first_sample': {
    title: '强制首次采样 (Force First Sample)',
    description: (
      <>
        此选项会强制训练器在启动时生成样本。训练器通常只会在尚未训练任何内容时生成首个样本，从已有检查点恢复时不会执行首次采样。此选项让训练器每次启动都强制执行首次采样。当你修改了采样提示词并希望立即看到新提示词时很有用。(English: This option will force the trainer to generate samples when it starts. The trainer will normally only generate a first sample when nothing has been trained yet.)
        first sample when nothing has been trained yet, but will not do a first sample when resuming from an existing
        checkpoint. This option forces a first sample every time the trainer is started. This can be useful if you have
        changed sample prompts and want to see the new prompts right away.
      </>
    ),
  },
  'model.layer_offloading': {
    title: (
      <>
        层卸载 (Layer Offloading){' '}
        <span className="text-yellow-500">
          ( <IoFlaskSharp className="inline text-yellow-500" name="Experimental" /> Experimental)
        </span>
      </>
    ),
    description: (
      <>
        这是一个基于{' '}
        <a className="text-blue-500" href="https://github.com/lodestone-rock/RamTorch" target="_blank">
          RamTorch
        </a>
        的实验性功能，早期阶段会频繁更新和变更，可能在不同版本间表现不一致，且仅适用于特定模型。(English: This feature is early and will have many updates and changes, so be aware it may not work consistently from one update to the next.)
        one update to the next. It will also only work with certain models.
        <br />
        <br />
        层卸载使用 CPU 内存而非 GPU 显存来承载大部分模型权重，从而允许在更小的 GPU 上训练更大的模型（前提是你有足够的 CPU 内存）。这比纯 GPU 显存训练更慢，但 CPU 内存更便宜且可升级。你仍需要 GPU 显存来承载优化器状态和 LoRA 权重，因此通常仍需要更大显存的显卡。你还可以选择卸载层数的百分比：为获得最佳性能，通常建议尽可能少卸载（接近 0%），但如果需要更多内存也可以多卸载。(English: Layer Offloading uses the CPU RAM instead of the GPU ram to hold most of the model weights.)
        a much larger model on a smaller GPU, assuming you have enough CPU RAM. This is slower than training on pure GPU
        RAM, but CPU RAM is cheaper and upgradeable. You will still need GPU RAM to hold the optimizer states and LoRA
        weights, so a larger card is usually still needed.
        <br />
        <br />
        You can also select the percentage of the layers to offload. It is generally best to offload as few as possible
        (close to 0%) for best performance, but you can offload more if you need the memory.
      </>
    ),
  },
  'model.qie.match_target_res': {
    title: '匹配目标分辨率 (Match Target Res)',
    description: (
      <>
        此设置会让控制图片匹配目标图片的分辨率。Qwen-Image-Edit-2509 的官方推理示例无论生成多大尺寸都将控制图片按 1MP 分辨率输入，这让低分辨率训练变得困难。匹配目标分辨率会将控制图片缩放到目标分辨率，从而在较小分辨率训练时使用更少的显存。你仍可使用不同的宽高比，图片只是会被缩放以匹配目标图片的像素量。(English: This setting will make the control images match the resolution of the target image.)
        example for Qwen-Image-Edit-2509 feeds the control image is at 1MP resolution, no matter what size you are
        generating. Doing this makes training at lower res difficult because 1MP control images are fed in despite how
        large your target image is. Match Target Res will match the resolution of your target to feed in the control
        images allowing you to use less VRAM when training with smaller resolutions. You can still use different aspect
        ratios, the image will just be resizes to match the amount of pixels in the target image.
      </>
    ),
  },
  'train.diff_output_preservation': {
    title: '差分输出保留 (Differential Output Preservation)',
    description: (
      <>
        差分输出保留 (DOP) 是一种帮助在训练期间保持所训练概念所属类别的技术。为此，你必须设置触发词以将概念与其类别区分开。例如，训练一位名叫 Alice 的女性，触发词为 “Alice”，类别为 “woman”（因为 Alice 是女性）。训练器会在绕过 LoRA、并将提示词中的触发词替换为类别词的情况下做一次预测（例如 “photo of Alice” 变成 “photo of woman”），该预测称为先验预测 (prior prediction)。每一步都会做正常训练步骤，同时用该先验预测和类别提示词再做一步，以教会 LoRA 保留类别的知识。这不仅应提升所训练概念的表现，还能让你实现 “Alice standing next to a woman” 而不会让两个人都像 Alice。(English: Differential Output Preservation (DOP) is a technique to help preserve class of the trained concept during training.)
        training. For this, you must have a trigger word set to differentiate your concept from its class. For instance,
        You may be training a woman named Alice. Your trigger word may be "Alice". The class is "woman", since Alice is
        a woman. We want to teach the model to remember what it knows about the class "woman" while teaching it what is
        different about Alice. During training, the trainer will make a prediction with your LoRA bypassed and your
        trigger word in the prompt replaced with the class word. Making "photo of Alice" become "photo of woman". This
        prediction is called the prior prediction. Each step, we will do the normal training step, but also do another
        step with this prior prediction and the class prompt in order to teach our LoRA to preserve the knowledge of the
        class. This should not only improve the performance of your trained concept, but also allow you to do things
        like "Alice standing next to a woman" and not make both of the people look like Alice.
      </>
    ),
  },
  'train.blank_prompt_preservation': {
    title: '空白提示词保留 (Blank Prompt Preservation)',
    description: (
      <>
        空白提示词保留 (BPP) 是一种帮助在无提示词时保持模型现有知识的技术。它不仅能提升模型的灵活性，还能提升推理时概念的质量，尤其当模型在推理时使用 CFG（无分类器引导）。训练中每一步都会在空白提示词且禁用 LoRA 的情况下做一次先验预测，并作为额外训练步骤（使用空白提示词）的目标，从而保留模型在无提示时的知识。这有助于模型不过度拟合提示词并保持泛化能力。(English: Blank Prompt Preservation (BPP) is a technique to help preserve the current models knowledge when unprompted.)
        This will not only help the model become more flexible, but will also help the quality of your concept during
        inference, especially when a model uses CFG (Classifier Free Guidance) on inference. At each step during
        training, a prior prediction is made with a blank prompt and with the LoRA disabled. This prediction is then
        used as a target on an additional training step with a blank prompt, to preserve the model's knowledge when no
        prompt is given. This helps the model to not overfit to the prompt and retain its generalization capabilities.
      </>
    ),
  },
  'train.do_differential_guidance': {
    title: '差分引导 (Differential Guidance)',
    description: (
      <>
        差分引导会放大训练中模型预测与目标之间的差异以构成新目标，差分引导强度 (Differential Guidance Scale) 是差异的乘数。这仍处于实验阶段，但根据作者测试，它让模型训练更快，并且在测试过的所有场景中细节学习更好。原理：普通训练会不断逼近目标但受学习率限制永远无法真正到达；差分引导则把差异放大到超出实际目标形成新目标，让模型学会命中甚至超越目标，而不是达不到。(English: Differential Guidance will amplify the difference of the model prediction and the target during training to make a new target.)
        a new target. Differential Guidance Scale will be the multiplier for the difference. This is still experimental,
        but in my tests, it makes the model train faster, and learns details better in every scenario I have tried with
        it.
        <br />
        <br />
        The idea is that normal training inches closer to the target but never actually gets there, because it is
        limited by the learning rate. With differential guidance, we amplify the difference for a new target beyond the
        actual target, this would make the model learn to hit or overshoot the target instead of falling short.
        <br />
        <br />
        <img src="/imgs/diff_guidance.png" alt="差分引导示意图 (Differential Guidance Diagram)" className="max-w-full mx-auto" />
      </>
    ),
  },
  'dataset.num_repeats': {
    title: '重复次数 (Num Repeats)',
    description: (
      <>
        允许将数据集中的条目重复多次。当使用多个数据集并希望平衡各数据集样本数时很有用。例如，一个小数据集有 10 张图片，大数据集有 100 张图片，可将小数据集设为 10 次重复，使其实际相当于 100 张，让两个数据集在训练中出现的频次相等。(English: Number of Repeats will allow you to repeate the items in a dataset multiple times. This is useful when you are using multiple datasets.)
        using multiple datasets and want to balance the number of samples from each dataset. For instance, if you have a
        small dataset of 10 images and a large dataset of 100 images, you can set the small dataset to have 10 repeats
        to effectively make it 100 images, making the two datasets occour equally during training.
      </>
    ),
  },
  'train.audio_loss_multiplier': {
    title: '音频损失乘数 (Audio Loss Multiplier)',
    description: (
      <>
        同时训练音频和视频时，有时视频损失过大而压过音频损失，导致音频失真。若遇到此情况，可提高音频损失乘数以增大音频损失的权重。可尝试 2.0、10.0 等值。警告：设置过高可能导致过拟合并损害模型。(English: When training audio and video, sometimes the video loss is so great that it outweights the audio loss, causing the audio to become distorted.)
        the audio to become distorted. If you are noticing this happen, you can increase the audio loss multiplier to
        give more weight to the audio loss. You could try something like 2.0, 10.0 etc. Warning, setting this too high
        could overfit and damage the model.
      </>
    ),
  },
  'datasets.auto_frame_count': {
    title: '自动帧数 (Auto Frame Count)',
    description: (
      <>
        自动为数据集中每个视频确定使用的帧数，而不是依赖固定的 num_frames。这允许数据集中包含不同长度的视频，每个视频都会被处理而不会加速或减速。注意不要往数据集中加入过长视频，因为它们会占用更多显存。当前批量大小大于 1 时此功能无法使用。(English: This will automatically determine the number of frames to use for each video in your dataset instead of relying on a fixed num_frames.)
        on a fixed num_frames. This allows you to include videos of different lengths in the dataset, and each video
        will be processed without speeding up or slowing down. Be careful about adding long videos into your dataset, as
        they use up more VRAM. This currently will not work with a batch size greater than 1.
      </>
    ),
  },
  'model.model_kwargs.kv_cache': {
    title: 'KV 缓存 (KV Cache)',
    description: (
      <>
        为支持该功能的模型启用控制图片的 KV 缓存。以此选项训练的 LoRA 在推理时也必须启用它，反之亦然。这不会加速或减慢训练，但在推理时，控制图片只需在整个生成过程中处理一次（而不是每一步都处理），从而显著提升推理速度。(English: This will enable KV Cache for control images in a model that supports it.)
        need to also be inferenced with it, and vice versa. This does not speed up or slow down training, but on inference,
        the control images only need to be processed once for the entire generation, vs being processed for every step.
        Which leads to a significant speedup on inference.
      </>
    ),
  },
  'train.guidance_loss_target': {
    title: '引导损失目标 (Guidance Loss Target)',
    description: (
      <>
        对于对比引导损失，这是将预测放大到的目标 CFG 值。(English: For contrastive guidance loss, this is the target CGF to amplify predictions to.)
      </>
    ),
  },
  'datasets.caption_dropout_rate': {
    title: '标注丢弃率 (Caption Dropout Rate)',
    description: (
      <>
        标注丢弃率是指在任意给定训练步骤中，图片标注被丢弃（替换为空白标注）的概率。例如 0.05 表示约 5% 的时间会丢弃标注。丢弃标注有助于模型在不完全依赖标注的情况下学习所训练的概念，并保留模型无提示词生成的能力。若设置了触发词，标注被丢弃时仍会使用触发词，因此模型仍会将丢弃样本与触发词关联。正则化图片（或无触发词的图片）会丢弃为完全空白的标注。标注丢弃在缓存文本嵌入时同样生效：丢弃标注（空白或仅触发词）的额外嵌入会与正常嵌入一起缓存到磁盘，并在训练时按此比例随机替换。(English: Caption dropout rate is the probability that the caption for an image will be dropped for any given training step.)
        caption) for any given training step. For example, a value of 0.05 will drop the caption around 5% of the time.
        Dropping captions helps the model learn the concept being trained without relying entirely on the caption,
        and helps preserve the model&apos;s ability to generate without a prompt. If a trigger word is set, the trigger
        word is still used when the caption is dropped, so the model still associates the dropped samples with your
        trigger word. Regularization images, or images without a trigger word, drop to a fully blank caption.
        <br />
        <br />
        Caption dropout also works when caching text embeddings. An additional embedding for the dropout caption
        (blank, or the trigger word alone) is cached to disk alongside the normal one, and it is randomly swapped in
        at train time at this rate.
      </>
    ),
  },
};

export const getDoc = (key: string | null | undefined): ConfigDoc | null => {
  if (key && key in docs) {
    return docs[key];
  }
  return null;
};

export default docs;
