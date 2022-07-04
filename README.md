# Front-end Challenge 🏅 2022 - Dictionary

## Introdução

Este é um desafio para que possamos ver as suas habilidades como Front-end Developer.

Nesse desafio você deverá desenvolver um aplicativo para listar palavras em inglês, utilizando como base a API [Free Dictionary API](https://dictionaryapi.dev/). O projeto a ser desenvolvido por você tem como objetivo exibir termos em inglês e gerenciar as palavras visualizadas, conforme indicado nos casos de uso que estão logo abaixo.

[SPOILER] As instruções de entrega e apresentação do challenge estão no final deste Readme (=

### Instruções iniciais obrigatórias

- Utilizar o seu github pessoal para publicar o desafio. Confirme que a visibilidade do projeto é pública (não esqueça de colocar no readme a referência a este challenge);
- Utilize as seguintes tecnologias:

#### Tecnologias (Front-End):
- Framework (React, Angular, Vue.js, etc)
- Estilização (Material UI, Semantic UI, Styled Components, etc). Ou escrever o seu próprio sob medida 👌
- CSS Flexbox + CSS Grid
- Design Mobile First
- Gestão de dados (Redux, Context API, Localstorage, etc)
- Conceitos de Programação Funcional em JS (pelo menos .map, .filter e .reduce)

Atente-se, ao desenvolver a aplicação front-end, para conceitos de usabilidade e adeque a interface com elementos visuais para os usuários do seu sistema.

#### Tecnologias (Back-End):
- Firebase, Supabase, JsonServer, Npoint, etc.

#### Organização:
- Aplicação de padrões Clean Code
- Validação de chamadas assíncronas para evitar travamentos

### Modelo de Dados:

Conforme indicado na documentação da API, a estrutura de dados presente retorna as seguintes informações:

```json
[
    {
        "word": "hello",
        "phonetics": [
            {
                "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3",
                "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=75797336",
                "license": {
                    "name": "BY-SA 4.0",
                    "url": "https://creativecommons.org/licenses/by-sa/4.0"
                }
            },
            {
                "text": "/həˈləʊ/",
                "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3",
                "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=9021983",
                "license": {
                    "name": "BY 3.0 US",
                    "url": "https://creativecommons.org/licenses/by/3.0/us"
                }
            },
            {
                "text": "/həˈloʊ/",
                "audio": ""
            }
        ],
        "meanings": [
            {
                "partOfSpeech": "noun",
                "definitions": [
                    {
                        "definition": "\"Hello!\" or an equivalent greeting.",
                        "synonyms": [],
                        "antonyms": []
                    }
                ],
                "synonyms": [
                    "greeting"
                ],
                "antonyms": []
            },
            {
                "partOfSpeech": "verb",
                "definitions": [
                    {
                        "definition": "To greet with \"hello\".",
                        "synonyms": [],
                        "antonyms": []
                    }
                ],
                "synonyms": [],
                "antonyms": []
            },
            {
                "partOfSpeech": "interjection",
                "definitions": [
                    {
                        "definition": "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "Hello, everyone."
                    },
                    {
                        "definition": "A greeting used when answering the telephone.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "Hello? How may I help you?"
                    },
                    {
                        "definition": "A call for response if it is not clear if anyone is present or listening, or if a telephone conversation may have been disconnected.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "Hello? Is anyone there?"
                    },
                    {
                        "definition": "Used sarcastically to imply that the person addressed or referred to has done something the speaker or writer considers to be foolish.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "You just tried to start your car with your cell phone. Hello?"
                    },
                    {
                        "definition": "An expression of puzzlement or discovery.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "Hello! What’s going on here?"
                    }
                ],
                "synonyms": [],
                "antonyms": [
                    "bye",
                    "goodbye"
                ]
            }
        ],
        "license": {
            "name": "CC BY-SA 3.0",
            "url": "https://creativecommons.org/licenses/by-sa/3.0"
        },
        "sourceUrls": [
            "https://en.wiktionary.org/wiki/hello"
        ]
    }
]
```

### Front-End:

Nessa etapa você deverá desenvolver uma aplicação web para consumir a API do desafio.

**Obrigatório 1** - Você deverá atender aos seguintes casos de uso:

- Como usuário, devo ser capaz de visualizar uma lista de palavras com rolagem infinita
- Como usuário, devo ser capaz de visualizar uma palavra, significados e a fonética
- Como usuário, devo ser capaz de salvar a palavra como favorito
- Como usuário, devo ser capaz de remover a palavra como favorito
- Como usuário, devo ser capaz de visitar uma lista com as palavras que já vi anteriormente

A Free Dictionary API não possui endpoint com a lista de palavras. Você deve baixar a lista de palavras do repositório e importar estas palavras para o banco de dados (Firestore/Supabase, etc). Para importar os dados, pode ser necessário transformar o arquivo de texto em um array de strings.

Para criar este endpoint será necessário alimentar o seu banco de dados com o [arquivo existente dentro do projeto no Github](https://github.com/meetDeveloper/freeDictionaryAPI/tree/master/meta/wordList). Outra opção é usar a lib [https://www.npmjs.com/package/word-list-json](https://www.npmjs.com/package/word-list-json), com a penalidade de aumentar o tamanho do projeto.

**Obrigatório 2** - Salvar em cache o resultado das requisições ao Free Dictionary API, para agilizar a resposta em caso de buscas com parâmetros repetidos.

**Obrigatório 3** - Seguir o wireframe para a página de listagem dos dados. Pode-se alterar a posição dos itens, mantendo as funcionalidades solicitadas.

<img src="./img/wireframe.png" width="100%" />

**Diferencial 1** - Escrever Unit Tests ou E2E Test. Escolher a melhor abordagem e biblioteca;

**Diferencial 2** - Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;

**Diferencial 3** - Colocar na URL os parametros utilizados na busca, para que seja possível compartilhar a URL;

**Diferencial 4** - Implementar SSR no projeto;

**Diferencial 5** - Implementar o projeto com PWA.

**Diferencial 6** - Implementar login com usuário e senha e associar os favoritos e histórico ao ID do usuário, salvando essa informação no Back-end

## Readme do Repositório

- Deve conter o título do projeto
- Uma descrição sobre o projeto em frase
- Deve conter uma lista com linguagem, framework e/ou tecnologias usadas
- Como instalar e usar o projeto (instruções)
- Não esqueça o [.gitignore](https://www.toptal.com/developers/gitignore)
- Se está usando github pessoal, referencie que é um challenge by coodesh:  

>  This is a challenge by [Coodesh](https://coodesh.com/)


## Finalização e Instruções para a Apresentação

Avisar sobre a finalização e enviar para correção.

1. Confira se você respondeu o Scorecard anexado na Vaga que se candidatou;
2. Confira se você respondeu o Mapeamento anexado na Vaga que se candidatou;
3. Acesse [https://coodesh.com/challenges/review](https://coodesh.com/challenges/review);
4. Adicione o repositório com a sua solução;
5. Grave um vídeo, utilizando o botão na tela de solicitar revisão da Coodesh, com no máximo 5 minutos, com a apresentação do seu projeto. Utilize o tempo para:
- Explicar o objetivo do desafio
- Quais tecnologias foram utilizadas
- Mostrar a aplicação em funcionamento
- Foque em pontos obrigatórios e diferenciais quando for apresentar.
6. Adicione o link da apresentação do seu projeto no README.md.
7. Verifique se o Readme está bom e faça o commit final em seu repositório;
8. Confira a vaga desejada;
9. Envie e aguarde as instruções para seguir no processo. Sucesso e boa sorte. =)

## Suporte

Use a [nossa comunidade](https://coodesh.com/desenvolvedores#community) para tirar dúvidas sobre o processo ou envie um e-mail para contato@coodesh.com.

