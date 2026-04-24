---
title: La evolución de los Design Tokens
pubDate: "2023-03-27T00:00:00.000Z"
tags: Design Systems
description: Han pasado muchos meses desde que escribí mi primer artículo en español sobre Design Tokens, y desde entonces no solo han evolucionado, sino que cada vez se adaptan y se vuelven una parte fundamental de un sistema de diseño. Hoy les quiero compartir los puntos clave de esta evolución.
heroImage: "/covers/busy-kitchen-with-many-pots-on-gas-stove.jpg"
relatedPosts:
  - design-tokens-al-rescate
  - evolucion-de-las-arquitecturas-de-css
  - introduccion-a-los-web-components
---

Han pasado muchos meses desde que escribí mi primer artículo en español sobre Design Tokens, y desde entonces no solo han evolucionado, sino que cada vez se adaptan y se vuelven una parte fundamental de un sistema de diseño. Hoy les quiero compartir los puntos clave de esta evolución.

# ¿Que son los Design tokens?

Si no tienes ni idea de lo que estoy hablando, te recomiendo empezar por mi primer artículo, que es una introducción a tan maravillosa metodología que uso sin falta en mis sistemas de diseño: https://undefined.sh/design-tokens-al-rescate/

# Los Design Tokens ya tienen un formato estándar

Desde julio de 2019 nació un grupo de trabajo para los Design Tokens, que se ha encargado de definir y mantener el formato estándar de estos.

Esto permite que los Design Tokens sean interoperables, no importa la herramienta o tecnología, haciendo más fácil la comunicación entre herramientas de diseño como Figma o Illustrator; herramientas de traducción como Theo o Styled Dictionary; herramientas de documentación como Storybook o Supernova; y finalmente, su implementación en cualquier lenguaje de programación y lenguaje de estilos.

```json
{
  "Majestic magenta": {
    "$value": "#ff00ff",
    "$type": "color"
  },
  "Translucent shadow": {
    "$value": "#00000080",
    "$type": "color"
  }
}
```

# Taxonomía de 3 niveles

Si están familiarizados con mi primer artículo, saben que la característica que más diferencia los Design Tokens de simples variables es su estructura organizada en forma taxonómica.

En un inicio, hablábamos de 2 niveles: Choices y Decisions, definición que aún sigue siendo muy poderosa y válida. Especialmente para Design Systems pequeños que pretenden ser usados en una o máximo dos aplicaciones. Pero si de verdad queremos aprovechar todo su potencial y escalabilidad, es necesario separar los Decisions en dos niveles independientes: Decisions y Components.

Como todo, los nombres son sugerencias, pero lo más importante es el rol que cumple cada nivel. Exploremos un poco esta funcionalidad y sus posibles alias.

### Más información

- https://uxdesign.cc/naming-design-tokens-9454818ed7cb?gi=3b12497f9f72

## Choices: aka Reference, Core tokens.

Este nivel sigue siendo usado para definir la base de nuestro Design System. El propósito es acotar las posibilidades que tenemos a la hora de definir nuestros materiales de diseño. Si tuviésemos un restaurante, llamémosle "The Tasty Token Bistro", que siguiera esta estructura de niveles, aquí podríamos hablar de los "ingredientes" que definirán el sabor de los platillos. Por supuesto, en el contexto de productos, los platillos serían nuestros componentes.

## Decisions: aka System, Alias tokens.

Al igual que como hacíamos con nuestros "Decisions", este nivel se vuelve algo semántico pero sin realmente establecer un uso en particular. Es el nivel más importante en un sistema de tokens de tres niveles y, por ende, el más difícil de establecer.

Este nivel es el que nos va a permitir la flexibilidad y escalabilidad del mismo, pues cuando queramos cambiar nuestro color primario, o tema, es aquí donde haremos dichos cambios.

En nuestro restaurante hipotético "The Tasty Token Bistro", si el primer nivel eran los "ingredientes" disponibles, aquí los "cocinaremos" para poder ser usados en nuestros platillos.

## Components: aka Override, Scope tokens.

Finalmente, el tercer nivel no es realmente tan nuevo, pues los tokens asociados a componentes los solíamos declarar en el segundo nivel en un sistema de tokens de dos niveles. Este nivel solo pretende establecer un puente entre los Design Tokens y los componentes de UI, es una referencia a los system tokens (segundo nivel) aplicada en el contexto del componente. Es una forma de crear un namespace para todos los System tokens que dicho componente va a usar. En nuestro restaurante hipotético, aquí es donde juntamos nuestros ingredientes cocinados para formar un delicioso platillo.

