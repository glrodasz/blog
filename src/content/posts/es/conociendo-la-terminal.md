---
title: Conociendo la Terminal
pubDate: "2019-10-29T00:00:00.000Z"
tags: Aprende a programar
description: La terminal es una herramienta clave en el desarrollo, ofreciendo ventajas al conocer sus comandos básicos, descubrir la interfaz del sistema operativo, y realizar tareas rápidamente sin dejar el teclado. No es esencial para empezar a programar, pero es inevitable enfrentarla, así que ¿por qué no empezar ya?
heroImage: "/covers/close-up-of-seashell-on-sandy-beach.jpg"
relatedPosts:
  - comandos-alias-para-la-terminal
  - que-necesitas-saber-antes-de-programar
  - como-funciona-un-lenguaje-de-programacion
---

La terminal es una herramienta que puede hacer la diferencia a la hora de desarrollar, principalmente porque nos otorga tres grandes ventajas con solo conocer los comandos básicos:

1. Entenderemos el funcionamiento básico de la interfaz del sistema operativo.
2. Realizaremos tareas con más velocidad y practicidad sin abandonar el teclado.
3. Nos moveremos con fluidez en un servidor web cuando sea necesario conectarse mediante el protocolo SSH.

No es un requisito para empezar a programar, pero tarde o que temprano nos vamos a tener que enfrentar a ella. Entonces, ¿por qué no hacerlo de una vez?

### Diferencias en los sistemas operativos

