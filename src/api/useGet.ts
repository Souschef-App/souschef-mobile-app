export const useGet = async <T>(
  url: string,
  query?: {}
): Promise<[result: T | null, error: string | null]> => {
  try {
    const response = await fetch(url + "?" + new URLSearchParams(query), {
      method: "GET",
    });

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
