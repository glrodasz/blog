---
title: Tipos de lenguajes de programación
pubDate: "2024-11-24T00:00:00.000Z"
tags: Aprende a programar
description: Al igual que las personas que hablan diversos idiomas, en programación existen múltiples lenguajes, cada uno con características y propósitos específicos. Los lenguajes de programación se pueden categorizar en varios paradigmas, como imperativos, declarativos, orientados a objetos, funcionales, procedimentales y lógicos.
heroImage: "/covers/architect-desk-with-tools-and-blueprints.jpg"
languageVersions:
  - language: "en"
    url: "/posts/types-of-programming-languages"
relatedPosts:
  - como-funciona-un-lenguaje-de-programacion
  - expresiones-y-sentencias-luego-que
  - historia-de-javascript
---

Así como las personas nos comunicamos en diferentes idiomas, usualmente del lugar donde nos encontramos, en programación también existen diversos lenguajes. Para un programador experimentado, puede ser relativamente sencillo entender múltiples lenguajes de programación, de forma similar a la intercomprensión entre hablantes de idiomas romances como el español, italiano o portugués.

Sin embargo, algunos lenguajes de programación pueden ser más difíciles de aprender, de manera similar a cómo un hispanohablante podría encontrar desafiante aprender mandarín o árabe. Esto se debe a que algunos lenguajes pertenecen a diferentes categorías o tienen propósitos distintos.

A continuación, exploraremos algunas de estas categorías.

> ℹ️ Esta es solo una muestra de las categorías y lenguajes más populares. Existen cientos de lenguajes de programación creados, algunos incluso solo por diversión, como el curioso caso de [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck).

> ⚠️ Algunos lenguajes pueden pertenecer a múltiples categorías. Aquí nos enfocaremos en la categoría que mejor define su uso principal.

## Paradigmas de Programación
El paradigma está relacionado con el propósito del lenguaje. Generalmente, cuando surge un problema muy específico, los lenguajes de propósito general no suelen ser eficientes. Por eso, es común que se desarrollen lenguajes especializados, optimizados para resolver dichos problemas, acompañados de estilos de escritura más adecuados para sus propósitos.

### Imperativos
Esta es probablemente la categoría más común y con la que la mayoría de las personas comienzan, debido a que se asemejan a las listas de instrucciones que seguimos en la vida diaria. Son lenguajes que se ejecutan mediante [instrucciones paso a paso, como una receta](/es/posts/que-es-un-algoritmo/). Estos lenguajes son útiles porque permiten un control detallado de cómo se ejecutan las tareas, lo cual es particularmente importante en aplicaciones que necesitan un alto grado de precisión.

**Ejemplos:** Python, Java, PHP, JavaScript.
```python
nombres = ["Ana", "Juan", "María"]
for nombre in nombres:
    print("Hola " + nombre)
```

### Declarativos
Como su nombre indica, en estos lenguajes no se escriben instrucciones paso a paso, sino que se declara lo que se desea lograr, dejando que el lenguaje decida el orden de ejecución. Son populares en bases de datos y se enfocan en el *qué*, no en el *cómo*.

**Ejemplos:** SQL, YAML, CSS.
```sql
SELECT nombre FROM usuarios WHERE edad > 18;
```

### Orientados a Objetos
Permiten representar objetos del mundo real en código. Al igual que los objetos físicos tienen propiedades y funciones, estos lenguajes facilitan la definición de propiedades y métodos. También permiten implementar conceptos como la herencia, similar a la transmisión de características en la naturaleza, y crear "planos" o clases que dan la pauta para crear objetos, de manera análoga a cómo un arquitecto utiliza planos para construir edificios.

**Ejemplos:** Java, C#, JavaScript.
```java
class Perro {
    String nombre;
    void ladrar() {
        System.out.println("¡Guau!");
    }
}
```

