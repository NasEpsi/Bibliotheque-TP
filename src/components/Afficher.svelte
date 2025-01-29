<script lang="ts">
    import { books } from '../stores/bookstore';
    let filter = 'all';  
    let search = '';  

    function searchBooks(book: {title: string, author: string, isRead: boolean}) {
        const term = search.toLowerCase();
        return (
            book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term)
        );
    }

    function markedRead(index: number) {
        books.update(currentBooks => {
            currentBooks[index].isRead = !currentBooks[index].isRead;
            return currentBooks;
        });
    }

    function deleteBook(index: number) {
        books.update(currentBooks => {
            currentBooks.splice(index, 1);
            return currentBooks;
        });
    }

    function updateRating(index: number, newRating: number) {
        books.update(currentBooks => {
            currentBooks[index].rating = newRating;
            return currentBooks;
        });
    }


    function changeFilter(value: string) {
        filter = value;
    }
</script>

<div class="search">
    <input type="text" bind:value={search} placeholder="Rechercher un livre par titre ou auteur" />
</div>

<div class="filters">
    <button on:click={() => changeFilter('all')}>Tous</button>
    <button on:click={() => changeFilter('read')}>Livres lus</button>
    <button on:click={() => changeFilter('unread')}>Livres non lus</button>
</div>

<div class="content">
<h2>Liste des livres</h2>
<br>
<ul>
    {#each $books as book, index (book.title)}
        {#if (filter === 'all' || (filter === 'read' && book.isRead) || (filter === 'unread' && !book.isRead)) && (search === '' || searchBooks(book))}
            <li>
                <p> 
                    <strong>{book.title}</strong><br>
                    Auteur : {book.author} <br>
                    {#if book.rating} Note : {book.rating}{/if}
                    {#if book.description} 
                    <br> Description : {book.description}
                    {/if}
                </p>

                <div>
                    <label for="rating-{index}">Note :</label>
                    <select id="rating-{index}" bind:value={book.rating} on:change={() => updateRating(index, +book.rating)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <button on:click={() => markedRead(index)}>{book.isRead ? 'Marqué comme Non lu' : 'Marquer comme lu'}</button>
                <button class="delete" on:click={() => deleteBook(index)}>Supprimer</button>
            </li>
        {/if}
    {/each}
</ul>
</div>
<style>

* {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Conteneur principal */
.content {
    max-width: 1200px;
    margin: 30px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.search{
    padding: 50px;
}

.filters {
    width: 20%;
    display: flex;
    margin-left: 10%;
    
}
/* Champ de recherche */
input[type="text"] {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    font-size: 16px;
    box-sizing: border-box;
    transition: all 0.3s;
}

input[type="text"]:focus {
    outline: none;
    border-color: #3498db;
}

/* Boutons de filtrage */
button {
    padding: 8px 12px; 
    font-size: 14px;   
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    margin-right: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

button:hover {
    background-color: #2980b9;
}

/* Liste des livres */
ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

/* Carte de livre */
li {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

li:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

/* Information livre */
p {
    font-size: 16px;
    color: #333;
}

p strong {
    font-weight: bold;
}

li div {
    margin-top: 15px;
}

label {
    font-size: 14px;
    color: #555;
}

select {

    font-size: 14px;    /* Réduit la taille de la police */
    border-radius: 5px;
    border: 1px solid #ddd;
    width: 30%;
    
}
input[type="text"], select {
    font-size: 14px;  /* Taille réduite pour les champs de recherche et de sélection */
}

button {
    margin-top: 15px;
    width: 100%;
    font-weight: bold;
    padding: 12px 0;
}

button.delete {
    background-color: #e74c3c;
}

button.delete:hover {
    background-color: #c0392b;
}


</style>
