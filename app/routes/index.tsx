import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json } from "remix";

type IndexData = {
  todos: Array<{ task: string; status: "done" | "todo" }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = () => {
  const data: IndexData = {
    todos: [
      {
        task: "Read Clean Code Book",
        status: "done",
      },
      {
        task: "Learn Remix",
        status: "todo",
      },
      {
        task: "Learn Typescript",
        status: "done",
      },
    ],
  };

  return json(data);
};

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Todos App",
    description: "Yet another todos app!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const data = useLoaderData();

  return (
    <section className="todos__clz">
      {data.todos.map(({ task, status }, index) => (
        <div key={index} className="todo-container__clz">
          <input type="checkbox" checked={status === "done" ? "checked" : ""} />
          <article key={index} className="todo__clz">
            {task}
          </article>
        </div>
      ))}
    </section>
  );
}
