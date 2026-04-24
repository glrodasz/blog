---
title: "¿Qué necesito saber antes de programar?"
pubDate: "2025-07-24T00:00:00.000Z"
tags: Aprende a programar
description: Antes de empezar a programar no hace falta ser un genio ni memorizar fórmulas; basta con seguir tres pilares que simplifican el camino, aprender a leer documentación, repasar las matemáticas de la secundaria y mantener una curiosidad inagotable para adaptarte a los constantes cambios tecnológicos. Veamos por qué, con esos cimientos, cualquier persona puede dar sus primeros pasos con confianza.
heroImage: "/covers/vintage-wooden-toolbox-with-metal-wrenches.jpg"
languageVersions:
  - language: "en"
    url: "/posts/what-you-need-to-know-before-programming"
relatedPosts:
  - la-programacion-es-para-mi
  - para-que-me-sirve-programar
  - como-funciona-un-lenguaje-de-programacion
---
Antes de empezar a programar no hace falta ser un genio ni memorizar fórmulas; basta con seguir tres pilares que simplifican el camino: 

1. Aprender a leer documentación.
2. Repasar las matemáticas de la secundaria.
3. Mantener una curiosidad inagotable para adaptarte a los constantes cambios tecnológicos.

Veamos por qué, con esos cimientos, cualquier persona puede dar sus primeros pasos con confianza.

## Leer… sí, ¡pero no solo por la razón que crees!
A lo largo de tu carrera pasarás aproximadamente **el 90% del tiempo[^1] leyendo código, no escribiendolo.** Los buenos programadores:
* Leen documentacion
* Leen código de otros programadores.
* Leen código de librerías y proyectos de código abierto.
* Leen su propio código para asegurarse que no tenga errores.

> ℹ️ **Código abierto (Open Source)**: es código fuente que está disponible públicamente para ser estudiado y que, además, casi siempre puede modificarse y redistribuirse. Pero, esto depende de la licencia, ya que no todas las licencias de código abierto conceden esos derechos por defecto.

Personalmente, una de mis recomendaciones favoritas para aprender a programar es lo que yo llamo **el arte de leer la documentación del código**. No siempre es sencilla, y por eso existimos los creadores de contenido. Nuestro proposito suele ser la traducción de esa información a formatos más fáciles de asimilar, como tutoriales, vídeos o libros.

Sin embargo, confieso que a veces leer puede resultar pesado,  especialmente, cuando no tengo algunas bases claras. Es muy tentador, incluso placentero saltar directo a teclear código cómo todo un maniático. Pero en más de una ocasión he descubierto, a mitad de camino o incluso al final, que mi solución, aunque “funcionaba”, no cumplía con los requerimientos. 

Por eso **leer requerimientos** también es una habilidad vital para el desarrollador profesional.

> ℹ️ **Requerimientos:** conjunto de condiciones y funcionalidades que una aplicación debe cumplir para satisfacer las necesidades del cliente o usuario final. Esto es lo que comúnmente se conoce como “descripción del ticket o tarea”, hablando de manera muy simplificada.

La buena noticia es que si estás leyendo este blog, es porque eres una de esas personas que está dispuesta a leer para mejorar su futuro profesional, así que ¡vas por buen camino! 🚀

## Matemáticas básicas… pero no tan básicas
Quisiera decirte que para programar basta con saber **sumar, restar, multiplicar y dividir**, pero en realidad se necesita **un poquito más** que eso.

> 🧠 Técnicamente, **sí** podrían bastar las operaciones básicas para tareas muy puntuales como por ejemplo, “maquetar”, pero… rápidamente, en pruebas técnicas o funcionalidades complejas, vas a necesitar algunos operadores matemáticos extra.

> ℹ️ **Maquetar** significa traducir diseños de interfaz de usuario a código. En la web se usaría HTML (para estructurar la información), CSS (para definir los estilos visuales) y una pizca de JavaScript (para añadir interactividad), por lo que el código imperativo es mínimo (ver más en [Tipos de lenguajes de programación](/posts/types-of-programming-languages/)).

