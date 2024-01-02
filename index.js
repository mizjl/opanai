const OpenAI = require('openai')
const tunnel = require('tunnel')

const agent = tunnel.httpsOverHttp({
    proxy: {
        host: '127.0.0.1',
        port: 7890,
        rejectUnauthorized: false,
    }
});

const apikey = (config) => {
    const { apiKey, isAgent = false } = config
    const obj = {
        apiKey: apiKey,
        httpAgent: agent
    }
    !isAgent && delete obj.httpAgent
    const aiHelper = new OpenAI(obj)
    return aiHelper
}



const imagesGenerate = (obj) => {
    const { model, prompt, n, config } = obj
    new Promise(async (resolve, reject) => {
        try {
            const image = await apikey(config).images.generate({
                model: model,
                prompt: prompt,
                n: n,
            });
            resolve(image)
        } catch (err) {
            reject(err)
        }
    })
}

const chatCompletions = async (obj) => {
    const { model, messages, stream = true, config } = obj
    try {
        const completion = await apikey(config).chat.completions.create({
            model: model,
            messages: messages,
            stream: stream,
        });

        const streamOpen = async () => {
            const contentArray = [];
            for await (const chunk of completion) {
                const content = chunk.choices[0].delta.content;
                contentArray.push(content);
            }
            return contentArray;
        };

        const streamClose = () => {
            return completion.choices[0]
        }
        return stream ? streamOpen() : streamClose()
    } catch (err) {
        throw err;
    }
}


module.exports = {
    imagesGenerate,
    chatCompletions
}