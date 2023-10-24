#! /bin/bash

BOLD=$(tput bold)
NORMAL=$(tput sgr0)
SEPARATOR="--------------------------------------------------------------------------------"

REPOS=("2023-2-GEROcuidado-APIUsuario" "2023-2-GEROcuidado-APIForum" "2023-2-GEROcuidado-APISaude")

DIR="$(dirname "$(readlink -f "$0")")"

cd $DIR

printTitle() {
    echo "${BOLD}"
    echo "$1"
    echo "$SEPARATOR"
    echo "${NORMAL}"
}

checkRepository() {
    for repo in "${REPOS[@]}"; do
        if ! [ -d $repo ]; then
            printTitle "Diretório ../$repo não encontrado, iniciando git clone"

            git clone https://github.com/fga-eps-mds/$repo
        fi
    done
}

if [ -z "$1" ]; then
    echo "Execute com -help para lista de comandos."

    exit 1
fi

if [ "$1" = '-help' ]; then
    echo "api-min [opção] [param]"
    printTitle "Opções"
    echo -e "up (-up) \t\t\t\t sobe todos os serviços para funcionamento da aplicação"
    echo -e "down (-down) \t\t\t\t remove todos os serviços"
    echo -e "stop (-stop) \t\t\t\t para todos os serviços"
    echo -e "git-pull (-git-pull) \t\t\t Realiza Git Pull em todos os serviços"
    echo -e "git-pull-main (-git-pull-main) \t\t Realiza Git Checkout na main e Pull em todos os serviços"
    echo -e "git-checkout (-git-checkout) \t\t Realiza Git Checkout na especificada em todos os serviços"
    echo -e "repos (-repos) \t\t\t Lista os repositórios"
    echo -e "install (-install) \t\t\t Instala o api.sh para ser executado global"
    exit 1
fi

cd ..

checkRepository

VALUE=true

for repo in "${REPOS[@]}"; do
    cd $repo

    if [ "$1" = "-up" ] || [ "$1" = "up" ]; then
        printTitle "Repository: $repo"
        docker compose up -d
    elif [ "$1" = '-down' ] || [ "$1" = "down" ]; then
        printTitle "Repository: $repo"
        docker compose down
    elif [ "$1" = '-stop' ] || [ "$1" = "stop" ]; then
        printTitle "Repository: $repo"
        docker compose stop
    elif [ "$1" = '-git-status' ] || [ "$1" = "git-status" ]; then
        printTitle "Repository: $repo"
        git status
    elif [ "$1" = '-git-pull' ] || [ "$1" = "git-pull" ]; then
        printTitle "Repository: $repo"
        git pull
    elif [ "$1" = '-git-pull-main' ] || [ "$1" = "git-pull-main" ]; then
        printTitle "Repository: $repo"
        git checkout main
        git pull
    elif [ "$1" = '-git-checkout' ] || [ "$1" = "git-checkout" ]; then
        printTitle "Repository: $repo"
        git pull --all
        git checkout $3
    elif [ "$1" = '-repos' ] || [ "$1" = "repos" ]; then
        echo -e "- $repo"
    elif [ "$1" = '-install' ] || [ "$1" = "install" ]; then
        sudo ln -s $(pwd)/api.sh /usr/local/bin/api
    else
        VALUE=false
    fi

    cd ..
done

if [ "$VALUE" = false ]; then
    echo "Opção inválida"
fi
