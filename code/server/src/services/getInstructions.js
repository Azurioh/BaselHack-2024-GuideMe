import axios from 'axios';

async function getYogaGuide(pose) {
  const prompt = `
    You are an assistant that provides concise yoga position guides.
    Each guide should include instructions on how to perform the position perfectly.
    Provide the information in markdown format in English.
    Please give me step-by-step instructions of maximum 4 instructions to realize the ${pose} position begining by the title of the pose and the steps.
  `;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1',
      { inputs: prompt, parameters: { max_length: 20000 } },
      {
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json'
        }
      }
    );

    let guide = response.data[0].generated_text;

    guide = guide.slice(prompt.length).trim();

    const lines = guide.split('\n').map(line => line.trim()).filter(line => line);

    const title = lines[0].replace(/^#\s*/, '');
    const content = lines.slice(1).join('\n');

    const result = {
      title: title,
      content: content
    };

    console.log(guide);
    return result;
  } catch (error) {
    console.error('Error fetching the yoga guide:', error);
    return error;
  }
}

export default getYogaGuide;
