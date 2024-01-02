import OpenAI from "openai";
import tunnel from 'tunnel';


const agent = tunnel.httpsOverHttp({
    proxy: {
        host: '127.0.0.1',
        port: 7890,
        rejectUnauthorized: false,
    }
});

export const apikey = (obj) => {
    const { apiKey, isAgent = true } = obj
    const aiHelper = new OpenAI({
        apiKey: apiKey,
        httpAgent: agent
    })
    !isAgent && aiHelper.delete(httpAgent)
    return aiHelper
}

export const imagesGenerate = (obj) => {
    const { model, prompt, n } = obj
    new Promise(async (resolve, reject) => {
        try {
            const image = await apikey.images.generate({
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

export const chatCompletions = (obj) => {
    const { model, messages, stream = false } = obj
    try {
        const completion = apikey.chat.completions.createStream({
            model: model,
            messages: messages,
            stream: stream,
        });

        const streamOpen = () => {
            for await (const chunk of completion) {
                return chunk.choices[0].delta.content;
            }
        }

        const streamClose = () => {
            return completion.choices[0]
        }
        return stream ? streamOpen() : streamClose()
    } catch (err) {
        throw err;
    }
}


