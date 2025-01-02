const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const FALLBACK_DATA = [
  {
    name: "Bluetooth",
    category: "Electronic",
    value: "$150",
    quantity: 5,
    price: "$30",
  },
  {
    name: "Edifier M43560",
    category: "Electronic",
    value: "0",
    quantity: 0,
    price: "$0",
  },
  {
    name: "Sony 4k ultra 55 inch TV",
    category: "Electronic",
    value: "$1190",
    quantity: 17,
    price: "$70",
  },
  {
    name: "Samsumg 55 inch TV",
    category: "Electronic",
    value: "$600",
    quantity: 50,
    price: "$12",
  },
  {
    name: "samsumg S34 Ultra",
    category: "phone",
    value: "$0",
    quantity: 0,
    price: "$0",
  },
];

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
    try {
      const response = await fetchWithRetry(
        `https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory`
      );
      return response.json();
    } catch (error) {
      console.warn("API failed, using fallback data:", error);
      return FALLBACK_DATA;
    }
  },
};
