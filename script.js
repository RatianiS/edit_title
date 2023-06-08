function editPost() {
    const postButtons = document.querySelectorAll("#update-post");
    const deleteButtons = document.querySelectorAll("[data-post-id]");

    postButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const className = e.target.className;
            console.log(className);
            const input = document.querySelector(`.${className}`);
            const newTitle = input.value;
            const postId = className.split("_")[1];
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: "PUT",
                body: JSON.stringify({
                    id: postId,
                    title: newTitle,
                    body: "bar",
                    userId: 1,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log("Response", json);
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
        });
    });

    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const postId = e.target.getAttribute("data-post-id");
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: "DELETE",
            }).then((response) => {
                const input = document.querySelector(`.post_${postId}_class`);
                if (input) {
                    input.parentElement.remove();
                    console.log("Post deleted:", postId);
                }
            });
        });
    });
}

fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
        const body = document.querySelector("body");
        json.forEach((post) => {
            const div = document.createElement("div");
            const input = document.createElement("input");
            input.setAttribute("class", `post_${post.id}_class`);
            input.setAttribute("type", "text");
            input.setAttribute("value", `${post.title}`);

            const update = document.createElement("button");
            update.setAttribute("class", `post_${post.id}_class`);
            update.setAttribute("id", "update-post");
            update.textContent = "update";

            const deletepost = document.createElement("button");
            deletepost.setAttribute("class", `post_${post.id}_class`);
            deletepost.setAttribute("data-post-id", `${post.id}`);
            deletepost.textContent = "delete";

            div.appendChild(input);
            div.appendChild(update);
            div.appendChild(deletepost);
            body.appendChild(div);
        });
        editPost();
    });
