export const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // return data if no error
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("An error occured while fetching data: ", error);
    throw error;
  }
};
