import { Form, redirect, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const article = await getArticleById(params.articleId);
  console.log("article is: ", article);
  return article;
}

export async function action({ request, params }) {
  switch (request.method) {
    case "PUT": {
      let formData = await request.formData();
      // here we want to send POST request to the server
      // here we wanna post to localhost:3000/users/login
      const updateArticleResults = await fetch(
        `http://localhost:3000/articles/${params.articleId}`,
        {
          method: "PUT",
          mode: "cors",
          body: JSON.stringify({
            title: formData.get("title"),
            content: formData.get("content"),
          }),
          headers: {
            "Content-Type": "application/json", // Adjust content type as needed
          },
          credentials: "include",
        }
      );

      console.log(updateArticleResults);
      const result = await updateArticleResults.json();
      console.log(result);
      // here the result contains statuscode
      if (result.statusCode == 200) {
        return redirect(`/articles/${params.articleId}`);
      } else if (result.statusCode == 400) {
        const err = new Error();
        err.message = "Unauthorized access";
        // this would rather required graceful
        // handling
        // probably here we redirect to login page
        throw err;
        // console.log("Unauthorized access");
        // return <p>Unauthorized access</p>;
      } else if (result.statusCode == 404) {
        console.log("Article not found");
        return <p>Article does not exist</p>;
      }
    }
  }
}

export default function EditContact() {
  const articleEle = useLoaderData();

  return (
    <div>
      {articleEle.status == 200 ? (
        <Form method="PUT" id="contact-form">
          <p>
            <span>Title</span>
            <input
              placeholder="Title"
              aria-label="Article Title"
              type="text"
              name="title"
              defaultValue={articleEle.article.title}
            />
            <input
              placeholder="content"
              aria-label="Article content"
              type="text"
              name="content"
              defaultValue={articleEle.article.content}
            />
          </p>
          <p>
            <button type="submit">Save</button>
            <button type="button">Cancel</button>
          </p>
        </Form>
      ) : (
        <p>
          <i>{articleEle.msg}</i>
        </p>
      )}
    </div>
  );
}
