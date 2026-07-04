---
title: Comandos alias para la Terminal
pubDate: "2020-02-21T00:00:00.000Z"
tags: Aprende a programar
description: Aprenderse todos los comandos de la terminal puede ser agotador. Los comandos alias nos permiten crear atajos personalizados, más cortos y fáciles de recordar, para las tareas que repetimos todos los días. En este post te muestro cómo crearlos, cómo guardarlos y algunos de los que uso a diario.
heroImage: "/covers/modern-bus-terminal-with-double-decker-buses.jpg"
relatedPosts:
  - conociendo-la-terminal
  - que-necesitas-saber-antes-de-programar
  - como-funciona-un-lenguaje-de-programacion
---

El uso de la terminal nos facilita las tareas diarias. Con la terminal podemos realizarlas más rápido, ya que el acceso o ejecución de estas es virtualmente inmediato. Sin embargo, aprenderse todos los comandos puede llegar a ser complejo y un poco agotador. Afortunadamente, podemos hacer uso de los comandos alias para aliviar un poco la carga operativa de estas tareas.

Los comandos alias de la terminal nos permiten crear _comandos personalizados_ con nombres más cortos o fáciles de recordar. De esta manera, estos comandos alias pueden llamar comandos más complejos e incluso otros comandos alias.

### Usando los comandos alias en Windows

Si actualmente estás usando el sistema operativo Windows, mi recomendación es instalar la versión integrada de Linux en Windows y usar su respectiva terminal. Puedes revisar un tutorial [aquí](https://discourse.ubuntu.com/t/instalacion-de-ubuntu-en-windows-10).

## ¿Cómo crear un comando alias?

Para crear un comando alias solo basta con abrir la terminal y escribir la palabra clave `alias` seguido del nombre de nuestro comando, seguido del símbolo igual (=), seguido de la sentencia que queremos ejecutar entre comillas dobles.

Supongamos que por alguna razón queremos filtrar las carpetas de nuestro directorio de usuario dada una palabra. Esto se podría hacer haciendo uso del comando **ls** y **grep**.

```bash
ls ~/ | grep <palabra>
```

Podríamos hacer un **alias** del comando anterior y este recibiría de manera dinámica el parámetro que le indiquemos.

```bash
alias findd="ls ~/ | grep $1"
```

A partir de la definición alias, podemos seguir haciendo uso del comando `findd`

```bash
findd Do
```

Retornaría en mi caso las carpetas `Documents` y `Downloads`. Ahora bien, si quisiéramos remover el alias por alguna razón bastaría con hacer `unalias findd`.

## Guardar los comandos alias de manera permanente

Los comandos alias son soportados por cualquier terminal tipo _bash_ como por ejemplo _zsh_. Para guardarlos de manera permanente en **bash** debe hacerse uso del archivo `.bashrc` mientras que para **zsh** debe hacerse uso del archivo `.zshrc`.

Si quisiera agregar mi comando alias `findd` de manera permanente, suponiendo que estamos usando *zsh, *basta con poner exactamente la misma línea en el archivo `~/.zshrc`.

```bash
alias findd="ls ~/ | grep $1"
```

Después de agregar la línea es importante reiniciar la configuración. Para ello puedes usar el comando `source ~/.zshrc` o simplemente puedes abrir una nueva pestaña o terminal y en esta ya estará disponible tu nuevo comando alias.

### ¿Cómo editar los archivos de configuración?

> Editar los archivos de configuración puede no ser tan fácil ya que no son visibles en nuestra interfaz gráfica. Una manera rápida es hacer uso de **vim** o **nano**. Mi recomendación es usar **vim**. Si te interesa aprender a usarlopuedes acceder al tutorial desde la terminal con el comando `vimtutor`. Si tienes problemas saliendo de **vim** puedes visitar esta [guía rápida](https://docs.oracle.com/cd/E19620-01/805-7644/x-5lei2/index.html).

## Comandos alias con Oh My Zsh

Si tienes instalando **[Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh)** para manejar tu configuración de zsh puedes usar los siguientes alias que vienen por defecto:

- `alias` lista todo los comandos alias disponible.
- `..` equivalente a `cd ../`
- `...` equivalente a `cd ../..`
- `/` equivalente a `cd /`
- `~` equivalente a `cd ~`
- `g` equivalente a `git`
- `gaa` equivalente a `git add --all`
- `gcam` equivalente a `git commit -a -m`
- `gcm` equivalente a `git checkout master`
- `gco` equivalente a `git checkout`
- `ggpull` equivalente a `git pull origin $(current_branch)`
- `ggpush` equivalente a `git push origin $(current_branch)`
- `gst` equivalente a `git status`

### Más información

- [https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet](https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet)

## Comandos alias recomendados

Estos son algunos de los comandos alias que uso en mi día a día y me permiten ser un poco más efectivo sin tener que acordarme de los comandos completos.

```bash
# Los comandos start y dev los uso mucho así que decidí acortarlos.
alias npmd="npm run dev"
alias npms="npm start"

# Eliminar la carpeta de node_modules y reinstalar con npm.
alias rmnpmi="rm -rf node_modules && npm cache clean --force && npm i"

# Eliminar la carpeta de node_modules y reinstalar con yarn
alias rmyarn="rm -rf node_modules && yarn cache clean && yarn"

# Para evitar eliminar permanente los archivos https://github.com/sindresorhus/trash#cli
alias rm="trash"

# El comando de clear lo uso mucho así que decidí hacer un alias más corto.
alias cl="clear"

# Cuando tengo un día muy agitado me gusta buscar café.
alias cafe="cat /dev/urandom | hexdump | grep \"ca fe\""
```

### Más información

- [https://github.com/glrodasz/dotfiles/blob/master/zsh/.zshrc](https://github.com/glrodasz/dotfiles/blob/master/zsh/.zshrc)
