# Minha Estante de Leitura (Android)

App Android feito com **HTML/CSS/JS puro + Capacitor 7**. Dados salvos localmente no aparelho (`localStorage` da WebView), sem backend, login ou internet.

## Enviar para o GitHub

1. Crie um repositório novo no GitHub (pode ser privado), **sem** README inicial.
2. No terminal, dentro da pasta deste projeto:

```bash
git init -b main
git add -A
git commit -m "Minha Estante de Leitura V1"
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

> Use `git` e não o upload pelo navegador: a pasta oculta `.github/` e o arquivo `ci/debug.keystore` precisam subir juntos.

O push na branch `main` já dispara a compilação.

## Compilar o APK

1. No repositório, abra a aba **Actions**.
2. Escolha **Build APK** na lista da esquerda.
3. Clique em **Run workflow** > **Run workflow** (também roda sozinho a cada push em `main`).
4. Aguarde o ícone ficar verde (a primeira vez leva cerca de 5 a 10 minutos).

Se o botão "Run workflow" não aparecer, confirme que o workflow existe na branch `main` e que as Actions estão habilitadas em Settings > Actions.

## Baixar o APK

1. Em **Actions**, clique na execução concluída (verde).
2. Role até a seção **Artifacts** no fim da página.
3. Clique em **minha-estante-apk**. Será baixado um `.zip`.
4. Extraia o zip: dentro está o `app-debug.apk`.

O artefato fica disponível por 90 dias (padrão do GitHub).

## Instalar no celular

Copie o `app-debug.apk` para o aparelho, abra-o e permita a instalação de apps de fontes desconhecidas quando o Android pedir.

O workflow usa uma chave de debug fixa (`ci/debug.keystore`). Por isso, novas versões do APK **instalam por cima** da anterior e **mantêm seus dados**. Essa chave é só de debug (senha pública `android`); não use este APK para publicar na Play Store.

## Como o build funciona

- `www/index.html`: o app inteiro (interface, CRUD, diário, calendário, estatísticas).
- `capacitor.config.json`: `appId` `com.minhaestante.app`, `webDir` `www`.
- A pasta `android/` **não está no repositório**: o workflow a gera com `npx cap add android` (inclui o Gradle Wrapper) e depois roda `npx cap sync android` e `./gradlew assembleDebug`.
- Se você quiser versionar `android/`, rode no seu computador `npm install && npx cap add android` e faça commit; o workflow passa a usá-la.
- Saída: `android/app/build/outputs/apk/debug/app-debug.apk`. O workflow falha se esse arquivo não existir.

## Dados iniciais

Na primeira abertura aparecem os três livros de exemplo (Perdida, Encontrada, O Pequeno Príncipe). Depois disso, o que estiver salvo no aparelho é a fonte da verdade, e excluir os exemplos não os traz de volta.
