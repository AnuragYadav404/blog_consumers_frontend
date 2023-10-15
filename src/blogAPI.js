export async function getBlogsList() {
  try {
    const articlesResponse = await fetch("http://localhost:3000/articles/");
    //   console.log(articlesResponse);
    if (articlesResponse.status == 200) {
      // if the network requests work perfectly
      const articleData = await articlesResponse.json();
      const articles = articleData.articles;
      // articles can contain [] empty array too
      return {
        statusCode: 200,
        articles,
      };
    }
    return {
      statusCode: articlesResponse.status,
      msg: "Fetch for blog list failed.",
    };
  } catch (error) {
    return {
      statusCode: 404,
      msg: "Fetch for blog list failed.",
    };
  }
}

export async function getArticleById(articleID) {
  try {
    const article = await fetch(`http://localhost:3000/articles/${articleID}`);
    const result = await article.json();
    if (result.articleStatus == 200) {
      // if the fetch contains an article
      return {
        status: 200,
        article: result.article,
      };
    } else {
      return {
        status: 404,
        msg: result.msg,
      };
    }
  } catch (er) {
    // this occurs if network req or fetch req fails
    return {
      status: 404,
      msg: "Fetch for particular article failed",
    };
  }
}
