---
title: Evolución de las Arquitecturas y Metodologías de CSS
pubDate: "2021-01-10T00:00:00.000Z"
tags: CSS
description: Las Arquitecturas de CSS nos ayudan a escalar y mantener nuestras hojas de estilo en el tiempo. Estas son necesarias porque, el CSS, al carecer de un sistema de módulos conveniente y debido a su naturaleza de sobrescritura en cascada, crea la combinación perfecta para generar un ambiente caótico.
heroImage: "/covers/ancient-stone-arch-with-detailed-sculptures.jpg"
relatedPosts:
  - design-tokens-al-rescate
  - la-evolucion-de-los-design-tokens
  - estatico-dinamico-spa-mpa-jamstack
---

Las Arquitecturas de CSS nos ayudan a escalar y mantener nuestras hojas de estilo en el tiempo. Estas son necesarias porque, el CSS, al carecer de un sistema de módulos conveniente y debido a su naturaleza de sobrescritura en cascada, crea la combinación perfecta para generar un ambiente caótico rápidamente en proyectos de nivel empresarial.

Si bien cada arquitectura propone una solución "absoluta", es bien sabido que usarlas en conjunto puede traer ciertos beneficios. Pero, como todo, no hay que abusar y definitivamente hay que conocer las combinaciones que no tienen sentido en absoluto. Un ejemplo es usar un framework de clases utilitarias como Tailwind CSS mediante un preprocesador como SASS con la directiva @apply. Lo único que se esta haciendo aquí es agregar una capa extra de complejidad que vuelve a nuestro proyecto redundante y absurda.

```scss
@import "components/card.scss";

.home {
  @apply flex flex-col items-center justify-center px-5 py-5;

  .title {
    @apply text-gray-800 text-left text-lg mb-5;

    a {
      @apply text-blue-500 underline;
    }
  }

  .info {
    .info__content {
      @apply text-2xl bg-purple-400 p-4 rounded-lg whitespace-pre-wrap;
    }
  }
}
```

