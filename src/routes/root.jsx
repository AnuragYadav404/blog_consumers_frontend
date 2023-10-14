import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
// here we import a supporting func from contact.js
import { getContacts, createContact } from "../contact";
import { getBlogsList } from "../blogAPI";

// here we define the loader function
export async function loader() {
  const contacts = await getContacts();
  const blogList = await getBlogsList();
  return { contacts, blogList };
}

export async function action({ request, params }) {
  switch (request.method) {
    case "POST": {
      let formData = await request.formData();
      // here we wanna post to localhost:3000/users/login
      const loginResults = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
        headers: {
          "Content-Type": "application/json", // Adjust content type as needed
        },
        credentials: "include",
      });
      console.log(loginResults);
      const result = await loginResults.json();
      console.log(result);
    }
  }
  const contact = await createContact();
  return { contact };
}

export default function Root() {
  const { contacts, blogList } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>

        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <input
              type="text"
              name="username"
              required
              placeholder="Enter login username"
            />
            <input
              type="text"
              name="password"
              required
              placeholder="Enter login password"
            />
            <button type="submit">New</button>
          </Form>
          {/* <Form method="post">
            <button type="submit">New</button>
          </Form> */}
        </div>
        <nav>
          {blogList.statusCode != 200 ? (
            <p>
              <i>Failed to get the latest blogs</i>
            </p>
          ) : (
            <ul>
              {blogList.articles.length == 0 && <i>No blogs!</i>}
              {blogList.articles.map((art) => {
                return (
                  <li key={art.id}>
                    <Link to={art.url}>{art.title}</Link>
                  </li>
                );
              })}
            </ul>
          )}
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
