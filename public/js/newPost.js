const postForm = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const post_content = document.querySelector('#content').value;
console.log(title)
console.log(post_content)
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};
document.querySelector("#create-post").addEventListener("click", postForm);
