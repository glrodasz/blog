---
title: Design Tokens al rescate
pubDate: "2020-01-27T00:00:00.000Z"
tags:
  - CSS
  - Design Systems
description: Se puede decir que los Design Tokens son una metodología que se encarga del manejo de variables en un sistema de diseño. Sin embargo, esta metodología se puede aplicar en una escala mucho más pequeña.
heroImage: "/covers/smooth-colored-stones-on-the-ground.jpg"
relatedPosts:
  - la-evolucion-de-los-design-tokens
  - evolucion-de-las-arquitecturas-de-css
  - introduccion-a-los-web-components
---

Desde hace unos años venimos escuchando hablar sobre los **Design Systems**, herramientas que, hoy por hoy, se han convertido de suma importancia para el desarrollo de aplicaciones web. A partir de entonces, empezamos a escuchar una serie de nuevos términos y conceptos, tales como, Principles, Guidelines, Atomic Design, Dark Mode y uno de los más importantes y poco implementados: **Design Tokens**. En este post vamos a explorar qué son, cómo y cuándo usarlos.

## ¿Qué son los design tokens?

Se puede decir que los Design Tokens son una metodología que se encarga del manejo de variables en un sistema de diseño (Design System). Sin embargo, esta metodología se puede aplicar en una escala mucho más pequeña, es decir, no es necesario tener un sistema de diseño implementado. Podemos, por ejemplo, hacer uso de estos en una hoja de estilos de cascada (CSS) de un proyecto web.

Los que hemos tenido experiencia en crear hojas de estilos, sabemos lo rápido que pueden crecer y la facilidad con la que se duplica el código. Es sumamente complicado escalar los estilos entre diferentes aplicaciones y mantenerlos a largo plazo también es todo un reto. Los problemas anteriores se han solucionado gracias a diferentes metodologías de Arquitecturas de CSS, el uso de preprocesadores, propuestas como CSS Modules e incluso CSS-in-JS.

Los Design Tokens son en parte una solución para escalar y mantener el CSS, pues ninguna de las metodologías anteriores es explícita sobre el uso y mantenimiento de las variables.

### Custom Properties y variables en CSS

> En CSS  podemos hacer uso de variables gracias a las Custom Properties sin necesidad de recurrir al uso de preprocesadores. Los Design Tokens no son otra tecnología para integrar variables en CSS. Por el contrario, nos ayudan a que aprovechemos mejor esta característica, independiente de su implementación.

## Los diferentes usos de los Design Tokens

No existe una regla específica sobre c'ómo trabajar con los Design Tokens. Sin embargo, se pueden usar implementaciones sencillas para resolver problemas específicos y, a medida que se tengan más necesidades, es posible variar su implementación para aprovecharlos aún más.

A continuación, vamos a hablar desde los conceptos más básicos y fundamentales, hasta los más complejos y utópicos:

### Choices

El concepto más básico es hacer uso de los Design Tokens para limitar nuestras opciones. La paradoja de la elección (The Paradox of Choice) derriba el mito que dice que tener más alternativas y libertades implica mayor bienestar. Por el contrario, esto genera un efecto de parálisis porque, con tantas opciones, a las personas les resulta más difícil hacer una elección.

¿No les ha pasado que, cuando tienen un menú con muchos platos, les cuesta decidir qué comer? ¿o que, cuando van a ver algo en Netflix, se gastan hasta media hora eligiendo la película? Por el contrario, si llegan a un lugar donde solo hay perros calientes y hamburguesas, ya saben con seguridad qué van a comer. Asimismo, si alguien les da a elegir solo entre dos películas es más fácil darle al botón de play.

Esto mismo pasa con el diseño de interfaces de usuario. Tenemos muchas opciones de colores, espaciado, interlineado, fuentes, etc. La primera tarea de los **Design Tokens** es limitar estas opciones para que a partir de ellas podamos construir todo nuestro sistema de diseño sin pensar mucho en estas unidades mínimas, pues nuestras opciones van a estar limitadas. El capítulo "Limit your choices" del libro [_Refactoring UI_](https://refactoringui.com/book/), nos habla claramente de esto. Con su librería Tailwind CSS, los mismos autores han expuesto un archivo de [configuración](https://github.com/tailwindcss/tailwindcss/blob/4d36f81239a8d503f5e2a7d325616070d434a457/stubs/defaultConfig.stub.js#L12) que funciona perfecto como una base de Design Tokens. Además, si se fijan en su selección de [paleta de colores](https://tailwindcss.com/docs/customizing-colors#default-color-palette), es más que suficiente para construir cualquier tipo de aplicación.

Un ejemplo de cómo serían nuestras elecciones (Choices) de las fuentes tipográficas, sería más o menos así:

```json
{
  "font": {
    "family": {
      "serif": "Georgia, 'Times New Roman', serif",
      "sans": "Quicksand, Arial, 'sans-serif'",
      "mono": "'Roboto Mono', Consolas, monospace"
    },
    "lineHeight": {
      "none": 1,
      "tight": 1.25,
      "normal": 1.5,
      "loose": 2
    },
    "weight": {
      "thin": 200,
      "light": 300,
      "normal": 400,
      "bold": 700,
      "extrabold": 800,
      "black": 900
    }
  }
}
```

### Más información

- [https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice](https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice)
- [https://refactoringui.com/previews/building-your-color-palette/](https://refactoringui.com/previews/building-your-color-palette/)

### Decisions

Teniendo nuestras elecciones listas, podemos empezar a tomar Decisiones (Decisions). Es la misma filosofía de las elecciones, solo que esta vez vamos a especificar su uso, aplicando estas elecciones a un contexto más claro. Al haber limitado los colores, fuentes y tamaños, podemos decidir cuáles de estas elecciones estarán disponibles en nuestros componentes, layouts y utilidades.

Por ejemplo, podríamos construir las decisiones para nuestros títulos de la siguiente manera:

```javascript
{
    "title": {
      "fontFamily": choices.font.family.sans,
      "fontWeight": choices.font.weight.normal,
      "fontSize": {
        "1": choices.size.font["3xl"],
        "2": choices.size.font["2xl"],
        "3": choices.size.font.lg,
        "4": choices.size.font.xs
      },
      "color": choices.color.base.gray[900]
    }
}
```

Lo mismo podríamos hacer para definir los colores primarios, secundarios y terciarios. La versatilidad de esta metodología permite cambiar los colores primarios o el tamaño de los títulos con solo apuntar nuestras decisiones hacia otras elecciones.

En la siguiente sección donde hablamos de Platforms (Plataformas) podemos ver con claridad su valor agregado.

### Más información

- [https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421)

### Platforms

Si nos ponemos a pensar en el mundo de las diferentes plataformas como lo son la Web, Desktop y Mobile, por lo general, cada una de ellas tiene su propio sistema de variables y manera de implementar estilos, lo que hace que sea un poco difícil mantener la misma experiencia de interfaz de usuario entre plataformas, pues en cada una de ellas tenemos que volver a crear lo mismos componentes e interfaces de usuario. Pero ¿si abstraemos todas estas variables a un lugar donde todas las diferentes plataformas las puedan consumir? ¡Exacto! Nuestros Design Tokens son esa manera de abstraer estas variables y, en algunos casos, bastaría solo con definir y hacer uso de los Choices, pero pienso que con el sistema de Decisions podemos facilitar mucho más este trabajo.

Por ejemplo, supongamos que necesitamos crear un botón en cada una de las tres plataformas. Nos tocaría especificar en cada una, qué **Choices** usar. El problema de esto es que si quisiéramos actualizar alguna variable deberíamos, hacerlo en cada plataforma. En cambio, si tuviéramos definido nuestro botón como un **Decision**, solo deberíamos aplicarlo directamente. Así, cuando tengamos que actualizar el border radius de nuestro botón solo deberemos hacer el cambio en nuestro Decision y se verá reflejado en todas las plataformas que lo consuman de la manera `button.borderRadius`.

```javascript
{
    "button": {
        "borderRadius": choices.size.borderRadius.md
        "color": {
            "primary": choices.color.brand.mandy,
            "secondary": choices.color.brand.gigas,
        },
        "fontSize": {
            "sm": choices.size.font.xs,
            "lg": choices.size.font.lg
        },
        "padding": {
            "sm": `${choices.size.spacing[4]} ${choices.size.spacing[6]}`,
            "lg": `${choices.size.spacing[8]} ${choices.size.spacing[10]}`
        }
    }
}
```

Ahora bien, el reto más grande de usar Design Tokens en diferentes plataformas y tecnologías es que no todas soportan las mismas medidas. Por ejemplo, la Web entiende que son em, rem, vh, y vw, pero una librería como React Native solo acepta valores en pixeles. La buena noticia es que podemos hacer uso de librerías como [Theo](https://github.com/salesforce-ux/theo) o [Style Dictionary](https://amzn.github.io/style-dictionary) que nos permiten generar Design Tokens con nuestras necesidades puntuales a partir de un archivo de configuración. De esta manera, podemos generar una versión de nuestros Choices con medidas relativas como lo son rem y otra versión con medidas absolutas como px.

### Theming

La creación de temas ha sido algo que por años ha implicado grandes retos a la hora de trabajar en su implementación. Pues, no existen muchas guías de cómo hacerlo y muchas veces tenemos la sensación de que algo estamos haciendo mal. Un ejemplo claro es el uso de frameworks como Bootstrap en proyectos muy específicos. Resulta más complejo sobrescribir los estilos del framework para que sea acorde a la marca del producto deseado que simplemente hacer una librería personalizada para el mismo. Por supuesto, hay que tener en cuenta que frameworks como Bootstrap tienen otros propósitos, como ofrecer un sistema de layout que funcione igual en todos los navegadores. Afortunadamente, la segmentación del motor de renderizado de los navegadores [es cada vez más pequeña](https://blogs.windows.com/windowsexperience/2018/12/06/microsoft-edge-making-the-web-better-through-more-open-source-collaboration). Librerías similares han abierto la puerta al concepto de aplicar temas, pero cada una lo hace de manera diferente, haciendo que cueste mucho su adaptación y afectando completamente la [interoperabilidad](https://jxnblk.com/blog/interoperability/). El uso de Design Tokens puede ayudar a afrontar esta barrera, pues, debido a que ya tenemos toda una estructura de tokens, lo único que debemos hacer es duplicar esta estructura reemplazando los valores para el nuevo tema. Por ejemplo, el equipo de [diseño de Infor](https://design.infor.com/) ha hecho un gran trabajo implementando temas mediante el uso de [Design Tokens](https://design.infor.com/guidelines/identity/design-tokens) y [Style Dictionary](https://github.com/infor-design/design-system/tree/master/design-tokens).

## ¿Por dónde empezar?

Como explicaba al principio, las implementaciones de los Design Tokens varían mucho y dependen de la necesidad de cada plataforma y equipo. Mi recomendación es tomar como inspiración la implementación de algún sistema de diseño que sea similar a nuestras necesidades. Sin embargo, es importante evitar complicar la implementación. Basta con empezar con un pequeño archivo JSON que se pueda traducir. Por ejemplo, podemos mover nuestros Design Tokens de formato JSON a Custom Properties mediante un preprocesador o alguna librería como PostCSS.

No olviden revisar los links que se encuentran a lo largo de este artículo. Es información muy valiosa que puede guiarlos en su implementación de Design Tokens.

### Más información

- [https://css-tricks.com/what-are-design-tokens/](https://css-tricks.com/what-are-design-tokens/)
- [https://designsystem.digital.gov/design-tokens/](https://designsystem.digital.gov/design-tokens/)