Si siguiéramos la metáfora, una página de nuestra app sería toda la experiencia de una cena, con platillos de entrada, principal y postre, pero eso es una historia que prefiero contar con otra analogía: _Física Cuántica y vendrá en otro post._

![Sistema de tokens de 3 niveles](/images/posts/es/la-evolucion-de-los-design-tokens/representacion-design-tokens.png)
_Sistema de tokens de 3 niveles, aplicado metafóricamente a nuestro restaurante "The Tasty Token Bistro"._

# Convención de nombres

Como siempre, lo más difícil es nombrar las cosas, y todo suele tener sentido en la teoría, pero en la práctica es donde aparecen los problemas. Hay muchas sugerencias de cómo seguir una convención de nombres para tokens y creo que lo más importante a tener en cuenta es que, dependiendo del tipo de token, esta convención puede tener más o menos niveles para nombrar dicho token.

Por ejemplo, un token de color que suele ser el más complejo puede tener un nombre tal y como: `button-filled-primary-foreground-color-disabled`, mientras que un borde puede ser tan solo `card-primary-border-focused`, ambos tokens establecidos en el tercer nivel, es decir, tokens de componentes.

Esto también merece su post independiente, por lo que por ahora les compartiré un par de enlaces que pueden ayudarles a decidir cómo definir sus propias convenciones.

### Más información

- [Naming Tokens in Design Systems](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676)
- [Design Tokens. Definition process for a themeable product-service system](https://liferay.design/articles/2021/design-tokens-definition-process/)
- [A design token taxonomy for Checkout.com](https://www.gerireid.com/design-token-taxonomy.html)

Lo que sí es importante a tener en cuenta es que en el nombre del token debe especificarse el nivel al que pertenece, sea _Core_ o _Reference_ para el primer nivel, o _System_, _Alias_, para el segundo, y _Components_ para el tercero, etc.

# Integración con Atomic Design

Cada vez se cierra más la brecha del uso de Atomic Design como metodología de composición en los sistemas de diseño. Más allá de seguir al pie de la letra lo que dicta Atomic Design, es promover el concepto de la composición desde la definición, componentes de Figma y, finalmente, componentes en tu framework favorito… React, coff, coff.

Si quieres saber más de Atomic Design, puedes leer un post donde lo menciono y comparo junto con otras metodologías: https://undefined.sh/evolucion-de-las-arquitecturas-de-css/#atomic-design

Los Design Tokens forman parte de dicha composición, y es por eso que se ha hablado de integrarlos directamente a la metodología, llamándolos ions, que técnicamente más que una composición se referiría a un “estado del componente” compartido;

De ahí su nombre ions, los átomos, pues, no están compuestos por iones, pero pueden ganar o perder electrones, definiendo así si un átomo es de carga negativa o positiva. Los detalles físicos no importan y quien mejor lo puede explicar es el autor original, quien orgullosamente cita que el mismísimo Brad Frost, creador de Atomic Design, lo aprueba.

### Más información

- [Introducing “Ions”, an extension to the Atomic Design](https://www.cjcid.com/essays/ions-introduction/)

# ¿Cuál es el futuro de los Design Tokens?

Cada vez se está normalizando el uso de los Design Tokens como pieza fundamental de un sistema de diseño. La salida del formato estándar y su integración en nuevas herramientas está facilitando la integración en las diferentes plataformas y herramientas.

La integración de los Design Tokens en metodologías como Atomic Design demuestra su necesidad inherente en un sistema de diseño, y la adopción de 3 niveles permite ir más allá de la verdadera escalabilidad de los componentes.

Los Design Tokens nos entregan la posibilidad de crear una "sistematización" hacia los sistemas de diseño, sí, aunque suene redundante. Esto es porque, si logramos implementarlos de manera desacoplada gracias al sistema de 3 niveles, podemos variar nuestro nivel intermedio y generar cuantos sistemas de diseño queramos.

Lo que permitiría una relación Design token <> Sistema de diseño, queriendo decir que, así mismo, podríamos buscar la relación de valores de los Design tokens hacia el producto final, es decir, qué valores crean un sitio web o app que luzcan con cierto propósito: elegante, divertido, profesional, feliz, etc.

Sí, podríamos recolectar información suficiente sobre estos valores de tokens y generar, mediante IA, sistemas de diseño completos, listos para usar en nuestras librerías y programas favoritos, sin más esfuerzo de creación de estos.

Pero dicha maravilla de la sistematización necesita resolver una falla que tienen las metodologías de composición como Atomic Design. Por eso, dicho problema lo solucionaremos en otro post con la nueva metodología que estoy usando: **Quantum Design.**
