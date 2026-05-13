# 🎭 Playwright + Cucumber + TypeScript — Patrón Screenplay


## ⚙️ Instalación

```bash
npm install
npx playwright install
```

---

## ⚙️ Creación de .env

Crear un archivo .env en la raiz del proyecto con los siguientes datos

URL=URL2
NAVEGADOR=CHROME
MODOHEADLESS=NO

## 🎭 Patrón Screenplay

| Concepto | Qué hace | Ejemplo |
|---|---|---|
| **Actor** | Quien ejecuta las acciones | `Actor.named("Usuario")` |
| **Ability** | Lo que el actor puede hacer | `BrowseTheWeb.as("chrome")` |
| **Task** | Acción de negocio (agrupa Interactions) | `Login.withDefaultCredentials()` |
| **Interaction** | Acción UI atómica | `Click.on('[data-testid="btn"]')` |
| **Question** | Consultar estado de la UI | `IsVisible.theElement('...')` |



## 📈 Reporte

```bash
# Generar reporte HTML después de correr las pruebas
npm run report
# Abrir: reports/html/index.html
```
