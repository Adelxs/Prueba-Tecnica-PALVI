Instrucciones para correr localmente

1-Clonar el repositorio

-Abrir la terminal de comandos y ejecutar el siguiente comando:
git clone https://github.com/Adelxs/Prueba-Tecnica-PALVI.git

-Cambiar el directorio usando el siguiente comando:
cd palvi

2-Instalar dependencias

-Abrir la terminal de comandos y ejecutar el siguiente comando:
npm install

3-Ejecutar en modo desarrollo

-Abrir la terminal de comandos y ejecutar el siguiente comando:
npm run dev

4-Acceder a la aplicación:

-Una vez iniciado el servidor, abre tu navegador en http://localhost:5173 o el puerto que indique la terminal.


Decisiones Tecnicas

-Separación de tráfico vs funnel de ventas: Se decidió extraer la métrica de tráfico de barras principal para presentarla como KPI independiente. 
Debido a que el trafico suelen ser ordenes de magnitud superior(2000) a los leads y cierres(40), incluirlo en la misma escala lineal aplastaba 
visualmente el resto del pipeline, impidiendo identificar variaciones críticas en la conversión.

 -Gestión de datos incompletos: Se implementó una lógica de protección contra valores null en el archivo calculations.ts. Las funciones de promedio 
 y cálculo de win rate filtran los valores null o undefined, asegurando que el dashboard sea robusto y preciso incluso cuando hay días sin actividad 
 registrada en métricas específicas.

 -Cálculo de Win Rate basado en período: Se aplicó la fórmula de tasa de cierre especificada: sum(deals_won) / sum(deals_won + deals_lost) sobre el 
 período seleccionado, tratando la métrica como una foto del rendimiento actual y no como una cohorte histórica.


 Segunda Iteración

 -Pruebas unitarias: Implementación de tests con Vitest/Jest para las funciones de utilidad en utils/calculations.ts. Al ser el motor de las métricas ejecutivas, 
 es crítico asegurar que los cálculos de tendencias y promedios sean 100% precisos ante cualquier variación del JSON.  

 -Comparativas temporales dinámicas: En esta etapa se visualizan los últimos 7 días. Una iteración futura incluiría la opción de comparar el rendimiento actual 
 contra la semana anterior para dar contexto de crecimiento o caída al Jefe de Ventas.  
 
 -Alertas visuales por dirección: Refinar la función getTrend para que, basándose en el campo direction del dataset, destaque automáticamente en rojo o verde 
 aquellas métricas que se desvíen significativamente del promedio histórico del dataset seleccionado.
