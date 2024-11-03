export const createGuidelineSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    imgs: { type: 'array', items: { type: 'string' } },
    keywords: { type: 'array', items: { type: 'string' } },
    result: { type: 'string' },
    creatorId: { type: 'number' },
  },
  required: ['title', 'imgs', 'creatorId'],
  additionalProperties: false,
};

export const updateGuidelineSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    keywords: { type: 'array', items: { type: 'string' } },
    result: { type: 'string' },
  },
  anyOf: [{ required: ['title'] }, { required: ['keywords'] }, { required: ['result'] }],
  additionalProperties: false,
};

export const markdownToPdfSchema = {
  type: 'object',
  properties: {
    markdownContent: { type: 'string' },
    title: { type: 'string' },
    format: { type: 'string' },
  },
  required: ['markdownContent', 'title', 'format'],
  additionalProperties: false,
};