### Funcionales
Están basados en funciones y composición, asemejándose a la manera en que se escriben las ecuaciones matemáticas. Cada función es una unidad de computación que se puede combinar con otras para resolver problemas complejos. El objetivo principal de este enfoque es minimizar efectos colaterales y hacer que el código sea más predecible y fácil de mantener.

**Ejemplos:** Haskell, Clojure, Elixir.
```clojure
(def numeros [1 2 3 4 5]) (def duplicados (map #(* 2 %) numeros))
```

### Procedimentales
Son más cercanos al ámbito matemático y suelen emplearse en cálculos científicos y numéricos. Su nombre proviene de la ejecución secuencial de procedimientos. Estos lenguajes son esenciales en aplicaciones donde la precisión y exactitud son fundamentales. A menudo, se implementan en contextos de ingeniería y física computacional, donde los cálculos a gran escala deben realizarse de manera eficiente y rápida.

**Ejemplo:** Fortran, Pascal.
```pascal
function Fibonacci(n: integer): integer;
begin
    if n <= 1 then
        Fibonacci := n
    else
        Fibonacci := Fibonacci(n-1) + Fibonacci(n-2);
end;
```

### Logicos
Similares a los lenguajes declarativos, se enfocan en el *qué* y no en el *cómo*, pero suelen escribirse como un conjunto de reglas lógicas que el lenguaje intenta cumplir. Son comunes en inteligencia artificial.

**Ejemplos:** Prolog, CLIPS.
```prolog
padre(juan, pedro).
padre(pedro, ana).
abuelo(X, Y) :- padre(X, Z), padre(Z, Y).
```

## Tipo de Ejecución
Además de cómo se escriben, los lenguajes varían en cómo se ejecutan. Aunque tienen una sintaxis comprensible para los humanos, deben "traducirse" al lenguaje de las máquinas: los ceros y unos.

### Compilados
Requieren un proceso previo donde el código se transforma en lenguaje máquina antes de ejecutarse. Cuanto más extenso sea el código, más tiempo lleva su compilación. Esto se asemeja al proceso de renderizado en edición de video: lleva tiempo, pero el resultado es más eficiente.

**Ejemplos:** C++, Java.
```java
// Resultado de la compilación
CA FE BA BE 00 00 00 34 00 22 0A 00 06 00 0F 09 
00 10 00 11 08 00 12 0A 00 13 00 14 07 00 15 07 
00 16 01 00 06 3C 69 6E 69 74 3E 01 00 03 28 29 
56 01 00 04 43 6F 64 65 01 00 0F 4C 69 6E 65 4E 
75 6D 62 65 72 54 61 62 6C 65 01 00 12 4C 6F 63 
61 6C 56 61 72 69 61 62 6C 65 54 61 62 6C 65 ...
```

### Interpretados
Este es un concepto muy interesante, ya que en lugar de transformar todo el código a código máquina de una vez, la “transformación” ocurre línea por línea, es decir, a medida que se necesita, similar a un traductor que va traduciendo lo que le vas diciendo. De ahí su nombre “Intérprete”. La gran ventaja es que no es necesario esperar un proceso de compilación para ejecutar el lenguaje, pero pueden ser ineficientes para tareas exhaustivas en las que los lenguajes compilados pueden ser mejores.

**Ejemplos:** PHP, Ruby
```php
// Proceso de interpretación de $precio = 100;

1. Tokenización:
	[T_VARIABLE, T_EQUAL, T_NUMBER, T_SEMICOLON]

2. Análisis sintáctico:
	ASSIGNMENT(target:$precio, value:100)
```

> 💥 Algunos lenguajes, además de ser interpretados, pueden también ser compilados, como Python. Otros lenguajes tienen una solución híbrida, como la técnica "Just-in-time compile", que compila piezas de código que son llamadas múltiples veces, mientras que otras las sigue interpretando.

## Nivel de Abstracción
Aunque hemos hablado de cómo puede funcionar su ejecución para acercarse más al lenguaje máquina, no todos los lenguajes fueron pensados para ser amigables con los humanos; por el contrario, son más óptimos para el entendimiento de la máquina.

