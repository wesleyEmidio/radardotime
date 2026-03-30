# 1

npx nest --help

# corrigir erro de compilação

npm run lint

# generate/modulo - NOME DA ENTIDADE - não gerar pasta de teste

npx nest g mo posicao --no-spec

# generate/servico - NOME DA ENTIDADE - não gerar pasta de teste

npx nest g s posicao --no-spec

# generate/controle - NOME DA ENTIDADE - não gerar pasta de teste

npx nest g co posicao --no-spec

# criação de classes

npx nest g cl posicao/entidades/posicao.entidade.ts --no-spec --flat

# criação de dto

npx nest g cl posicao/dto/posicao-create.dto.ts --no-spec --flat

# alteracao do dto

npx nest g cl posicao/dto/posicao-update.dto.ts --no-spec --flat

# criação atraves do resource

npx nest g res posicao
