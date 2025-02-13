# API de gestão de tarefas
Este é um projeto feito para treinar habilidades com o nodeJS, usando o express.

## agradecimentos especiais
Primeiramente, quero agradecer a todos os que acreditaram em meu progresso até este momento, sem eles, não seria capaz de progredir 1% do que progredi aqui.
um salve vai para henrique Santos, que me iniciou com o básico que precisava para criar a base da API. ele me ensinou a fazer os filtros e estruturar o json de forma simples usando o bodyParser, criando o json de um jeito mais rápido.
Também com sua paciência na hora de orientar a criar os caminhos de rotas.

## como usar o projeto?
Este projeto não conta com um ambiente gráfico. para instalar execute em seu ambiente:
git clone https://github.com/thadeu220v/tasklist-backend

após, com o node e o npm instalados, obtenha as dependências do projeto que estão no package.json
rode:
npm install

após todas as dependências ativas na pasta. execute:
node ./src/index.js

isso inicializará o servidor na porta 3000 do seu localhost

## novidade: banco de dados SQLite
Agora, nas próximas versões, contaremos com um banco de dados feito em SQLite, que nos auxiliará a manter os dados de tarefas de forma permanente. É claro que, você poderá ainda contar com as funções de adição, alteração, leitura e apagamento de informações do banco de dados. Mas, é uma edição muito importante a se comemorar, por que ela nos garante que agora, teremos a possibilidade de armazenar dados de forma constante. com os dados de atualização e criação da tarefa embutidas no banco de dados.

## próximos passos:
em breve, iremos adicionar a capacidade de criar status diferentes para as atividades. removendo a opção de true e false, e criando códigos ou status diferentes para cada situação da atividade. Lógico, também armazenando e permitindo alteração pela API

## rotas
get /tasks == obtem todas as tarefas criadas
post /tasks == permite criar as tarefas, o formato do json deve ser o seguinte:

{
    "title":"titulo da tarefa",
    "description":"descrição da tarefa",
    "status":true
}

o status deve receber um true, ou false, em caso de pendente ou concluído.

### para consultar uma tarefa específica registrada no json
Envie uma solicitação get para:
get http://localhost:3000/tasks/numerodatask
Por exemplo:
get http://localhost:3000/tasks/1
Será retornado um json com os dados da tarefa solicitada. Se ela não existir, será retornado um erro 404 com os detalhes da solicitação e sua negativa.

### para editar uma task
Envie uma solicitação put para:
get http://localhost:3000/tasks/numerodatask
Por exemplo:
get http://localhost:3000/tasks/1
Será retornado um json com a tarefa já modificada. Se ela não existir, será retornado um erro 404 com os detalhes da solicitação e sua negativa.
Você pode conferir se a atualização ocorreu usando o seguinte comando http
get http://localhost:3000/tasks
assim será exibido todas as tarefas, e com isso, será possível conferir todos os demais objetos do json.


## tem ideias? abra um pull request ou uma issue!
Eu terei o prazer em responder no menor tempo.
Contato: thadeu henrique dos anjos
e-mail: thadeuhenriquedosanjos@gmail.com
