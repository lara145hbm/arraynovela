document.addEventListener('DOMContentLoaded', () => {
    // Função para adicionar uma novela
    function addNovela(title, year) {
        const novelas = getNovelasFromStorage();
        novelas.push({ title, year });
        saveNovelasToStorage(novelas);
    }

    // Função para remover uma novela
    function removeNovela(title) {
        let novelas = getNovelasFromStorage();
        novelas = novelas.filter(novela => novela.title !== title);
        saveNovelasToStorage(novelas);
    }

    // Função para listar novelas
    function listNovelas() {
        return getNovelasFromStorage();
    }

    // Função para obter a lista de novelas do localStorage
    function getNovelasFromStorage() {
        const novelasJSON = localStorage.getItem('novelas');
        return novelasJSON ? JSON.parse(novelasJSON) : [];
    }

    // Função para salvar a lista de novelas no localStorage
    function saveNovelasToStorage(novelas) {
        localStorage.setItem('novelas', JSON.stringify(novelas));
    }

    // Adicionar evento ao formulário de adição de novela
    const addNovelaForm = document.getElementById('add-novela-form');
    if (addNovelaForm) {
        addNovelaForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const year = document.getElementById('year').value;
            addNovela(title, year);
            document.getElementById('message').textContent = `Novela "${title}" adicionada com sucesso!`;
            addNovelaForm.reset();
        });
    }

    // Listar novelas na página list-novelas.html
    const novelaList = document.getElementById('novela-list');
    if (novelaList) {
        const novelas = listNovelas();
        novelas.forEach(novela => {
            const listItem = document.createElement('li');
            listItem.textContent = `${novela.title} (${novela.year})`;
            novelaList.appendChild(listItem);
        });
    }

    // Carrossel de imagens
    const carouselImages = document.querySelector('.carousel-images');
    const images = carouselImages.children;
    let currentIndex = 0;

    function showImage(index) {
        carouselImages.style.transform = `translateX(${-index * 100}%)`;
    }

    document.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

    document.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });
});