Cuando el proceso de compilación o interpretación sucede, dicha salida suele ser un lenguaje de un nivel menos abstracto, es decir, más cercano a la máquina, y a su vez, ese lenguaje puede ser transformado de nuevo a un nivel más cercano a la máquina y así sucesivamente.

### Alto nivel
Estos son los lenguajes cuya sintaxis y propósito es que sea fácil de leer y mantener por los humanos, y no se especifica cómo se debe gestionar los aspectos técnicos como la memoria de nuestras computadoras.

**Ejemplos:** Python, Promp Engineering.
```text
Compré 10 manzanas, regalé 2 manzanas al vecino y me comí una.
¿Cuántas manzanas me quedan?
```

### Bajo nivel
Estos lenguajes, por el contrario, existen para dar instrucciones directas a nuestras máquinas sobre cómo gestionar los espacios de memoria y otros elementos de nuestro hardware de manera detallada, siendo más eficientes pero menos comprensibles para los humanos.

**Ejemplo:** Ensamblador.
```bash
MOV AX, 5    ; Mueve el valor 5 al registro AX
ADD AX, 3    ; Suma 3 al valor en AX
```

# ¿Es HTML un lenguaje de programación?
> 🏗️ **HTML**  (HyperText Markup Language) es un lenguaje de marcado que se utiliza para estructurar y presentar la información en una página web.

Esta es una pregunta muy popular y polémica, pero la realidad es que el HTML en sí no funciona como un lenguaje de programación. Sin embargo, con ciertos controles avanzados, puede parecer que lo es. HTML es un lenguaje de marcado, lo que significa que se utiliza para marcar cómo se debe interpretar cierta información, similar al XML o Markdown. Si más allá de presentar información se debe crear una interacción con el usuario, como el envío de un formulario, es muy posible que se necesite JavaScript o un lenguaje de programación del lado del servidor para procesar dicha información enviada.

# ¿Es CSS un lenguaje de programación?
> 💅 **CSS** (Cascading Style Sheets) es un lenguaje de estilos que se usa para definir la apariencia visual de una página web, como colores, tamaños y posiciones.

Esta es una pregunta que, aunque igualmente popular, puede llegar a ser más polémica, debido a que en los últimos años CSS ha crecido en un sinnúmero de características que han permitido un menor uso de JavaScript en nuestras aplicaciones web. Pero, similar a HTML, CSS es un lenguaje que describe cómo se deben interpretar los estilos de un sitio web y no suele funcionar por sí solo, aunque se han demostrado cosas increíbles con el uso de [una sola etiqueta HTML](https://a.singlediv.com/) y [juegos funcionales con solo HTML y CSS](https://codepen.io/collection/AKkZro).

# ¿Que paradigma, ejecucion o nivel es mejor?
Algo que espero que aprendas es que no suele haber algo mejor o peor, sino que todo depende de su propósito o situación.

Lo más común es que empecemos a trabajar con **lenguajes imperativos** y cuando tengamos que acercarnos a una base de datos relacional debamos usar **lenguajes declarativos**.

Si nuestro campo es la inteligencia artificial, es posible que nos topemos con algún **lenguaje lógico**, aunque hoy en día lo más común sea un **lenguaje natural** como los LLM (Large Language Models), es decir, un lenguaje que entienda nuestro idioma humano literal, tal y como le hablamos a ChatGPT de OpenAI, Gemini de Google o Claude de Anthropic.

En cuanto a la ejecución, esta viene muy ligada al lenguaje, así que no suele ser una preocupación al inicio y muchos lenguajes modernos son versátiles en cuanto a poder ejecutarse de una manera u otra.

Si no estamos trabajando con hardware, va a ser extremadamente raro que veamos **lenguajes de bajo nivel**, pero sí podemos llegar a usar lenguajes de un nivel más bajo que otros, como Rust en comparación con Python.
