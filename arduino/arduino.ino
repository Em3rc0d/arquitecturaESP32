#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "AsistenciaESP32"; // Nombre del WiFi del ESP32
const char* password = "contrasenia123"; // Contraseña del WiFi del ESP32
const char* serverAddress = "http://192.168.4.2:3000/register"; // Dirección del servidor Node.js

WiFiServer server(80); // Puerto 80 para el servidor web

void setup() {
    Serial.begin(115200);

    // Configurar WiFi del ESP32 en modo AP
    WiFi.mode(WIFI_AP);
    WiFi.softAP(ssid, password);

    Serial.println("Punto de acceso WiFi iniciado");
    Serial.print("IP del servidor: ");
    Serial.println(WiFi.softAPIP());

    server.begin();
    Serial.println("Servidor web iniciado");
}

void loop() {
    WiFiClient client = server.available();

    if (client) {
        Serial.println("Nuevo cliente conectado");

        // Esperar hasta que el cliente envíe una solicitud HTTP
        while (client.connected()) {
            if (client.available()) {
                String request = client.readStringUntil('\r');
                Serial.println(request);

                // Esperar a que la solicitud HTTP esté completamente recibida
                if (request.indexOf("/register") != -1) {
                    // Extraer el ID del alumno del cuerpo de la solicitud
                    String alumnoId = obtenerParametro(request, "id");

                    // Enviar solicitud al servidor Node.js
                    int responseCode = enviarRegistroAlServidor(alumnoId);

                    // Enviar respuesta al cliente (HTML)
                    String html = generarHTML(responseCode);
                    client.println("HTTP/1.1 200 OK");
                    client.println("Content-Type: text/html");
                    client.println();
                    client.println(html);

                    delay(100);
                    client.stop();
                    Serial.println("Cliente desconectado");
                    break;
                }
            }
        }
    }
}

// Función para obtener un parámetro de una solicitud HTTP
String obtenerParametro(String request, String parametro) {
    int inicio = request.indexOf(parametro + "=");
    if (inicio == -1) return "";

    inicio += parametro.length() + 1;
    int fin = request.indexOf("&", inicio);
    if (fin == -1) fin = request.indexOf(" ", inicio);
    return request.substring(inicio, fin);
}

// Función para enviar el registro al servidor Node.js
int enviarRegistroAlServidor(String alumnoId) {
    HTTPClient http;
    String url = serverAddress;

    // Construir datos a enviar
    String postData = "id=" + alumnoId;

    Serial.print("Enviando solicitud a: ");
    Serial.println(url);
    Serial.println("Datos a enviar:");
    Serial.println(postData);

    http.begin(url);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    int httpResponseCode = http.POST(postData);

    if (httpResponseCode > 0) {
        Serial.print("Respuesta HTTP recibida: ");
        Serial.println(httpResponseCode);
        String response = http.getString();
        Serial.println("Respuesta del servidor Node.js:");
        Serial.println(response);

        // Manejo específico de errores HTTP
        if (httpResponseCode == HTTP_CODE_OK) {
            // Registro exitoso
            return 200;
        } else if (httpResponseCode == HTTP_CODE_NOT_FOUND) {
            // Código de alumno no encontrado
            return 404;
        } else if (httpResponseCode == HTTP_CODE_FORBIDDEN) {
            // Código de alumno no permitido (403)
            return 403;
        } else {
            // Otros errores
            return httpResponseCode;
        }
    } else {
        Serial.print("Error en la solicitud HTTP: ");
        Serial.println(httpResponseCode);
        return httpResponseCode;
    }

    http.end();
}

String generarHTML(int responseCode) {
    String html = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'>";
    html += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
    html += "<title>Estado de Registro</title>";
    html += "<style>body { font-family: Arial, sans-serif; background-color: #f4f4f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }";
    html += ".container { background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align: center; }";
    html += "h1 { color: #333; } p { color: #666; font-size: 18px; }</style></head>";
    html += "<body><div class='container'>";
    
    if (responseCode == 200) {
        html += "<h1>Registro Completado</h1><p>El ID del alumno ha sido registrado exitosamente.</p>";
    } else if (responseCode == 403) {
        html += "<h1>Error</h1><p>Código de alumno no encontrado.</p>";
    } else {
        html += "<h1>Error</h1><p>Error en la solicitud.</p>";
    }
    
    html += "</div></body></html>";
    return html;
}
