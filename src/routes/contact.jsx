import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contact";
import { getArticleById } from "../blogAPI";

export async function loader({ params }) {
  const article = await getArticleById(params.articleId);
  console.log("article is: ", article);
  return article;
}

export default function Contact() {
  const articleEle = useLoaderData();
  // console.log(articleEle);
  const contact = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };

  return (
    <div>
      <div>
        {articleEle.status == 200 ? (
          <div>
            <p>Title: {articleEle.article.title}</p>
            <p>Author: {articleEle.article.author.username}</p>
            <p>Content: {articleEle.article.content}</p>
            <p>Created At: {articleEle.article.createdAt}</p>
          </div>
        ) : (
          <p>
            <i>{articleEle.msg}</i>
          </p>
        )}
      </div>
      <div id="contact">
        <div>
          <img key={contact.avatar} src={contact.avatar || null} />
        </div>
        <div>
          <h1>
            {contact.first || contact.last ? (
              <>
                {contact.first} {contact.last}
              </>
            ) : (
              <i>No Name</i>
            )}{" "}
            <Favorite contact={contact} />
          </h1>
          {contact.twitter && (
            <p>
              <a
                target="_blank"
                href={`https://twitter.com/${contact.twitter}`}
              >
                {contact.twitter}
              </a>
            </p>
          )}
          {contact.notes && <p>{contact.notes}</p>}
          <div>
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>
            <Form
              method="post"
              action="destroy"
              onSubmit={(event) => {
                if (
                  !confirm("Please confirm you want to delete this record.")
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
