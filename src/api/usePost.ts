export const usePost = async <T>(
  url: string,
  params?: { json?: {}; query?: {} }
): Promise<[result: T | null, error: string | null]> => {
  try {
    const response = await fetch(
      url + "?" + new URLSearchParams(params?.query),
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params?.json),
      }
    );

    // Request is successful
    if (response.ok) {
      const result: T = await response.json();
      return [result, null];
    }

    // Request is unsuccessful, read error
    const text = await response.text();
    return [null, text || "Something went wrong..."];
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
  }

  return [null, "Something went wrong..."];
};
