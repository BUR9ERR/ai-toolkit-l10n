'use client';

import { useEffect, useState } from 'react';
import useSettings from '@/hooks/useSettings';
import { TopBar, MainContent } from '@/components/layout';
import { apiClient } from '@/utils/api';

export default function Settings() {
  const { settings, setSettings } = useSettings();
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');

    apiClient
      .post('/api/settings', settings)
      .then(() => {
        setStatus('success');
      })
      .catch(error => {
        console.error('Error saving settings:', error);
        setStatus('error');
      })
      .finally(() => {
        setTimeout(() => setStatus('idle'), 2000);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <TopBar>
        <div>
          <h1 className="text-base sm:text-lg">设置 (Settings)</h1>
        </div>
        <div className="flex-1"></div>
      </TopBar>
      <MainContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="HF_TOKEN" className="block text-sm font-medium mb-2">
                    Hugging Face 令牌 (Hugging Face Token)
                    <div className="text-gray-500 text-sm ml-1">
                      如需访问受限/私有模型，请在 Huggingface 创建一个只读令牌 (Read token) 于{' '}
                      <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noreferrer">
                        {' '}
                        Huggingface
                      </a>{' '}
                      以访问受限/私有模型。
                    </div>
                  </label>
                  <input
                    type="password"
                    id="HF_TOKEN"
                    name="HF_TOKEN"
                    value={settings.HF_TOKEN}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    placeholder="请输入 Hugging Face 令牌 (Enter your Hugging Face token)"
                  />
                </div>

                <div>
                  <label htmlFor="TRAINING_FOLDER" className="block text-sm font-medium mb-2">
                    训练文件夹路径 (Training Folder Path)
                    <div className="text-gray-500 text-sm ml-1">
                      训练信息将存储在这里，且必须是绝对路径；如果留空，则默认指向项目根目录下的 output 文件夹。(We will store your training information here. Must be an absolute path. If blank, it will default
                      to the output folder in the project root.))
                    </div>
                  </label>
                  <input
                    type="text"
                    id="TRAINING_FOLDER"
                    name="TRAINING_FOLDER"
                    value={settings.TRAINING_FOLDER}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    placeholder="输入训练文件夹路径 (Enter training folder path)"
                  />
                </div>

                <div>
                  <label htmlFor="DATASETS_FOLDER" className="block text-sm font-medium mb-2">
                    数据集文件夹路径 (Dataset Folder Path)
                    <div className="text-gray-500 text-sm ml-1">
                      这里用于存储和查找你的数据集。(Where we store and find your datasets.){' '}
                      <span className="text-orange-800">
                        警告：本软件可能修改数据集，建议你在其他位置保留备份，或为本软件准备一个专用文件夹。(Warning: This software may modify datasets so it is recommended you keep a backup somewhere else
                        or have a dedicated folder for this software.)
                      </span>
                    </div>
                  </label>
                  <input
                    type="text"
                    id="DATASETS_FOLDER"
                    name="DATASETS_FOLDER"
                    value={settings.DATASETS_FOLDER}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    placeholder="输入数据集文件夹路径 (Enter datasets folder path)"
                  />
                </div>

                <div>
                  <label htmlFor="MODELS_PATH" className="block text-sm font-medium mb-2">
                    模型文件夹路径 (Models Folder Path)
                    <div className="text-gray-500 text-sm ml-1">
                      部分模型支持直接加载 ComfyUI 的模型权重，支持此加载方式的模型会加载/下载到该路径，必须是绝对路径；如果留空，则默认指向项目根目录下的 models 文件夹。(Some models support loading ComfyUI model weights directly. Models that do will be loaded
                      from/downloaded to this path. Must be an absolute path. If blank, it will default to the models
                      folder in the project root.)
                    </div>
                  </label>
                  <input
                    type="text"
                    id="MODELS_PATH"
                    name="MODELS_PATH"
                    value={settings.MODELS_PATH}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    placeholder="输入模型文件夹路径 (Enter models folder path)"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'saving'}
            className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'saving' ? '保存中 (Saving...)' : '保存设置 (Save Settings)'}
          </button>

          {status === 'success' && <p className="text-green-500 text-center">设置已成功保存！(Settings saved successfully!)</p>}
          {status === 'error' && <p className="text-red-500 text-center">保存设置出错，请重试。(Error saving settings. Please try again.)</p>}
        </form>
      </MainContent>
    </>
  );
}
