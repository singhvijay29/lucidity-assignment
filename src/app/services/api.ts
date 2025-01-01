const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (
  url: string,
  maxRetries = 3,
  initialDelay = 1000
) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.status === 429) {
        const waitTime = initialDelay * Math.pow(2, i);
        await delay(waitTime);
        continue;
      }
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const waitTime = initialDelay * Math.pow(2, i);
      await delay(waitTime);
    }
  }
  throw new Error("Max retries reached");
};

export const api = {
  getInventory: async () => {
    const response = await fetchWithRetry(
      `https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory`
    );
    return response.json();
  },
};
