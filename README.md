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
const { imagesGenerate, chatCompletions } = require('china-openai')
```
### 使用

```javascript
// 调用函数示例  apiKey 需要openai官网去申请 
const apiKey = "YOUR_API_KEY"; // 替换为你的实际 API 密钥

// 聊天完成示例
const chatCompletion = async () => {
try {  
    const model = "gpt-3.5-turbo";
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Who won the World Series in 2021?" }
    ];

    const response = await chatCompletions({
      model: model,
      messages: messages,
      stream: false,
      config:{ apiKey: apiKey, isAgent: true } // 建议本地调试isAgent: true
    });

    res.send({
      data: response
    });
  } catch (err) {
    throw err;
  }
};

chatCompletion();

// 图像生成示例
const generateImages = async () => {
    try {
        const model = "your_model_name"; // 替换为你的模型名称
        const prompt = "your_prompt_text"; // 替换为你的提示文本
        const n = 1; // 生成的图像数量 最多为10

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
