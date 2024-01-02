# opanai
适合国内开发者的openai库

### 使用前
请先去[openai](https://openai.com/)获取apikey

### 安装

```bash
npm i china-openai
```

### 导入所需的模块

```javascript
import { apikey, imagesGenerate, chatCompletions } from "china-openai";
```
### 使用

```javascript
// 导入所需的模块
import { apikey, imagesGenerate, chatCompletions } from "./yourModule";

// 调用函数示例  apiKey 需要openai官网去申请 
const apiKey = "YOUR_API_KEY"; // 替换为你的实际 API 密钥

// 创建 OpenAI 实例还有个参数isAgent 是否开启代理 默认为false
const aiHelper = apikey({ apiKey: apiKey });

// const aiHelper = apikey({ apiKey: apiKey,isAgent:true });

// 聊天完成示例
const chatCompletion = async () => {
    try {
        const model = "your_model_name"; // 替换为你的模型名称
        const messages = [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Hello" }
        ];

        const response = await chatCompletions({
            model: model,
            messages: messages,
            stream: false, //需要流传输改为true
        });

        console.log(response);
    } catch (err) {
        console.error(err);
    }
};

chatCompletion();

// 图像生成示例
const generateImages = async () => {
    try {
        const model = "your_model_name"; // 替换为你的模型名称
        const prompt = "your_prompt_text"; // 替换为你的提示文本
        const n = 1; // 生成的图像数量

        const images = await imagesGenerate({
            model: model,
            prompt: prompt,
            n: n,
        });

        console.log(images);
    } catch (err) {
        console.error(err);
    }
};

generateImages();
```
