//array '[]'
let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 1, 2, 19, 23),
    dataCheckIn: new Date(2024, 1, 5, 20, 20)
  },
  {
    nome: "Robson Marques",
    email: "robson@gmail.com",
    dataInscricao: new Date(2024, 3, 10, 14, 15),
    dataCheckIn: new Date(2024, 3, 10, 15, 0)
  },
  {
    nome: "Cleiton Souza",
    email: "cleiton@gmail.com",
    dataInscricao: new Date(2024, 4, 18, 11, 30),
    dataCheckIn: new Date(2024, 4, 18, 12, 10)
  },
  {
    nome: "Jakeliny Gracielly",
    email: "jakeliny@gmail.com",
    dataInscricao: new Date(2024, 5, 21, 9, 45),
    dataCheckIn: new Date(2024, 5, 21, 10, 5)
  },
  {
    nome: "João Inácio",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 6, 3, 16, 0),
    dataCheckIn: new Date(2024, 6, 3, 16, 30)
  },
  {
    nome: "Marina Ferreira",
    email: "marina@gmail.com",
    dataInscricao: new Date(2024, 7, 14, 8, 20),
    dataCheckIn: new Date(2024, 7, 14, 8, 55)
  },
  {
    nome: "Carlos Silva",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 8, 25, 13, 40),
    dataCheckIn: new Date(2024, 8, 25, 14, 10)
  },
  {
    nome: "Luana Pereira",
    email: "luana@gmail.com",
    dataInscricao: new Date(2024, 9, 7, 10, 0),
    dataCheckIn: new Date(2024, 9, 7, 10, 30)
  },
  {
    nome: "Gustavo Henrique",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2024, 10, 19, 17, 50),
    dataCheckIn: new Date(2024, 10, 19, 18, 25)
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to (participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to (participante.dataCheckIn)

  // condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
        Confirmar check-in
      </button>
    `
  }
  
  return `
  <tr>
    <td>
      <strong>${participante.nome}</strong>
      <br>
      <small>${participante.email}</small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

//pegar informação do HTML


//substituir informação do HTML
document
.querySelector('tbody')
.innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('E-mail já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => p.email == event.target.dataset.email)

  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}