> Los comandos de la terminal  varían un poco en sistemas operativos que no son tipo UNIX (Linux, Mac OS) como lo es Windows. La realidad es que la mayoría de los servidores Web tienen Linux como su sistema operativo, motivo por el cual, mi recomendación es familiarizarse con UNIX desde el inicio. Afortunadamente, se puede activar la funcionalidad de Linux en Windows 10 mediante Ubuntu. Puedes revisar un tutorial [aquí](https://discourse.ubuntu.com/t/instalacion-de-ubuntu-en-windows-10).

## ¿Cómo abrir la terminal?

- **Windows:** Click en menú inicio y buscar por "Ubuntu".
- **Linux/Ubuntu:** Ctrl + Alt + T
- **Mac OS:**  Cmd + Tecla espaciadora y buscar por "Terminal"

![Terminal en Mac OS, usando Pure un ZSH prompt.](/images/posts/es/conociendo-la-terminal/terminal-en-mac-os.png)_Terminal en Mac OS, usando Pure un ZSH prompt._

## ¿Cómo funciona la terminal?

Así como las ventanas, menús y carpetas son una interfaz gráfica del sistema operativo, la terminal es una interfaz de comandos. Es decir, en ella podemos interactuar con el sistema operativo mediante comandos de texto. Esto significa que mediante la terminal podemos listar carpetas, crear archivos, buscar palabras e incluso ver cuánta memoria libre disponemos.

Se podría decir que todo lo que hacemos en el sistema operativo mediante la interfaz gráfica se puede hacer con la terminal con la ventaja de que haciendo uso avanzado de esta tenemos más posibilidades y versatilidad.

## Ubicación en la terminal

Lo primero que hay que entender es qué sucede cuando abrimos la terminal. Lo que hace esta es ubicarse en nuestra carpeta de archivos de usuario. En sistemas tipo UNIX la ruta es `/Users/<usuario>`. En esta ubicación solemos tener nuestra carpeta de documentos, descargas y escritorio, además de otras. Esto quiere decir que, si queremos interactuar con los archivos que están dentro de la carpeta descargas, tenemos que desplazarnos virtualmente hasta allá o al menos indicar la ruta de su ubicación. Esto aplica para cualquier otro archivo o carpeta fuera de nuestra ubicación.

## Comandos en la terminal

A continuación vamos a explorar una serie de comandos básicos que podemos usar en nuestra terminal.

### Comandos básicos del sistema operativo

- `date`: Muestra la fecha y hora del sistema actual.
- `uptime`: Muestra el tiempo transcurrido desde que inició el equipo por última vez.
- `cal`: Muestra un calendario del mes actual.
- `df`: Muestra el espacio libre actual en el disco duro.
- `whoami`: Muestra el nombre del usuario actual.

### Comandos para el manejo de carpetas

- `ls`: Lista los archivos de la carpeta actual, o de la ruta dada. Ej. `ls Documents`.
- `cd`: Nos permite navegar entre carpetas cuando le entregamos una ruta y así actualizar nuestra ubicación. Ej. `cd Documents` nos ubicaría en `/Users/<usuario>/Documents` y si hacemos `ls` veríamos el resultado del ejemplo anterior. Sin embargo, si hacemos uso de solo `cd` sin ruta, nos ubicaría en la carpeta de archivos del usuario.
- `pwd`: Nos nuestra la ruta absoluta del directorio actual, así podemos saber en dónde estamos ubicados. Si estuviéramos ubicados como en el ejemplo anterior, esto nos devolvería el resultado `/Users/<usuario>/Documents`.
- `mkdir`: Crea una nueva carpeta dado un nombre para esa carpeta. Ej. `mkdir hola` crearía una carpeta llamada `hola` en la ubicación en la que estemos.
- `cp -r`: Nos permite copiar una carpeta dada una ruta inicial y una ruta final. La opción `-r` significa que hará el proceso de manera recursiva, esto es porque al copiar una carpeta es necesario aplicar todos los archivos que están adentro. Ej. `cp -r hola alo`.
- `rm -r`: Nos permite eliminar una carpeta dada una ruta. La opción `-r` significa que hará el proceso de manera recursiva, esto es porque al eliminar una carpeta es necesario aplicar todos los archivos que están adentro. Ej. `rm -r hola`.

### Comandos para el manejo de archivos

- `touch`: Crea un archivo nuevo dada una ruta y/o nombre. Ej. `touch chao` crearía un archivo llamado "chao". Luego podríamos abrir este archivo con cualquier editor y agregar contenido. Sin embargo, podemos usar un pequeño truco para agregar contenido rápido haciendo `echo 'hola mundo' > chao` que remplazaría el contenido del archivo "chao" con "hola mundo".
- `cat`: Imprime el contenido de un archivo dada su ruta. Ej. `cat chao` imprimiría `hola mundo` en nuestra terminal, en el caso de que hubiéramos seguido el ejemplo anterior.
- `more`: Es muy similar a `cat` solo que nos permite navegar usando los controles tipo vim cuando imprime su contenido.
- `cp`: Es el comando que nos permite copiar archivos dada una ruta inicial y una ruta final donde vamos a copiar. Ej. `cp chao adios` hará una copia del archivo "chao" y esta copia la llamará "adios".
- `rm`: Nos permite eliminar un archivo dada una ruta. Ej. `rm chao`.
- `mv`: Nos permite mover un archivo o carpeta dada una ruta inicial y una ruta final. Ej. `mv adios /Users/<usuario>/Downloads` movería la carpeta de la ubicación actual a la carpeta "Downloads". `mv` también es el comando que nos permite cambiar el nombre de un archivo o carpeta. Lo que hay que hacer es moverlo a la misma ubicación pero darle un nombre diferente, ej. `mv adios bye`.

### Rutas relativas y absolutas

> Las rutas se pueden especificar de manera relativa o absoluta. Cuando especificamos una ruta absoluta, quiere decir que vamos a introducir toda la ruta desde el inicio, es decir, desde la raíz, y esta se especifica con el símbolo de barra oblicua (slash) `/`. Cuando usamos el comando `pwd` siempre nos devuelve la ruta absoluta. Ej. `/Users/<usuario>`. Si estamos ubicados en nuestra carpeta de archivos y queremos movernos a la carpeta de documentos podemos especificar la ruta absoluta  `/Users/<usuario>/Documents` o podemos especificar la ruta relativa a nuestra ruta actual `Documents`. Ahora bien, para poder especificar de manera relativa que queremos regresar un nivel, suponiendo que estamos en `Documents` y queremos regresar a `/Users/<usuario>` lo podemos hacer con el doble punto. Ej. `cd ../`. Así mismo, si queremos especificar la ubicación actual para movernos podemos usar solo un punto. Ej. `cd ./Documents`.

### Atajos de los comandos en la terminal

- `Ctrl + c`: Muchas veces un comando puede quedarse procesando algo. Si queremos cancelar el comando actual o la terminal no responde podemos hacer uso de este atajo para detenerlo.
- `Ctrl + u`: Nos permite borrar la línea actual que estemos escribiendo en la terminal.
- `Ctrl + w`: Nos permite eliminar la última palabra de los comandos que estamos escribiendo en el momento.
- `Ctrl + a`: Nos permite movernos al inicio de la línea de comandos.
- `Ctrl + e`: Nos permite movernos al final de la línea de comandos.
- `Flecha arriba`:  Nos muestra el comando anterior de nuestro historial de comandos usados.
- `Flecha abajo`: Nos muestra el comando siguiente de nuestro historial de comandos usados.
- `Alt + b`: Nos permite movernos entre las palabras de la línea de comandos actuales hacia atrás.
- `Alt + f`: Nos permite movernos entre las palabras de la línea de comandos actuales hacia adelante.
- `Ctrl + r`:  Nos permite hacer una búsqueda de comandos en el historial. Si encontramos un resultado que no es el deseado, podemos seguir presionando `Ctrl + r` para rotar la búsqueda.

# Diferentes terminales y shells

La terminal es solo la interfaz gráfica de nuestra línea de comandos. Para funcionar, la terminal necesita un shell, esto es, el programa de línea de comandos que se encarga de enviar los comandos que ejecutamos al sistema operativo.

## Terminales y shells en los diferentes sistemas operativos

Cada sistema operativo trae sus terminales nativas y, en general, es suficiente. Sin embargo para Mac OS recomiendo hacer uso de [iTerm](https://www.iterm2.com) ya que trae mejoras con respecto a la terminal por defecto. También hay una buena alternativa que funciona prácticamente en todos los sistemas operativos llamada [Hyper](https://hyper.is/) que curiosamente está construida con tecnologías web.

- **Windows 10:** [Windows Terminal](https://github.com/microsoft/terminal) y [Hyper](https://hyper.is/#installation).
- **Ubuntu:** [Ubuntu Terminal](https://ubuntu.com/tutorials/command-line-for-beginners#3-opening-a-terminal) y [Hyper](https://hyper.is/#installation).
- **Mac OS:** [Mac OS Terminal](https://support.apple.com/guide/terminal/welcome/mac) y [Hyper](https://hyper.is/#installation).

Ahora bien, el shell más popular para sistemas tipo UNIX es [Bash](https://www.gnu.org/software/bash/) (The Bourne Again Bash). Pero mi recomendación es usar una alternativa tipo Bash llamada [Zsh](http://zsh.sourceforge.net) (Z Shell) e instalar el administrador de configuración llamado [Oh My Zsh](https://ohmyz.sh/), ya que, por defecto, trae una serie de comandos útiles que junto a su administrador se hace muy fácil instalar plugins. En la versión de Mac OS "Catalina" la terminal por defecto es ZSH.

En Windows es posible usar Bash gracias a la instalación de Ubuntu. Yo recomiendo tomar este camino porque la mayoría de servidores web son tipo Linux, así que es bastante útil aprender Bash desde ya. [Aquí](https://platzi.com/blog/como-instalar-zsh-en-windows/) hay un tutorial sobre cómo instalar ZSH  y Oh My Zsh en Windows 10 incluyendo la instalación de Hyper.

## Temas para nuestra terminal

Finalmente, es posible cambiar o agregar nuevos temas a nuestro shell. Oh My Zsh trae [varios temas por defecto](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes) y permite la [instalación de nuevos](https://github.com/robbyrussell/oh-my-zsh/wiki/External-themes). Mi recomendación es instalar [Pure](https://github.com/sindresorhus/pure) porque nos permite tener una terminal con apariencia minimalista. Hay que tener en cuenta que para poder tener Pure tal y como se ve en el repositorio es importante seguir la sección de [tips](https://github.com/sindresorhus/pure#tips).
