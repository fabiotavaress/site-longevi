# Site Longevi

Site da **Clínica Longevi**, *Mais saúde, mais tempo*. Ipatinga – MG.

Site estático (HTML + CSS + JavaScript puro, sem build), hospedado no **GitHub Pages**:
https://fabiotavaress.github.io/site-longevi/

## Estrutura

| Arquivo | O que tem |
| --- | --- |
| `index.html` | Página única com todas as seções |
| `css/style.css` | Estilos. Cores da marca no topo (`:root`) |
| `js/main.js` | Menu mobile, animações de entrada e sombra do cabeçalho |
| `assets/img/` | Logos recortadas com fundo transparente, favicon e imagem de compartilhamento |
| `assets/Logo_JPEG_0*.jpg` | Arquivos originais da logo |

Seções, na ordem: hero · especialidades · avaliações · cinco motivos · cardiologia · geriatria · estilo de vida · exames · como funciona · corpo clínico · contato/mapa.

## Como editar

- **WhatsApp**: todos os botões usam `https://wa.me/5531983584644` com uma mensagem pronta diferente por especialidade. Para trocar o número, substituir `5531983584644` no `index.html`.
- **Fotos dos médicos**: em cada card do corpo clínico há um comentário `FOTO:` mostrando onde entra a imagem. Salvar as fotos em `assets/img/equipe/`.
- **Foto do hero**: o painel azul com o emblema (`.hero-panel`) é o lugar da foto da equipe/clínica.
- **Avaliações**: widget do Trustindex (admin.trustindex.io, widget "Site Longevi"): puxa do Google sozinho, só 5 estrelas e com texto. Filtros e layout se mudam lá, não no código.
- **Publicar**: todo `push` na branch `main` atualiza o site em cerca de 1 minuto.

## Ver no computador

```bash
python -m http.server 5500
```

Depois abrir http://localhost:5500

## Pendências

- [ ] Fotos dos médicos e da clínica em alta qualidade
- [ ] CRM do Dr. Luís Henrique
- [ ] Diretor técnico (nome + CRM/RQE) no rodapé, exigido pelo CFM na publicidade de clínicas
- [ ] Confirmar "Apenas consultas particulares" e quais médicos atendem online
- [ ] Domínio próprio (Settings → Pages → Custom domain) e atualizar as URLs do `<head>`
