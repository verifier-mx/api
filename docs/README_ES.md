![Verifier logo](https://verifier-assets.s3.amazonaws.com/marketing/banner-300px.png)

**Bienvenido a _Verifier_.** Ayudamos a los desarrolladores con herramientas para prevenir el fraude y validar datos personales en México.

Con _Verifier_ podrás:
* Validar que un [RFC](https://es.wikipedia.org/wiki/Registro_Federal_de_Contribuyentes) esté registrado ante el [SAT](https://www.sat.gob.mx/home).

**Seguimos desarrollando más servicios. Pronto agregaremos verificación para CURPs, INEs y ubicaciones por IP.

## Autenticación

Para acceder a _Verifier_ deberás hacerlo mediante RapidAPI. Es muy fácil:
1. Crea una cuenta en [RapidAPI](https://rapidapi.com/).
2. Suscríbete a [_Verifier_](https://rapidapi.com/Spott/api/spott/details)
3. Comienza a hacer requests. Envía el API Key en el header `X-RapidAPI-Key`.

Más detalles sobre la autenticación en RapidAPI [aquí](https://docs.rapidapi.com/docs/keys).

## Endpoints

### POST /rfc/verify

Este endpoint permite verificar el formato de un RFC y consultar si está registrado ante el [SAT](https://www.sat.gob.mx/home).

**Parámetros**

Los siguientes parámetros se deberán enviar en el _body_ del request:

| Parámetro | Tipo | Descripción |
| --------- | ---- | ----------- |
|`rfc`| String | El RFC a validar. |

**Respuesta**

El endpoint regresará un objeto con los siguientes parámetros:

| Parámetro | Tipo | Descripción |
| --------- | ---- | ----------- |
|`isValid`|Boolean|Indica es el string ingresado es un RFC válido.|
|`isRegistered`|Boolean|Indica si el RFC está dado de alta en el SAT.|
|`rfc`|String|El RFC formateado (en mayúsculas, sin espacios ni símbolos). Regresa `null` en caso de que el RFC sea inválido.|
|`type`|String|El tipo del RFC ingresado. Los valores pueden ser `person` para personas físicas, `company` para personas morales, `generic` para el RFC genérico "XAXX010101000" o `foreign` para el RFC "XEXX010101000" para residentes en el extranjero. Regresa `null` en caso de que el RFC sea inválido.|
|`blacklist69b`|Objeto|Provee detalles en caso de que el RFC esté incluído en la lista negra de contribuyentes con operaciones presuntamente inexistentes ([69-B](https://www.sat.gob.mx/consultas/76674/consulta-la-relacion-de-contribuyentes-con-operaciones-presuntamente-inexistentes)). Se regresará `null` si el RFC no está incluído en la lista negra. Ver la sección **"Lista negra 69-B"** para conocer más detalles sobre este objeto.|
|`validation Errors`|Array[String]|En caso de que el RFC no sea válido, aquí se indican los motivos por los que no fue válido.|

Los posibles valores que puede contener `validation Errors` y su descripción son:

| Error | Descripción |
| ----- | ----------- |
|`INVALID_FORMAT`|El formato es inválido, es decir, no cuenta con la longitud o estructura de caracteres esperado. Ej: `XYZ` porque claramente no es un RFC. |
|`INVALID_DATE`|El string tiene el formato adecuado, pero los dígitos para la fecha generan una fecha inválida. Ej: `MHTR815511A70` porque refiere al mes `55`.|
|`INVALID_VERIFICATION_DIGIT`|El string tiene el formato adecuado, pero el último caracter (dígito verificador) es inválido. Ej: `MHTR810511A79` termina en `9` pero se espera que termine en `2`.|

**Ejemplo**

```js
POST /rfc/verify
 
body:
{
  "rfc": "bmc111105rp5"
}

Respuesta:
{
  "isValid": true,
  "isRegistered": true,
  "rfc": "BMC111105RP5",
  "type": "company",
  "blacklist69b": {
    "id": "1186",
    "name": "NEGMEX NEGOCIOS EMPRESARIALES DE MÉXICO, S.A. DE C.V.",
    "status": "definitive",
    "allegedDetails": {
      "ogId": "500-05-2017-32098",
      "ogPublicationDate": "2017-08-29T05:00:00.000Z",
      "satPublicationDate": "2017-09-01T05:00:00.000Z",
      "dofPublicationDate": "2017-09-19T05:00:00.000Z"
    },
    "detractedDetails": null,
    "definitiveDetails": {
      "ogId": "500-05-2018-8181",
      "ogPublicationDate": "2018-03-23T06:00:00.000Z",
      "satPublicationDate": "2018-03-23T06:00:00.000Z",
      "dofPublicationDate": "2018-04-17T05:00:00.000Z"
    },
    "favorableDetails": null
  }
}

```

### Lista negra 69-B

En caso de que el RFC esté incluído en la lista negra de contribuyentes con operaciones presuntamente inexistentes ([69-B](https://www.sat.gob.mx/consultas/76674/consulta-la-relacion-de-contribuyentes-con-operaciones-presuntamente-inexistentes) se regresará un objeto `blacklist69b` con las siguientes propiedades:

| Parámetro | Tipo | Descripción |
| --------- | ---- | ----------- |
|`id`|String|El número o identificador asignado por el SAT para el RFC dentro de la lista.|
|`status`|String|El estatus en que se encuentra el RFC dentro de la lista. Los valores correspondientes con el SAT son `alleged` (Presunto), `detracted` (Desvirtuado), `definitive` (Definitivo) y `favorable` (Sentencia Favorable).|
|`name`|String|El nombre o razón social de la persona física o moral.|
|`allegedDetails`|Objeto|Información adicional en caso de que el RFC esté o haya pasado por el estatus "alleged".|
|`detractedDetails`|Objeto|Información adicional en caso de que el RFC esté o haya pasado por el estatus "detracted".|
|`definitiveDetails`|Objeto|Información adicional en caso de que el RFC esté o haya pasado por el estatus "definitive".|
|`favorableDetails`|Objeto|Información adicional en caso de que el RFC esté o haya pasado por el estatus "favorable".|

Los detalles de cada estatus serán `null` si el RFC no está o estuvo en dicho estado, de lo contrario tendrá las siguientes propiedades:

| Parámetro | Tipo | Descripción |
| --------- | ---- | ----------- |
|`ogId`|String|Número de oficio global en que se publicó.|
|`ogPublicactionDate`|String|Fecha en que el estatus del RFC se publicó en el oficio global.|
|`satPublicactionDate`|String|Fecha en que el estatus del RFC se publicó en el SAT.|
|`dofPublicactionDate`|String|Fecha en que el estatus del RFC se publicó en el Diario Oficial de la Federación.|

Los estatus que puede tener un RFC en la lista 69-B significan:

* `alleged` (Presunto): Se cree que el RFC tiene operaciones inexistentes, pero no se ha comprobado. Riesgo: _medio_.
* `detracted` (Desvirtuado): No se pudo comprobar el que RFC realiza operaciones inexistentes. Riesgo: _bajo_.
* `definitive` (Definitivo): Se comprobó que el RFC realiza operaciones inexistentes. Riesgo: _alto_.
* `favorable` (Sentencia Favorable): Ya se había marcado como _Definitivo_ pero el acusado demostró su inocencia y resultó favorable. Riesgo: _bajo_.

*Nuestra base de datos se actualiza cada 24 horas con la información más reciente disponible en el SAT.

## Sobre el plan gratuito (Basic)

_Verifier_ ofrece un plan gratuito de hasta 50 requests al mes, con la finalidad probar la funcionalidad de la API.

Desafortunadamente RapidAPI requiere que ingreses los datos de una tarjeta de crédito para poder suscribirte al plan gratuito (Basic); eso es algo que no podemos cambiar. Sin embargo, puedes estar seguro que **ni _Verifier_ ni RapidAPI harán algun cargo** a menos que cambies al plan de paga (Pro).

## Datos

Los datos del RFC son obtenidos directamente del SAT ([Servicio de Administración Tributaria]((https://www.sat.gob.mx/home))) por lo que son confiables y siempre están actualizados.

## Ayuda / Comentarios

Si tienes algún comentario, pregunta o te gustaría pedir una nueva función, **contáctanos en [info@verifier.mx](mailto:info@verifier.mx)** o mediante el chat de RapidAPI.
