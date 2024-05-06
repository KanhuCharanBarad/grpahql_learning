let games = [
    { id: 1, title: "Zelda", platform: ["Switch"] },
    { id: 2, title: "Final Fantasy", platform: ["PS5,Xbox"] },
    { id: 4, title: "Elden Ring", platform: ["PS5,Xbox,PC"] },
    { id: 5, title: "Mario Cart", platform: ["Switch"] },
    { id: 6, title: "Pockemon Scarlet", platform: ["PS5,Xbox,PC"] }
]

let authors = [
    { id: 1, name: "mario", verified: true },
    { id: 2, name: "yoshi", verified: false },
    { id: 3, name: "peach", verified: true },
]

let reviews = [
    { id: 1, rating: 9, content: "lorem ipsum", author_id: 1, game_id: 2 },
    { id: 2, rating: 10, content: "lorem ipsum", author_id: 3, game_id: 1 },
    { id: 3, rating: 8, content: "lorem ipsum", author_id: 2, game_id: 4 },
    { id: 4, rating: 7, content: "lorem ipsum", author_id: 2, game_id: 4 },
    { id: 5, rating: 9, content: "lorem ipsum", author_id: 3, game_id: 5 },
    { id: 6, rating: 7, content: "lorem ipsum", author_id: 1, game_id: 6 },
    { id: 7, rating: 6, content: "lorem ipsum", author_id: 1, game_id: 2 }
]

module.exports = { games, authors, reviews };