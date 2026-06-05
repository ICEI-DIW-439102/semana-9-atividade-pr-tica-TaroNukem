const data = {
  "produtos": [
    {
      "id": 1,
      "nome": "Smartphone Galaxy S23",
      "preco": 3499.90,
      "categoria": "Celulares",
      "imagem": "https://picsum.photos/300/200?random=1",
      "descricao": "Smartphone com 128GB de armazenamento, câmera de alta resolução e excelente desempenho.",
      "emEstoque": true
    },
    {
      "id": 2,
      "nome": "Notebook Dell Inspiron 15",
      "preco": 4599.00,
      "categoria": "Notebooks",
      "imagem": "https://picsum.photos/300/200?random=2",
      "descricao": "Notebook com processador Intel i7, 16GB de RAM e SSD de 512GB.",
      "emEstoque": false
    },
    {
      "id": 3,
      "nome": "Mouse Gamer Logitech G203",
      "preco": 149.90,
      "categoria": "Periféricos",
      "imagem": "https://picsum.photos/300/200?random=3",
      "descricao": "Mouse gamer com iluminação RGB e sensor de alta precisão.",
      "emEstoque": true
    },
    {
      "id": 4,
      "nome": "Teclado Mecânico Redragon Kumara",
      "preco": 239.90,
      "categoria": "Periféricos",
      "imagem": "https://picsum.photos/300/200?random=4",
      "descricao": "Teclado mecânico compacto com switches de alta durabilidade.",
      "emEstoque": true
    },
    {
      "id": 5,
      "nome": "Monitor LG UltraGear 24",
      "preco": 899.90,
      "categoria": "Monitores",
      "imagem": "https://picsum.photos/300/200?random=5",
      "descricao": "Monitor Full HD de 24 polegadas com 144Hz.",
      "emEstoque": true
    },
    {
      "id": 6,
      "nome": "Headset HyperX Cloud Stinger",
      "preco": 299.90,
      "categoria": "Áudio",
      "imagem": "https://picsum.photos/300/200?random=6",
      "descricao": "Headset confortável com microfone integrado.",
      "emEstoque": false
    },
    {
      "id": 7,
      "nome": "SSD Kingston NV2 1TB",
      "preco": 429.90,
      "categoria": "Armazenamento",
      "imagem": "https://picsum.photos/300/200?random=7",
      "descricao": "SSD NVMe de 1TB com altas velocidades de leitura e gravação.",
      "emEstoque": true
    },
    {
      "id": 8,
      "nome": "Placa de Vídeo RTX 4060",
      "preco": 2199.90,
      "categoria": "Hardware",
      "imagem": "https://picsum.photos/300/200?random=8",
      "descricao": "Placa de vídeo ideal para jogos em Full HD e Quad HD.",
      "emEstoque": true
    }
  ]
}

const lista = document.getElementById("product-list")
const busca = document.querySelector("#search")
const categoriaSelect = document.querySelector("#category")
const btnRender = document.querySelector("#btnRender")
const detalhes = document.getElementById("product-details")

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2)
}

function renderCategories() {

  categoriaSelect.innerHTML =
    '<option value="Todas">Todas</option>'

  const categorias = []

  for (let i = 0; i < data.produtos.length; i++) {

    const categoria = data.produtos[i].categoria

    if (!categorias.includes(categoria)) {

      categorias.push(categoria)

      const option = document.createElement("option")

      option.value = categoria
      option.textContent = categoria

      categoriaSelect.appendChild(option)

    }
  }
}

function showProductDetails(produto) {

  detalhes.innerHTML = `
    <h2>${produto.nome}</h2>
    <p>${formatPrice(produto.preco)}</p>
    <p>${produto.categoria}</p>
    <p>${produto.descricao}</p>
    <p>${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
  `
}

function createProductCard(produto) {

  const card = document.createElement("div")
  card.classList.add("card")
  card.setAttribute("data-id", produto.id)

  card.style.padding = "10px"

  const imagem = document.createElement("img")
  const titulo = document.createElement("h2")
  const preco = document.createElement("h3")
  const categoria = document.createElement("p")
  const descricao = document.createElement("p")
  const estoque = document.createElement("p")

  const btnDetalhes = document.createElement("button")
  const btnDestacar = document.createElement("button")

  imagem.src = produto.imagem
  titulo.textContent = produto.nome
  preco.textContent = formatPrice(produto.preco)
  categoria.textContent = produto.categoria
  descricao.textContent = produto.descricao

  estoque.textContent =
    produto.emEstoque ? "Disponível" : "Indisponível"

  btnDetalhes.textContent = "Ver detalhes"
  btnDestacar.textContent = "Destacar"

  btnDetalhes.addEventListener("click", function () {
    showProductDetails(produto)
  })

  btnDestacar.addEventListener("click", function () {
    card.classList.toggle("highlight")
  })

  card.appendChild(imagem)
  card.appendChild(titulo)
  card.appendChild(preco)
  card.appendChild(categoria)
  card.appendChild(descricao)
  card.appendChild(estoque)
  card.appendChild(btnDetalhes)
  card.appendChild(btnDestacar)

  return card
}

function renderProducts(produtos) {

  lista.innerHTML = ""

  for (let i = 0; i < produtos.length; i++) {

    const card = createProductCard(produtos[i])

    lista.appendChild(card)

  }

  const cards = document.querySelectorAll(".card")

  cards.forEach(card => {
    console.log(card.dataset.id)
  })
}

function filterProducts() {

  const texto = busca.value.toLowerCase()
  const categoria = categoriaSelect.value

  return data.produtos.filter(produto => {

    const nomeOk =
      produto.nome.toLowerCase().includes(texto)

    const categoriaOk =
      categoria === "Todas" ||
      produto.categoria === categoria

    return nomeOk && categoriaOk

  })
}

busca.addEventListener("input", function () {

  renderProducts(
    filterProducts()
  )

})

categoriaSelect.addEventListener("change", function () {

  renderProducts(
    filterProducts()
  )

})

btnRender.addEventListener("click", function () {

  renderProducts(
    filterProducts()
  )

})

renderCategories()
renderProducts(data.produtos)