No necesitas ser un experto en matemáticas ni un físico cuántico. El **programador promedio** en la industria comercial utiliza una cantidad muy limitada de matemáticas, prácticamente lo aprendido en la **educación secundaria**, con alguna que otra excepción. Veamos qué áreas conviene repasar (in necesidad de dominarlas a fondo ni tenerlas frescas antes de empezar a programar):

> ⚠️ Si programas como investigador o estás en el camino de la academia, la situación cambia. Pero si ese es tu caso, dudo que la matemática avanzada sea un problema para ti.

### Aritmética elemental
Operaciones de suma, resta, multiplicación y división. Se aplican constantemente, algunos ejemplos son: calcular totales en un carrito de compras, aplicar impuestos o manejar cantidades en la lógica de negocio. También es clave comprender la **prioridad de operaciones** en expresiones más complejas (saber cuándo la multiplicación se realiza antes que la suma, etc.).

### Porcentajes y proporciones 
Resulta útil saber calcular porcentajes, ya sea para determinar descuentos (“un 20 % menos en una oferta”) o para diseño responsivo en la interfaz de usuario (por ejemplo, indicar que un elemento ocupe el 80 % del ancho de la pantalla). Comprender proporciones ayuda a distribuir espacios y a interpretar métricas (como tasas de conversión).

### Álgebra básica 
Entender variables y fórmulas simples. Aunque rara vez resuelvas ecuaciones manualmente, usas **álgebra elemental de forma implícita** al combinar variables en el código (p. ej., calcular un valor a partir de otros dos). Saber despejar incógnitas sencillas es útil para implementar reglas de negocio.