_Un claro ejemplo de cómo se esta _[_desaprovechando la filosofía de Tailwind CSS_](https://tailwindcss.com/docs/using-with-preprocessors)_, quizás por costumbre o moda, sin realmente entender su propósito._

Así que, vamos a hablar sobre lo bueno, lo malo y lo feo de las arquitecturas y metodologías más populares.

## ¿Son Arquitecturas o Metodologías?

La palabra metodología se refiere en su forma más simple y general a "un conjunto de reglas". Una arquitectura, por su parte, es solo una metodología que se enfoca en la estructura de un proyecto. Por este motivo, usaremos las palabras "Arquitectura" y "Metodología" de manera intercambiable en este artículo.

# OOCSS

Definitivamente, una de mis arquitecturas menos favoritas pero que vale la pena mencionar, ya que es una de las primeras metodologías que nos empieza a dar una luz sobre cómo podemos mejorar la estructura de nuestro CSS.

OOCSS, es decir, Object-Oriented CSS tiene dos principios fundamentales:

1. **Separar estructura y apariencia:** La idea es separar estilos que dan una apariencia similar entre componentes y moverlos en una clase independiente. Es simplemente aplicar el principio DRY (Don't Repeat Yourself) para los estilos que se enfocan solo en apariencia. Esto es algo que como desarrolladores hacemos naturalmente cuando el CSS se vuelve parte de nuestro día a día en un proyecto de larga duración. La estructura, por otro lado, como lo es el alto y el largo, entre otros, queda definida en cada elemento.
2. **Separar contenedor y contenido:** Este principio nos dice que no deberíamos usar los selectores combinadores como el de descendencia para especificar estilos. Así, los estilos del contenido deberían poder reutilizarse independientemente de su contenedor. Por ejemplo, en vez de usar el selector de descendencia como `.object h2`, usaríamos un selector de clase concreto para el elemento `h2` como, por ejemplo, `.category`.

Uno de los éxitos de OOCSS aplicado al mundo real ha sido el **media object**. Un [elemento común](https://github.com/stubbornella/oocss/wiki/Content#media-object-) en las aplicaciones que nos ahorra la creación de componentes innecesarios. Puedes ver un ejemplo de este en la [versión 4 de Bootstrap](https://getbootstrap.com/docs/4.0/layout/media-object/).

### Más información

- [https://www.slideshare.net/stubbornella/object-oriented-css](https://www.slideshare.net/stubbornella/object-oriented-css)
- [https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)

# SMACSS

_Scalable and Modular Architecture of CSS_ fue la promesa que nunca se cumplió de solucionar todos nuestros problemas con el CSS. Parecía una idea muy atractiva, pero al aplicarlo al mundo real surgían más preguntas que respuestas. Debo decir que yo mismo tomé [el curso dictado por el mismísimo autor Jonathan Snook](https://frontendmasters.com/courses/smacss/) y aun así me siguió pareciendo bastante complicado.

Una de las cosas que puedo rescatar de SMACSS es la categorización de clases exclusivas para el comportamiento de elementos en un layout. Como, por ejemplo, una clase que determina un ancho fijo cuando se aplica a los elementos.

```css
#article {
  width: 80%;
  float: left;
}

#sidebar {
  width: 20%;
  float: right;
}

.l-fixed #article {
  width: 600px;
}

.l-fixed #sidebar {
  width: 200px;
}
```

También, podemos rescatar la categoría de clases para manejar estados de los elementos. Incluso esto nos facilita el manejo de estados desde JavaScript, pues es solo una cuestión de agregar o remover clases. Cabe resaltar que por convención se nombran con la palabra `is` lo cual deja claro que está describiendo un estado del elemento.

```css
.tab {
  background-color: purple;
  color: white;
}

.is-tab-active {
  background-color: white;
  color: black;
}
```

### Más información

- [https://frontendmasters.com/courses/smacss/](https://frontendmasters.com/courses/smacss/)
- [http://smacss.com/](http://smacss.com/)

# SUITCSS

SUITCSS se podría considerar una evolución de las arquitecturas ya mencionadas. Se basa principalmente en OOCSS con sus clases de utilidades y SMACSS con sus clases para manejo de estados.

Esta metodología es una de las pioneras en traer el concepto de componentes a partir de los elementos HTML. Por eso, las clases de los elementos tienen el prefijo del nombre del componente al que hacen referencia.

```css
.MyComponent {
}

.MyComponent.is-animating {
}

.MyComponent--modifier {
}

.MyComponent-part {
}

.MyComponent-anotherPart {
}
```

Twitter Bootstrap se basó en esta metodología para darle manejo a sus clases de CSS.

### Más información

- [[https://github.com/suitcss/suit](http://suitcss.github.io/)](https://github.com/suitcss/suit)

# ITCSS

Inverted Triangle CSS fue una metodología creada por el legendario Harry Roberts, más conocido en la web como [CSS Wizardry](https://csswizardry.com/). Su desarrollo evoluciona a partir de la metodología OOCSS en donde se crea una mayor separación de categorías basadas en que tan específicas son las clases. Finalmente, se debe tener en cuenta que está metodología esta pensada para ser usada con un preprocesador de CSS.

Las capas del triángulo invertido son las siguientes:

1. **Settings:** En esta capa se definen las variables y métodos para el preprocesador de CSS.
2. **Tools:** En esta capa se definen las funciones y mixins para el preprocesador de CSS.
3. **Generic:** En esta capa se definen los estilos normalizadores, también conocidos como _reset_ de CSS.
4. **Elements:** Cualquier estilo aplicado a elementos HTML directamente, es decir, sin el uso de clases.
5. **Objects:** Estilos específicos para las estructuras de las páginas, como se hace en OOCSS.
6. **Components:** Todos los estilos relacionados a componentes, como se hace en SUITCSS.
7. **Trumps:** Son los estilos más específicos, donde su idea es poder sobrescribir cualquier estilo definido en las capas anteriores sin necesidad de usar `!important`. Aquí, también estarían nuestros estilos de utilidades como se hace en SMACSS.

### Más información

- [https://github.com/csswizardry/frcss](https://github.com/csswizardry/frcss)
- [https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- [https://www.hongkiat.com/blog/inverted-triangle-css-web-development/](https://www.hongkiat.com/blog/inverted-triangle-css-web-development/)
- [https://csswizardry.com/2018/11/itcss-and-skillshare/](https://csswizardry.com/2018/11/itcss-and-skillshare/)

# BEM

Hasta ahora, las metodologías que hemos mencionado tienen fuertes opiniones sobre cómo categorizar el nombramiento de clases e incluso la definición de estructura de archivos. Aun así, todo esto puede llegar a ser bastante confuso, por lo que se presta a malas implementaciones de las metodologías.

Es por eso que BEM nos plantea una solución simple a nuestros problemas para escalar CSS desde otro punto de vista. Este se centra solo en la manera como nombramos nuestras clases para reflejar la estructura de nuestros elementos con tan solo leerlas. Así pues, al ser tan simple, es posible usar BEM en conjunto con otras metodologías, siendo este el caso más común.

Cabe resaltar, que es válido hacer variaciones sobre la convención original. Por ejemplo, personalmente, cuando aplico BEM, uso nada más un solo guion, evitando así repetir más guiones o el uso de guion bajo.

BEM establece tres categorías:

1. **Bloques:** Estos son los que conocemos como componentes y establece el _namespace_ del mismo.
2. **Elementos:** Expresan el contenido de los componentes y tienen un doble guion bajo como prefijo.
3. **Modificadores**: Son clases que expresan un estado del componente. Tienen un doble guion como prefijo.

```css
.block {
  color: #042;
}
.block__elem {
  color: #042;
}
.block--hidden {
}
```

BEM es muy útil para evitar colisión de clases si no se cuenta con algún sistema que permita solucionar este problema.

Finalmente, hay que tener en cuenta que su abuso puede llegar a ser perjudicial. Por eso, recomiendo leer [este artículo sobre los problemas más comunes en BEM y cómo evitarlos](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/).

### Más información

- [http://getbem.com/](http://getbem.com/)
- [https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/)

# Atomic Design

Atomic Design no es una metodología de CSS, pero como metodología de estructuración de componentes ayuda mucho. Al elegir un paradigma orientado a componentes se nos facilita el problema de reutilización de estilos. Pues, estos deben convivir con el componente definido y no tenemos que pensar en otras formas de abstracción.

La manera como trabajo con Atomic Design y CSS es asegurándome de que los estilos no generen una colisión de clases usando alguna herramienta como CSS Modules, Scoped CSS o CSS-in-JS. También, suelo tener un archivo de _Custom Properties_ que refleja mis [Design Tokens](https://undefined.sh/design-tokens-al-rescate/) y [un normalizador de estilos liviano](https://jgthms.com/minireset.css/).

Atomic Design establece que nuestros componentes pueden ser representados por:

1. **Átomos:** Son los componentes mínimos e indivisibles, como los componentes Ícono, Texto e Imagen.
2. **Moléculas:** Son componentes que nacen de la combinación de múltiples átomos como Botones, compuesto por Ícono y Texto.
3. **Organismos:** Son componentes que están compuestos por Moléculas y Átomos, como lo sería un componente Card que tiene Texto, Imagen y Botones.

Lo interesante de usar Atomic Design es que la reutilización de estilos no se define a través de archivos CSS con clases globales, sino, por medio de la reutilización de componentes.

### Más información

- [https://bradfrost.com/blog/post/atomic-web-design/](https://bradfrost.com/blog/post/atomic-web-design/)
- [https://atomicdesign.bradfrost.com/](https://atomicdesign.bradfrost.com/)

# CUBE CSS

CUBE CSS es una metodología que nace en la modernidad supliendo las necesidades de conceptos como los Design Systems y los [Design Tokens](https://undefined.sh/design-tokens-al-rescate/).

Las categorías que propone CUBE CSS son las siguientes:

1. **Composition:** En este nivel se definen todas las reglas relacionadas a layout y a cómo los elementos se comportan entre sí.
2. **Utility:** Aquí se definen clases como si fuera una librería de utilidades tal y como lo hace Tailwind CSS, pero la diferencia es que las clases se basan en nuestros Design Tokens.
3. **Block:** Igual que como en BEM con los bloques,son estilos dirigidos a los componentes. Hay que resaltar que para este punto la mayoría de estilos deberían estar cubiertos por las capas de Composition y Utility. Así que solo existirán estilos muy específicos.
4. **Exception:** Comparte el mismo propósito que las clases de estados que hemos visto en otras metodologías, solo que estas son específicas del Bloque. Además, en CUBE CSS se declaran mediante "data attributes".

Finalmente, algo muy interesante que tiene esta metodología es la manera como se aplican las clases a los elementos. Su propuesta es agrupar las clases haciendo el uso de `[]` (corchetes) haciendo más legible la composición.

```html
<article
  class="[ card ] [ section box ] [ bg-base color-primary ]"
  data-state="reversed"
></article>
```

### Más Información

- [https://piccalil.li/blog/cube-css/](https://piccalil.li/blog/cube-css/)
- [https://piccalil.li/cube-css/](https://piccalil.li/cube-css/)

## Sobre los CSS Modules, CSS-in-JS, Componentes y las librerías de utilidades

A continuación, hablaremos de ciertas tecnologías que pueden fortalecer las metodologías mencionadas, si se usan adecuadamente.

### CSS Modules y CSS-in-JS

CSS Modules y CSS-in-JS nos ayudan con el problema de colisión de clases. Si se hace uso de estas tecnologías podemos omitir por completo el prefijo Bloque en BEM. Pues, las clases no van a colisionar. También, hay frameworks como Vue que permiten generar el mismo resultado mediante el atributo `scoped`.

### Paradigma de Componentes

Al usar el paradigma de programación orientada a componentes evitaremos pensar en clases genéricas para los elementos. Lo que va a suceder es que vamos a tener una duplicación de reglas. Sin embargo, esto no importa, pues un componente debe funcionar de manera independiente y esto solo se logra si es dueño de sus propios estilos.

Librerías como React, Vue y Angular suelen traer soluciones para aislar el CSS. En caso de no hacer uso de estas librerías es posible obtener el mismo resultado mediante CSS Modules o [Shadow DOM](https://undefined.sh/introduccion-a-los-web-components/#shadow-dom).

### Librerías de Utilidades

Tailwind CSS ha popularizado el uso de clases de utilidad. Sin embargo, es importante tener en cuenta que este tipo de librerías tienen un propósito muy específico. Por eso, es importante revisar si [escribir hojas de estilos se vuelve redundante con Tailwind CSS](https://ricostacruz.com/til/another-look-at-tailwind).

# Conclusiones

Las arquitecturas y metodologías de CSS han sido empleadas con el fin de solucionar problemas comunes a la hora de escalar los estilos. Sin embargo, la evolución de otras metodologías como el paradigma de componentes o las librerías orientadas a clases utilidad nos ha hecho replantear el uso de las mismas.

Lo mejor que podemos hacer es tomar estos pequeños aprendizajes y analizar si tienen sentido para nuestro proyecto actual. El hecho de que tiempo atrás se hayan introducido los preprocesadores no quiere decir que tengamos que usarlos por siempre. Por el contrario, su uso desaparecerá gracias a soluciones ya implementadas como los Custom Properties y PostCSS.

### Más información

- [https://www.madebymike.com.au/writing/css-architecture-for-modern-web-applications/](https://www.madebymike.com.au/writing/css-architecture-for-modern-web-applications/)
- [https://youtu.be/IKFq2cSbQ4Q](https://youtu.be/IKFq2cSbQ4Q)
