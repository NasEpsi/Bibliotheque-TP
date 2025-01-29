<script lang="ts">
    import { books } from '../stores/bookstore';
    let newComment: string = ''; 

    function addComment(index: number, comment: string) {
        books.update(currentBooks => {
            if (!currentBooks[index].comments) {
                currentBooks[index].comments = [];
            }
            currentBooks[index].comments.push(comment);
            return currentBooks;
        });
    }
</script>

<div class="container">
    <h2>Livres lus</h2>
    <ul>
        {#each $books as book, index (book.title)}
            {#if book.isRead}
                <li class="book-card">
                    <p class="book-info"> 
                        Titre : {book.title} - Auteur : {book.author} 
                        {#if book.rating} - Note : {book.rating} ⭐{/if}
                    </p>

                    {#if book.description}
                        <p class="book-description">{book.description}</p>
                    {/if}

                    {#if book.comments}
                        <div class="comments-section">
                            <h3>Commentaires :</h3>
                            <ul class="comments-list">
                                {#each book.comments as comment}
                                    <li class="comment-item">{comment}</li>
                                {/each}
                            </ul>
                        </div>
                    {/if}

                    <div class="comment-box">
                        <textarea bind:value={newComment} placeholder="Ajouter un commentaire..."></textarea>
                        <button on:click={() => addComment(index, newComment)}>Ajouter le commentaire</button>
                    </div>
                </li>
            {/if}
        {/each}
    </ul>
</div>

<style>
    /* Styles globaux */

/* Conteneur principal */
.container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
}

/* Titres */
h2 {
    text-align: center;
    color: #2c3e50;
}

/* Liste des livres */
ul {
    list-style: none;
    padding: 0;
}

.book-card {
    background: white;
    padding: 20px;
    margin: 15px 0;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.book-card:hover {
    transform: scale(1.02);
}

/* Informations du livre */
.book-info {
    font-size: 16px;
    font-weight: bold;
}

.book-description {
    font-size: 14px;
    color: #555;
    margin-top: 5px;
}

/* Commentaires */
.comments-section {
    margin-top: 15px;
}

.comments-section h3 {
    font-size: 16px;
    color: #2c3e50;
    margin-bottom: 5px;
}

.comments-list {
    padding-left: 15px;
}

.comment-item {
    background: #ecf0f1;
    padding: 8px;
    margin: 5px 0;
    border-radius: 5px;
}

/* Formulaire de commentaire */
.comment-box {
    margin-top: 10px;
}

textarea {
    width: 100%;
    height: 60px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    resize: none;
}

/* Boutons */
button {
    background-color: #27ae60;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
    margin-top: 5px;
}

button:hover {
    background-color: #2ecc71;
}

</style>