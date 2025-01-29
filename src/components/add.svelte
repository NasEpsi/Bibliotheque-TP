<script lang="ts">
    import { books } from '../stores/bookstore';

    let title = $state("");  
    let author = $state("");
    let description = $state(""); 
    let rating = $state(1)

    function addBook() {
        if (title && author) {
            books.update(currentBooks => {
                currentBooks.push({ title, author, description ,rating, isRead: false, comments:""});
                console.log("Livre ajouté:", currentBooks); 
                return currentBooks;
            });
            title = '';  
            author = '';  
            description = ''; 
            rating = 1; 

        }
    }
</script>

<div class="form-container">

<h2>Ajouter un livre</h2>
<form on:submit|preventDefault={addBook}>
    <input type="text" bind:value={title} placeholder="Titre du livre" required />
    <input type="text" bind:value={author} placeholder="Auteur" required />
    <textarea bind:value={description} placeholder="Description (optionnelle)"></textarea>
    <div>
        <label for="rating"> Note : </label>
            <select bind:value={rating}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
    </div>
    <button type="submit">Ajouter</button>
</form>
</div>
<style>
    /* Conteneur du formulaire */
.form-container {
    max-width: 500px;
    margin: 20px auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Titres */
h2 {
    text-align: center;
    color: #2c3e50;
}

/* Champs de formulaire */
input, textarea, select {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
}

/* Bouton */
button {
    width: 100%;
    padding: 10px;
    background-color: #27ae60;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
}

button:hover {
    background-color: #2ecc71;
}

</style>