import { Form, redirect, useLoaderData } from "react-router-dom";

export async function action({ request, params }) {
  console.log("sewwy");
  switch (request.method) {
    case "DELETE": {
      console.log("wewwy");

      let formData = await request.formData();
      // here we want to send POST request to the server
      // here we wanna post to localhost:3000/users/login
      const deleteArticleResults = await fetch(
        `http://localhost:3000/articles/${params.articleId}`,
        {
          method: "DELETE",
          mode: "cors",
          //   body: JSON.stringify({
          //     title: formData.get("title"),
          //     content: formData.get("content"),
          //   }),
          //   headers: {
          //     "Content-Type": "application/json", // Adjust content type as needed
          //   },
          credentials: "include",
        }
      );

      console.log(deleteArticleResults);
      const result = await deleteArticleResults.json();
      console.log(result);
      // here the result contains statuscode
      console.log(result.msg);
      if (result.statusCode == 200) {
        return redirect(`/`);
      } else if (result.statusCode == 401) {
        const err = new Error();
        err.message = result.msg;
        // this would rather required graceful
        // handling
        // probably here we redirect to login page
        throw err;
        // console.log("Unauthorized access");
        // return <p>Unauthorized access</p>;
      } else if (result.statusCode == 404) {
        const err = new Error();
        err.message = result.msg;
        // this would rather required graceful
        // handling
        // probably here we redirect to login page
        throw err;
        // console.log("Unauthorized access");
        // return <p>Unauthorized access</p>;
      }
    }
  }
}
