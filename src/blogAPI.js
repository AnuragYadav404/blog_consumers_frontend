export async function getBlogsList() {
  try {
    const articlesResponse = await fetch("http://localhost:3000/articles/");
    //   console.log(articlesResponse);
    if (articlesResponse.status == 200) {
      const articleData = await articlesResponse.json();
      const articles = articleData.articles;
      // articles can contain [] empty array too
      return {
        statusCode: 200,
        articles,
      };
    }
    return {
      statusCode: 404,
      msg: "Fetch for blog list failed.",
    };
  } catch (error) {
    return {
      statusCode: 404,
      msg: "Fetch for blog list failed.",
    };
  }
}
