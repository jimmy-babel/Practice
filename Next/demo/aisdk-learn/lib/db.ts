export const mockMessages = [
    {
        id: '1',
        role: 'user',
        content: 'hello 你好呀',
    },
    {
        id: '2',
        role: 'assistant',
        content: '你好呀！😊 很高兴见到你～有什么我可以帮你的吗？',
    }, {
        id: '3',
        role: 'user',
        content: '帮我简单介绍一下AI SDK吧',
    }, {
        id: '4',
        role: 'assistant',
        content: 'AISDK（AI Software Development Kit）是集成人工智能能力的软件开发工具包，为开发者提供预训练的模型、算法接口和开发工具，帮助快速实现AI功能（如语音识别、图像处理、NLP等）, 这款工具不是像coze，dify一样的零代码工具，对标的产品是Langchain一样的AI开发框架，比较适合我们程序员使用',
    }, {
        id: '5',
        role: 'user',
        content: '为什么要使用AI SDK',
    }, {
        id: '6',
        role: 'assistant',
        content: '将大型语言模型（LLMs）集成到应用程序中十分复杂，并且不同的模型的API接口也是不同的。AI SDK则通过封装，提供了统一的接口，使开发人员能够专注于构建出色的AI应用，而非将时间浪费在和模型API做适配',
    }
]