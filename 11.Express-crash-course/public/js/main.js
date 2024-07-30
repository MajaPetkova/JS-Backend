const output = document.querySelector("#output");
const button = document.querySelector("#get-posts");
const addForm= document.getElementById("add-form");


//get and show posts
async function showPosts() {
  try {
    const res = await fetch("http://localhost:8000/api/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await res.json();

    output.innerHTML = "";
    posts.forEach((x) => {
      const postEl = document.createElement("div");
      postEl.textContent = x.title;
      output.appendChild(postEl);
    });
  } catch (error) {
    console.log("Error fetching posts: ", error);
  }
}

//create new post
async function addPost(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const title = formData.get("title");
  try {
    const res = await fetch("http://localhost:8000/api/posts", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      throw new Error("Failed to add post");
    }
    const newPost = await res.json();
    const postEl= document.createElement("div")
    postEl.textContent = newPost;
    output.appendChild(postEl);
    showPosts()
  } catch (error) {
    console.error("Error adding post");
  }
}

//event listener
button.addEventListener("click", showPosts);
addForm.addEventListener("submit", addPost)
