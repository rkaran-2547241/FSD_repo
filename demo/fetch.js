// https://apis.scrimba.com/jsonplaceholder/posts

function getData(getResponse,showerror)
{
    fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(Response =>Response.json())
    .then(data =>getResponse(data.slice(0,5)))
}
function getResponse(user)
{
user.forEach(posts => {
    console.log(`Hello, my username ${posts.userId}`)
});
}
function showerror(error){3
    console.log(error)
}
getData(getResponse,showerror)

 