### Sistemas numéricos y notación
Es beneficioso conocer la representación de números en **decimal, binario y hexadecimal**. En el mundo web, se utilizan al trabajar con colores en CSS (#FF5733 es el valor hexadecimal de un color rojizo), al manipular bits para flags lógicos o al entender códigos de caracteres. Son conceptos básicos de matemáticas discretas que normalmente se aprenden en contexto, es decir, a medida que se aprende a programar.

### Geometría básica
En ciertos casos de la interfaz de usuario se requieren nociones simples: entender el **sistema de coordenadas cartesiano** para posicionar elementos (el punto 0,0 suele estar en la esquina superior izquierda; `x` crece a la derecha, y `y` hacia abajo). En animaciones o mapas 2D puede aparecer el **teorema de Pitágoras** u otras fórmulas sencillas, aunque no es algo común en el día a día, sino más bien esporádico, por lo que saber que existen es más que suficiente.

### Pensamiento lógico
Más allá de la aritmética, hay ramas como la lógica formal, teoría de conjuntos, o estadística que **no son explícitamente requeridas** para un desarrollador web promedio, pero sus conceptos existen de forma **implícita** en la programación y se pueden aprender sobre la marcha. Miremos de que formas suelen aparecer:

#### Lógica formal y booleana
La programación se fundamenta en la lógica, pero no necesitas escribir tablas de verdad en papel. Basta comprender *verdadero/falso*, conjunciones y disyunciones.

#### Teoría de conjuntos
Aparece indirectamente, sobre todo al trabajar con **bases de datos**. SQL se apoya en *álgebra relacional* (una aplicación de la teoría de conjuntos) para unir tablas, intersectar resultados o seleccionar filas que cumplen ciertas condiciones.

#### Estadística y probabilidad
En el desarrollo web estándar, la estadística avanzada es **muy limitada**. Un programador centrado en formularios, comunicación entre servicios y la interfaz de usuario rara vez calcula distribuciones estadísticas o realiza pruebas de hipótesis en su código.

> 🚨 Si en este punto te estás asustando, no te preocupes. Como mencioné al principio, **no necesitas dominar todo esto antes de aprender a programar**. Si ya lo sabes, perfecto; si no, lo aprenderás cuando lo necesites.

## Mucha, pero mucha curiosidad
Si eres de las personas que se esfuerzan por entender **cómo funcionan las cosas** desde sus fundamentos, es muy posible que la programación sea para ti, y además, tu carrera puede llegar a ser muy exitosa.

La tecnología avanza tan rápido que todo cambia todo el tiempo. Sin embargo, los fundamentos crean **bases sólidas** que nos hacen más resistentes y facilitan nuestra adaptación al cambio.

Quienes somos curiosos solemos explorar esos fundamentos casi por inercia, pero los cambios pueden llegar de forma repentina. Por eso nunca está de más reforzar las bases: suelen seguir siendo relevantes durante mucho tiempo.

### La tecnología avanza más rápido de lo que nos conviene
En más de una década programando he cambiado de editor de código más de diez veces, destaco algunos: Notepad, Notepad++, Eclipse, NetBeans, IntelliJ, Atom, VS Code, Cursor…

He trabajado en todos los sistemas operativos haciendo código: Windows, macOS y Linux (varias distribuciones).

He escrito profesionalmente en **seis lenguajes** (PHP, SQL, Java, JavaScript, TypeScript y Python) y he creado proyectos pequeños con una decena más.

Frameworks, librerías y metodologías de trabajo formarían una lista inmensa, pero para los curiosos suelo mencionar lo relevante en mi [currículum](https://vitae.guillermorodas.com).

Aunque muchos de estos cambios fueron decisiones propias o de gusto, la mayoría respondía a lo que más convenía a mi carrera para estar “al día”.

Otros cambios fueron casi obligados para mantener una ventaja competitiva: pasarme a Cursor, un editor con IA, o a TypeScript, porque en equipos grandes se volvió indispensable un lenguaje tipado y es el sabor más popular de JavaScript.

### El cambio no solo es a nivel tecnológico 
Al ser una industria que cambia tan rápido, muchos desarrolladores también lo hacen y cambian de trabajo cada 1 a 3 años. Tendrás que adaptarte a nuevos equipos, reestructuraciones y políticas (¡el famoso *red tape*!), especialmente cuando las startups crecen muy rápido.

> ℹ️ Las leyes también exigen cambios: *habeas data*, cookies, GDPR o normas internacionales de seguridad como DORA en Europa, entre otras regulaciones en EE. UU.

### El cambio puede venir de terceros
A veces, una empresa modifica su modelo de precios y desencadena un efecto dominó; eso ocurrió con **Heroku** y **Mandrill** cuando eliminaron sus planes gratuitos. Muchos tuvimos que migrar aplicaciones en producción en cuestión de días.

Hay compañías que quiebran y sus productos desaparecen. Por ejemplo, **Parse** cerró en 2017[^2], obligando a miles de apps móviles a buscar alternativas. Y si no sabes qué problema resolvían, es difícil escoger un buen reemplazo.

Otras veces, por protestas o acciones maliciosas, alguien retira una librería del ecosistema, como en el famoso caso de **left-pad** (2016)[^3], que redefinió la forma en que se gestionan los paquetes en NPM.
## Si me preguntan, no necesitas mucho
Aunque he mencionado varios puntos aquí, **no los consideraría requisitos**. En realidad, la única condición indispensable son **las ganas de aprender**. Esa motivación te obligará a leer mucho, lo que, a su vez, despertará tu **curiosidad** por entender cómo funcionan los fundamentos de la programación y la computación. Con el tiempo, estas prácticas te permitirán **adaptarte al cambio**, algo vital en una industria que avanza tan rápido.

Este blog se centra justamente en esas bases y en los fundamentos de JavaScript. Mientras el lenguaje siga vivo (y solo dejará de estarlo si JavaScript “muere” 😉), lo aprendido aquí te ayudará a seguir avanzando y a alimentar tu deseo de aprender.

> 🍎 **COBOL**, uno de los lenguajes más antiguos, lleva 65 años existiendo; a **PHP** lo “matan” desde hace 25. **JavaScript** es el lenguaje de la web: sin duda le quedan, como mínimo, entre 2 y 5 décadas de vida… más que suficiente para que termines este blog.

[^1]: Robert C. Martin, *Código limpio* (trad. español de *Clean Code*, 2008)
[^2]: Facebook’s Parse developer platform is shutting down today - https://techcrunch.com/2017/01/30/facebooks-parse-developer-platform-is-shutting-down-today/
[^3]: kik, left-pad, and npm - https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm
