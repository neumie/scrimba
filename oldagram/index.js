const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21492,
        liked: false
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4,
        liked: false
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152,
        liked: false
    }
]

const main = document.getElementById("posts");
const renderPosts = (posts) => {
    let i = 0;
    let isLast = false;
    for (post of posts) {
        if ((i + 1) == posts.length) isLast = true;
        main.innerHTML += `
                <section>
                    <div class="post">
                        <div class="author">
                            <img class="author-profile-picture" src="${post.avatar}" alt="profile picture of the post author">
                            <div class="author-information">
                                <p class="author-username">${post.name}</p>
                                <p class="author-location">${post.location}</p>
                            </div>
                        </div>
                        <div class="post-img-container">
                            <img class="post-image" src="${post.post}" ondblclick="like(${i}, true)" alt="image of the post">
                            <img class="overlaying-heart" src="/images/icon-heart-filled.png" alt="hidden heart">
                        </div>
                        <div class="interactions">
                            <img class="btn like" src="/images/icon-heart.png" alt="like button" onclick="like(${i}, false)">
                            <img class="btn" src="/images/icon-comment.png" alt="comment button">
                            <img class="btn" src="/images/icon-dm.png" alt="direct message button">
                        </div>
                        <div class="likes">
                            <p>${post.likes} likes</p>
                        </div>
                        <div class="comments">
                            <p><span class="username">${post.username}</span> ${post.comment}</p>
                        </div>
                        ${isLast ? "" : `<div class="spacer"></div>`}
                    </div>
                </section>
                `
        i++;
    }
}

const like = (i, double) => {
    let isLiked = posts[i].liked;
    const likeArray = document.getElementsByClassName("likes");
    const likeElement = likeArray[i];
    const heartIcon = document.getElementsByClassName("btn like")[i];
    const heart = document.getElementsByClassName("overlaying-heart")[i];
    
    if (!isLiked) {
        if (double) heart.classList.add("heartAnimation");
        heartIcon.src = "/images/icon-heart-filled.png";
        posts[i].likes++;
        posts[i].liked = true;
    } else {
        heart.classList.remove("heartAnimation");
        heartIcon.src = "/images/icon-heart.png";
        posts[i].likes--;
        posts[i].liked = false;
    }

    likeElement.innerHTML = `<p>${posts[i].likes} likes</p>`
}

renderPosts(posts)
            