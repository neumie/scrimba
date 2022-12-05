import blogsObject from './text/blogs.json' assert { type: 'json' };
import home from './text/home.json' assert { type: 'json' };
import about from './text/about.json' assert { type: 'json' };

const blogSection = document.getElementById('blogs');
const viewMore = document.getElementById('more');
const article = document.getElementsByClassName('article')[0];
const aboutButton = document.getElementById('about-button');
const homeButton = document.getElementById('home-button');
const logoButton = document.getElementById('logo');

let postsRendered = 0;

// LOGIC

const isAllRendered = () => {
    if (postsRendered >= blogsObject.blogs.length) return true;
    return false;
}

const renderPosts = (postsRendered, numberOfPosts) => {
    let html = '';
    let j = 0;
    for (let i in blogsObject.blogs) {
        if (i >= numberOfPosts) return { html, j };
        if (postsRendered >= i) i = postsRendered;
        if (i >= blogsObject.blogs.length) return { html, j };
        let { date, title, image, text } = blogsObject.blogs[i];
        html += `
                    <div class="blog">
                        <img src="./images/${image}">
                        <p class="date">${date}</p>
                        <h1>${title}</h1>
                        <p>${text}</p>
                    </div>
                    `;
        j++;
        postsRendered++;
    };
    return { html, j };
};

const renderArticle = (article) => {
    let { date, title, image, text, sections } = article;

    let html = `
                <img src="./images/${image}">
                <h1>${title}</h1>
                <p>${text}</h1>
                `;
    for (const section of sections) {
        html += `
                <h3>${section.title}</h3>
                <p>${section.text}</p>
                `
    }

    return html;
}

const renderMore = () => {
    let { html, j } = renderPosts(postsRendered, 3);
    postsRendered += j;
    if(isAllRendered()) viewMore.style.display = "none";
    return html
}

const renderAbout = () => {
    article.classList.remove("hero");
    article.classList.add("about");
    article.innerHTML = renderArticle(about);
}

const renderHome = () => {
    article.classList.remove("hero");
    article.classList.remove("about");
    article.innerHTML = renderArticle(home);
}

const renderHero = () => {
    article.classList.add("hero");
    article.classList.remove("about");
    article.innerHTML = `
                    <p class="date">July, 23, 2022</p>
                    <h1>My new journey as a bootcamp student.</h1>
                    <p>After several months of learning in the Frontend Developer Career Path, I've made the big jump over to the Bootcamp to get expert code reviews of my Solo Projects projects and meet like-minded peers.</p>
                    `;
}

const render = () => {
    renderHero();
    blogSection.innerHTML += renderMore();
}

// EVENTS

homeButton.addEventListener('click', renderHome);
aboutButton.addEventListener('click', renderAbout);
logoButton.addEventListener('click', renderHero);
viewMore.addEventListener('click', render);

render();