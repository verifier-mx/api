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
|`type`|String|El tipo del RFC ingresado. Los valores pueden ser `person` para personas físicas o `company` para personas morales. Regresa `null` en caso de que el RFC sea inválido.|
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
  "rfc": "ret130705md5"
}

Respuesta:
{
  "isValid": true,
  "isRegistered": true,
  "rfc": "RET130705MD5",
  "type": "company"
}

```

## Sobre el plan gratuito (Basic)

_Verifier_ ofrece un plan gratuito de hasta 50 requests al mes, con la finalidad probar la funcionalidad de la API.

Desafortunadamente RapidAPI requiere que ingreses los datos de una tarjeta de crédito para poder suscribirte al plan gratuito (Basic); eso es algo que no podemos cambiar. Sin embargo, puedes estar seguro que **ni _Verifier_ ni RapidAPI harán algun cargo** a menos que cambies al plan de paga (Pro).

## Datos

Los datos del RFC son obtenidos directamente del SAT ([Servicio de Administración Tributaria]((https://www.sat.gob.mx/home))) por lo que son confiables y siempre están actualizados.

## Ayuda / Comentarios

Si tienes algún comentario, pregunta o te gustaría pedir una nueva función, **contáctanos en [info@verifier.mx](mailto:info@verifier.mx)** o mediante el chat de RapidAPI.
